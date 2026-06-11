/* NOXA — interaction layer */

/* ── Email signup form ───────────────────────────────────────────────── */
(function () {
  var form = document.querySelector('.signup');
  if (!form) return;

  var input   = form.querySelector('input[type="email"]');
  var row     = form.querySelector('.signup__row');
  var error   = form.querySelector('.signup__error');
  var success = form.querySelector('.signup__success');

  function showError(msg) {
    error.textContent   = msg;
    success.textContent = '';
    row.classList.add('signup__row--error');
    input.setAttribute('aria-invalid', 'true');
  }

  function showSuccess() {
    success.textContent = 'You\'re in — stay tuned.';
    error.textContent   = '';
    row.classList.remove('signup__row--error');
    input.removeAttribute('aria-invalid');
    input.value         = '';
    // Reset after 5 s so the form is reusable
    setTimeout(function () { success.textContent = ''; }, 5000);
  }

  function clearState() {
    error.textContent   = '';
    row.classList.remove('signup__row--error');
    input.removeAttribute('aria-invalid');
  }

  // Clear error as the user types
  input.addEventListener('input', clearState);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var val = input.value.trim();
    if (!val) {
      showError('Enter your email address.');
      input.focus();
      return;
    }
    // Simple RFC-ish check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      showError('That doesn\'t look like a valid email.');
      input.focus();
      return;
    }
    showSuccess();
  });
})();

/* ── Burger menu aria-expanded ───────────────────────────────────────── */
(function () {
  var burger = document.querySelector('.round-button[aria-expanded]');
  if (!burger) return;
  burger.addEventListener('click', function () {
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
  });
})();
