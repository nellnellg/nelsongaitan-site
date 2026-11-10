/* Self-contained sample walkthrough. No API calls or storage. */
(function () {
  var demo = document.querySelector('[data-fk-demo]');
  if (!demo) return;
  var panels = demo.querySelectorAll('[data-fk-panel]');
  var steps = demo.querySelectorAll('.fk-steps li');
  var live = demo.querySelector('[data-fk-live]');
  var hours = demo.querySelector('[name="hours"]');
  var need = demo.querySelector('[name="need"]');
  var action = demo.querySelector('[data-fk-action]');
  var status = demo.querySelector('[data-fk-status]');
  var complete = demo.querySelector('[data-fk-complete]');
  var error = demo.querySelector('[data-fk-error]');
  var acknowledged = false;
  function show(step, message, focus) {
    panels.forEach(function (panel, index) { panel.hidden = index !== step; });
    steps.forEach(function (item, index) {
      item.classList.toggle('fk-done', index < step);
      if (index === step) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    live.textContent = message;
    if (focus) panels[step].querySelector('h3').focus({preventScroll:true});
  }
  demo.querySelector('[data-fk-form]').addEventListener('submit', function (event) {
    event.preventDefault();
    var label = hours.value + (hours.value === '1' ? ' hour' : ' hours');
    demo.querySelector('[data-fk-hours]').textContent = label;
    demo.querySelector('[data-fk-total]').textContent = label;
    show(1, 'Step 2 of 3. Review the sample suggestion against Maya’s original message.', true);
  });
  demo.querySelector('[data-fk-back]').addEventListener('click', function () { show(0, 'Step 1 of 3. You can change Maya’s time.', true); });
  demo.querySelector('[data-fk-confirm]').addEventListener('click', function () {
    if (!need.value.trim()) { error.hidden = false; need.focus(); return; }
    error.hidden = true;
    demo.querySelector('[data-fk-need]').textContent = need.value.trim();
    show(2, 'Step 3 of 3. Hours confirmed. The supplies request is waiting for acknowledgment.', true);
  });
  action.addEventListener('click', function () {
    if (!acknowledged) {
      acknowledged = true;
      status.textContent = 'Acknowledged';
      action.textContent = 'Confirm supplies delivered';
      demo.querySelector('[data-fk-instruction]').textContent = 'Staff have accepted the request. Confirm resolution only after the supplies arrive.';
      live.textContent = 'The request is acknowledged. It is still open until delivery is confirmed.';
    } else {
      status.textContent = 'Resolved';
      status.classList.add('fk-resolved');
      demo.querySelector('[data-fk-instruction]').textContent = 'Staff confirmed the supplies arrived.';
      action.hidden = true;
      complete.hidden = false;
      live.textContent = 'Walkthrough complete. One update, confirmed volunteer time and a resolved request.';
    }
  });
  demo.querySelector('[data-fk-reset]').addEventListener('click', function () {
    hours.value = '1'; need.value = 'Diapers'; acknowledged = false;
    status.textContent = 'Received'; status.classList.remove('fk-resolved');
    action.hidden = false; action.textContent = 'Acknowledge request';
    complete.hidden = true; error.hidden = true;
    demo.querySelector('[data-fk-instruction]').textContent = 'Let the coordinator know someone is handling this.';
    show(0, 'Step 1 of 3. Send Maya’s sample update.', true);
  });
})();
