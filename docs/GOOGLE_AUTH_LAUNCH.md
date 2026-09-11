# Google sign-in: public pages and launch configuration

Public URLs (deploy this webapp before submitting):

- Homepage: https://movienightapp.co.uk/
- Privacy: https://movienightapp.co.uk/privacy
- Terms: https://movienightapp.co.uk/terms
- Operator: Callum McKenzie
- Support: support@movienightapp.co.uk (confirmed by operator)

The Expo app already uses these policy paths. The web footer links to both. The production build emits static HTML policy documents with canonical URLs and no JavaScript requirement. The old privacy-policy.txt URL redirects on Vercel; a current text copy is also emitted for other hosts.

## Before submitting Google branding

1. Deploy to the owned HTTPS domain; confirm all three URLs work without signing in, including on a phone. Tailscale/local previews are not the production policy URLs.
2. Verify domain ownership and configure `movienightapp.co.uk` as an authorized domain in Google Auth Platform. Use the URLs above in Branding, and a monitored support mailbox. Keep app name and branding consistent with MovieNight.
3. Configure the production Clerk instance with the production Google credentials and the exact redirect URI supplied by Clerk. Do not guess a callback path or replace the native iOS/Android client IDs with the web client ID. Native platform IDs/signatures still need to match the released builds.
4. Confirm actual requested permissions remain basic Google identity (openid, email, profile). The native implementation uses Clerk's Google sign-in hook; policy content assumes no Gmail, Drive, contacts, calendar or YouTube access. Check the live Google consent screen and Clerk configuration.
5. Publish production consent configuration and complete whatever verification Google requires for the actual scopes and branding. These pages do not themselves complete verification.

## Privacy operations to settle before public launch

The notices reflect the code reviewed, not a certification of legal compliance. Review them against the actual launch configuration, especially:

- Hosting/authentication processors, processing countries, transfer safeguards and how a user can obtain details. Do not treat general notice language as evidence safeguards exist.
- Concrete retention and backup expiry rules, and an operational account-deletion process covering Clerk, app data, memberships, logs and backups. Current policy offers email requests, not a nonexistent self-service deletion button.
- Support mailbox delivery and who handles rights requests.
- Eligibility/age policy (draft uses 13+ and any higher local requirement), and the intended markets.
- Subscription billing/refunds if enabled at launch. Terms are conditional on paid features being offered.
- No analytics initialization call was found in Expo; a dormant PostHog client exists. Backend analytics currently logs events. Reassess disclosure and consent before enabling third-party analytics.
- Have the operator review the final notices and obtain appropriate legal review for the launch markets.

Sources checked 9 September 2026:
- https://developers.google.com/identity/protocols/oauth2/policies
- https://developers.google.com/identity/protocols/oauth2/production-readiness/brand-verification
- https://developers.google.com/terms/api-services-user-data-policy
- https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/
