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

  const form = root.querySelector('[data-ppvc-form]');
  root.querySelector('[data-ppvc-start]').addEventListener('click', () => {
    form.elements.scope.value = document.getElementById('ppvc-quick-scope').value;
    form.elements.dimensions.value = document.getElementById('ppvc-quick-size').value;
  });
  const query = new URLSearchParams(location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'gclid'].forEach((key) => {
    form.elements[key].value = (query.get(key) || '').slice(0, 500);
  });
  const upload = form.elements.drawing;
  function validateFile() {
    const file = upload.files[0];
    let error = '';
    if (file && !/\.(pdf|dwg|zip)$/i.test(file.name)) error = 'Please choose a PDF, DWG or ZIP file.';
    if (file && file.size > 7 * 1024 * 1024) error = 'This file exceeds 7 MB. Please use the drawing download link field for larger files.';
    upload.setCustomValidity(error);
    return !error;
  }
  upload.addEventListener('change', () => { validateFile(); upload.reportValidity(); });
  let sending = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || !validateFile() || !form.reportValidity()) return;
    const error = form.querySelector('[data-ppvc-error]');
    const status = form.querySelector('[data-ppvc-status]');
    const button = form.querySelector('[type="submit"]');
    if (form.elements['bot-field'].value) return;
    const body = new FormData(form);
    if (!upload.files.length) body.delete('drawing');
    sending = true; button.disabled = true; form.setAttribute('aria-busy', 'true');
    error.hidden = true; status.textContent = 'Sending your project enquiry…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35000);
    try {
      const response = await fetch('/', { method: 'POST', body, signal: controller.signal });
      if (!response.ok) throw new Error('Submission rejected');
      status.textContent = 'Your enquiry has been received. Opening confirmation…';
      let navigated = false;
      const go = () => { if (!navigated) { navigated = true; location.assign(form.action); } };
      // Only server-accepted submissions emit the lead event. No personal data enters analytics.
      emit('submit_plant_lead', { form_name: 'ppvc-plant-lead', event_callback: go, event_timeout: 1200 });
      setTimeout(go, 1300);
    } catch {
      error.textContent = 'We could not confirm submission. Please try again or email sales@realjetech.com. Your entered details have been kept.';
      error.hidden = false; status.textContent = ''; sending = false; button.disabled = false;
      error.tabIndex = -1; error.focus();
    } finally {
      clearTimeout(timeout); form.removeAttribute('aria-busy');
    }
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
