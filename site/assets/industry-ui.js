const catalogue = document.querySelector('.industry-ui');
if (catalogue) {
  const links = [...catalogue.querySelectorAll('.industry-category-nav a')];
  const groups = [...catalogue.querySelectorAll('.industry-product-group')];
  function activate(id) {
    for (const link of links) {
      const active = link.hash === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  for (const link of links) link.addEventListener('click', () => activate(link.hash.slice(1)));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) activate(visible[0].target.id);
    }, { rootMargin: '-110px 0px -55% 0px', threshold: 0 });
    for (const group of groups) observer.observe(group);
  }
}
