(()=>{
 document.querySelectorAll('.xs-header').forEach(header=>{
  const toggle=header.querySelector('.xs-menu-toggle');if(!toggle)return;
  const close=()=>{header.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')};
  toggle.addEventListener('click',()=>{const open=!header.classList.contains('is-open');header.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open))});
  header.querySelectorAll('.xs-navlinks a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&header.classList.contains('is-open')){close();toggle.focus()}});
  document.addEventListener('click',e=>{if(!header.contains(e.target))close()});
 });
})();
