/* Same responsive navigation behavior as the new homepage. */
(()=>{
  const menuBtn=document.querySelector('header.site-header .menu-button');
  const menu=document.querySelector('header.site-header #mobile-menu');
  if(!menuBtn||!menu)return;
  const closeMenu=()=>{
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.setAttribute('aria-label','Abrir menú');
  };
  menuBtn.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',String(open));
    menuBtn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!menuBtn.contains(e.target))closeMenu()});
})();
