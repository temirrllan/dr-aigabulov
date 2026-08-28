(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Граница у шапки появляется, когда страница сдвинута
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.rise').forEach(function (el) { el.classList.add('is-in'); });
    var t = document.getElementById('teeth');
    if (t) t.classList.add('is-filled');
    return;
  }

  // Появление блоков при скролле
  var rise = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      setTimeout(function () { el.classList.add('is-in'); }, Math.min(i, 4) * 70);
      rise.unobserve(el);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
  document.querySelectorAll('.rise').forEach(function (el) { rise.observe(el); });

  // Страховка: контент не должен остаться невидимым ни при каких условиях
  setTimeout(function () {
    document.querySelectorAll('.rise:not(.is-in)').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
    });
  }, 2000);

  // Промежуток в зубном ряду закрывается имплантом, когда блок попал в кадр
  var teeth = document.getElementById('teeth');
  if (teeth) {
    var fill = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        setTimeout(function () { teeth.classList.add('is-filled'); }, 450);
        fill.unobserve(entry.target);
      });
    }, { threshold: 0.45 });
    fill.observe(teeth);
  }
})();
