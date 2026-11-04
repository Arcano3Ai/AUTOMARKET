/**
 * AUTOMARKET — PWA Controller v3.0
 * ═══════════════════════════════════════════════════════════
 * ✅ Service Worker registration & auto-update checking
 * ✅ Custom in-app install prompt (Chrome, Edge, Android)
 * ✅ iOS Safari install guidance detection
 * ✅ Real-time offline / online connectivity banner
 * ✅ Standalone window mode detection
 */

(function () {
  'use strict';

  let deferredPrompt = null;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // 1. REGISTER SERVICE WORKER
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('[PWA] ✅ Service Worker activo con scope:', registration.scope);

          // Verificar si hay una nueva versión disponible
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  if (window.showToast) {
                    window.showToast('Nueva versión de AUTOMARKET disponible. Actualizando...', 'info');
                  }
                }
              });
            }
          });
        })
        .catch(err => console.warn('[PWA] ❌ Error registrando Service Worker:', err));
    });
  }

  // 2. LISTEN FOR NATIVE INSTALL PROMPT
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('[PWA] 📲 Evento beforeinstallprompt capturado');

    // Show nav install button & floating banner if not already installed
    if (!isStandalone) {
      showInstallUI();
    }
  });

  // 3. LISTEN FOR SUCCESSFUL APP INSTALLATION
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] 🎉 Aplicación instalada exitosamente en el dispositivo');
    deferredPrompt = null;
    hideInstallUI();
    if (window.showToast) {
      window.showToast('¡AUTOMARKET se ha instalado en tu pantalla de inicio!', 'success');
    }
  });

  function showInstallUI() {
    const navBtn = document.getElementById('nav-pwa-install');
    const mobileBtn = document.getElementById('mobile-pwa-install');
    const banner = document.getElementById('pwa-install-banner');

    if (navBtn) navBtn.style.display = 'inline-flex';
    if (mobileBtn) mobileBtn.style.display = 'flex';

    // Show banner after 3 seconds if user hasn't dismissed it
    const dismissed = localStorage.getItem('am_pwa_dismissed');
    if (!dismissed && banner) {
      setTimeout(() => {
        banner.classList.add('visible');
      }, 2500);
    }
  }

  function hideInstallUI() {
    const navBtn = document.getElementById('nav-pwa-install');
    const mobileBtn = document.getElementById('mobile-pwa-install');
    const banner = document.getElementById('pwa-install-banner');

    if (navBtn) navBtn.style.display = 'none';
    if (mobileBtn) mobileBtn.style.display = 'none';
    if (banner) banner.classList.remove('visible');
  }

  // Public PWA Methods
  window.PWA = {
    async install() {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        console.log('[PWA] Elección del usuario:', choice.outcome);
        if (choice.outcome === 'accepted') {
          hideInstallUI();
        }
        deferredPrompt = null;
      } else if (isIOS && !isStandalone) {
        if (window.showToast) {
          window.showToast('📱 En Safari: pulsa Compartir (⎋) y luego "Agregar a pantalla de inicio" (➕)', 'info');
        } else {
          alert('Para instalar en iPhone/iPad:\n1. Toca el botón Compartir (cuadrado con flecha)\n2. Selecciona "Agregar a pantalla de inicio"');
        }
      } else {
        if (window.showToast) {
          window.showToast('AUTOMARKET ya está instalado o tu navegador no soporta instalación directa.', 'info');
        }
      }
    },

    dismissBanner() {
      const banner = document.getElementById('pwa-install-banner');
      if (banner) banner.classList.remove('visible');
      localStorage.setItem('am_pwa_dismissed', Date.now());
    }
  };

  // 4. OFFLINE / ONLINE CONNECTIVITY DETECTION
  function updateOnlineStatus() {
    const indicator = document.getElementById('pwa-offline-indicator');
    if (!indicator) return;

    if (!navigator.onLine) {
      indicator.textContent = '⚡ Modo Offline — Usando datos cacheados';
      indicator.classList.remove('online');
      indicator.classList.add('show');
    } else {
      indicator.textContent = '🟢 Conexión restablecida';
      indicator.classList.add('online');
      indicator.classList.add('show');
      setTimeout(() => indicator.classList.remove('show'), 3000);
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  // Check on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    if (!navigator.onLine) updateOnlineStatus();
  });

})();

