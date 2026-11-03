window.Pages.renderDashboard = () => {
  const session = JSON.parse(localStorage.getItem('automarket_auth') || '{}');
  if (session.role !== 'admin') {
     return '<div style="margin: 100px auto; max-width:400px; text-align:center"><h2>Acceso Restringido</h2><p>Solo administradores pueden ver este panel.</p><a href="#/" class="btn-primary-md mt-4">Regresar</a></div>';
  }

  return `
    <div class="dashboard-page animate-fade-in">
      <div class="dashboard-layout">
        
        <!-- SIDEBAR -->
        <aside class="dashboard-sidebar">
          <div class="sidebar-brand">
            <div class="sidebar-user">
              <div class="sidebar-avatar">${session.name ? session.name.substring(0,2).toUpperCase() : 'AM'}</div>
              <div class="sidebar-user-info">
                <p style="text-overflow:ellipsis; overflow:hidden; white-space:nowrap">${session.name || 'Admin'}</p>
                <span style="text-overflow:ellipsis; overflow:hidden; white-space:nowrap">${session.email || 'Admin'}</span>
              </div>
            </div>
          </div>
          
          <nav style="display:flex; flex-direction:column; gap:4px;">
            <div class="sidebar-nav-item active">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Resumen
            </div>
            <div class="sidebar-nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Inventario
            </div>
            <div class="sidebar-nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              Valuaciones
            </div>
            <div class="sidebar-nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Financiamientos
            </div>
          </nav>

          <div style="margin-top:auto; padding-top:var(--sp-6); border-top:1px solid var(--clr-surface-high);">
            <div class="sidebar-nav-item" style="color:var(--clr-primary-light)" onclick="window.logout()">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Salir
            </div>
          </div>
        </aside>

        <!-- MAIN DASHBOARD CONTENT -->
        <main class="dashboard-main animate-slide-up delay-100">
          
          <div class="dash-header">
            <div>
              <span class="section-label" style="margin-bottom: var(--sp-1);">Panel de Control 1.0</span>
              <h1>Hola de nuevo, ${session.name ? session.name.split(' ')[0] : 'Admin'} 👋</h1>
            </div>
            <div class="flex gap-4">
              <button class="btn-ghost-md" onclick="window.API.seedFirestore()">Sincronizar BBDD a Firestore</button>
              <button class="btn-primary-md" onclick="document.getElementById('modal-nuevo-ingreso').style.display='flex'">+ Nuevo Ingreso</button>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="dash-stats-grid">
            <div class="dash-stat-card">
              <div class="stat-card-top">
                <span>Ventas (Mes)</span>
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div class="stat-card-value">$8.4M</div>
              <div class="stat-card-trend trend-up">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                +12.4% vs mes anterior
              </div>
            </div>

            <div class="dash-stat-card">
              <div class="stat-card-top">
                <span>Vehículos Activos</span>
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <div class="stat-card-value" id="dash-vehiculos-count">-</div>
              <div class="stat-card-trend trend-up">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                +5 esta semana
              </div>
            </div>

            <div class="dash-stat-card">
              <div class="stat-card-top">
                <span>Solicitudes Trámite</span>
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div class="stat-card-value">28</div>
              <div class="stat-card-trend trend-down">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
                -2% atención requerida
              </div>
            </div>
            
            <div class="dash-stat-card">
              <div class="stat-card-top">
                <span>Leads (Valuaciones)</span>
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div class="stat-card-value">310</div>
              <div class="stat-card-trend trend-up">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                +18.5% campaña FB
              </div>
            </div>
          </div>

          <!-- Inventory Table -->
          <div class="dash-panel">
            <div class="panel-header">
              <h3>Inventario Reciente</h3>
              <button class="btn-ghost-sm">Ver todos</button>
            </div>
            <div class="table-wrapper">
              <table class="dash-table">
                <thead>
                  <tr>
                    <th>Vehículo</th>
                    <th>ID SKU</th>
                    <th>Estado</th>
                    <th>Publicación</th>
                    <th>Precio</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody id="dash-inventory-tbody">
                   <tr><td colspan="6" style="text-align:center; padding:var(--sp-8)">Cargando inventario desde la base de datos... <span style="animation:spin 1s linear infinite; display:inline-block">🔄</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Bottom Grid for activities -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:var(--sp-6);">
            <div class="dash-panel">
              <div class="panel-header">
                <h3>Próximas Evaluaciones</h3>
              </div>
              <div style="padding:var(--sp-4);">
                <div style="display:flex; justify-content:space-between; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid var(--clr-surface-high);">
                  <div>
                    <h4 style="color:white; font-size:var(--fs-sm)">Honda Civic 2021</h4>
                    <span style="color:var(--clr-text-dim); font-size:var(--fs-xs);">Roberto Gómez - A domicilio</span>
                  </div>
                  <span style="color:var(--clr-primary-light); font-weight:600; font-size:var(--fs-sm);">Hoy 16:00</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <div>
                    <h4 style="color:white; font-size:var(--fs-sm)">Mazda CX-5 2020</h4>
                    <span style="color:var(--clr-text-dim); font-size:var(--fs-xs);">Laura P. - En sucursal Sur</span>
                  </div>
                  <span style="color:var(--clr-text-muted); font-weight:600; font-size:var(--fs-sm);">Mañana 10:30</span>
                </div>
              </div>
            </div>

            <div class="dash-panel">
              <div class="panel-header">
                <h3>Peticiones Financiamiento</h3>
              </div>
              <div style="padding:var(--sp-4);">
                <div style="display:flex; justify-content:space-between; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid var(--clr-surface-high);">
                  <div>
                    <h4 style="color:white; font-size:var(--fs-sm)">Toyota Corolla 2023</h4>
                    <span style="color:var(--clr-text-dim); font-size:var(--fs-xs);">Folio #4492 - Carlos M.</span>
                  </div>
                  <span class="status-badge status-active">Aprobada</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <div>
                    <h4 style="color:white; font-size:var(--fs-sm)">Audi Q5 2022</h4>
                    <span style="color:var(--clr-text-dim); font-size:var(--fs-xs);">Folio #4495 - Susana H.</span>
                  </div>
                  <span class="status-badge status-pending">Revisando</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- MODAL NUEVO INGRESO -->
      <div id="modal-nuevo-ingreso" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:999; align-items:center; justify-content:center; padding:var(--sp-4);">
        <div class="animate-slide-up" style="background:var(--clr-surface-mid); border:1px solid var(--clr-surface-high); border-radius:var(--r-2xl); width:100%; max-width:500px; padding:var(--sp-6);">
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--sp-4);">
            <h3 style="color:white; margin:0">+ Nuevo Ingreso</h3>
            <button class="btn-ghost-sm" onclick="document.getElementById('modal-nuevo-ingreso').style.display='none'" style="padding:4px"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
          <style>
             .upload-area { border: 2px dashed var(--clr-surface-high); border-radius: var(--r-xl); padding: var(--sp-8); text-align: center; cursor: pointer; transition: all var(--tr-fast); margin-bottom: var(--sp-4); }
             .upload-area:hover { border-color: var(--clr-primary); background: rgba(255,255,255,0.02); }
             .upload-area.dragover { border-color: var(--clr-primary-light); background: var(--clr-primary-glow); }
             .image-preview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 8px; margin-bottom: var(--sp-4); }
             .image-preview { width: 100%; height: 80px; object-fit: cover; border-radius: var(--r-md); border: 1px solid var(--clr-surface-high); }
          </style>
          <form id="admin-add-car-form" style="padding:var(--sp-6);">
             <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--sp-4); margin-bottom:var(--sp-4);">
               <div class="form-group">
                 <label class="form-label">Marca</label>
                 <select name="marca" class="input-base" required>
                   <option value="">Seleccione...</option>
                   ${AUTOMARKET_DB.marcas.map(m=>`<option value="${m}">${m}</option>`).join('')}
                 </select>
               </div>
               <div class="form-group">
                 <label class="form-label">Modelo y Versión</label>
                 <input type="text" name="modelo" class="input-base" placeholder="Ej. Civic Touring" required>
               </div>
             </div>
             
             <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:var(--sp-4); margin-bottom:var(--sp-4);">
               <div class="form-group">
                 <label class="form-label">Año</label>
                 <input type="number" name="año" class="input-base" min="2000" max="2026" required>
               </div>
               <div class="form-group">
                 <label class="form-label">Kilometraje</label>
                 <input type="number" name="km" class="input-base" required>
               </div>
               <div class="form-group">
                 <label class="form-label">Precio ($)</label>
                 <input type="number" name="precio" class="input-base" required>
               </div>
             </div>

             <div class="form-group">
               <label class="form-label">Fotografías del Vehículo</label>
               <div class="upload-area" id="drop-zone">
                 <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color:var(--clr-text-dim); margin-bottom:8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                 <p style="color:white; font-weight:700; margin-bottom:4px;">Arrastra y suelta tus imágenes</p>
                 <p style="color:var(--clr-text-dim); font-size:12px;">Formatos: JPG, PNG, WEBP. Máx 5MB.</p>
                 <input type="file" id="file-input" multiple accept="image/*" style="display:none;">
               </div>
               <div class="image-preview-grid" id="preview-grid"></div>
             </div>

             <button type="submit" id="btn-submit-car" class="btn-primary-lg w-full">Guardar en Base de Datos</button>
          </form>
        </div>
      </div>
    </div>
  `;
};

window.Pages.renderDashboardInit = async () => {
    // -------------------------------------------------
    // LOAD INVENTORY FROM DB (Real or Mock)
    // -------------------------------------------------
    const tbody = document.getElementById('dash-inventory-tbody');
    const lblCount = document.getElementById('dash-vehiculos-count');
    if(tbody) {
        try {
            const inventario = await window.API.getInventory() || [];
            if (lblCount) lblCount.textContent = inventario.length;
            
            if(inventario.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:var(--sp-6);">No hay vehículos registrados en BBDD</td></tr>';
            } else {
                tbody.innerHTML = inventario.map(a => `
                    <tr>
                        <td>
                        <div class="car-cell">
                            <img src="${a.fotos && a.fotos.length > 0 ? a.fotos[0] : 'https://placehold.co/100x70?text=No+Img'}" alt="${a.marca}">
                            <div>
                            <strong>${a.marca} ${a.modelo} ${a.año}</strong>
                            <span style="color:var(--clr-text-muted)">${a.km.toLocaleString()} km &bull; ${a.color}</span>
                            </div>
                        </div>
                        </td>
                        <td>#AMK-${140500 + Number(a.id || 0)}</td>
                        <td>
                        <span class="status-badge ${a.destacado ? 'status-active' : 'status-pending'}">
                            ${a.destacado ? 'Publicado (Dest)' : 'Publicado'}
                        </span>
                        </td>
                        <td>Reciente</td>
                        <td><strong>$ ${Number(a.precio).toLocaleString('es-MX')}</strong></td>
                        <td>
                        <button class="btn-ghost-sm" style="padding:4px;" onclick="showToast('Editando modelo...')">
                            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button class="btn-ghost-sm" style="padding:4px; color:var(--clr-primary-light)" onclick="showToast('Suspendiendo vehículo')">
                            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                        </button>
                        </td>
                    </tr>
                `).join('');
            }
        } catch (e) {
            console.error("Dashboard error loading DB:", e);
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:var(--sp-6); color:var(--clr-primary)">Error cargando BBDD.</td></tr>';
        }
    }

    // Modify active tabs
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelectorAll('.sidebar-nav-item').forEach(i => i.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    // Image Upload Logic
    const dropZone   = document.getElementById('drop-zone');
    const fileInput  = document.getElementById('file-input');
    const previewGrid = document.getElementById('preview-grid');
    let uploadedImageUrls = [];

    if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); handleFiles(e.dataTransfer.files); });
        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
    }

    async function handleFiles(files) {
        for (let file of files) {
            showToast('Subiendo ' + file.name + '...', 'info');
            try {
                const res = await window.API.uploadImage(file);
                uploadedImageUrls.push(res.url);
                const img = document.createElement('img');
                img.src = res.url;
                img.className = 'image-preview animate-fade-in';
                previewGrid?.appendChild(img);
            } catch(e) { showToast('Error al subir imagen', 'error'); }
        }
        showToast('Imágenes procesadas correctamente', 'success');
    }

    const addForm  = document.getElementById('admin-add-car-form');
    const btnSubmit = document.getElementById('btn-submit-car');
    if (addForm) {
        addForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            btnSubmit.innerHTML = 'Procesando...';
            btnSubmit.disabled  = true;
            const formData = new FormData(addForm);
            const data     = Object.fromEntries(formData.entries());
            data.año = parseInt(data.año);
            data.km  = parseInt(data.km);
            data.precio = parseInt(data.precio);
            data.fotos = uploadedImageUrls.length > 0 ? uploadedImageUrls : ['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800'];
            data.categoria = 'Sedán';
            try {
                await window.API.addAuto(data);
                showToast('Vehículo agregado al inventario ✅', 'success');
                document.getElementById('modal-nuevo-ingreso').style.display = 'none';
                addForm.reset();
                if (previewGrid) previewGrid.innerHTML = '';
                uploadedImageUrls = [];
                // Re-render async table
                window.Pages.renderDashboardInit();
            } catch(error) {
                showToast('Error al guardar: ' + error.message, 'error');
            } finally {
                btnSubmit.innerHTML = 'Guardar en Base de Datos';
                btnSubmit.disabled  = false;
            }
        });
    }

    // ─────────────────────────────────────────────────
    // LOAD REAL STATS FROM BACKEND API
    // ─────────────────────────────────────────────────
    async function loadDashboardStats() {
        const API_BASE = window.AM_CONFIG?.API_BASE;
        if (!API_BASE) return;

        try {
            const session = JSON.parse(localStorage.getItem('automarket_auth') || '{}');
            const token   = session.token;
            if (!token) return;

            const res   = await fetch(`${API_BASE}/api/admin/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) return;
            const stats = await res.json();

            // Update stat cards if they exist
            const patches = {
                'stat-inventario-activo': stats.inventario?.activos?.toLocaleString(),
                'stat-inventario-total':  stats.inventario?.total?.toLocaleString(),
                'stat-leads-total':       stats.leads?.total?.toLocaleString(),
                'stat-leads-nuevos':      stats.leads?.nuevos?.toLocaleString(),
                'stat-apartados-total':   stats.transacciones?.apartados?.toLocaleString(),
                'stat-citas-total':       stats.citas?.total?.toLocaleString(),
                'stat-api-mode':          stats.mode === 'live' ? '🔥 Live' : '🧪 Demo',
            };
            Object.entries(patches).forEach(([id, val]) => {
                const el = document.getElementById(id);
                if (el && val !== undefined) el.textContent = val;
            });

            // Load leads table
            if (stats.leads?.total > 0 || stats.mode === 'demo') {
                await loadLeadsTable(token, API_BASE);
            }
        } catch(e) {
            console.warn('[Dashboard] Stats load failed:', e);
        }
    }

    async function loadLeadsTable(token, API_BASE) {
        const container = document.getElementById('leads-table-body');
        if (!container) return;

        try {
            const res  = await fetch(`${API_BASE}/api/leads`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) return;
            const { data, mode } = await res.json();

            if (!data?.length) {
                container.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--clr-text-muted);padding:var(--sp-6)">
                    ${mode === 'demo' ? 'Sin leads aún — el formulario de venta enviará leads aquí' : 'Sin leads registrados aún'}
                </td></tr>`;
                return;
            }

            const statusColors = {
                'nuevo':      '#3b82f6',
                'contactado': '#f59e0b',
                'valuado':    '#8b5cf6',
                'cerrado':    '#10b981',
            };

            container.innerHTML = data.slice(0, 20).map(lead => `
                <tr style="border-bottom:1px solid var(--clr-surface-high)">
                    <td style="padding:var(--sp-3) var(--sp-4);font-weight:600;color:var(--clr-primary-light);font-size:12px">${lead.folio || '—'}</td>
                    <td style="padding:var(--sp-3) var(--sp-4)">
                        <div style="font-weight:600;color:white">${lead.nombre || '—'}</div>
                        <div style="font-size:11px;color:var(--clr-text-muted)">${lead.email || ''}</div>
                    </td>
                    <td style="padding:var(--sp-3) var(--sp-4);color:var(--clr-text-muted);font-size:13px">${lead.telefono || '—'}</td>
                    <td style="padding:var(--sp-3) var(--sp-4)">
                        <div style="font-size:13px;color:white">${lead.vehiculo?.marca || '?'} ${lead.vehiculo?.modelo || ''}</div>
                        <div style="font-size:11px;color:var(--clr-text-muted)">${lead.vehiculo?.anio || ''} · ${(lead.vehiculo?.km || 0).toLocaleString()} km</div>
                    </td>
                    <td style="padding:var(--sp-3) var(--sp-4)">
                        <span style="background:${statusColors[lead.status] || '#64748b'}22;color:${statusColors[lead.status] || '#64748b'};border:1px solid ${statusColors[lead.status] || '#64748b'}44;border-radius:12px;padding:2px 10px;font-size:11px;font-weight:700;text-transform:uppercase">
                            ${lead.status || 'nuevo'}
                        </span>
                    </td>
                    <td style="padding:var(--sp-3) var(--sp-4);font-size:11px;color:var(--clr-text-muted)">${new Date(lead.createdAt).toLocaleDateString('es-MX')}</td>
                </tr>
            `).join('');

        } catch(e) {
            container.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--clr-text-muted)">Error al cargar leads</td></tr>';
        }
    }

    // AUTO-LOAD stats on init
    setTimeout(loadDashboardStats, 300);
    window.DashboardAPI = { loadDashboardStats };
};


