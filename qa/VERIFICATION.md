# Redesign verification

Reviewed locally on 9 November 2026. The preview runs at http://127.0.0.1:8140/.

## Scope

The branch `redesign/editorial-field` starts from `main`. Neither `main` nor `nov-polish` was merged or changed. GitHub Pages continues to serve the root of `main`, with the existing custom domain, HTTPS, `CNAME`, and `.nojekyll` intact.

## Checks

- Static checks pass for seven pages, 88 local resources/anchors, and 100 translated interface instances in EN, FR and DE.
- Markdown checks cover headings, lists, code, links, figures, tables and KaTeX/MathML equations.
- Mix weights remain bounded, sum to one and vary continuously across the 140-second cycle. The procedural clock is independent of the mixture cycle.
- All 66 browser checks pass: layouts at 1440, 1280, 390 and 320 CSS pixels, headings, language selection and navigation, English article fallback, WebGL initialization, and contact validation, success, provider rejection and network failure.
- All seven field lifecycle checks pass: static reduced-motion rendering, unavailable-WebGL fallback, capped drawing, context loss and restoration, offscreen pause, and script-error capture. The local render sample measured approximately 26 fps at a 960 by 711 drawing buffer. This is a local sample, not a performance guarantee for every device.
- JavaScript syntax checks and `git diff --check` pass. `npm audit` reports zero vulnerabilities for the locked build dependencies.
- An extension-free Chrome session showed no site script errors. A JSON parse error seen in the normal profile was absent there; production code is not changed to accommodate third-party browser extensions.

## Visual review

Reviewed the wide desktop homepage, a standard laptop layout, and the mobile homepage and note. Inspected the fluid, vortical, thermal and contour appearances and their blended phases during the session. Sensor positions remain fixed and visible. Also reviewed French and German homepages, and the note's mobile table and paragraph spacing.

Screenshots retained locally (ignored by Git):

- `qa/desktop.png`: full homepage at 1440 CSS pixels, captured at device pixel ratio 2.
- `qa/mobile.png`: full homepage at 390 CSS pixels, captured at device pixel ratio 2.

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
