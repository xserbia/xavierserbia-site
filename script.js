// Menú responsive
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Scroll suave para anclas internas
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navList && navList.classList.remove('open');
        navToggle && navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Año en footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Handler de formularios (demo)
window.handleSubmit = function(e){
  e.preventDefault();
  alert('Enviado. (Demo) Conecta este formulario a tu servicio preferido: Wix Forms, Formspree, Airtable, etc.');
  return false;
};
