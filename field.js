/* A scalar field sampled on a grid, drawn with marching squares. */
(function () {
  'use strict';
  var canvas = document.getElementById('field');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var still = new URLSearchParams(location.search).has('static');
  var points = [[.16,.18],[.49,.13],[.81,.22],[.29,.36],[.65,.35],[.12,.57],[.45,.55],[.86,.56],[.25,.81],[.60,.77],[.83,.87]];
  var width = 0, height = 0, frame = null, last = 0, elapsed = 0, visible = true;
  var nx = 100, ny = 100, values = new Float32Array((nx + 1) * (ny + 1));
  function draw(time) {
    var phase = time * Math.PI * 2 / 26000;
    var sources = [
      [.30 + .035 * Math.sin(phase), .30 + .025 * Math.cos(phase), 1.2, .12, .20],
      [.71 + .03 * Math.cos(phase), .66 + .03 * Math.sin(phase), .95, .18, .14],
      [.78 + .025 * Math.sin(phase), .16, -.65, .23, .21],
      [.16, .80 + .025 * Math.cos(phase), -.7, .22, .19]
    ];
    for (var y = 0; y <= ny; y++) {
      for (var x = 0; x <= nx; x++) {
        var u = x / nx, v = y / ny;
        var value = .28 * (u - v) + .12 * Math.sin(u * 4 + v * 3);
        for (var s = 0; s < sources.length; s++) {
          var source = sources[s], dx = (u - source[0]) / source[3], dy = (v - source[1]) / source[4];
          value += source[2] * Math.exp(-.5 * (dx * dx + dy * dy));
        }
        values[y * (nx + 1) + x] = value;
      }
    }
    ctx.clearRect(0, 0, width, height);
    // Interpolate edge crossings, resolving saddle cells by their center value.
    for (var levelIndex = -9; levelIndex <= 17; levelIndex++) {
      var level = levelIndex * .075;
      ctx.beginPath();
      for (var row = 0; row < ny; row++) {
        for (var col = 0; col < nx; col++) {
          var offset = row * (nx + 1) + col;
          var a = values[offset], b = values[offset + 1];
          var c = values[offset + nx + 2], d = values[offset + nx + 1];
          var mask = (a < level ? 1 : 0) | (b < level ? 2 : 0) | (c < level ? 4 : 0) | (d < level ? 8 : 0);
          if (mask === 0 || mask === 15) continue;
          var corners = [a, b, c, d];
          var positions = [[col,row],[col+1,row],[col+1,row+1],[col,row+1]], edges = [];
          for (var edge = 0; edge < 4; edge++) {
            var next = (edge + 1) % 4;
            if ((corners[edge] < level) !== (corners[next] < level)) {
              var fraction = (level - corners[edge]) / (corners[next] - corners[edge]);
              edges.push([(positions[edge][0] + fraction * (positions[next][0] - positions[edge][0])) * width / nx,
                (positions[edge][1] + fraction * (positions[next][1] - positions[edge][1])) * height / ny]);
            }
          }
          if (edges.length === 4 && ((corners.reduce(function (a,b) { return a+b; }, 0) / 4 < level) !== (corners[0] < level))) edges.push(edges.shift());
          for (var e = 0; e < edges.length; e += 2) {
            ctx.moveTo(edges[e][0], edges[e][1]); ctx.lineTo(edges[e+1][0], edges[e+1][1]);
          }
        }
      }
      ctx.strokeStyle = levelIndex % 4 === 0 ? 'rgba(21,24,29,.70)' : 'rgba(21,24,29,.36)';
      ctx.lineWidth = levelIndex % 4 === 0 ? 1.05 : .8;
      ctx.stroke();
    }
    ctx.font = '10px ui-monospace, "SF Mono", Menlo, Consolas, monospace';
    ctx.textBaseline = 'middle';
    points.forEach(function (point, index) {
      var px = point[0] * width, py = point[1] * height;
      ctx.fillStyle = '#f5f3ee'; ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = .8; ctx.beginPath(); ctx.arc(px, py, 5.5, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.arc(px, py, 2.6, 0, Math.PI * 2); ctx.fill();
      var label = String(index + 1);
      ctx.fillStyle = '#f5f3ee'; ctx.fillRect(px + 9, py - 15, ctx.measureText(label).width + 4, 13);
      ctx.fillStyle = '#1d4ed8'; ctx.fillText(label, px + 11, py - 8);
    });
  }
  function resize() {
    width = canvas.clientWidth; height = canvas.clientHeight;
    var ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw(still || reduced.matches ? 0 : elapsed);
  }
  function tick(time) {
    if (!last) last = time;
    if (time - last >= 1000 / 20) {
      elapsed += time - last; last = time; draw(elapsed);
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null; last = 0;
    if (still || reduced.matches) draw(0);
    else if (!document.hidden && visible) frame = requestAnimationFrame(tick);
  }
  new ResizeObserver(resize).observe(canvas);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting; sync();
  }).observe(canvas);
  resize(); sync();
})();
