(() => {
  const carousel = document.querySelector('[data-pc-cases]');
  if (!carousel) return;
  const track = carousel.querySelector('[data-pc-case-track]');
  const cards = [...track.children];
  const previous = carousel.querySelector('[data-pc-case-prev]');
  const next = carousel.querySelector('[data-pc-case-next]');
  const pause = carousel.querySelector('[data-pc-case-pause]');
  const progress = carousel.querySelector('[data-pc-case-progress]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let visible = false;
  let hovered = false;
  let timer;
  let allowFocusedPlayback = false;

  function metrics() {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = cards[0].getBoundingClientRect().width + gap;
    const maximum = Math.max(0, Math.ceil((track.scrollWidth - track.clientWidth) / step - 0.001));
    return {
      step, maximum,
      index: Math.min(maximum, Math.max(0, Math.round(track.scrollLeft / step))),
      count: Math.max(1, Math.floor((track.clientWidth + gap + 1) / step)),
    };
  }
  function update() {
    const { index, count } = metrics();
    progress.textContent = `${index + 1}–${Math.min(cards.length, index + count)} of ${cards.length}`;
    pause.textContent = paused ? 'Play' : 'Pause';
    pause.setAttribute('aria-label', paused ? 'Play automatic project slideshow' : 'Pause automatic project slideshow');
    pause.hidden = reduced.matches;
  }
  function stop() { clearTimeout(timer); }
  function schedule() {
    stop();
    if (paused || !visible || hovered || document.hidden || reduced.matches || (carousel.contains(document.activeElement) && !allowFocusedPlayback)) return;
    timer = setTimeout(() => {
      move(1);
      schedule();
    }, 5000);
  }
  function move(direction) {
    const { index, step, maximum } = metrics();
    let target = index + direction;
    if (target > maximum) target = 0;
    if (target < 0) target = maximum;
    track.scrollTo({ left: target * step, behavior: reduced.matches ? 'instant' : 'smooth' });
  }
  function stopForInteraction() {
    paused = true;
    stop();
    update();
  }
  previous.addEventListener('click', () => { stopForInteraction(); move(-1); });
  next.addEventListener('click', () => { stopForInteraction(); move(1); });
  pause.addEventListener('click', () => { paused = !paused; allowFocusedPlayback = !paused; update(); schedule(); });
  track.addEventListener('scroll', update, { passive: true });
  track.addEventListener('pointerdown', stopForInteraction, { passive: true });
  track.addEventListener('wheel', event => { if (Math.abs(event.deltaX) > 0) stopForInteraction(); }, { passive: true });
  track.addEventListener('keydown', event => {
    if (event.target.closest('button, a')) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    stopForInteraction();
    if (event.key === 'Home' || event.key === 'End') {
      const { maximum, step } = metrics();
      track.scrollTo({ left: event.key === 'Home' ? 0 : maximum * step, behavior: reduced.matches ? 'instant' : 'smooth' });
    } else move(event.key === 'ArrowRight' ? 1 : -1);
  });
  carousel.addEventListener('mouseenter', () => { hovered = true; stop(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', event => { if (event.target !== pause) allowFocusedPlayback = false; stop(); });
  carousel.addEventListener('focusout', () => requestAnimationFrame(schedule));
  document.addEventListener('visibilitychange', schedule);
  window.addEventListener('resize', () => { update(); schedule(); });
  reduced.addEventListener('change', () => { update(); schedule(); });
  carousel.querySelector('[data-pc-case-controls]').hidden = false;
  update();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.3;
      schedule();
    }, { threshold: 0.3 }).observe(carousel);
  }
})();
