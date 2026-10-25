(function () {
  "use strict";
  var header = document.querySelector('.top');
  function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || new URLSearchParams(location.search).has('static') || !('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('main section:not(.hero) .wrap').forEach(function (node) {
    node.classList.add('reveal', 'pending');
    observer.observe(node);
  });
  reduced.addEventListener('change', function () {
    if (reduced.matches) {
      document.querySelectorAll('.pending').forEach(function (node) { node.classList.remove('pending'); });
      observer.disconnect();
    }
  });
})();
