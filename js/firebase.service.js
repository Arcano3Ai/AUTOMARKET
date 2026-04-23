/**
 * AUTOMARKET — Firebase Service Layer
 * Maneja: Auth, Firestore, Storage
 * Se activa automáticamente cuando AM_CONFIG.MODE === 'live'
 */

window.FirebaseService = (() => {

  let app, auth, firestore, storage, analytics;
  let initialized = false;

  async function init() {
    if (initialized) return;
    if (!window.AM_CONFIG?.features?.firebaseAuth) return;

    try {
      // Dynamically load Firebase SDK from CDN
      await loadScript('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js', true);
      await loadScript('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js', true);
      await loadScript('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js', true);
      await loadScript('https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js', true);
      if (window.AM_CONFIG.features.analytics) {
        await loadScript('https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js', true);
      }

      // Use modular SDK via compat layer (simpler for this SPA setup)
      // NOTE: CDN provides window.firebase
      app = firebase.initializeApp(window.AM_CONFIG.firebase);
      auth = firebase.auth();
      firestore = firebase.firestore();
      storage = firebase.storage();
      if (window.AM_CONFIG.features.analytics) {
        analytics = firebase.analytics();
      }

      initialized = true;
      console.log('[Firebase] ✅ Initialized');
    } catch (err) {
      console.error('[Firebase] Init failed:', err);
    }
  }

  function loadScript(src, isModule = false) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src;
      if (isModule) s.type = 'module';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // ─────────────────────────────────────────
  // AUTH
  // ─────────────────────────────────────────
  const Auth = {
    async loginEmail(email, password) {
      await init();
      if (!auth) throw new Error('Firebase no disponible');
      const cred = await auth.signInWithEmailAndPassword(email, password);
      return await cred.user.getIdToken();
    },

    async loginGoogle() {
      await init();
      if (!auth) throw new Error('Firebase no disponible');
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');
      const result = await auth.signInWithPopup(provider);
      return await result.user.getIdToken();
    },

    async register(email, password, name) {
      await init();
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: name });
      // Create user doc in Firestore
      await firestore.collection('users').doc(cred.user.uid).set({
        name,
        email,
        role: 'client',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return await cred.user.getIdToken();
    },

    async logout() {
      await init();
      if (auth) await auth.signOut();
      localStorage.removeItem('automarket_auth');
      localStorage.removeItem('am_firebase_token');
      window.updateAuthNav?.();
    },

    onStateChange(callback) {
      init().then(() => {
        if (auth) auth.onAuthStateChanged(callback);
      });
    },

    async getToken() {
      await init();
      const user = auth?.currentUser;
      if (!user) return null;
      return user.getIdToken(false); // false = don't force refresh
    },

    getCurrentUser() {
      return auth?.currentUser || null;
    }
  };

  // ─────────────────────────────────────────
  // FIRESTORE DB
  // ─────────────────────────────────────────
  const DB = {
    async getAutos(filters = {}) {
      await init();
      if (!firestore) throw new Error('Firestore no disponible');

      let q = firestore.collection('autos').where('vendido', '==', false);
      if (filters.marca) q = q.where('marca', '==', filters.marca);
      if (filters.categoria) q = q.where('categoria', '==', filters.categoria);
      if (filters.tipo) q = q.where('tipo', '==', filters.tipo);

      const snap = await q.limit(100).get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },

    async getAutoById(id) {
      await init();
      const doc = await firestore.collection('autos').doc(id).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    },

    async addAuto(data) {
      await init();
      const token = await Auth.getToken();
      const res = await fetch(`${window.AM_CONFIG.API_BASE}/api/autos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      return res.json();
    },

    async getFavorites(ids) {
      if (!ids?.length) return [];
      await init();
      // Fetch each by id (Firestore 'in' query supports up to 30)
      const chunks = [];
      for (let i = 0; i < ids.length; i += 10) chunks.push(ids.slice(i, i+10));
      const results = await Promise.all(chunks.map(chunk =>
        firestore.collection('autos').where(firebase.firestore.FieldPath.documentId(), 'in', chunk).get()
      ));
      return results.flatMap(snap => snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
  };

  // ─────────────────────────────────────────
  // CLOUD STORAGE
  // ─────────────────────────────────────────
  const Storage = {
    async uploadImages(files, onProgress) {
      await init();
      const token = await Auth.getToken();
      const formData = new FormData();
      files.forEach(f => formData.append('images', f));

      const xhr = new XMLHttpRequest();
      return new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable && onProgress) {
            onProgress(Math.round((e.loaded / e.total) * 100));
          }
        });
        xhr.addEventListener('load', () => {
          const data = JSON.parse(xhr.responseText);
          resolve(data.urls || []);
        });
        xhr.addEventListener('error', reject);
        xhr.open('POST', `${window.AM_CONFIG.API_BASE}/api/upload`);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.send(formData);
      });
    }
  };

  // ─────────────────────────────────────────
  // ANALYTICS
  // ─────────────────────────────────────────
  const Analytics = {
    track(eventName, params = {}) {
      if (!window.AM_CONFIG.features.analytics || !analytics) return;
      try {
        analytics.logEvent(eventName, params);
      } catch(e) {}
    },
    viewItem(auto) {
      this.track('view_item', {
        currency: 'MXN', value: auto.precio,
        items: [{ item_id: auto.id, item_name: `${auto.marca} ${auto.modelo} ${auto.año}`, price: auto.precio }]
      });
    },
    beginCheckout(auto) {
      this.track('begin_checkout', {
        currency: 'MXN', value: 5000,
        items: [{ item_id: auto.id, item_name: `${auto.marca} ${auto.modelo}` }]
      });
    },
    addToWishlist(auto) {
      this.track('add_to_wishlist', {
        currency: 'MXN', value: auto.precio,
        items: [{ item_id: auto.id, item_name: `${auto.marca} ${auto.modelo}` }]
      });
    },
    search(term) {
      this.track('search', { search_term: term });
    },
    signUp(method) {
      this.track('sign_up', { method });
    },
    login(method) {
      this.track('login', { method });
    }
  };

  return { init, Auth, DB, Storage, Analytics };
})();

// Auto-initialize if live mode
if (window.AM_CONFIG?.MODE === 'live') {
  window.FirebaseService.init().catch(console.error);
}
