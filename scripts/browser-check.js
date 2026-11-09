// Run locally from DevTools: await import('/scripts/browser-check.js?run=1')
// All contact requests are mocked here. This never sends a message.
const results = [];
const check = (name, pass, detail = "") => {
  results.push({ name, pass: !!pass, detail });
  if (!pass) console.error("CHECK FAILED:", name, detail);
};
async function page(url, width = 390) {
  const frame = document.createElement("iframe");
  frame.style.cssText = `position:fixed;left:-10000px;top:0;width:${width}px;height:1000px;border:0`;
  const loaded = new Promise((resolve) => (frame.onload = resolve));
  frame.src = url;
  document.body.appendChild(frame);
  await loaded;
  await frame.contentDocument.fonts.ready;
  await new Promise((resolve) => setTimeout(resolve, 120));
  return frame;
}
for (const width of [1440, 1280, 390, 320]) {
  for (const url of [
    "/?lang=en",
    "/research.html?lang=en",
    "/contact.html?lang=en",
    "/notes/?lang=en",
    "/notes/can-a-machine-rediscover-keplers-laws/?lang=fr",
    "/notes/physics-as-neural-turing-computation/?lang=en",
    "/notes/neural-continuity/?lang=en",
    "/notes/why-ncl-exists/?lang=en",
    "/legal.html?lang=en",
  ]) {
    const frame = await page(url, width),
      w = frame.contentWindow,
      d = frame.contentDocument;
    check(
      `layout ${width} ${url}`,
      d.documentElement.scrollWidth <= w.innerWidth,
      `${d.documentElement.scrollWidth}/${w.innerWidth}`,
    );
    check(`heading ${width} ${url}`, d.querySelectorAll("h1").length === 1);
    if (url.includes("/notes/neural-continuity/")) {
      check(
        `Accessible equation ${width}`,
        d.querySelector(".katex-mathml math") &&
          d.querySelector(".katex-display").scrollWidth <= w.innerWidth,
      );
    }
    frame.remove();
  }
}
for (const lang of ["en", "fr", "de"]) {
  const frame = await page("/?lang=" + lang),
    d = frame.contentDocument;
  check(
    `language ${lang}`,
    d.documentElement.lang === lang &&
      d.querySelector(`[data-lang=${lang}]`).getAttribute("aria-pressed") ===
        "true",
  );
  check(
    `navigation language ${lang}`,
    d.querySelector(".nav>a").search === "?lang=" + lang,
  );
  check(
    `WebGL ${lang}`,
    d.querySelector(".field-shell").dataset.ready === "true",
  );
  check(
    `graphics status ${lang}`,
    d.querySelector("canvas").getContext("webgl").getError() === 0,
  );
  frame.remove();
}
const note = await page(
  "/notes/can-a-machine-rediscover-keplers-laws/?lang=de",
);
check(
  "German article rendered",
  note.contentDocument.querySelector("article").lang === "de" &&
    note.contentDocument
      .querySelector(".prose")
      .textContent.includes("KeplerBench"),
);
check(
  "Translated article needs no English fallback",
  note.contentDocument.querySelector(".english-notice").hidden
);
note.remove();
for (const lang of ["en", "fr", "de"]) {
  for (const slug of ["can-a-machine-rediscover-keplers-laws", "physics-as-neural-turing-computation", "neural-continuity", "why-ncl-exists"]) {
    for (const width of [1440, 390, 320]) {
      const translated = await page(`/notes/${slug}/?lang=${lang}`, width);
      const d = translated.contentDocument;
      const payload = JSON.parse(d.querySelector("#note-content").textContent)[lang];
      check(`Note content ${lang} ${slug} ${width}`,
        d.querySelector("article").lang === lang &&
        d.querySelector("h1").textContent === payload.title &&
        d.querySelector(".dek").textContent === payload.description &&
        d.querySelector(".english-notice").hidden &&
        d.querySelector('meta[name="description"]').content === payload.description);
      check(`Translated layout ${lang} ${slug} ${width}`, d.documentElement.scrollWidth <= width);
      if (slug === "neural-continuity") check(`Translated math ${lang} ${width}`, !!d.querySelector(".katex-mathml math"));
      translated.remove();
    }
  }
}
const switcher = await page("/notes/neural-continuity/?lang=en");
for (const lang of ["fr", "de", "en"]) {
  const d = switcher.contentDocument;
  d.querySelector(`[data-lang=${lang}]`).click();
  check(`Article switches in place ${lang}`, d.querySelector("article").lang === lang && d.querySelector(".prose").textContent.includes(lang === "fr" ? "précision finie" : lang === "de" ? "endlicher Genauigkeit" : "finite precision"));
}
switcher.remove();
const frame = await page("/contact.html?lang=en"),
  w = frame.contentWindow,
  d = frame.contentDocument,
  form = d.querySelector("form");
let requests = 0,
  body;
w.fetch = async (_url, options) => {
  requests++;
  body = JSON.parse(options.body);
  return { ok: true, json: async () => ({ success: "true" }) };
};
form.requestSubmit();
check(
  "Invalid form stays local",
  requests === 0 &&
    d.querySelector(".status").classList.contains("err") &&
    d.activeElement === form.elements.name,
);
form.elements.name.value = "Local QA";
form.elements.email.value = "qa@example.org";
form.elements.message.value = "Mocked locally. Never sent.";
form.requestSubmit();
await new Promise((resolve) => setTimeout(resolve, 30));
check(
  "Contact success path",
  requests === 1 &&
    body._replyto === "qa@example.org" &&
    d.querySelector(".status").classList.contains("ok") &&
    !form.querySelector("button").disabled,
);
w.fetch = async () => ({ ok: true, json: async () => ({ success: "false" }) });
form.elements.name.value = "Local QA";
form.elements.email.value = "qa@example.org";
form.elements.message.value = "Mocked locally.";
form.requestSubmit();
await new Promise((resolve) => setTimeout(resolve, 30));
check(
  "FormSubmit false response handled",
  d.querySelector(".status").classList.contains("err") &&
    !form.querySelector("button").disabled,
);
w.fetch = async () => {
  throw new TypeError("Offline mock");
};
form.requestSubmit();
await new Promise((resolve) => setTimeout(resolve, 30));
check(
  "Network failure handled",
  d.querySelector(".status").classList.contains("err") &&
    !form.querySelector("button").disabled,
);
frame.remove();
const report = {
  checks: results.length,
  passed: results.filter((r) => r.pass).length,
  failures: results.filter((r) => !r.pass),
  details: results,
};
window.nclQA = report;
console.log("NCL_BROWSER_CHECKS", JSON.stringify(report));
export default report;
