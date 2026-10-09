// Small interactions for the instruments theme. Everything works without this file.
(function () {
  var EMAIL = 'nelsongaitan.design@gmail.com';

  // Live Miami time on every LCD that asks for it
  function miamiTime() {
    try {
      return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' });
    } catch (e) { return ''; }
  }
  function tick() {
    var t = miamiTime();
    document.querySelectorAll('[data-miami-time]').forEach(function (el) { el.textContent = t; });
  }
  tick();
  setInterval(tick, 30000);

  // Open to new roles toggle
  document.querySelectorAll('[data-toggle-open]').forEach(function (btn) {
    var label = btn.querySelector('[data-toggle-label]');
    var led = btn.querySelector('.led');
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (label) label.textContent = on ? 'Open to new roles' : 'Not looking';
      if (led) led.classList.toggle('led--on', on);
    });
  });

  // Copy email
  document.querySelectorAll('[data-copy-email]').forEach(function (btn) {
    var status = document.querySelector('[data-copy-status]');
    var resetTimer = null;
    function show(text) {
      if (!status) return;
      status.textContent = text;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () { status.innerHTML = 'Ready · <span data-miami-time>' + miamiTime() + '</span>'; }, 2500);
    }
    btn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(function () { show('Copied to clipboard ✓'); }, function () { show('Select the text to copy'); });
      } else {
        show('Select the text to copy');
      }
    });
  });
})();
