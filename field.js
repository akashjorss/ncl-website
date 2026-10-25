/* A projected flow surface, with deterministic geometry for static captures. */
(function () {
  "use strict";
  var canvas = document.getElementById('field');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;
  var media = window.matchMedia('(prefers-reduced-motion: reduce)');
  var staticMode = new URLSearchParams(location.search).has('static');
  var width, height, paths = [], raf = null, last = 0, visible = true;
  function resize() {
    width = canvas.clientWidth; height = canvas.clientHeight;
    var ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * ratio; canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    paths = [];
    for (var line = 0; line < 76; line++) {
      var points = [], v = (line / 75 - .5) * 2;
      for (var j = 0; j <= 140; j++) {
        var u = j / 140;
        var pinch = .14 + .85 * Math.pow(Math.abs(u - .48) * 2, 1.35);
        var x = width * (.38 + .72 * u) + Math.sin(u * 5.8 + v * 1.3) * width * .045;
        var y = height * (.56 + .16 * Math.sin(u * 5.8 - .7) + v * pinch * .46);
        points.push([x, y]);
      }
      paths.push(points);
    }
    draw(0);
  }
  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    var glow = ctx.createRadialGradient(width * .76, height * .5, 0, width * .76, height * .5, width * .46);
    glow.addColorStop(0, 'rgba(37,99,235,.15)'); glow.addColorStop(1, 'rgba(37,99,235,0)');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
    for (var i = 0; i < paths.length; i++) {
      var points = paths[i];
      var alpha = .13 + .3 * Math.pow(Math.sin(i * .28), 2);
      ctx.strokeStyle = 'rgba(91,155,255,' + alpha + ')';
      ctx.lineWidth = i % 7 === 0 ? 1.15 : .55;
      ctx.beginPath();
      points.forEach(function (p, index) { if (!index) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); });
      ctx.stroke();
      if (i % 3 === 0) {
        var head = Math.floor((time * .012 + i * 7) % 122) + 18;
        for (var k = 18; k > 0; k--) {
          var a = points[head - k], b = points[head - k + 1];
          ctx.strokeStyle = 'rgba(157,201,255,' + ((1 - k / 19) * .65) + ')';
          ctx.lineWidth = 1.3;ctx.beginPath();ctx.moveTo(a[0], a[1]);ctx.lineTo(b[0], b[1]);ctx.stroke();
        }
      }
    }
  }
  function tick(time) {
    if (time - last > 32) { draw(time); last = time; }
    raf = requestAnimationFrame(tick);
  }
  function sync() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    if (!staticMode && !media.matches && !document.hidden && visible) raf = requestAnimationFrame(tick);
    else if (staticMode || media.matches) draw(0);
  }
  var timer;
  window.addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(function () { resize(); sync(); }, 150); });
  document.addEventListener('visibilitychange', sync);
  media.addEventListener('change', sync);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; sync(); }).observe(canvas);
  resize(); sync();
})();
