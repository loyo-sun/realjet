(() => {
  const root = document.querySelector('.ppvc-page');
  if (!root) return;
  const emit = (name, extra = {}) => window.gtag?.('event', name, {
    page_path: location.pathname, page_type: 'ppvc-line', ...extra,
  });
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const selectTab = (index, focus = false) => {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(next, true); }
    });
  });
  const specs = document.getElementById('technical-specs');
  let specTimer, specsVisible = false, specTracked = false;
  const updateSpecTimer = () => {
    clearTimeout(specTimer);
    if (specsVisible && !document.hidden && !specTracked) {
      specTimer = setTimeout(() => { specTracked = true; emit('view_technical_specs'); }, 5000);
    }
  };
  const observer = new IntersectionObserver(([entry]) => {
    specsVisible = entry.isIntersecting;
    updateSpecTimer();
  }, { rootMargin: '-135px 0px 0px 0px', threshold: 0.15 });
  observer.observe(specs.querySelector('.ppvc-table-scroll'));
  document.addEventListener('visibilitychange', updateSpecTimer);

  root.querySelectorAll('[data-ppvc-form]').forEach((form) => {
    const shell = form.closest('[data-ppvc-enquiry]');
    const fieldset = form.querySelector('fieldset');
    const error = form.querySelector('[data-ppvc-error]');
    const button = form.querySelector('[type="submit"]');
    const success = shell.querySelector('[data-ppvc-success]');
    const context = { form_id: 'universal-enquiry', cta_id: `ppvc_${form.dataset.enquiryPosition}_form`, inquiry_topic: 'PPVC / MiC Production Line' };
    let sending = false, started = false, succeeded = false;
    form.addEventListener('focusin', () => {
      if (!started) { started = true; emit('lead_form_start', context); }
    });
    form.addEventListener('invalid', (event) => emit('lead_form_validation_error', { ...context, field_name: event.target.name }), true);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (sending || !form.reportValidity() || form.elements['bot-field'].value) return;
      // Use Realjet's standard form schema and endpoint for both inline forms.
      const body = new URLSearchParams(new FormData(form)).toString();
      sending = true; fieldset.disabled = true; form.setAttribute('aria-busy', 'true');
      error.hidden = true; button.textContent = 'Sending…';
      emit('lead_form_submit_attempt', context);
      try {
        const response = await fetch('/', {
          method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body,
        });
        if (!response.ok) throw new Error('Submission failed');
        succeeded = true;
        emit('generate_lead', { ...context, lead_source: 'website_form' });
        form.hidden = true; success.hidden = false; success.focus();
      } catch {
        error.hidden = false; sending = false; fieldset.disabled = false;
        button.innerHTML = 'Send Enquiry <span aria-hidden="true">→</span>';
        emit('lead_form_submit_error', { ...context, error_type: 'submission_failed' });
      } finally {
        form.removeAttribute('aria-busy');
      }
    });
    window.addEventListener('pagehide', () => {
      if (started && !succeeded) emit('lead_form_abandon', context);
    });
  });
})();
