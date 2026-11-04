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

// Dynamic Social & WhatsApp Meta Tags Helper
function updateMetaTags(opts = {}) {
  const defaultTitle = 'AUTOMARKET — Tu próximo auto, garantizado | Concesionaria & Marketplace';
  const defaultDesc = '🚗 Concesionaria y Marketplace líder en México. Más de 90 autos verificados con garantía de 120 puntos, súper deportivos (Ferrari, Lambo, Porsche), SUVs, Pick-Ups y financiamiento en minutos. ¡Conoce nuestro showroom!';
  const defaultImg = 'https://raw.githubusercontent.com/Arcano3Ai/AUTOMARKET/main/img/negocio-automarket.jpg';
  const defaultUrl = window.location.href;

  const title = opts.title || defaultTitle;
  const description = opts.description || defaultDesc;
  const image = opts.image || defaultImg;
  const url = opts.url || defaultUrl;

  document.title = title;

  const setMeta = (attr, key, val) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', val);
  };

  setMeta('name', 'description', description);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:url', url);
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', image);
}

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
    const auto = window.DB && window.DB.getById ? window.DB.getById(id) : null;
    if (auto) {
      updateMetaTags({
        title: `${auto.marca} ${auto.modelo} ${auto.año} ($${auto.precio.toLocaleString('es-MX')} MXN) | AUTOMARKET`,
        description: `🚗 ${auto.marca} ${auto.modelo} ${auto.año} en AUTOMARKET México. ${auto.motor}, ${auto.transmision}, ${auto.km.toLocaleString('es-MX')} km. ${auto.descripcion}`,
        image: auto.fotos && auto.fotos[0] ? auto.fotos[0] : null,
        url: window.location.href
      });
    }
    if (window.Pages.renderDetail) {
      app.innerHTML = window.Pages.renderDetail(id);
    }
  } else if (hash.startsWith('/checkout/')) {
    updateMetaTags();
    const id = hash.split('/')[2];
    if (window.Pages.renderCheckout) {
      app.innerHTML = window.Pages.renderCheckout(id);
      if (window.Pages.renderCheckoutInit) {
        setTimeout(window.Pages.renderCheckoutInit, 0);
      }
    }
  } else {
    updateMetaTags();
    // Exact match or fallback empty to '/'
    // Parse Query Strings (ej: /catalogo?marca=Nissan)
    let [baseHash, queryString] = hash.split('?');
    const matchHash = baseHash === '' ? '/' : baseHash;
    
    if (queryString && matchHash === '/catalogo') {
       const params = new URLSearchParams(queryString);
       if (params.has('marca')) {
         sessionStorage.setItem('filter_brand', params.get('marca'));
       }
    }

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
