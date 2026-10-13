(() => {
  const form = document.querySelector('[data-pc-form]');
  if (!form) return;
  const menuButton = document.querySelector('[data-pc-menu]');
  const navigation = document.querySelector('#pc-navigation');
  const bar = document.querySelector('.pc-mobile-actions');
  const proposal = document.querySelector('#plant-proposal');
  let formVisible = false;
  let started = false;
  let sending = false;
  let succeeded = false;
  let submissionId = '';

  // This page emits only controlled category values and a random submission ID.
  // Contact details, technical notes and drawings never enter analytics.
  function track(name, parameters = {}) {
    let allowed = false;
    try { allowed = ['all', 'analytics'].includes(localStorage.getItem('realjet_consent_v2')); } catch { /* Forms remain usable without storage. */ }
    if (!allowed) return;
    if (typeof window.trackEvent === 'function') {
      window.trackEvent(name, { page_type: 'building_precast_plant', locale: 'en', ...parameters });
    }
  }

  function setMenu(open) {
    navigation.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { setMenu(false); menuButton.focus(); }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.pc-header')) setMenu(false);
  });
  window.matchMedia('(min-width: 851px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

  function updateBar() {
    const focused = form.contains(document.activeElement) && /^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement?.tagName || '');
    const keyboardOpen = window.visualViewport && window.innerHeight - window.visualViewport.height > 160;
    bar.classList.toggle('is-hidden', formVisible || focused || keyboardOpen);
    document.body.classList.toggle('pc-form-in-view', formVisible || Boolean(keyboardOpen));
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { formVisible = entries[0].isIntersecting; updateBar(); }).observe(proposal);
  }
  document.addEventListener('focusin', updateBar);
  document.addEventListener('focusout', () => requestAnimationFrame(updateBar));
  window.visualViewport?.addEventListener('resize', updateBar);

  for (const cta of document.querySelectorAll('[data-pc-cta], [data-pc-line], [data-pc-need], [data-pc-interest]')) {
    cta.addEventListener('click', () => {
      if (cta.dataset.pcLine) {
        form.elements.line_interest.value = cta.dataset.pcLine;
        track('line_select', { line_type: cta.dataset.pcLine });
      }
      if (cta.dataset.pcNeed) form.elements.project_need.value = cta.dataset.pcNeed;
      if (cta.dataset.pcInterest) form.elements.line_interest.value = cta.dataset.pcInterest;
      track('cta_click', { cta_id: cta.dataset.pcCta || 'configuration', line_interest: form.elements.line_interest.value || 'unspecified' });
    });
  }

  const emailGroup = form.querySelector('[data-pc-email]');
  const phoneGroup = form.querySelector('[data-pc-phone]');
  const email = form.elements.email;
  const phone = form.elements.whatsapp;
  function updateChannel() {
    const isEmail = form.elements.contact_channel.value === 'email';
    emailGroup.hidden = !isEmail;
    phoneGroup.hidden = isEmail;
    email.required = isEmail;
    email.disabled = !isEmail;
    phone.required = !isEmail;
    phone.disabled = isEmail;
    for (const input of [email, phone]) clearError(input);
  }
  for (const radio of form.querySelectorAll('[name="contact_channel"]')) radio.addEventListener('change', updateChannel);
  updateChannel();

  function start() {
    if (started) return;
    started = true;
    track('form_start', { form_id: 'building_precast_plant' });
  }
  form.addEventListener('input', start, { once: true });
  form.addEventListener('change', start, { once: true });

  function clearError(input) {
    input.classList.remove('pc-invalid');
    input.removeAttribute('aria-invalid');
    const id = `${input.id}-error`;
    document.getElementById(id)?.remove();
    if (input.getAttribute('aria-describedby') === id) input.removeAttribute('aria-describedby');
  }
  function showError(input) {
    clearError(input);
    const error = document.createElement('span');
    error.id = `${input.id}-error`;
    error.className = 'pc-field-error';
    error.textContent = input.validity.typeMismatch && input.type === 'email'
      ? 'Enter a valid email address, such as name@company.com.'
      : input.type === 'checkbox' ? 'Please confirm how we may use your enquiry details.'
      : input.validity.valueMissing ? 'Please complete this field.' : input.validationMessage;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', error.id);
    input.classList.add('pc-invalid');
    input.parentElement.append(error);
  }
  form.addEventListener('invalid', event => {
    showError(event.target);
    track('form_error', { error_code: 'validation', field_name: event.target.name });
  }, true);
  form.addEventListener('input', event => {
    if (event.target.matches('input,select,textarea') && event.target.validity.valid) clearError(event.target);
  });

  const fieldset = form.querySelector('fieldset');
  const submit = form.querySelector('[data-pc-submit]');
  const errorMessage = form.querySelector('[data-pc-error]');
  const success = document.querySelector('[data-pc-success]');
  const submitMarkup = submit.innerHTML;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || succeeded) return;
    start();
    if (!form.reportValidity()) return;
    if (!submissionId) submissionId = crypto.randomUUID();
    form.elements.submission_id.value = submissionId;
    const payload = new FormData(form);
    const labels = [
      ['country', 'Project country'], ['project_need', 'Project need'], ['product_type', 'Product type'],
      ['line_interest', 'Line interest'], ['company', 'Company'], ['contact_channel', 'Contact channel'],
      ['whatsapp', 'WhatsApp'], ['target_output', 'Target output'], ['output_unit', 'Output unit'],
      ['shifts', 'Shifts'], ['element_weight', 'Element weight'], ['element_dimensions', 'Element dimensions'],
      ['building_dimensions', 'Building dimensions'], ['project_stage', 'Project stage'],
      ['timeline', 'Timeline'], ['project_notes', 'Project notes'],
    ];
    payload.set('message', ['Building precast plant: walls and floor slabs', ...labels.map(([key, label]) => payload.get(key) ? `${label}: ${payload.get(key)}` : '').filter(Boolean)].join('\n'));
    errorMessage.hidden = true;
    sending = true;
    fieldset.disabled = true;
    form.setAttribute('aria-busy', 'true');
    submit.textContent = 'Sending your enquiry…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      // Netlify handles this site's existing universal-enquiry registration and notifications.
      // Never treat the local static preview's HTML response as a successful form receipt.
      if (['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) || location.protocol === 'file:') {
        throw new Error('local_preview');
      }
      const response = await fetch('/', {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(), signal: controller.signal,
      });
      if (!response.ok) throw new Error('server_error');
      succeeded = true;
      track('enquiry_success', { lead_id: submissionId, need_type: payload.get('project_need'), product_type: payload.get('product_type'), variant: 'plant_v1' });
      track('generate_lead', { lead_id: submissionId, lead_source: 'building_precast_plant' });
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      fieldset.disabled = false;
      updateChannel();
      form.removeAttribute('aria-busy');
      submit.innerHTML = submitMarkup;
      errorMessage.hidden = false;
      if (error.message === 'local_preview') errorMessage.innerHTML = 'This local preview does not send enquiries. Your information is still here. You can contact <a href="mailto:sales@realjetech.com">sales@realjetech.com</a> directly.';
      errorMessage.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      track('form_error', { error_code: error.name === 'AbortError' ? 'timeout' : 'submission_failed' });
    } finally { clearTimeout(timeout); sending = false; }
  });
  track('lp_view', { variant: 'plant_v1' });
})();
