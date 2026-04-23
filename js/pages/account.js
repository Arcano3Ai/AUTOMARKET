window.Pages.renderAccount = () => {
    // Read session data dynamically
    let user = { name: 'Invitado', email: '' };
    try {
        const stored = localStorage.getItem('automarket_auth');
        if (stored) user = JSON.parse(stored);
    } catch(e) {}

    const initials = user.name ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'IT';
    const carModel = AUTOMARKET_DB.autos[1] ? `${AUTOMARKET_DB.autos[1].marca} ${AUTOMARKET_DB.autos[1].modelo} ${AUTOMARKET_DB.autos[1].año}` : 'Honda Civic 2022';
    const carImg   = AUTOMARKET_DB.autos[1]?.fotos?.[0] || 'https://placehold.co/80x60/132030/ef4444?text=Auto';
    const carPrice = AUTOMARKET_DB.autos[1] ? `$${AUTOMARKET_DB.autos[1].pago_mensual.toLocaleString()}` : '$5,300';

    return `
      <div class="account-page container animate-fade-in" style="padding-top: calc(var(--nav-h) + var(--sp-8));">
        <div style="margin-bottom: var(--sp-8);">
            <span class="section-label">PORTAL DE CLIENTE</span>
            <h1 style="color:white; font-size:var(--fs-3xl); font-weight:800; margin-top:var(--sp-2)">Mi Cuenta</h1>
        </div>
        
        <div class="account-grid">
          
          <aside class="account-sidebar">
            <div class="account-user">
              <div class="account-avatar" style="background: var(--clr-primary); color:white; font-size:var(--fs-xl); font-weight:800;">${initials}</div>
              <div>
                <h3 style="color:white; margin-bottom:4px; font-size:var(--fs-lg);">${user.name}</h3>
                <p style="color:var(--clr-text-dim); font-size:12px; margin-bottom:4px;">${user.email || 'cliente@ejemplo.com'}</p>
                <p style="color:var(--clr-text-muted); font-size:11px;">Cliente Verificado ✓</p>
              </div>
            </div>
            <nav class="account-nav">
              <a href="#" class="account-nav-item active" onclick="event.preventDefault()">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
                Mis Apartados y Pagos
              </a>
              <a href="#/favoritos" class="account-nav-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                Mis Favoritos
              </a>
              <a href="#" class="account-nav-item" onclick="event.preventDefault(); showToast('Módulo de citas disponible pronto', 'info')">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Citas de Servicio
              </a>
              <a href="#" class="account-nav-item" onclick="event.preventDefault(); showToast('Perfil en construcción', 'info')">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                Editar Perfil
              </a>
              <a href="#" id="btn-account-logout" class="account-nav-item" style="color:#ef4444; margin-top:var(--sp-4)">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Cerrar Sesión
              </a>
            </nav>
          </aside>

          <main class="account-content">
            <!-- Control de Mensualidades -->
            <section>
              <h2 style="color:white; font-size:var(--fs-xl); font-weight:700; margin-bottom:var(--sp-4)">
                💳 Control de Mensualidades
              </h2>
              <div class="order-card" style="border-left: 3px solid var(--clr-primary); margin-bottom:var(--sp-4);">
                <div style="display:flex; gap:16px; align-items:center; flex-wrap:wrap;">
                  <div style="width:48px; height:48px; background:var(--clr-primary-glow); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--clr-primary-light); flex-shrink:0;">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <div style="flex:1;">
                    <h4 style="color:white; margin-bottom:4px; font-weight:700;">Crédito Automarket #8483</h4>
                    <span style="color:var(--clr-text-dim); font-size:13px;">${carModel} · Plazo: 48 meses</span>
                  </div>
                  <div style="text-align:right;">
                    <span class="status-badge status-active" style="display:block; margin-bottom:8px;">Al Corriente ✓</span>
                    <p style="color:white; font-size:15px; font-weight:700;">Próximo Pago: ${carPrice}/mes</p>
                    <p style="color:var(--clr-text-muted); font-size:12px;">Vence el 30 de Abril, 2025</p>
                  </div>
                </div>
                <!-- Progress bar -->
                <div style="margin-top:var(--sp-4); background:var(--clr-surface-high); border-radius:var(--r-full); height:6px; overflow:hidden;">
                  <div style="width:35%; height:100%; background: linear-gradient(90deg, var(--clr-primary-dark), var(--clr-primary-light)); border-radius:var(--r-full);"></div>
                </div>
                <div style="display:flex; justify-content:space-between; margin-top:6px;">
                  <span style="color:var(--clr-text-dim); font-size:11px;">17 de 48 pagos realizados</span>
                  <span style="color:var(--clr-primary-light); font-size:11px; font-weight:700;">35% pagado</span>
                </div>
              </div>

              <button class="btn-primary-md" onclick="showToast('Redirigiendo a pago en línea...', 'info')" style="margin-bottom:var(--sp-8)">
                Realizar Pago en Línea →
              </button>
            </section>

            <!-- Apartados Activos -->
            <section>
              <h2 style="color:white; font-size:var(--fs-xl); font-weight:700; margin-bottom:var(--sp-4)">
                🚗 Apartado Activo
              </h2>
              <div class="order-card">
                <div style="display:flex; gap:16px; align-items:center; flex-wrap:wrap;">
                  <img src="${carImg}" style="width:90px; height:64px; object-fit:cover; border-radius:var(--r-lg); flex-shrink:0;" alt="${carModel}" onerror="this.src='https://placehold.co/90x64/132030/ef4444?text=Auto'">
                  <div style="flex:1;">
                    <h4 style="color:white; margin-bottom:4px; font-weight:700;">${carModel}</h4>
                    <p style="color:var(--clr-text-dim); font-size:13px;">Apartado el: 10/04/2025</p>
                    <p style="color:var(--clr-text-dim); font-size:13px;">Enganche: $50,000 MXN</p>
                  </div>
                  <div style="text-align:right;">
                    <span class="status-badge" style="background:rgba(230,57,70,0.15); color:var(--clr-primary-light); border:1px solid var(--clr-primary); display:block; margin-bottom:8px;">Procesando Trámite</span>
                    <a href="#/catalogo" style="color:var(--clr-text-muted); font-size:12px; text-decoration:underline;">Ver más autos →</a>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    `;
};

window.Pages.renderAccountInit = () => {
    const logoutBtn = document.getElementById('btn-account-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.logout();
        });
    }
};
