import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import MarkdownIt from "markdown-it";
import texmath from "markdown-it-texmath";
import katex from "katex";
import { weightsAt, CYCLE_SECONDS } from "../field-mix.js";
const root = path.resolve(import.meta.dirname, "..");
const htmlFiles = [
  "index.html",
  "research.html",
  "contact.html",
  "legal.html",
  "notes/index.html",
  "notes/can-a-machine-rediscover-keplers-laws/index.html",
  "404.html",
];
const context = { window: {} };
vm.runInNewContext(
  await fs.readFile(path.join(root, "i18n.js"), "utf8"),
  context,
);
const dictionaries = context.window.I18N;
let links = 0,
  keys = 0;
for (const file of htmlFiles) {
  const source = await fs.readFile(path.join(root, file), "utf8");
  assert.equal(
    (source.match(/<h1[ >]/g) || []).length,
    1,
    `${file}: exactly one h1`,
  );
  assert(source.includes('<main id="main">'), `${file}: main landmark`);
  assert(source.includes('property="og:image"'), `${file}: social metadata`);
  for (const [, key] of source.matchAll(/data-i18n="([^"]+)"/g)) {
    for (const lang of ["en", "fr", "de"])
      assert(dictionaries[lang][key], `${file}: missing ${lang}:${key}`);
    keys++;
  }
  for (const [, ref] of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!ref.startsWith("/") || ref.startsWith("//")) continue;
    const url = new URL(ref, "https://neuralcontinuitylabs.com");
    const target = path.join(
      root,
      decodeURI(url.pathname) +
        (url.pathname.endsWith("/") ? "index.html" : ""),
    );
    assert((await fs.stat(target)).isFile(), `${file}: missing ${ref}`);
    if (url.hash) {
      const targetSource = await fs.readFile(target, "utf8");
      assert(
        targetSource.includes(`id="${url.hash.slice(1)}"`),
        `${file}: missing anchor ${ref}`,
      );
    }
    links++;
  }
  assert(!/[\u2013\u2014]/.test(source), `${file}: house punctuation rule`);
}
for (let t = 0; t < CYCLE_SECONDS * 2; t += 0.037) {
  const w = weightsAt(t);
  assert(Math.abs(w.reduce((a, b) => a + b, 0) - 1) < 1e-9);
  assert(w.every((x) => x >= 0 && x <= 1));
  const next = weightsAt(t + 0.001);
  assert(
    next.every((v, i) => Math.abs(v - w[i]) < 0.0001),
    "continuous field weights",
  );
}
assert.deepEqual(weightsAt(0), weightsAt(CYCLE_SECONDS));
const markdown = new MarkdownIt({ html: true }).use(texmath, {
  engine: katex,
  delimiters: "dollars",
  katexOptions: { throwOnError: true },
});
const rendered = markdown.render(
  "# Heading\n\n- List item\n\n[Link](https://example.org)\n\n```python\nx = 1\n```\n\n$$F = ma$$\n\n![Figure](/assets/field-still.svg)",
);
for (const expected of [
  "<h1>",
  "<ul>",
  "<a href=",
  "<pre>",
  "katex-mathml",
  "<img src=",
])
  assert(rendered.includes(expected), `Markdown feature: ${expected}`);
assert.equal(
  (await fs.readFile(path.join(root, "CNAME"), "utf8")).trim(),
  "neuralcontinuitylabs.com",
);
assert((await fs.stat(path.join(root, ".nojekyll"))).isFile());
console.log(
  `PASS: ${htmlFiles.length} pages, ${links} local resources/anchors, ${keys} translation keys in three languages.`,
);
console.log(
  "PASS: Markdown headings, lists, code, equations, figures and links; continuous 140-second mix; domain configuration.",
);
