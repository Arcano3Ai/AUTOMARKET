/**
 * AUTOMARKET — Auth Pages (Login + Register)
 * Mock users:
 *   Admin:   admin@automarket.mx  / Admin2024!
 *   Cliente: cliente@demo.com     / Cliente2024!
 */

// ─────────────────────────────────────────────────────
// CREDENCIALES DEMO (visibles en pantalla de login)
// ─────────────────────────────────────────────────────
const DEMO_ACCOUNTS = [
  {
    label: 'Admin',
    icon: '🔑',
    email: 'admin@automarket.mx',
    password: 'Admin2024!',
    role: 'admin',
    color: 'var(--clr-primary)'
  },
  {
    label: 'Cliente',
    icon: '👤',
    email: 'cliente@demo.com',
    password: 'Cliente2024!',
    role: 'client',
    color: '#3b82f6'
  }
];

// ─────────────────────────────────────────────────────
// LOGIN PAGE
// ─────────────────────────────────────────────────────
window.Pages.renderLogin = () => {
  return `
    <div class="auth-page animate-fade-in" style="background: radial-gradient(circle at 50% 0%, rgba(235, 10, 30, 0.12) 0%, var(--clr-bg) 65%);">
      <div class="auth-card animate-slide-up">

        <!-- LOGO / HEADER -->
        <div class="auth-header">
          <a href="#/" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;margin-bottom:var(--sp-5)">
            <span style="font-size:22px;font-weight:900;color:white;letter-spacing:-0.5px">AUTO<span style="color:var(--clr-primary)">MARKET</span></span>
          </a>
          <h1>Iniciar Sesión</h1>
          <p>Bienvenido de vuelta. Accede a tu cuenta para continuar.</p>
        </div>

        <!-- DEMO CREDENTIALS PANEL -->
        <div class="demo-creds-panel" id="demo-panel">
          <div class="demo-creds-title">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Cuentas de demostración — clic para autocompletar
          </div>
          <div style="display:flex;gap:var(--sp-3);flex-wrap:wrap">
            ${DEMO_ACCOUNTS.map(acc => `
              <button class="demo-cred-btn" onclick="window.Pages.fillDemo('${acc.email}','${acc.password}')"
                style="border-left:3px solid ${acc.color}">
                <span style="font-size:16px">${acc.icon}</span>
                <div>
                  <div style="font-weight:700;color:white;font-size:13px">${acc.label}</div>
                  <div style="font-size:11px;color:var(--clr-text-muted)">${acc.email}</div>
                </div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- FORM -->
        <form id="login-form" autocomplete="on">
          <div class="form-group">
            <label class="form-label">Correo Electrónico</label>
            <input type="email" id="login-email" class="input-base"
              placeholder="correo@ejemplo.com" autocomplete="email" required>
          </div>
          <div class="form-group">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sp-2)">
              <label class="form-label" style="margin:0">Contraseña</label>
              <a href="#" onclick="showToast('Recuperación de contraseña próximamente','info'); return false;"
                style="color:var(--clr-primary-light);font-size:12px;text-decoration:none">¿Olvidaste tu contraseña?</a>
            </div>
            <div style="position:relative">
              <input type="password" id="login-pwd" class="input-base"
                placeholder="••••••••" autocomplete="current-password" required
                style="padding-right:44px">
              <button type="button" id="toggle-pwd"
                onclick="window.Pages.togglePassword('login-pwd','toggle-pwd')"
                style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--clr-text-dim);padding:4px">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>

          <!-- ERROR ALERT -->
          <div id="login-error" style="display:none;background:rgba(235,10,30,0.1);border:1px solid rgba(235,10,30,0.3);border-radius:var(--r-md);padding:var(--sp-3) var(--sp-4);font-size:13px;color:#ff6b7a;margin-bottom:var(--sp-4)">
          </div>

          <button type="submit" id="login-submit" class="btn-primary-lg w-full">
            Ingresar a mi cuenta
          </button>
        </form>

        <!-- DIVIDER -->
        <div style="display:flex;align-items:center;gap:var(--sp-4);margin:var(--sp-5) 0">
          <div style="flex:1;height:1px;background:var(--clr-surface-high)"></div>
          <span style="color:var(--clr-text-muted);font-size:12px">o continúa con</span>
          <div style="flex:1;height:1px;background:var(--clr-surface-high)"></div>
        </div>

        <!-- GOOGLE -->
        <button id="btn-google-login" onclick="window.Pages.loginWithGoogle()" class="btn-google w-full">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar con Google
        </button>

        <div class="auth-footer">
          ¿Aún no tienes cuenta? <a href="#/registro">Regístrate gratis →</a>
        </div>
      </div>
    </div>
  `;
};

// ─────────────────────────────────────────────────────
// REGISTER PAGE
// ─────────────────────────────────────────────────────
window.Pages.renderRegister = () => {
  return `
    <div class="auth-page animate-fade-in" style="background: radial-gradient(circle at 50% 0%, rgba(235, 10, 30, 0.12) 0%, var(--clr-bg) 65%);">
      <div class="auth-card animate-slide-up">

        <div class="auth-header">
          <a href="#/" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;margin-bottom:var(--sp-5)">
            <span style="font-size:22px;font-weight:900;color:white;letter-spacing:-0.5px">AUTO<span style="color:var(--clr-primary)">MARKET</span></span>
          </a>
          <h1>Crear Cuenta</h1>
          <p>Únete para guardar favoritos y agilizar tus trámites.</p>
        </div>

        <!-- BENEFITS -->
        <div style="display:flex;flex-direction:column;gap:var(--sp-2);margin-bottom:var(--sp-6);background:var(--clr-surface-mid);border-radius:var(--r-lg);padding:var(--sp-4)">
          ${['❤️ Guarda tus autos favoritos','📋 Historial de apartados','⚡ Checkout más rápido','🔔 Alertas de nuevos autos'].map(b => `
            <div style="display:flex;align-items:center;gap:var(--sp-3);font-size:13px;color:var(--clr-text-muted)">${b}</div>
          `).join('')}
        </div>

        <form id="register-form" autocomplete="on">
          <div class="form-group">
            <label class="form-label">Nombre Completo</label>
            <input type="text" id="reg-name" class="input-base"
              placeholder="Juan Pérez" autocomplete="name" required>
          </div>
          <div class="form-group">
            <label class="form-label">Correo Electrónico</label>
            <input type="email" id="reg-email" class="input-base"
              placeholder="correo@ejemplo.com" autocomplete="email" required>
          </div>
          <div class="form-group">
            <label class="form-label">Contraseña</label>
            <div style="position:relative">
              <input type="password" id="reg-pwd" class="input-base"
                placeholder="Mínimo 8 caracteres" minlength="8"
                autocomplete="new-password" required style="padding-right:44px"
                oninput="window.Pages.checkPwdStrength(this.value)">
              <button type="button" onclick="window.Pages.togglePassword('reg-pwd',this)"
                style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--clr-text-dim);padding:4px">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <!-- Password strength bar -->
            <div id="pwd-strength-bar" style="height:3px;border-radius:2px;background:var(--clr-surface-high);margin-top:6px;transition:all 0.3s">
              <div id="pwd-strength-fill" style="height:100%;border-radius:2px;width:0%;transition:all 0.3s;background:var(--clr-primary)"></div>
            </div>
            <div id="pwd-strength-label" style="font-size:11px;color:var(--clr-text-muted);margin-top:4px"></div>
          </div>

          <!-- ERROR -->
          <div id="reg-error" style="display:none;background:rgba(235,10,30,0.1);border:1px solid rgba(235,10,30,0.3);border-radius:var(--r-md);padding:var(--sp-3) var(--sp-4);font-size:13px;color:#ff6b7a;margin-bottom:var(--sp-4)"></div>

          <button type="submit" id="reg-submit" class="btn-primary-lg w-full">
            Crear mi cuenta gratis
          </button>
        </form>

        <!-- GOOGLE REGISTER -->
        <div style="display:flex;align-items:center;gap:var(--sp-4);margin:var(--sp-5) 0">
          <div style="flex:1;height:1px;background:var(--clr-surface-high)"></div>
          <span style="color:var(--clr-text-muted);font-size:12px">o regístrate con</span>
          <div style="flex:1;height:1px;background:var(--clr-surface-high)"></div>
        </div>
        <button onclick="window.Pages.loginWithGoogle()" class="btn-google w-full">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Registrarme con Google
        </button>

        <div class="auth-footer">
          ¿Ya tienes una cuenta? <a href="#/login">Inicia sesión →</a>
        </div>
      </div>
    </div>
  `;
};

// ─────────────────────────────────────────────────────
// INIT: LOGIN
// ─────────────────────────────────────────────────────
window.Pages.renderLoginInit = () => {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('login-submit');
    const errorEl = document.getElementById('login-error');

    // Set loading state
    btn.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;gap:8px">
      <svg width="16" height="16" style="animation:spin 0.8s linear infinite" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      Ingresando...
    </span>`;
    btn.disabled = true;
    errorEl.style.display = 'none';

    try {
      const email = document.getElementById('login-email').value.trim();
      const pwd = document.getElementById('login-pwd').value;

      const res = await window.API.login(email, pwd);

      // Persist session
      const session = { ...res.user, token: res.token, loginAt: Date.now() };
      localStorage.setItem('automarket_auth', JSON.stringify(session));
      window.updateAuthNav();

      showToast(`¡Bienvenido, ${res.user.name}! 👋`, 'success');

      // Redirect based on role
      setTimeout(() => {
        window.location.hash = res.user.role === 'admin' ? '#/panel' : '#/mi-cuenta';
      }, 600);

    } catch (err) {
      // Show inline error
      errorEl.textContent = err.message || 'Credenciales incorrectas. Verifica tu correo y contraseña.';
      errorEl.style.display = 'block';
      btn.innerHTML = 'Ingresar a mi cuenta';
      btn.disabled = false;

      // Shake animation on form
      form.style.animation = 'shake 0.4s ease';
      setTimeout(() => form.style.animation = '', 400);
    }
  });
};

// ─────────────────────────────────────────────────────
// INIT: REGISTER
// ─────────────────────────────────────────────────────
window.Pages.renderRegisterInit = () => {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('reg-submit');
    const errorEl = document.getElementById('reg-error');
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pwd = document.getElementById('reg-pwd').value;

    if (pwd.length < 8) {
      errorEl.textContent = 'La contraseña debe tener mínimo 8 caracteres.';
      errorEl.style.display = 'block';
      return;
    }

    btn.innerHTML = 'Creando cuenta...';
    btn.disabled = true;
    errorEl.style.display = 'none';

    try {
      // In mock mode: simulate a new client account
      await new Promise(r => setTimeout(r, 800));
      const session = {
        name,
        email,
        role: 'client',
        token: `mock_jwt_client_${Date.now()}`,
        loginAt: Date.now()
      };
      localStorage.setItem('automarket_auth', JSON.stringify(session));
      window.updateAuthNav();
      showToast('¡Cuenta creada exitosamente! Bienvenido 🎉', 'success');
      setTimeout(() => { window.location.hash = '#/mi-cuenta'; }, 800);

    } catch (err) {
      errorEl.textContent = err.message || 'Error al crear la cuenta.';
      errorEl.style.display = 'block';
      btn.innerHTML = 'Crear mi cuenta gratis';
      btn.disabled = false;
    }
  });
};

// ─────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────
window.Pages.fillDemo = (email, password) => {
  const emailInput = document.getElementById('login-email');
  const pwdInput = document.getElementById('login-pwd');
  if (!emailInput || !pwdInput) return;

  // Animate fill
  emailInput.value = '';
  pwdInput.value = '';
  emailInput.focus();

  let i = 0;
  const typeEmail = setInterval(() => {
    emailInput.value += email[i++];
    if (i >= email.length) {
      clearInterval(typeEmail);
      let j = 0;
      const typePwd = setInterval(() => {
        pwdInput.value += password[j++];
        if (j >= password.length) {
          clearInterval(typePwd);
          showToast('Credenciales cargadas ✓', 'success');
        }
      }, 40);
    }
  }, 30);
};

window.Pages.togglePassword = (inputId, btn) => {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isVisible = input.type === 'text';
  input.type = isVisible ? 'password' : 'text';
  const icon = isVisible
    ? '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
    : '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
  if (btn && btn.querySelector) btn.querySelector('svg') ? btn.innerHTML = icon : null;
};

window.Pages.checkPwdStrength = (pwd) => {
  const fill = document.getElementById('pwd-strength-fill');
  const label = document.getElementById('pwd-strength-label');
  if (!fill || !label) return;

  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  const levels = [
    { w: '0%', c: 'transparent', t: '' },
    { w: '25%', c: '#ef4444', t: 'Muy débil' },
    { w: '50%', c: '#f97316', t: 'Débil' },
    { w: '75%', c: '#eab308', t: 'Buena' },
    { w: '100%', c: '#22c55e', t: '¡Excelente!' },
  ];
  const lvl = levels[score];
  fill.style.width = lvl.w;
  fill.style.background = lvl.c;
  label.textContent = lvl.t;
  label.style.color = lvl.c;
};

window.Pages.loginWithGoogle = async () => {
  try {
    const btns = document.querySelectorAll('.btn-google');
    btns.forEach(b => b.innerHTML = '<span style="animation:spin 0.8s linear infinite; display:inline-block">🔄</span> Conectando...');
    
    // Llamada REAL a Auth de Firebase y Google
    const result = await window.API.loginGoogle();
    
    if (!result) return;
    
    const session = { ...result.user, token: result.token, loginAt: Date.now() };
    localStorage.setItem('automarket_auth', JSON.stringify(session));
    window.updateAuthNav();
    showToast(`¡Autenticado con éxito, ${result.user.name.split(' ')[0]}!`, 'success');
    
    setTimeout(() => {
      // Como a todas las cuentas de Google les dimos Rol Admin en la API, mandaremos al Panel
      window.location.hash = result.user.role === 'admin' ? '#/panel' : '#/mi-cuenta';
    }, 600);
  } catch (err) {
    showToast(err.message || 'Error al iniciar con Google', 'error');
    // Restaurar botones
    const btns = document.querySelectorAll('.btn-google');
    btns.forEach(b => b.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Intentar de nuevo');
  }
};
