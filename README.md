# Neural Continuity Labs website

Static landing page for neuralcontinuitylabs.com, served by GitHub Pages from `main`.

- `index.html`: the page. `legal.html`: legal notice and privacy notice.
- `i18n.js`: all copy in English, German and French. Edit text here, not in the HTML (the HTML holds the English fallback for visitors without JavaScript).
- `site.js`: language detection (`?lang=`, then the saved choice, then the browser's languages, then English) and the contact form (FormSubmit AJAX to contact@neuralcontinuitylabs.com).
- `styles.css`: the paper-and-ink design (system serif, sans and mono stacks, no web fonts). `field.js`: the hero figure, a live iso-contour field with eleven measurement points (static under prefers-reduced-motion or with `?static`). `motion.js`: header scroll state and reveal-on-scroll.
- `og.png`: link preview image. `favicon.svg`: the NCL mark.

Publish: commit and push to `main`; Pages rebuilds within about a minute.
