# Browser challenge deployment

The backend owns `/challenge`, its assets and `/api/challenges`. Vercel proxies only these paths through `api/challenge.js`; the existing landing/legal/app routes remain intact.

Set `MOVIENIGHT_BACKEND_URL` in the Vercel project to the deployed HTTPS backend origin, deploy the updated backend, then deploy the web project. On the backend, set `CHALLENGE_PUBLIC_BASE_URL` (Spring `challenge.public-base-url`) to `https://movienightapp.co.uk` for social preview image URLs. Local testing can use Maven port 18082 directly without Vercel.

Set the same randomly generated `CHALLENGE_PROXY_SECRET` (at least 32 characters) in Vercel and backend environments. The Vercel adapter signs the platform-provided client IP; the backend validates its HMAC and short timestamp window before using it for per-IP limits. Without this configuration, limits safely fall back to the proxy address and may be shared by visitors. Never put the secret in browser/Expo public environment variables. Ordinary client-supplied forwarded headers are ignored.

The forwarding design follows [Vercel request-header behaviour](https://vercel.com/docs/headers/request-headers) and uses [path rewrites](https://vercel.com/docs/routing/rewrites) for the dedicated challenge routes.

The only public invitation data is the creator's chosen nickname, five film posters/titles and region. Private responses require a high-entropy recovery code; the code must never appear in social previews or shared tickets. Browser drafts and codes use sessionStorage. Invitations and answers expire after 30 days. Redis requires persistence/non-evicting storage for that retention guarantee. No purchases or groups are created automatically.

The new routes and adapter can be committed independently of the pre-existing web working tree. Do not stage unrelated landing-page changes merely to deploy this feature.
