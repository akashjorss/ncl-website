// Local-only checks for reduced motion, fallback, visibility and context recovery.
const html = await (await fetch("/?lang=en")).text();
const results = [];
const check = (name, pass, detail = "") =>
  results.push({ name, pass: !!pass, detail });
async function make(injection = "") {
  const frame = document.createElement("iframe");
  frame.style.cssText =
    "position:fixed;inset:0 auto auto 0;width:640px;height:600px;border:0;z-index:100";
  const loaded = new Promise((resolve) => (frame.onload = resolve));
  frame.srcdoc = html
    .replace('<script src="/site.js" defer></script>', "")
    .replace(
      "<head>",
      '<head><script>window.qaDraws=0;window.qaErrors=[];window.addEventListener("error",e=>qaErrors.push(e.message));const originalContext=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(...args){const gl=originalContext.apply(this,args);if(gl&&args[0]==="webgl"&&!gl.qaWrapped){gl.qaWrapped=true;const draw=gl.drawArrays.bind(gl);gl.drawArrays=function(...a){window.qaDraws++;return draw(...a)};}return gl;};' +
        injection +
        "</script>",
    );
  document.body.appendChild(frame);
  await loaded;
  await new Promise((r) => setTimeout(r, 250));
  return frame;
}
let f = await make(
  'const originalMatch=window.matchMedia;window.matchMedia=q=>q.includes("prefers-reduced-motion")?{matches:true,addEventListener(){},removeEventListener(){}}:originalMatch(q);',
);
let d = f.contentDocument,
  w = f.contentWindow,
  before = w.qaDraws;
await new Promise((r) => setTimeout(r, 600));
check(
  "Reduced motion draws a still",
  d.querySelector(".field-shell").dataset.ready === "true" &&
    w.qaDraws === before,
  { draws: w.qaDraws, errors: w.qaErrors },
);
f.remove();
f = await make(
  'HTMLCanvasElement.prototype.getContext=function(type,...args){return type.includes("webgl")?null:originalContext.call(this,type,...args)};',
);
d = f.contentDocument;
check(
  "Unavailable WebGL shows fallback",
  d.querySelector(".field-shell").dataset.ready !== "true" &&
    f.contentWindow.getComputedStyle(d.querySelector(".fallback"))
      .visibility === "visible" &&
    d.querySelector(".fallback").complete,
);
f.remove();
f = await make();
d = f.contentDocument;
w = f.contentWindow;
let gl = d.querySelector("canvas").getContext("webgl");
before = w.qaDraws;
await new Promise((r) => setTimeout(r, 2000));
let fps = (w.qaDraws - before) / 2;
check("Frame rate stays within cap", fps > 5 && fps <= 31, {
  fps,
  buffer: [gl.canvas.width, gl.canvas.height],
  pixels: gl.canvas.width * gl.canvas.height,
});
const ext = gl.getExtension("WEBGL_lose_context");
if (ext) {
  ext.loseContext();
  await new Promise((r) => setTimeout(r, 150));
  check(
    "Context loss shows still fallback",
    d.querySelector(".field-shell").dataset.ready === "false",
  );
  ext.restoreContext();
  await new Promise((r) => setTimeout(r, 500));
  check(
    "Context restores cleanly",
    d.querySelector(".field-shell").dataset.ready === "true" &&
      gl.getError() === 0,
  );
}
f.style.left = "-10000px";
await new Promise((r) => setTimeout(r, 250));
before = w.qaDraws;
await new Promise((r) => setTimeout(r, 400));
check("Offscreen rendering pauses", w.qaDraws === before);
check("Field has no script errors", w.qaErrors.length === 0, w.qaErrors);
f.remove();
window.nclFieldQA = {
  checks: results.length,
  passed: results.filter((r) => r.pass).length,
  results,
};
console.log("NCL_FIELD_CHECKS", JSON.stringify(window.nclFieldQA));
