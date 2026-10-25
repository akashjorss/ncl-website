/* Hero background: particles carried by a slowly changing smooth flow field,
   drawn as fading trails. Static single frame when the visitor prefers reduced motion. */
(function () {
  "use strict";
  var canvas = document.getElementById("field");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var reduce = (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) || /[?&]static\b/.test(location.search);
  var W, H, dpr, particles = [], N = 300, t = 0, raf = null;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#0a1120"; ctx.fillRect(0, 0, W, H);
    particles = [];
    for (var i = 0; i < N; i++) particles.push(spawn(true));
  }
  function spawn(anywhere) {
    return { x: Math.random() * W, y: Math.random() * H, life: anywhere ? Math.random() * 300 : 0, max: 200 + Math.random() * 300 };
  }
  // smooth divergence-free-looking field from a few sinusoids
  function vel(x, y, t) {
    var s = 1 / Math.max(W, H) * 3.2;
    var a = Math.sin(y * s * 1.3 + t * 0.00021) + 0.6 * Math.cos(x * s * 0.7 - t * 0.00017);
    var b = Math.cos(x * s * 1.1 - t * 0.00019) + 0.6 * Math.sin(y * s * 0.9 + t * 0.00023);
    return { vx: a * 0.55, vy: b * 0.55 };
  }
  function step(now) {
    t = now;
    ctx.fillStyle = "rgba(10, 17, 32, 0.08)";   // fade old trails
    ctx.fillRect(0, 0, W, H);
    ctx.lineWidth = 1.2;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i], v = vel(p.x, p.y, t);
      var nx = p.x + v.vx, ny = p.y + v.vy;
      var k = Math.min(p.life / 60, 1) * Math.min((p.max - p.life) / 60, 1);
      ctx.strokeStyle = "rgba(96, 148, 255, " + (0.42 * k).toFixed(3) + ")";
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke();
      p.x = nx; p.y = ny; p.life++;
      if (p.life > p.max || nx < -5 || ny < -5 || nx > W + 5 || ny > H + 5) particles[i] = spawn(false);
    }
    if (!reduce) raf = requestAnimationFrame(step);
  }
  function start() {
    resize();
    if (reduce) { for (var i = 0; i < 420; i++) step(i * 16); return; }
    raf = requestAnimationFrame(step);
  }
  var timer;
  window.addEventListener("resize", function () { clearTimeout(timer); timer = setTimeout(resize, 150); });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; }
    else if (!reduce && !raf) raf = requestAnimationFrame(step);
  });
  start();
})();
