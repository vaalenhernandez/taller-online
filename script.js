/* ================================================================
   DESBLOQUEA TUS IDEAS — ONLINE
   JavaScript puro, sin dependencias.
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==============================================================
     1. CONFIGURACIÓN DE WHATSAPP
     ¡EDITA ESTO! Pon tu número en formato internacional, SOLO
     números, sin "+", sin espacios ni guiones.
     Ejemplo Colombia: +57 300 123 4567  ->  573001234567
     ============================================================== */
  const WHATSAPP_NUMBER = '573104704939';

  // Mensaje precargado para el CTA principal ("Quiero mi cupo")
  const MENSAJE_RESERVAR = 'Hola Valen, quiero pagar mi cupo para el taller online Desbloquea tus ideas del miércoles 29 de julio a las 7:00 p.m. ¿Me envías el link o los datos de pago?';

  // Mensaje precargado para el CTA secundario ("Ver información de pago")
  const MENSAJE_INFO = 'Hola Valen, quiero información sobre el pago del taller online Desbloquea tus ideas del miércoles 29 de julio a las 7:00 p.m.';

  const buildWhatsappLink = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll('.js-whatsapp-reservar').forEach((link) => {
    link.setAttribute('href', buildWhatsappLink(MENSAJE_RESERVAR));
  });

  document.querySelectorAll('.js-whatsapp-info').forEach((link) => {
    link.setAttribute('href', buildWhatsappLink(MENSAJE_INFO));
  });

  /* ==============================================================
     2. MENÚ MÓVIL (hamburguesa)
     ============================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cierra el menú al hacer clic en un link (mejor UX en mobile)
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==============================================================
     3. HEADER: sombra al hacer scroll
     ============================================================== */
  const header = document.getElementById('site-header');
  const onScrollHeader = () => {
    if (window.scrollY > 8) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ==============================================================
     4. ACORDEÓN DE PREGUNTAS FRECUENTES
     ============================================================== */
  document.querySelectorAll('.accordion-item').forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Cierra las demás preguntas abiertas (acordeón exclusivo)
      document.querySelectorAll('.accordion-trigger').forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherTrigger.closest('.accordion-item').querySelector('.accordion-panel').style.maxHeight = null;
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? null : `${panel.scrollHeight}px`;
    });
  });

  /* ==============================================================
     5. ANIMACIÓN "FADE IN" AL HACER SCROLL
     ============================================================== */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: si el navegador no soporta IntersectionObserver, mostrar todo
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ==============================================================
     6. AÑO ACTUAL EN EL FOOTER
     ============================================================== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
