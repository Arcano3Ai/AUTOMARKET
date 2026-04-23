/**
 * AUTOMARKET — API SERVICE LAYER v2.0
 * 
 * Modo dual:
 *   - Mock: resuelve con datos locales (sin internet)
 *   - Live: llama al backend de Cloud Run + Firebase
 * 
 * El modo se controla con window.AM_CONFIG.MODE
 */

window.API = {

  // ──────────────────────────────────────────────
  // HELPER: obtener token Firebase si está logueado
  // ──────────────────────────────────────────────
  async _authHeaders() {
    const token = await window.FirebaseService?.Auth?.getToken?.();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  },

  // ──────────────────────────────────────────────
  // INVENTARIO
  // ──────────────────────────────────────────────
  getInventory: async (filters = {}) => {
    if (window.AM_CONFIG?.features?.firestoreDB) {
      try {
        return await window.FirebaseService.DB.getAutos(filters);
      } catch (e) {
        console.warn('[API] Firestore falló, usando mock:', e);
      }
    }
    // Mock fallback
    await new Promise(r => setTimeout(r, 200));
    let data = AUTOMARKET_DB.autos.filter(a => !a.vendido);
    if (filters.marca) data = data.filter(a => a.marca === filters.marca);
    if (filters.categoria) data = data.filter(a => a.categoria === filters.categoria);
    return data;
  },

  getAutoById: async (id) => {
    if (window.AM_CONFIG?.features?.firestoreDB) {
      try {
        return await window.FirebaseService.DB.getAutoById(String(id));
      } catch(e) {}
    }
    await new Promise(r => setTimeout(r, 100));
    return AUTOMARKET_DB.autos.find(a => a.id === parseInt(id)) || null;
  },

  getDestacados: async () => {
    if (window.AM_CONFIG?.features?.firestoreDB) {
      try {
        return await window.FirebaseService.DB.getAutos({ destacado: true });
      } catch(e) {}
    }
    return AUTOMARKET_DB.autos.filter(a => a.destacado && !a.vendido);
  },

  // ──────────────────────────────────────────────
  // ADMIN — crear auto
  // ──────────────────────────────────────────────
  addAuto: async (formData) => {
    if (window.AM_CONFIG?.features?.firestoreDB) {
      try {
        return await window.FirebaseService.DB.addAuto(formData);
      } catch(e) { console.error('[API] addAuto:', e); }
    }
    // Mock
    const newId = AUTOMARKET_DB.autos.length > 0 ? Math.max(...AUTOMARKET_DB.autos.map(a => a.id)) + 1 : 1;
    const newAuto = { id: newId, ...formData, vendido: false, destacado: false };
    AUTOMARKET_DB.autos.push(newAuto);
    return { success: true, auto: newAuto };
  },

  // ──────────────────────────────────────────────
  // IMAGE UPLOAD
  // ──────────────────────────────────────────────
  uploadImage: async (file, onProgress) => {
    if (window.AM_CONFIG?.features?.cloudStorage) {
      try {
        const urls = await window.FirebaseService.Storage.uploadImages([file], onProgress);
        return { success: true, url: urls[0] };
      } catch(e) { console.error('[API] upload:', e); }
    }
    // Mock — create local blob URL
    return { success: true, url: URL.createObjectURL(file) };
  },

  // ──────────────────────────────────────────────
  // AUTH
  // ──────────────────────────────────────────────
  login: async (email, password) => {
    if (window.AM_CONFIG?.features?.firebaseAuth) {
      try {
        const token = await window.FirebaseService.Auth.loginEmail(email, password);
        // Get profile from backend
        const res = await fetch(`${window.AM_CONFIG.API_BASE}/api/users/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const user = await res.json();
        window.FirebaseService.Analytics.login('email');
        return { token, user };
      } catch(e) {
        // Firebase throws with code property
        const msg = e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found'
          ? 'Credenciales incorrectas'
          : 'Error al iniciar sesión';
        throw new Error(msg);
      }
    }
    // Mock fallback
    // ─────────────────────────────────────────────────────────────
    // CUENTAS DEMO (sincronizadas con auth.js DEMO_ACCOUNTS)
    // ─────────────────────────────────────────────────────────────
    const MOCK_USERS = [
      {
        email: 'admin@automarket.mx',
        password: 'Admin2024!',
        role: 'admin',
        name: 'Admin AUTOMARKET',
        avatar: 'AD',
        phone: '55 9000-0000'
      },
      {
        email: 'cliente@demo.com',
        password: 'Cliente2024!',
        role: 'client',
        name: 'Juan Pérez',
        avatar: 'JP',
        phone: '55 1234-5678'
      },
    ];
    await new Promise(r => setTimeout(r, 500));
    const user = MOCK_USERS.find(u => u.email === email.toLowerCase() && u.password === password);
    if (!user) throw new Error('Credenciales incorrectas');
    return {
      token: `mock_jwt_${user.role}_${Date.now()}`,
      user: { role: user.role, name: user.name, email: user.email }
    };
  },

  loginGoogle: async () => {
    if (!window.AM_CONFIG?.features?.firebaseAuth) {
      showToast('Login con Google disponible próximamente', 'info');
      return null;
    }
    const token = await window.FirebaseService.Auth.loginGoogle();
    const res = await fetch(`${window.AM_CONFIG.API_BASE}/api/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const user = await res.json();
    window.FirebaseService.Analytics.login('google');
    return { token, user };
  },

  register: async (email, password, name) => {
    if (window.AM_CONFIG?.features?.firebaseAuth) {
      const token = await window.FirebaseService.Auth.register(email, password, name);
      window.FirebaseService.Analytics.signUp('email');
      return { token, user: { email, name, role: 'client' } };
    }
    throw new Error('Registro disponible próximamente');
  },

  logout: async () => {
    if (window.AM_CONFIG?.features?.firebaseAuth) {
      await window.FirebaseService.Auth.logout();
    }
    localStorage.removeItem('automarket_auth');
  },

  // ──────────────────────────────────────────────
  // AI CHAT (Gemini via backend proxy)
  // ──────────────────────────────────────────────
  aiChat: async (message, context = '') => {
    const API_BASE = window.AM_CONFIG?.API_BASE || '';
    if (!API_BASE) return null;

    try {
      const res = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context })
      });
      if (!res.ok) return null;
      return await res.json();
    } catch(e) {
      console.warn('[API] AI chat unavailable:', e);
      return null;
    }
  },

  // ──────────────────────────────────────────────
  // APARTADOS (Reservations)
  // ──────────────────────────────────────────────
  crearApartado: async (autoId, datos) => {
    const headers = await window.API._authHeaders();
    const API_BASE = window.AM_CONFIG?.API_BASE || '';
    if (API_BASE && headers.Authorization) {
      try {
        const res = await fetch(`${API_BASE}/api/apartados`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...headers },
          body: JSON.stringify({ autoId, ...datos })
        });
        return res.json();
      } catch(e) {}
    }
    // Mock
    const folio = `AMKT-${autoId}-${Math.floor(Math.random()*9000+1000)}`;
    return { folio, status: 'confirmado' };
  },
};
