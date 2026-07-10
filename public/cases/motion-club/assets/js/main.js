/* ============================================================================
   MINGLEE — progressive enhancement. Vanilla JS, no dependencies.
   Everything here is optional polish; the page works without it.
   ============================================================================ */
(function () {
  'use strict';

  /* ---- Sticky header condense ----------------------------------------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile navigation ---------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    var closeTimer;
    var setNav = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      window.clearTimeout(closeTimer);
      if (open) {
        mobileNav.hidden = false;
        window.requestAnimationFrame(function () { mobileNav.classList.add('is-open'); });
      } else {
        mobileNav.classList.remove('is-open');
        closeTimer = window.setTimeout(function () {
          if (toggle.getAttribute('aria-expanded') !== 'true') mobileNav.hidden = true;
        }, 360);
      }
      toggle.querySelector('.visually-hidden').textContent = open ? 'Закрыть меню' : 'Открыть меню';
    };
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
    var mq = window.matchMedia('(min-width: 981px)');
    mq.addEventListener('change', function (e) { if (e.matches) setNav(false); });
  }

  /* ---- Results carousel (native scroll-snap + dots/arrows) ------------ */
  var viewport = document.querySelector('[data-results-viewport]');
  var track = document.querySelector('[data-results-track]');
  var dotsBox = document.querySelector('[data-results-dots]');
  var prevBtn = document.querySelector('[data-results-prev]');
  var nextBtn = document.querySelector('[data-results-next]');

  if (viewport && track && track.children.length) {
    var cards = Array.prototype.slice.call(track.children);
    var step = 0, perView = 1, pages = 1;

    var measure = function () {
      step = cards.length > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : cards[0].offsetWidth;
      perView = Math.max(1, Math.round(viewport.clientWidth / step));
      pages = Math.max(1, Math.ceil(cards.length / perView));
    };

    var currentPage = function () {
      return step ? Math.round(viewport.scrollLeft / (step * perView)) : 0;
    };

    var buildDots = function () {
      if (!dotsBox) return;
      dotsBox.innerHTML = '';
      for (var i = 0; i < pages; i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Показать истории ' + (i + 1));
        b.dataset.page = i;
        dotsBox.appendChild(b);
      }
    };

    var syncControls = function () {
      var p = currentPage();
      if (dotsBox) {
        Array.prototype.forEach.call(dotsBox.children, function (d, i) {
          d.setAttribute('aria-selected', String(i === p));
        });
      }
      var atStart = viewport.scrollLeft <= 2;
      var atEnd = viewport.scrollLeft + viewport.clientWidth >= track.scrollWidth - 2;
      if (prevBtn) prevBtn.disabled = atStart;
      if (nextBtn) nextBtn.disabled = atEnd;
    };

    var goTo = function (page) {
      page = Math.max(0, Math.min(pages - 1, page));
      viewport.scrollTo({ left: page * perView * step, behavior: 'smooth' });
    };

    if (dotsBox) {
      dotsBox.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-page]');
        if (btn) goTo(parseInt(btn.dataset.page, 10));
      });
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentPage() - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentPage() + 1); });

    var rafId;
    viewport.addEventListener('scroll', function () {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(syncControls);
    }, { passive: true });

    var rebuild = function () { measure(); buildDots(); syncControls(); };
    rebuild();
    var resizeTimer;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(rebuild, 150);
    });
  }

  /* ---- Contact form stub (no backend; replaced by Contact Form 7) ------ */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var success = form.querySelector('[data-form-success]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (input) {
        var field = input.closest('.field');
        var valid = input.value.trim() !== '';
        if (field) field.classList.toggle('field--error', !valid);
        if (!valid && ok) { input.focus(); ok = false; }
      });
      if (!ok) return;
      if (success) {
        success.hidden = false;
        success.setAttribute('role', 'status');
      }
      form.querySelectorAll('input, textarea').forEach(function (i) { i.value = ''; });
    });
    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field) field.classList.remove('field--error');
    });
  }
})();
