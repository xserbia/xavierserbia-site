/* =========================================================
   TRANSFORMEMOS JUNTOS
   Archivo: script.js
   Funciones:
   - Animaciones suaves al hacer scroll
   - Entrada escalonada para tarjetas
   - Desplazamiento suave del CTA
   - Ajuste automático de altura cuando se usa dentro de Wix
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Animaciones de entrada ---------- */
  const revealSelectors = [
    ".eyebrow",
    ".section-title",
    ".section-intro",
    ".challenge-box",
    ".card",
    ".stat",
    ".episode",
    ".role-card",
    ".eco",
    ".closing h2",
    ".closing p",
    ".cta"
  ];

  const revealElements = document.querySelectorAll(
    revealSelectors.join(",")
  );

  revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty(
      "--reveal-delay",
      `${Math.min((index % 6) * 70, 350)}ms`
    );
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px"
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  /* ---------- CTA ---------- */
  const cta = document.querySelector(".cta");

  if (cta) {
    cta.addEventListener("click", (event) => {
      const href = cta.getAttribute("href");

      if (!href || href === "#") {
        event.preventDefault();

        const target =
          document.querySelector("#contacto") ||
          document.querySelector(".closing");

        target?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start"
        });
      }
    });
  }

  /* ---------- Efecto sutil del hero ---------- */
  const hero = document.querySelector(".hero");
  const heroCopy = document.querySelector(".hero-copy");

  if (hero && heroCopy && !reduceMotion) {
    let ticking = false;

    const updateHero = () => {
      const scrollY = Math.min(window.scrollY, hero.offsetHeight);
      const progress = scrollY / hero.offsetHeight;

      heroCopy.style.transform = `translateY(${progress * 28}px)`;
      heroCopy.style.opacity = String(Math.max(1 - progress * 0.55, 0.45));

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHero);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ---------- Altura automática para Wix Embed ---------- */
  const sendHeightToParent = () => {
    const height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    window.parent.postMessage(
      {
        type: "transformemos-juntos-height",
        height
      },
      "*"
    );
  };

  sendHeightToParent();

  window.addEventListener("load", sendHeightToParent);
  window.addEventListener("resize", sendHeightToParent);

  if ("ResizeObserver" in window) {
    const pageObserver = new ResizeObserver(sendHeightToParent);
    pageObserver.observe(document.body);
  }
});
