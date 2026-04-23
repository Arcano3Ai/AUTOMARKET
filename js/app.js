/* === APP ENTRY POINT === */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      // Animate hamburger bars into X
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity  = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    navMobile.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });
  }

  // Modal Setup
  const closeBtn = document.getElementById('modal-close');
  const overlay = document.getElementById('modal-overlay');
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  // Initial Route setup
  initRouter();
  window.updateAuthNav();

  // Init wishlist badge on load
  if (window.Wishlist) window.Wishlist.updateBadge();

  // Navbar scroll shrink effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // Close mobile nav on route change
  window.addEventListener('hashchange', () => {
    navMobile?.classList.remove('open');
  });
});

window.updateAuthNav = () => {
  const authBtn  = document.getElementById('nav-auth-btn');
  const authIcon = document.getElementById('nav-auth-icon');
  const authText = document.getElementById('nav-auth-text');

  if (!authBtn) return;

  try {
    const stored = localStorage.getItem('automarket_auth');
    if (stored) {
      const user = JSON.parse(stored);
      const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

      if (authIcon) {
        authIcon.innerHTML = initials;
        authIcon.style.background = 'var(--grad-red)';
        authIcon.style.color = 'white';
        authIcon.style.font  = '700 11px/1 var(--font-display)';
      }
      if (authText) {
        authText.textContent = user.role === 'admin' ? 'Admin Panel' : 'Mi Cuenta';
      }
      authBtn.href = user.role === 'admin' ? '#/panel' : '#/mi-cuenta';
    } else {
      if (authIcon) {
        authIcon.innerHTML = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
        authIcon.style.background = 'var(--clr-surface-top)';
        authIcon.style.color = 'var(--clr-text-muted)';
      }
      if (authText) authText.textContent = 'Ingresar';
      authBtn.href = '#/login';
    }
  } catch(e) { console.warn('[updateAuthNav]', e); }
};

window.logout = () => {
    localStorage.removeItem('automarket_auth');
    window.updateAuthNav();
    showToast('Sesión finalizada', 'info');
    window.location.hash = '#/';
};
