import { readFile, writeFile, mkdir } from 'node:fs/promises';

// Emit public, no-JavaScript policy documents using the same content and CSS as
// the development React views. Keep account/client scripts off these pages.
const policies = JSON.parse(await readFile('src/components/legal/policies.json', 'utf8'));
const shell = await readFile('dist/index.html', 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const brand = '<a class="mn-wordmark" href="/" aria-label="MovieNight home"><span class="mn-brand-icon"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 11 16-4-1-4L3 7Z M4 11v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V11Z M7 6l3 4 M13 4l3 4"/></svg></span>MovieNight<span class="mn-wordmark-dot">.</span></a>';
const navigation = kind => `<nav aria-label="Legal pages">${Object.entries(policies).map(([key, policy]) => `<a href="/${key}"${key === kind ? ' aria-current="page"' : ''}>${escape(policy.title)}</a>`).join('')}</nav>`;
for (const [kind, policy] of Object.entries(policies)) {
  let head = shell.slice(shell.indexOf('<head>') + 6, shell.indexOf('</head>'))
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, '')
    .replace(/<title>.*?<\/title>/, `<title>${escape(policy.title)} — MovieNight</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*/, `$1${escape(policy.intro)}`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*/, `$1${escape(policy.title)} — MovieNight`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*/, `$1${escape(policy.intro)}`);
  head += `<link rel="canonical" href="https://movienightapp.co.uk/${kind}" />`;
  const body = `<div class="mn-landing mn-legal" id="top">
    <a class="mn-skip" href="#main">Skip to content</a>
    <header class="mn-header mn-container">${brand}<a class="mn-nav-cta" href="/">Back to MovieNight</a></header>
    <main class="mn-container mn-legal-layout" id="main">
      <div class="mn-legal-heading">${navigation(kind)}<h1>${escape(policy.title)}</h1><p>${escape(policy.intro)}</p><small>Last updated ${escape(policy.updated)}</small></div>
      <nav class="mn-legal-contents" aria-label="On this page"><h2>On this page</h2>${policy.sections.map(s => `<a href="#${escape(s.id)}">${escape(s.title)}</a>`).join('')}</nav>
      <article class="mn-legal-body">${policy.sections.map(s => `<section id="${escape(s.id)}"><h2>${escape(s.title)}</h2>${s.paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}</section>`).join('')}
      <div class="mn-legal-contact"><h2>Need a hand?</h2><a href="mailto:support@movienightapp.co.uk">support@movienightapp.co.uk</a><p><a href="https://myaccount.google.com/connections">Manage Google connections</a> · <a href="https://clerk.com/legal/privacy">Clerk privacy</a> · <a href="https://policies.google.com/privacy">Google privacy</a> · <a href="https://ico.org.uk/make-a-complaint/">Contact the ICO</a></p></div></article>
    </main><footer class="mn-footer mn-container">${brand}<div class="mn-footer-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="mailto:support@movienightapp.co.uk">Contact us</a></div></footer>
  </div>`;
  await mkdir(`dist/${kind}`, {recursive:true});
  await writeFile(`dist/${kind}/index.html`, `<!doctype html><html lang="en"><head>${head}</head><body>${body}</body></html>`);
}
// Legacy URL remains useful even on hosts that do not apply redirects.
await writeFile('dist/privacy-policy.txt', `${policies.privacy.title}\nLast updated ${policies.privacy.updated}\n\n${policies.privacy.sections.map(s => `${s.title}\n\n${s.paragraphs.join('\n\n')}`).join('\n\n')}\n`);
console.log('Generated public /privacy and /terms documents.');
