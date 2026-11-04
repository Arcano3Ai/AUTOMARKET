window.Pages.renderDetail = (id) => {
  const auto = DB.getById(id);
  if (!auto) {
    return `
      <div class="container section text-center animate-fade-in" style="min-height:60vh;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:var(--sp-6)">
        <div style="font-size:5rem">🚗</div>
        <h2 class="section-title">Vehículo no encontrado</h2>
        <p class="section-subtitle">El auto que buscas pudo haber sido vendido o no existe en nuestro inventario.</p>
        <a href="#/catalogo" class="btn-primary-md">Ver Catálogo Completo</a>
      </div>`;
  }

  const similares = DB.getSimilares(auto, 3);
  const isFav = window.Wishlist && window.Wishlist.getFavorites().includes(auto.id);
  const waText = encodeURIComponent(`Hola, me interesa este auto: ${auto.marca} ${auto.modelo} ${auto.año} - ${window.location.href}`);
  const waLink = `https://wa.me/525590000000?text=${waText}`;
  const waShareMsg = encodeURIComponent(`🚗 *${auto.marca} ${auto.modelo} ${auto.año}* en AUTOMARKET México 🏁\n💰 Precio: $${auto.precio.toLocaleString('es-MX')} MXN\n✅ Garantía de 120 puntos certificada\n\n👉 Ver fotos y ficha técnica aquí:\n${window.location.href}`);
  const waShareLink = `https://api.whatsapp.com/send?text=${waShareMsg}`;

  return `
    <div class="detail-page container animate-fade-in">

      <!-- BREADCRUMB -->
      <nav style="padding-top:calc(var(--nav-h) + var(--sp-4));margin-bottom:var(--sp-4);display:flex;align-items:center;gap:var(--sp-2);font-size:var(--fs-xs);color:var(--clr-text-dim)">
        <a href="#/" style="color:var(--clr-text-dim);text-decoration:none;transition:color 0.2s" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--clr-text-dim)'">Inicio</a>
        <span>/</span>
        <a href="#/catalogo" style="color:var(--clr-text-dim);text-decoration:none;transition:color 0.2s" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--clr-text-dim)'">Catálogo</a>
        <span>/</span>
        <span style="color:white;font-weight:600">${auto.marca} ${auto.modelo} ${auto.año}</span>
      </nav>

      <!-- GALLERY WITH THUMBNAILS -->
      <div class="detail-gallery-wrap">
        <div class="main-photo-wrap">
          <img id="main-photo" src="${auto.fotos[0]}" alt="${auto.marca} ${auto.modelo}" class="main-photo"
            onerror="this.src='https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&w=800&q=80'">
          ${auto.verificado ? '<span class="photo-badge">✓ Verificado</span>' : ''}
          <button class="photo-expand-btn" onclick="window.Pages.openGallery(${auto.id})" title="Ver galería completa">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            Ver ${auto.fotos.length} fotos
          </button>
        </div>
        ${auto.fotos.length > 1 ? `
        <div class="thumb-strip" id="thumb-strip">
          ${auto.fotos.map((f, i) => `
            <img src="${f}" alt="foto ${i+1}" class="thumb ${i===0?'active':''}"
              onclick="document.getElementById('main-photo').src=this.src; document.querySelectorAll('.thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active')"
              onerror="this.src='https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&w=800&q=80'">
          `).join('')}
        </div>` : ''}
      </div>

      <!-- DETAIL LAYOUT -->
      <div class="detail-layout">
        
        <!-- MAIN CONTENT -->
        <div class="detail-main">
          <div class="detail-header">
            <div style="display:flex;align-items:center;gap:var(--sp-3);flex-wrap:wrap;margin-bottom:var(--sp-2)">
              <span class="section-label" style="font-size:11px">${auto.categoria}</span>
              ${auto.destacado ? '<span style="background:var(--clr-primary);color:white;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:0.5px">DESTACADO</span>' : ''}
            </div>
            <h1 style="font-size:var(--fs-3xl);font-weight:800;color:white;margin-bottom:var(--sp-2)">${auto.marca} ${auto.modelo} ${auto.año}</h1>
            <p style="color:var(--clr-text-dim);font-size:var(--fs-md)">${auto.motor} &bull; ${auto.transmision} &bull; ${auto.color}</p>
          </div>

          <!-- SPEC PILLS -->
          <div class="specs-grid">
            <div class="spec-item">
              <svg width="20" height="20" fill="none" stroke="var(--clr-primary)" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg>
              <span class="spec-value">${DB.formatKm(auto.km)}</span>
              <span class="spec-label">Km</span>
            </div>
            <div class="spec-item">
              <svg width="20" height="20" fill="none" stroke="var(--clr-primary)" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              <span class="spec-value">${auto.ciudad}</span>
              <span class="spec-label">Ubicación</span>
            </div>
            <div class="spec-item">
              <svg width="20" height="20" fill="none" stroke="var(--clr-primary)" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/></svg>
              <span class="spec-value">${auto.combustible}</span>
              <span class="spec-label">Combustible</span>
            </div>
            <div class="spec-item">
              <svg width="20" height="20" fill="none" stroke="var(--clr-primary)" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              <span class="spec-value">${auto.transmision.split(' ')[0]}</span>
              <span class="spec-label">Transmisión</span>
            </div>
          </div>

          <!-- DESCRIPCION -->
          <div class="detail-section">
            <h3 class="detail-section-title">Descripción del Vehículo</h3>
            <p style="color:var(--clr-text-muted);line-height:1.8;font-size:var(--fs-md)">${auto.descripcion}</p>
          </div>

          <!-- FEATURES -->
          <div class="detail-section">
            <h3 class="detail-section-title">Equipamiento Destacado</h3>
            <div class="features-list">
              ${auto.caracteristicas.map(c => `
                <div class="feature-item">
                  <svg class="feature-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                  ${c}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- INLINE CREDIT CALCULATOR -->
          <div class="detail-section">
            <h3 class="detail-section-title">Calcula tu Mensualidad</h3>
            <div class="inline-calc" id="inline-calc">
              <div class="calc-row">
                <label>Enganche</label>
                <span id="calc-enganche-val" style="color:var(--clr-primary-light);font-weight:700">${DB.formatPrecio(Math.round(auto.precio * 0.2))}</span>
              </div>
              <input type="range" id="calc-enganche" min="10" max="60" value="20" step="5" class="calc-slider"
                oninput="window.Pages.updateCalc(${auto.precio})">

              <div class="calc-row" style="margin-top:var(--sp-4)">
                <label>Plazo</label>
                <span id="calc-plazo-val" style="color:var(--clr-primary-light);font-weight:700">24 meses</span>
              </div>
              <input type="range" id="calc-plazo" min="12" max="60" value="24" step="12" class="calc-slider"
                oninput="window.Pages.updateCalc(${auto.precio})">

              <div class="calc-result" id="calc-result">
                <div>
                  <div style="font-size:var(--fs-xs);color:var(--clr-text-dim);margin-bottom:4px">Mensualidad Estimada</div>
                  <div id="calc-monthly" style="font-size:var(--fs-2xl);font-weight:800;color:white">${DB.formatPrecio(auto.pago_mensual)}</div>
                  <div style="font-size:var(--fs-xs);color:var(--clr-text-dim);margin-top:4px">*Tasa referencial 12% anual</div>
                </div>
                <a href="#/financiamiento" class="btn-ghost-sm" style="align-self:center;white-space:nowrap">Ver opciones →</a>
              </div>
            </div>
          </div>
        </div>

        <!-- SIDEBAR -->
        <aside>
          <div class="detail-sidebar">
            <div class="price-block">
              <div style="font-size:var(--fs-xs);color:var(--clr-text-dim);margin-bottom:var(--sp-1)">Precio de venta</div>
              <div class="price-tag">${DB.formatPrecio(auto.precio)}</div>
              <div class="financing-est">
                <span>Desde</span>
                <strong>${DB.formatPrecio(auto.pago_mensual)}/mes</strong>
              </div>
            </div>

            <div class="guarantee-box">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div class="guarantee-text">
                <h4>Garantía AUTOMARKET</h4>
                <p>${auto.garantia} · Inspección 120 puntos</p>
              </div>
            </div>

            <a href="#/checkout/${auto.id}" class="btn-primary-lg w-full" style="margin-bottom:var(--sp-3);text-align:center;display:block;text-decoration:none">
              🔒 Apartar por $5,000
            </a>

            <button class="btn-ghost-md w-full" style="margin-bottom:var(--sp-2)" onclick="window.AIAgent.toggle(); setTimeout(()=>window.AIAgent.handleChipClick('Quiero información sobre ${auto.marca} ${auto.modelo}'),400)">
              💬 Hablar con Axel AI
            </button>

            <button class="btn-wish-toggle ${isFav ? 'active':''} w-full" data-id="${auto.id}"
              onclick="event.preventDefault(); window.Wishlist.toggleFavorite('${auto.id}'); this.classList.toggle('active')"
              style="width:100%;border-radius:var(--r-md);background:transparent;display:flex;gap:8px;align-items:center;justify-content:center">
              <svg width="18" height="18" fill="${isFav?'currentColor':'none'}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span style="font-size:var(--fs-sm);font-weight:700">${isFav ? 'Guardado ✓' : 'Guardar Favorito'}</span>
            </button>

            <!-- SHARE & WHATSAPP -->
            <div style="display:flex;gap:var(--sp-2);margin-top:var(--sp-4);padding-top:var(--sp-4);border-top:1px solid var(--clr-surface-high)">
              <button onclick="window.shareAuto ? window.shareAuto(${auto.id}) : (navigator.clipboard.writeText(window.location.href).then(()=>showToast('Link copiado','success')))"
                class="btn-ghost-sm" style="flex:1;font-size:11px" title="Compartir">
                🔗 Compartir
              </button>
              <a href="${waShareLink}" target="_blank" rel="noopener noreferrer"
                class="btn-ghost-sm" style="flex:1.2;font-size:11px;text-decoration:none;text-align:center;color:#22C55E;font-weight:700" title="Compartir en WhatsApp">
                📲 Compartir WA
              </a>
              <a href="${waLink}" target="_blank" rel="noopener noreferrer"
                class="btn-ghost-sm" style="flex:1;font-size:11px;text-decoration:none;text-align:center" title="Contactar asesor">
                💬 Asesor
              </a>
            </div>
          </div>
        </aside>
      </div>

      <!-- SIMILARES -->
      ${similares.length > 0 ? `
        <div class="detail-section" style="margin-top:var(--sp-20)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sp-8);flex-wrap:wrap;gap:var(--sp-4)">
            <h2 class="section-title" style="margin:0">Te podría interesar</h2>
            <a href="#/catalogo" class="btn-ghost-sm">Ver más →</a>
          </div>
          <div class="autos-grid">${similares.map(a => AutoCard(a)).join('')}</div>
        </div>
      ` : ''}

      <!-- MOBILE STICKY ACTION BAR -->
      <div class="mobile-sticky-bar">
        <div class="mobile-sticky-price">
          <span class="ms-lbl">Precio de contado</span>
          <span class="ms-price">${DB.formatPrecio(auto.precio)}</span>
          <span class="ms-sub">${DB.formatPrecio(auto.pago_mensual)}/mes</span>
        </div>
        <div class="mobile-sticky-actions">
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-wa-round" title="WhatsApp Asesor">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.68 7.5 8.46 7.74C8.24 7.97 7.63 8.55 7.63 9.71C7.63 10.87 8.48 11.99 8.6 12.15C8.72 12.31 10.26 14.68 12.63 15.7C13.2 15.94 13.64 16.09 13.98 16.2C14.56 16.38 15.08 16.36 15.5 16.3C15.96 16.23 16.92 15.72 17.12 15.16C17.32 14.6 17.32 14.12 17.26 14.02C17.2 13.92 17.04 13.86 16.8 13.74C16.56 13.62 15.38 13.04 15.16 12.96C14.94 12.88 14.78 12.84 14.62 13.08C14.46 13.32 14 13.9 13.86 14.06C13.72 14.22 13.58 14.24 13.34 14.12C13.1 14 12.33 13.75 11.42 12.94C10.71 12.31 10.23 11.53 10.09 11.29C9.95 11.05 10.08 10.92 10.2 10.8C10.31 10.69 10.45 10.51 10.57 10.37C10.69 10.23 10.73 10.13 10.81 9.97C10.89 9.81 10.85 9.67 10.79 9.55C10.73 9.43 10.27 8.3 10.08 7.82C9.89 7.36 9.7 7.42 9.55 7.41C9.41 7.4 9.25 7.4 9.11 7.44Z"/></svg>
          </a>
          <a href="#/checkout/${auto.id}" class="ms-buy-btn">
            Apartar Auto
          </a>
        </div>
      </div>
    </div>
  `;
};

window.Pages.updateCalc = (precio) => {
  const enganchePct = parseInt(document.getElementById('calc-enganche').value);
  const plazo = parseInt(document.getElementById('calc-plazo').value);
  const enganche = precio * (enganchePct / 100);
  const financiado = precio - enganche;
  const tasaMensual = 0.12 / 12;
  const mensualidad = financiado * (tasaMensual * Math.pow(1+tasaMensual, plazo)) / (Math.pow(1+tasaMensual, plazo) - 1);

  document.getElementById('calc-enganche-val').textContent = DB.formatPrecio(Math.round(enganche)) + ` (${enganchePct}%)`;
  document.getElementById('calc-plazo-val').textContent = `${plazo} meses`;
  document.getElementById('calc-monthly').textContent = DB.formatPrecio(Math.round(mensualidad));
};

window.Pages.openGallery = (id) => {
  const auto = DB.getById(id);
  if (!auto) return;
  const html = `
    <div style="display:flex;flex-direction:column;gap:12px;max-height:80vh;overflow-y:auto">
      ${auto.fotos.map((f,i) => `<img src="${f}" alt="foto ${i+1}" style="width:100%;border-radius:12px;display:block">`).join('')}
    </div>`;
  openModal(html);
};

window.shareAuto = (id) => {
  const auto = DB.getById(id);
  if (!auto) return;
  const shareData = {
    title: `${auto.marca} ${auto.modelo} ${auto.año} | AUTOMARKET`,
    text: `🚗 Mira este ${auto.marca} ${auto.modelo} ${auto.año} ($${auto.precio.toLocaleString('es-MX')} MXN) en AUTOMARKET México. 100% garantizado:`,
    url: window.location.href
  };
  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('Enlace copiado al portapapeles. ¡Listo para compartir en WhatsApp!', 'success');
    });
  }
};
