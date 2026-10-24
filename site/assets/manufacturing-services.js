const page=document.querySelector('.mh-page--services');
if(page){
 const filters=[...page.querySelectorAll('[data-component-filter]')];
 const cards=[...page.querySelectorAll('[data-component-family]')];
 const grid=page.querySelector('.cms-product-grid');
 const status=page.querySelector('[data-filter-status]');
 for(const button of filters)button.addEventListener('click',()=>{
  const family=button.dataset.componentFilter;
  filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  cards.forEach(card=>{card.hidden=family!=='all'&&card.dataset.componentFamily!==family;});
  grid.classList.toggle('is-filtered',family!=='all');
  status.textContent=family==='all'?'Showing all components.':`Showing ${button.textContent.toLowerCase()}.`;
 });
}
