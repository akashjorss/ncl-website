# Redesign verification

Reviewed locally on 9 November 2026. The preview runs at http://127.0.0.1:8140/.

## Scope

The branch `redesign/editorial-field` starts from `main`. Neither `main` nor `nov-polish` was merged or changed. GitHub Pages continues to serve the root of `main`, with the existing custom domain, HTTPS, `CNAME`, and `.nojekyll` intact.

## Checks

- Static checks pass for ten pages, 158 local resources/anchors, and 141 translated interface instances in EN, FR and DE.
- Markdown checks cover headings, lists, code, links, figures, tables and KaTeX/MathML equations.
- Mix weights remain bounded, sum to one and vary continuously across the 140-second cycle. The procedural clock is independent of the mixture cycle. A persistent GPU transport pass supplies all four field views.
- All 94 browser checks pass: layouts at 1440, 1280, 390 and 320 CSS pixels, headings, language selection and navigation, English article fallback, accessible equations at all four widths, WebGL initialization, and contact validation, success, provider rejection and network failure.
- All seven field lifecycle checks pass: static reduced-motion rendering, unavailable-WebGL fallback, capped drawing, context loss and restoration, offscreen pause, and script-error capture. The local render sample measured 25.5 fps at a 960 by 711 drawing buffer. This is a local sample, not a performance guarantee for every device.
- JavaScript syntax checks and `git diff --check` pass. `npm audit` reports zero vulnerabilities for the locked build dependencies.
- An extension-free Chrome session showed no site script errors. A JSON parse error seen in the normal profile was absent there; production code is not changed to accommodate third-party browser extensions.

## Visual review

Reviewed the wide desktop homepage, a standard laptop layout, and the mobile homepage and note. Inspected the fluid, vortical, thermal and contour appearances and their blended phases during the session. Sensor positions remain fixed and visible. Also reviewed French and German homepages, and the note's mobile table and paragraph spacing.

Screenshots retained locally (ignored by Git):

- `qa/desktop-refined.png`: full homepage before the final hero copy and date-list cleanup at 1440 CSS pixels, captured at device pixel ratio 2.
- `qa/mobile-refined.png`: full homepage before the final hero copy and date-list cleanup at 390 CSS pixels, captured at device pixel ratio 2.

## Deliberate limits

Contact requests were mocked for QA; no email was sent. The existing FormSubmit service and verified recipient are preserved. Real inbox delivery has not been retested.

Responsive layouts were tested in desktop Chrome's device emulation, not on a physical phone. The field is an illustrative procedural artwork, not a numerical physical simulation or trained-model reconstruction. Scientific notes are English originals with localized fallback notices. The KeplerBench paper links to OpenReview; no arXiv identifier is claimed.

## Reproduce

```sh
npm ci
npm run build
npm run check
npm run preview
```

In the local preview's DevTools console:

```js
await import('/scripts/browser-check.js?run=1');
await import('/scripts/field-check.js?run=1');
```

The first script never sends a real contact request. The second uses temporary isolated frames and simulated graphics-context loss. Do not interpret those simulated states as production errors.

## Research-note revision

The notebook now contains four succinct notes (approximately 150 to 170 words each), titled Can neural nets discover physical laws?, Neural Field Computations, Neural Continuity and Neural Continuity Labs. Visible author bylines are omitted. Technical acronyms are expanded on first use. List dates are omitted; article publication dates remain factual. The KeplerBench note explicitly names acceptance at the NeurIPS 2026 Sim2Science workshop. NFTM bibliographic details and the neural-continuity definition were checked against the official ML4PS 2025 accepted-paper listing and workshop PDF, Section 3 and Appendix B. NFTM is also listed on the Research page in EN, FR and DE. The workshop version is used for its updated computational-framework framing and explicit definition of neural continuity.

## Design comparison

`qa/design-directions.html` contains five separate composition studies for selection. These use a still captured from the WebGL field. Their overall layouts have not been applied to the homepage. The current homepage has the requested shorter hero copy in EN, FR and DE, and its redundant lab-name eyebrow is removed. The official Inria and Paris-Saclay SVG logos appear in the shared footer under IN MATURATION WITH. The five studies and final homepage copy were visually inspected in Chrome. Static checks were rerun after the copy and date-list changes; the 94 browser and seven graphics checks passed before those final text/layout edits.

## Additional visual identities

Five further studies (11 to 15) live under `qa/modern-directions/`. They are independent previews with shared prototype CSS and the existing live field module. The proposed identities use different typography, composition and color. The production homepage has not adopted any study. Navigation links lead to the existing supporting pages; language abbreviations in these studies are visual placeholders.

All five were visually reviewed in desktop Chrome. The Instrument was also reviewed at 390 CSS pixels. Browser measurements covered every study at 1440, 1280, 390 and 320 pixels, with 20 of 20 combinations passing the horizontal-overflow, single-h1 and loaded-image checks. These checks cover composition previews, not a completed rollout to every supporting page.

## Selected Mineral design

Akash selected option 7. The implemented website now uses the Mineral palette across the homepage, notes, research, contact and legal pages. The homepage adopts the compact Field Atlas introduction, panoramic field and single featured KeplerBench note, with a link to the complete notebook. The favicon, browser theme color and generated social preview use the new palette.

After implementation, all 94 browser checks and seven field checks passed. Responsive checks cover 1440, 1280, 390 and 320 CSS pixels, EN/FR/DE navigation, English note fallback, accessible math and mocked contact success/failure. The local field sample measured 25.5 fps with a 640 by 474 drawing buffer. Static validation passes for ten pages, 158 local resources/anchors and 141 translation keys. Contact email delivery was not exercised.

Reviewed the actual homepage in desktop and mobile Chrome emulation. Current screenshots are `qa/mineral-desktop.png` (1440 CSS pixels) and `qa/mineral-mobile.png` (390 CSS pixels), kept locally. The preview remains at http://127.0.0.1:8140/. Changes remain on `redesign/editorial-field`; GitHub Pages and the live domain continue using main.

## Readability update

Raised the introduction and note summaries to 16px, navigation and primary links to 14px, footer copy to 13px, legal links to 12px, and small section labels to 11 or 12px. Article prose and heading sizes are unchanged. Laptop spacing stacks the hero contact link below its paragraph, and mobile navigation keeps 44px link height. All 94 browser checks passed at 1440, 1280, 390 and 320 CSS pixels; the larger desktop text and mobile homepage/footer were also visually reviewed in Chrome.
