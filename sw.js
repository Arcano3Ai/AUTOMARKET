const CACHE_NAME = 'automarket-pwa-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './img/app-icon.png',
  './css/variables.css',
  './css/base.css',
  './css/animations.css',
  './css/components.css',
  './css/navbar.css',
  './css/home.css',
  './css/catalog.css',
  './css/detail.css',
  './css/sell.css',
  './css/financing.css',
  './css/dashboard.css',
  './css/magazine.css',
  './css/wishlist.css',
  './css/service.css',
  './css/outlet.css',
  './css/compare.css',
  './css/auth.css',
  './css/checkout.css',
  './css/account.css',
  './css/footer.css',
  './css/ai-agent.css',
  './js/config.js',
  './js/data.js',
  './js/firebase.service.js',
  './js/api.js',
  './js/components.js',
  './js/router.js',
  './js/app.js',
  './js/ai-agent.js',
  './js/pages/home.js',
  './js/pages/catalog.js',
  './js/pages/detail.js',
  './js/pages/sell.js',
  './js/pages/financing.js',
  './js/pages/dashboard.js',
  './js/pages/magazine.js',
  './js/pages/wishlist.js',
  './js/pages/service.js',
  './js/pages/outlet.js',
  './js/pages/compare.js',
  './js/pages/auth.js',
  './js/pages/checkout.js',
  './js/pages/account.js',
  './js/pages/about.js',
  './js/pages/construction.js'
];

// Instalar Service Worker y Cachear Assets Estáticos (App Shell)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[PWA] Cache prefetch error:', err))
  );
});

// Limpiar Caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', event => {
  // Ignorar peticiones que no sean GET
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // Ignorar peticiones a APIs externas, Firebase o Cloud Run backend
  if (url.includes('firestore.googleapis.com') ||
      url.includes('identitytoolkit.googleapis.com') ||
      url.includes('generativelanguage.googleapis.com') ||
      url.includes('/api/') ||
      url.includes('run.app')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Stale-while-revalidate para recursos locales
          fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});
