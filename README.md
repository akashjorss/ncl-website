# Neural Continuity Labs

Static editorial website for https://neuralcontinuitylabs.com. GitHub Pages serves the committed files at the repository root from `main`. `CNAME` and `.nojekyll` are unchanged. The redesign is on `redesign/editorial-field`, based on `main`; `nov-polish` remains separate and unchanged. Pushing the redesign branch does not publish it.

## Local preview

Requires Node 22+ and Python 3. Install build dependencies with `npm ci`, then:

```sh
npm run build
npm run check
npm run preview
```

Open http://127.0.0.1:8140/. The server binds only to this machine. All generated HTML is committed, so GitHub Pages needs no Node build workflow or server-side runtime. After approval, publish by merging the completed branch into `main` through the usual Git workflow.

## Structure

- `templates/`: page bodies. `scripts/build.mjs`: shared shell, Markdown rendering, notes index, sitemap, and static HTML generation.
- `content/notes/`: original English Markdown notes with simple frontmatter.
- `styles.css`: typography and responsive layout. Newsreader and DM Sans are self-hosted under `assets/fonts/` with their SIL Open Font Licenses.
- `field.js`: custom WebGL 1 shaders, sensors, resize, frame limiting, visibility handling, context restoration, and cleanup. `field-mix.js`: pure transition timing. Every field uses the same clock, including while invisible. Each phase holds for 10 seconds and blends for 25 seconds; the visual mixture cycles over 140 seconds while the procedural spatial state continues evolving.
- `assets/field-still.svg`: still fallback for no JavaScript or unavailable WebGL. Reduced-motion and `?static` render one still WebGL frame, with the SVG available if GPU rendering fails.
- `i18n.js`, `site.js`: EN/FR/DE interface copy, language persistence and contact form. Scientific notes remain English with a translated fallback notice. Markdown and KaTeX are build-time dependencies only. Equation CSS is loaded only by notes containing math.
- `research.html`, `contact.html`, `legal.html`, `notes/`: generated supporting pages. Preserve generated files in commits.
- `motion.js` and root `og.png` are retained legacy assets, unused by the redesign. New social metadata uses `assets/og.png`.

## Add a note

Create `content/notes/your-note.md`:

```markdown
---
title: Your research question
date: 2026-11-09
description: A short sentence for the index and social preview.
author: Akash Malhotra
slug: your-research-question
---

Your opening paragraph.

## A section

A list, a [link](https://example.org), or inline math $F = ma$.

$$
\frac{d\mathbf{x}}{dt} = f(\mathbf{x})
$$

![Description of the figure](/assets/your-figure.svg)

<figure>
  <img src="/assets/your-figure.svg" alt="Describe the scientific content" width="800" height="500">
  <figcaption>A useful scientific caption with attribution.</figcaption>
</figure>
```

Use fenced blocks for code. Standard Markdown supports headings, lists, tables, images, and links. `$...$` and `$$...$$` render through KaTeX to HTML and accessible MathML at build time. HTML figures are allowed because content is authored locally and trusted; never compile unreviewed third-party HTML. Add figures to `assets/`, then run `npm run build` and `npm run check`. The home list (latest three), notes index, article, and sitemap update automatically. Commit the source and generated files together. Keep dates factual; translations of scientific articles are not generated.

## Verification

`npm run check` validates generated pages, local resources and anchors, EN/FR/DE keys, Markdown/math support, continuous mix weights, and domain files. JavaScript syntax checks can use `node --check`.

For local browser checks, open the preview and run `await import('/scripts/browser-check.js?run=1')` in DevTools. It tests layouts at 1440, 1280, 390 and 320 pixels, localization, English note fallback, GPU initialization, and mocked contact success/failure paths. It never sends a message. Results are in `window.nclQA`. Run `await import('/scripts/field-check.js?run=1')` for reduced-motion, fallback, frame-cap, offscreen and context-recovery checks. The review record is in `qa/VERIFICATION.md`.

The contact endpoint is the existing `https://formsubmit.co/ajax/contact@neuralcontinuitylabs.com`. An end-to-end email delivery check requires a real submission; automated QA mocks the endpoint. The field is an artistic procedural illustration, not measured data or a trained reconstruction output.

The KeplerBench note and research entry were checked against the public repository, CITATION.cff, protocol and pilot table. The primary paper link is https://openreview.net/forum?id=RdErwlc7jJ. No arXiv identifier is claimed.
