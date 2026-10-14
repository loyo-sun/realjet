(() => {
  const panel = document.querySelector('[data-pc-email-panel]');
  const lines = document.querySelector('#production-lines');
  if (!panel || !lines) return;
  const form = panel.querySelector('form');
  const email = form.elements.email;
  const fieldset = form.querySelector('fieldset');
  const submit = form.querySelector('[type="submit"]');
  const close = panel.querySelector('[data-pc-email-close]');
  const error = panel.querySelector('[data-pc-email-error]');
  const success = panel.querySelector('[data-pc-email-success]');
  const announcement = document.querySelector('[data-pc-email-announcement]');
  const main = document.querySelector('[data-pc-form]');
  const key = 'realjet_pc_scroll_email_shown_v1';
  const submitLabel = submit.textContent;
  let seenLines = false;
  let shown = false;
  let engaged = false;
  let sending = false;
  let submitted = false;
  let previousY = window.scrollY;
  let priorFocus;
  let framePending = false;
  try { shown = sessionStorage.getItem(key) === '1'; } catch { /* One prompt per page if storage is unavailable. */ }

  function position() {
    if (panel.hidden) return;
    const viewport = window.visualViewport;
    const keyboard = viewport && window.innerHeight - viewport.height > 160
      ? window.innerHeight - viewport.height - viewport.offsetTop : 0;
    const notice = document.querySelector('.analytics-consent-panel');
    const consentHeight = notice ? Math.max(0, window.innerHeight - notice.getBoundingClientRect().top) : 0;
    const bottom = Math.max(16, keyboard + 12, consentHeight + 12);
    const headerHeight = document.querySelector('.pc-header').getBoundingClientRect().height;
    panel.style.bottom = `${bottom}px`;
    panel.style.maxHeight = `${Math.max(180, window.innerHeight - bottom - headerHeight - 16)}px`;
  }
  function hide() {
    panel.hidden = true;
    document.body.classList.remove('pc-email-open');
    announcement.textContent = '';
    if (panel.contains(document.activeElement)) priorFocus?.focus?.({ preventScroll: true });
  }
  function show() {
    shown = true;
    try { sessionStorage.setItem(key, '1'); } catch { /* Never store the visitor's email. */ }
    priorFocus = document.activeElement;
    panel.hidden = false;
    document.body.classList.add('pc-email-open');
    position();
    // Announce the offer without moving focus or opening the mobile keyboard.
    announcement.textContent = 'Leave your email for the complete precast plant solution. An email form is now available.';
  }
  function check() {
    const y = window.scrollY;
    const down = y > previousY;
    previousY = y;
    if (shown || engaged || main?.hidden) return;
    const header = document.querySelector('.pc-header').getBoundingClientRect().height;
    const rect = lines.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > header) seenLines = true;
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '');
    if (seenLines && down && rect.bottom <= header && !typing) show();
  }
  window.addEventListener('scroll', () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(() => { framePending = false; check(); });
  }, { passive: true });
  window.addEventListener('resize', position);
  window.visualViewport?.addEventListener('resize', position);
  window.visualViewport?.addEventListener('scroll', position);
  new MutationObserver(position).observe(document.body, { childList: true });
  function engage() { engaged = true; if (!sending) hide(); }
  main?.addEventListener('input', engage, { once: true });
  main?.addEventListener('submit', engage, { once: true });
  document.addEventListener('click', event => {
    if (event.target.closest('a[href="#plant-proposal"]')) engage();
  });
  close.addEventListener('click', () => { if (!sending) hide(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden && !sending) { event.preventDefault(); hide(); }
  });
  email.addEventListener('input', () => {
    email.removeAttribute('aria-invalid');
    error.hidden = true;
  });
  email.addEventListener('invalid', () => {
    email.setAttribute('aria-invalid', 'true');
    error.textContent = 'Enter a valid email address, such as name@company.com.';
    error.hidden = false;
  });
  function trackReceipt(id) {
    let allowed = false;
    try { allowed = ['all', 'analytics'].includes(localStorage.getItem('realjet_consent_v2')); } catch { /* Optional analytics only. */ }
    if (!allowed || typeof window.trackEvent !== 'function') return;
    const parameters = { page_type: 'building_precast_plant', locale: 'en', lead_id: id, lead_source: 'building_precast_plant_scroll_email' };
    window.trackEvent('enquiry_success', { ...parameters, variant: 'scroll_email', need_type: 'Complete solution' });
    window.trackEvent('generate_lead', parameters);
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || submitted || !form.reportValidity()) return;
    if (!form.elements.submission_id.value) form.elements.submission_id.value = crypto.randomUUID();
    const payload = new FormData(form);
    sending = true;
    fieldset.disabled = true;
    close.disabled = true;
    error.hidden = true;
    form.setAttribute('aria-busy', 'true');
    submit.textContent = 'Sending…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      if (['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) || location.protocol === 'file:') throw new Error('local_preview');
      const response = await fetch('/', {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(), signal: controller.signal,
      });
      if (!response.ok) throw new Error('server_error');
      submitted = true;
      form.hidden = true;
      success.hidden = false;
      success.focus({ preventScroll: true });
      trackReceipt(payload.get('submission_id'));
    } catch (failure) {
      fieldset.disabled = false;
      submit.textContent = submitLabel;
      error.textContent = failure.message === 'local_preview'
        ? 'This local preview does not send enquiries. Your email is still here.'
        : 'We could not confirm receipt. Your email is still here. Please try again.';
      error.hidden = false;
    } finally {
      clearTimeout(timeout);
      sending = false;
      close.disabled = false;
      form.removeAttribute('aria-busy');
      position();
    }
  });
  check();
})();
