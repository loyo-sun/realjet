(()=>{
 const tabs=[...document.querySelectorAll('[data-capability-tab]')];
 if(!tabs.length)return;
 const select=(tab,focus=false)=>{
  for(const item of tabs){const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active;}
  if(focus)tab.focus();
 };
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>select(tab));
  tab.addEventListener('keydown',event=>{
   let target;
   if(event.key==='ArrowRight')target=(index+1)%tabs.length;
   if(event.key==='ArrowLeft')target=(index+tabs.length-1)%tabs.length;
   if(event.key==='Home')target=0;
   if(event.key==='End')target=tabs.length-1;
   if(target===undefined)return;
   event.preventDefault();select(tabs[target],true);
  });
 });
})();
(()=>{
 const dialog=document.querySelector('[data-credential-dialog]');
 if(!dialog)return;
 let opener;
 const image=dialog.querySelector('[data-credential-dialog-image]');
 const title=dialog.querySelector('[data-credential-dialog-title]');
 const original=dialog.querySelector('[data-credential-dialog-original]');
 document.querySelectorAll('[data-credential-preview]').forEach(button=>button.addEventListener('click',()=>{
  opener=button;image.src=button.dataset.credentialPreview;image.alt=button.dataset.credentialTitle;
  title.textContent=button.dataset.credentialTitle;original.href=button.dataset.credentialOriginal;
  dialog.showModal();document.body.classList.add('mcap-document-open');
 }));
 dialog.querySelector('[data-credential-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{document.body.classList.remove('mcap-document-open');opener?.focus();});
})();
