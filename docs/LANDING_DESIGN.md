# Landing direction

Primary job: show how MovieNight helps friends stop browsing separately and choose a film together. Audience: couples, friends and movie-night groups. Public downloads do not exist yet; do not imply otherwise.

Palette: charcoal #191C22, slate #292F3A, paper #F6F7FB, cobalt #3971ED, lilac #BCA7F4, mint #78CBB0. Metropolis Black for short display headlines; Metropolis Regular for body and controls, self-hosted existing fonts.

Considered a centered headline with a poster wall, and a split headline with a working group-pick preview. Choose the second: a poster wall could belong to any streaming catalogue, while the interaction explains this app's distinctive group decision.

Desktop                         Mobile
[Wordmark       Demo / Release] [Wordmark      Demo]
[Short headline | Group demo  ] [Short headline    ]
[CTA + context | Poster stack] [CTA + context    ]
                               [Group demo       ]
[Group / Discovery / Providers] [Three short USP rows]
[Release status + Demo CTA    ] [Release status  ]
[Legal + artwork credit      ] [Footer          ]

Left-align headings and copy. Center only the film and shared decision inside the demo. Make the movie-pick preview the memorable element; keep all other sections quiet. Short section copy, no repeated feature cards, decorative gradients, pointer-tracking effects, invented testimonials, fake store links or nonfunctional email signup. Mint indicates agreement; lilac marks other members; cobalt marks the visitor's actions. Motion only follows demo controls, respects reduced motion, and preserves the composition's dimensions.

Implementation: public landing loads independently of the legacy authenticated web client. Scoped CSS; fluid sizing and natural document scroll. Film posters are local, compressed artwork sourced from existing TMDB catalogue records. Demo uses fictional member names and illustrative votes; no provider availability claim is attached to a film.

## Validation

- Production TypeScript/Vite build passes. Removed three existing unused declarations that prevented the baseline build.
- Browser checked at 320, 375, 390, 768, 1024 and 1440 pixels: no document horizontal overflow, all poster images loaded.
- Group demo confirmed match, disabled confirmation, next-film and wraparound states; primary anchor positions the demo with top clearance.
- Initial landing requests are local assets only; legacy auth/client stays behind a dynamic import.
- Reviewed full-page desktop and mobile screenshots. Kept the poster composition as the focal point, enlarged small navigation/footer touch targets, and tightened release copy.
- Public app downloads are not yet available; the release section says coming soon and links to the working demo.
