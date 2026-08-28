// Переключатель RU / KZ. Текст элемента берётся из data-ru и data-kk.
// data-attr="placeholder" — переводить атрибут, а не текст.
// data-html="1" — значение содержит разметку.
(function () {
  var KEY = 'aigabulov-lang';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  function apply(next) {
    document.documentElement.lang = next;
    document.querySelectorAll('[data-ru]').forEach(function (el) {
      var value = el.getAttribute('data-' + next);
      if (value === null) return;
      if (el.hasAttribute('data-attr')) el.setAttribute(el.getAttribute('data-attr'), value);
      else if (el.hasAttribute('data-html')) el.innerHTML = value;
      else el.textContent = value;
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === next));
    });
    try { localStorage.setItem(KEY, next); } catch (e) {}
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.lang button');
    if (b) apply(b.dataset.lang);
  });

  apply(saved === 'kk' ? 'kk' : 'ru');
})();
