/* === SPA ROUTER === */

const routes = {
  '/': 'renderHome',
  '/catalogo': 'renderCatalog',
  '/vender': 'renderSell',
  '/financiamiento': 'renderFinancing',
  '/panel': 'renderDashboard',
  '/outlet': 'renderOutlet',
  '/nosotros': 'renderAbout',
  '/revista': 'renderMagazine',
  '/favoritos': 'renderWishlist',
  '/servicio': 'renderService',
  '/mi-cuenta': 'renderAccount',
  '/comparar': 'renderCompare',
  '/login': 'renderLogin',
  '/registro': 'renderRegister',
  '/checkout': 'renderCheckout', // dynamic route (matches partly)
};

// Expose page functions namespace
window.Pages = window.Pages || {};

async function renderRoute() {
  const app = document.getElementById('app');
  let hash = window.location.hash.slice(1) || '/';
  
  // Clean active nav
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  
  // Highlight active link
  let navHref = `#${hash}`;
  if (hash.startsWith('/auto/')) navHref = '#/catalogo'; // Keep catalog active for details
  const activeLink = document.querySelector(`.nav-link[href="${navHref}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Trigger Out animation
  app.style.opacity = '0';
  app.style.transform = 'translateY(10px)';
  
  await new Promise(r => setTimeout(r, 200));

  window.scrollTo(0, 0);

  // Match routes
  if (hash.startsWith('/auto/')) {
    const id = hash.split('/')[2];
    if (window.Pages.renderDetail) {
      app.innerHTML = window.Pages.renderDetail(id);
    }
  } else if (hash.startsWith('/checkout/')) {
    const id = hash.split('/')[2];
    if (window.Pages.renderCheckout) {
      app.innerHTML = window.Pages.renderCheckout(id);
      if (window.Pages.renderCheckoutInit) {
        setTimeout(window.Pages.renderCheckoutInit, 0);
      }
    }
  } else {
    // Exact match or fallback empty to '/'
    const matchHash = hash === '' ? '/' : hash;
    let pageFn = routes[matchHash];

    // Auth Guards — con try/catch defensivo en caso de localStorage corrupto
    let userRole = null;
    try {
      const authData = localStorage.getItem('automarket_auth');
      if (authData) userRole = JSON.parse(authData).role;
    } catch(e) {
      localStorage.removeItem('automarket_auth');
    }

    if (matchHash === '/panel' && userRole !== 'admin') {
        showToast('Acceso Denegado: Requiere permisos de administrador', 'error');
        window.location.hash = '#/login';
        return;
    }
    if (matchHash === '/mi-cuenta' && !userRole) {
        showToast('Debes iniciar sesión primero', 'info');
        window.location.hash = '#/login';
        return;
    }

    if (pageFn && window.Pages[pageFn]) {
      app.innerHTML = window.Pages[pageFn]();
      const initFn = `${pageFn}Init`;
      if (window.Pages[initFn]) {
        setTimeout(window.Pages[initFn], 0);
      }
    } else {
      // Show construction for unresolved/broken hashes
      if (window.Pages.renderConstruction) {
        app.innerHTML = window.Pages.renderConstruction(hash);
      } else {
        app.innerHTML = '<div class="container section text-center"><h2>Página en construcción</h2></div>';
      }
    }
  }

  // Trigger In animation
  requestAnimationFrame(() => {
    app.style.transition = 'opacity var(--tr-base), transform var(--tr-base)';
    app.style.opacity = '1';
    app.style.transform = 'translateY(0)';
  });
}

function initRouter() {
  window.addEventListener('hashchange', renderRoute);
  renderRoute();
}
