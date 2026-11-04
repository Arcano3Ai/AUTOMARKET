const CACHE_NAME = 'automarket-pwa-v5';
const RUNTIME_CACHE = 'automarket-runtime-v5';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './img/app-icon.png',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/icon-maskable.png',
  './img/negocio-automarket.jpg',
  './img/showroom-automarket.jpg',
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
  './js/pwa.js',
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

// Install: Precache App Shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[PWA] Cache prefetch error:', err))
  );
});

// Activate: Prune Old Caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => !currentCaches.includes(key)).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy
self.addEventListener('fetch', event => {
  // Solo procesar peticiones GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignorar Firebase, Cloud Run API y APIs externas
  if (url.hostname.includes('firestore.googleapis.com') ||
      url.hostname.includes('identitytoolkit.googleapis.com') ||
      url.hostname.includes('generativelanguage.googleapis.com') ||
      url.pathname.startsWith('/api/') ||
      url.hostname.includes('run.app')) {
    return;
  }

  // Rutas de imágenes externas (Unsplash, Google favicons): Cache First con fallback a network
  if (url.hostname.includes('unsplash.com') || url.hostname.includes('google.com')) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(cache => {
        return cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => cached);
        });
      })
    );
    return;
  }

  // App Shell y assets locales: Stale While Revalidate
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
        }
        return networkResponse;
      }).catch(err => {
        // Si no hay red y no está en caché, responder con fallback si es navegación
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html') || caches.match('/');
        }
        throw err;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
