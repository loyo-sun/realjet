(() => {
  const root = document.querySelector('[data-lab-page]');
  if (!root) return;
  const emit = (name, data = {}) => window.gtag?.('event', name, {
    page_path: location.pathname, page_type: 'concrete-lab', lab_page_id: root.dataset.labPage, ...data,
  });
  const dialog = document.querySelector('[data-lab-dialog]');
  let previousFocus;
  root.querySelectorAll('[data-lab-image]').forEach((link) => link.addEventListener('click', (event) => {
    if (!dialog?.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); previousFocus = link;
    dialog.querySelector('img').src = link.href;
    dialog.querySelector('img').alt = link.dataset.imageAlt;
    dialog.querySelector('p').textContent = link.dataset.imageAlt;
    dialog.showModal();
  }));
  const closeImage = () => dialog?.close();
  dialog?.querySelector('[data-lab-dialog-close]').addEventListener('click', closeImage);
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeImage(); } });
  dialog?.addEventListener('close', () => previousFocus?.focus());

  const calculator = root.querySelector('[data-lab-calculator]');
  calculator?.addEventListener('submit', (event) => {
    event.preventDefault(); if (!calculator.reportValidity()) return;
    const daily = Number(calculator.elements.daily.value), days = Number(calculator.elements.days.value), size = Number(calculator.elements.size.value);
    if (![daily, days, size].every((value) => Number.isInteger(value) && value > 0)) return;
    const groups = daily * days, specimens = groups * size;
    const output = calculator.querySelector('[data-lab-capacity]');
    output.querySelector('strong').textContent = `${groups.toLocaleString('en-US')} groups`;
    output.querySelector('span').textContent = `${specimens.toLocaleString('en-US')} individual specimens before peak, reserve and access allowances.`;
    emit('lab_capacity_calculated');
  });

  const form = root.querySelector('[data-lab-form]');
  if (!form) return;
  const shell = form.closest('[data-lab-form-shell]'), fieldset = form.querySelector('fieldset');
  const error = form.querySelector('[data-lab-error]'), success = shell.querySelector('[data-lab-success]');
  const button = form.querySelector('[type="submit"]'), buttonMarkup = button.innerHTML;
  const params = new URLSearchParams(location.search), requestedModule = params.get('module');
  const moduleField = form.elements.namedItem('module');
  if (requestedModule && [...moduleField.options].some((option) => option.value === requestedModule)) moduleField.value = requestedModule;
  const topic = requestedModule?.slice(0, 180) || 'Concrete Laboratory Automation';
  let started = false, sending = false, succeeded = false;
  const context = { form_id: 'universal-enquiry', cta_id: 'concrete_lab_project_form' };
  form.addEventListener('focusin', () => { if (!started) { started = true; emit('lead_form_start', context); } });
  form.addEventListener('invalid', (event) => emit('lead_form_validation_error', { ...context, field_name: event.target.name }), true);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || succeeded || !form.reportValidity() || form.elements.namedItem('bot-field').value) return;
    const value = (name) => String(form.elements.namedItem(name)?.value || '').trim();
    const message = [value('message'), '', `Company: ${value('company')}`, `Project country: ${value('country')}`, `Requested module: ${value('module')}`, `Specimens: ${value('specimen')}`, `Individual specimens per day: ${value('daily_specimens') || 'Not specified'}`, `Enquiry page: ${location.origin}${location.pathname}`, `Entry topic: ${topic}`].join('\n');
    // Keep the shared Netlify schema: extra engineering details belong in message.
    const body = new URLSearchParams({ 'form-name': 'universal-enquiry', keyword: 'Concrete Laboratory Automation', subject: `Website enquiry: ${value('module')}`, name: value('name'), email: value('email'), message, 'bot-field': '', privacy_consent: 'accepted' }).toString();
    sending = true; error.hidden = true; fieldset.disabled = true; form.setAttribute('aria-busy', 'true'); button.textContent = 'Sending…';
    emit('lead_form_submit_attempt', context);
    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!response.ok) throw new Error('Submission failed');
      succeeded = true;
      window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'realjet_lead_success' });
      emit('generate_lead', { ...context, inquiry_topic: 'Concrete Laboratory Automation', lead_source: 'website_form' });
      form.hidden = true; success.hidden = false; success.focus();
    } catch {
      error.hidden = false; sending = false; fieldset.disabled = false; button.innerHTML = buttonMarkup;
      emit('lead_form_submit_error', { ...context, error_type: 'submission_failed' });
    } finally { form.removeAttribute('aria-busy'); }
  });
  window.addEventListener('pagehide', () => { if (started && !succeeded) emit('lead_form_abandon', context); });
})();
