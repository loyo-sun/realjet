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

  const dialog = root.querySelector('.ppvc-demo');
  const titles = ['Rebar & utilities', 'Hydraulic casting', 'Controlled curing', 'Demould & transfer', 'Fit-out & MEP'];
  const copy = [
    'Prepare the spatial cage and position embedded services before casting.',
    'Close the exterior mould, position the shrinking core and cast the concrete module.',
    'Follow the validated heating, holding and cooling schedule. Verify release strength.',
    'Retract the core, synchronize the lift and transfer the module to the next bay.',
    'Complete internal fit-out, PBU docking and MEP checks before final inspection.',
  ];
  let step = 0, timer, trigger;
  const play = root.querySelector('[data-demo-play]');
  const stop = () => { clearInterval(timer); timer = null; play.textContent = 'Play walkthrough'; };
  const show = (index) => {
    step = index;
    root.querySelector('[data-demo-number]').textContent = String(index + 1).padStart(2, '0');
    root.querySelector('[data-demo-title]').textContent = titles[index];
    root.querySelector('[data-demo-copy]').textContent = copy[index];
    root.querySelectorAll('[data-demo-step]').forEach((button, i) => {
      if (i === index) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current');
    });
  };
  root.querySelectorAll('[data-open-ppvc-demo]').forEach((button) => button.addEventListener('click', () => {
    trigger = button; show(0); dialog.showModal();
    emit('open_video_demo', { demo_type: 'schematic_walkthrough' });
  }));
  root.querySelector('.ppvc-demo-close').addEventListener('click', () => dialog.close());
  root.querySelector('[data-demo-enquire]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { stop(); trigger?.focus(); });
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  root.querySelectorAll('[data-demo-step]').forEach((button) => button.addEventListener('click', () => { stop(); show(Number(button.dataset.demoStep)); }));
  play.addEventListener('click', () => {
    if (timer) return stop();
    play.textContent = 'Pause walkthrough';
    timer = setInterval(() => { if (step === 4) return stop(); show(step + 1); }, 3500);
    if (step === 4) show(0);
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
})();
