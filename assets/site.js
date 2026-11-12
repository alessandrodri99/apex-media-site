(function () {
  var email = 'alessandrodri99@gmail.com';
  function mail(subject, body) {
    return 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body || '');
  }

  // Header background after scrolling a little
  var header = document.querySelector('.header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 32); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var menu = document.querySelector('.menu');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.textContent = open ? 'Close' : 'Menu';
  }
  menu.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menu.focus(); }
  });

  // Feedback email
  var fb = document.getElementById('feedback-link');
  if (fb) fb.href = mail('My Apex Media experience', 'Name:\nBusiness:\nMy experience with Apex Media:\n\nMay Apex Media contact me about featuring my feedback? ');

  // Contact form opens a prepared email
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var lines = [];
    d.forEach(function (v, k) { lines.push(k + ': ' + v); });
    window.location.href = mail('Apex Media project inquiry', lines.join('\n\n'));
    note.textContent = 'We requested an email draft. If your email app opened, send it there; otherwise, call us using the link alongside this form.';
  });

  // Case study: copy phone number
  var copy = document.getElementById('cs-copy');
  var out = document.getElementById('cs-copied');
  var num = '(504) 315-8092';
  function selectNumber() {
    var r = document.createRange();
    r.selectNodeContents(document.getElementById('cs-phone'));
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    out.textContent = 'Number selected. Copy it from your menu.';
  }
  if (copy) copy.addEventListener('click', function () {
    try {
      navigator.clipboard.writeText(num).then(function () { out.textContent = 'Number copied.'; }, selectNumber);
    } catch (err) { selectNumber(); }
  });
})();
