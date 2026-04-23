/**
 * AUTOMARKET — Sell Page v2
 * Conectado al backend: POST /api/leads
 */
window.Pages.renderSell = () => {
  const years = [];
  for (let y = new Date().getFullYear(); y >= 2010; y--) years.push(y);

  return `
    <div class="animate-fade-in">
      <section class="form-page-hero">
        <div class="container">
          <span class="section-label" style="justify-content:center">Fácil y Rápido · Sin Comisiones</span>
          <h1>Vende tu auto al mejor precio</h1>
          <p>Valuación instantánea gratis. Pagamos en menos de 24 horas tras la inspección.</p>
        </div>
      </section>

      <!-- STATS BAR -->
      <div style="background:var(--clr-surface-low);border-bottom:1px solid var(--clr-surface-high)">
        <div class="container" style="display:flex;justify-content:center;gap:var(--sp-10);padding:var(--sp-4) 0;flex-wrap:wrap">
          ${[['⚡','Valuación en','2 minutos'],['🏠','Inspección a','domicilio gratis'],['💸','Pago en','24 horas'],['📑','Trámites','incluidos']].map(([ic,l1,l2])=>`
            <div style="text-align:center">
              <div style="font-size:22px;margin-bottom:2px">${ic}</div>
              <div style="font-size:11px;color:var(--clr-text-dim);text-transform:uppercase;letter-spacing:0.5px">${l1}</div>
              <div style="font-size:13px;font-weight:700;color:white">${l2}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="container form-layout" style="padding-top:var(--sp-12)">
        <!-- INFO PANEL -->
        <div class="info-panel animate-slide-up delay-100">
          <h2>¿Por qué venderlo con nosotros?</h2>
          <div class="info-list">
            ${[
              ['⚡','Oferta Inmediata','Estimación basada en datos reales de mercado al instante, sin esperas.'],
              ['🏠','Inspección a Domicilio','Nuestros expertos van donde estés, sin costo ni compromiso de venta.'],
              ['💸','Pago en 24 Horas','Transferencia directa a tu cuenta bancaria. 100% seguro.'],
              ['📑','Trámites Resueltos','Nos encargamos de la baja vehicular. ¿Tienes deuda con crédito? La liquidamos.'],
              ['🛡️','Sin Adeudos Ocultos','Revisamos el historial completo antes de hacer la oferta.'],
              ['📱','Todo en Línea','Proceso 100% digital. Firma, documentos y contrato por correo.'],
            ].map(([ic,t,d]) => `
              <div class="info-item">
                <div class="info-item-icon">${ic}</div>
                <div><h3>${t}</h3><p>${d}</p></div>
              </div>
            `).join('')}
          </div>

          <!-- TESTIMONIAL -->
          <div style="margin-top:var(--sp-6);padding:var(--sp-5);background:var(--clr-surface-mid);border-radius:var(--r-xl);border:1px solid var(--clr-surface-high)">
            <div style="display:flex;gap:4px;margin-bottom:var(--sp-2)">
              ${'★'.repeat(5).split('').map(()=>'<span style="color:#f59e0b">★</span>').join('')}
            </div>
            <p style="color:var(--clr-text-muted);font-style:italic;font-size:var(--fs-sm);margin-bottom:var(--sp-3)">"Vendí mi Honda Civic en 2 días. Me dieron mejor precio que el concesionario y el proceso fue increíblemente rápido."</p>
            <div style="font-size:var(--fs-xs);color:var(--clr-text-dim)">— Marco A., Monterrey · Vendió Honda Civic 2021</div>
          </div>
        </div>

        <!-- FORM PANEL -->
        <div class="form-panel animate-slide-up delay-200">
          <!-- SUCCESS STATE (hidden) -->
          <div id="sell-success" style="display:none;text-align:center;padding:var(--sp-10) var(--sp-6)">
            <div style="font-size:4rem;margin-bottom:var(--sp-4)">🎉</div>
            <h2 style="color:white;margin-bottom:var(--sp-3)">¡Solicitud Recibida!</h2>
            <p style="color:var(--clr-text-dim);margin-bottom:var(--sp-2)">Un asesor te contactará en las próximas <strong style="color:white">2 horas</strong> para confirmar la valuación.</p>
            <div id="sell-folio" style="background:var(--clr-surface-mid);border:1px dashed var(--clr-primary);border-radius:var(--r-xl);padding:var(--sp-4);margin:var(--sp-6) 0">
              <div style="font-size:11px;color:var(--clr-text-dim);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px">Tu folio de seguimiento</div>
              <div id="sell-folio-num" style="font-size:var(--fs-xl);font-weight:800;color:var(--clr-primary-light);letter-spacing:2px">---</div>
            </div>
            <button class="btn-ghost-md w-full" onclick="document.getElementById('sell-success').style.display='none';document.getElementById('sell-form-wrap').style.display='block'">
              Enviar otra solicitud
            </button>
          </div>

          <!-- FORM -->
          <div id="sell-form-wrap">
            <h3 class="section-title" style="font-size:var(--fs-2xl);margin-bottom:var(--sp-2)">Cotiza tu auto gratis</h3>
            <p style="color:var(--clr-text-dim);font-size:var(--fs-sm);margin-bottom:var(--sp-6)">Sin compromiso. Te contactamos con la mejor oferta del mercado.</p>

            <form id="sell-form" novalidate>
              <!-- Tu vehículo -->
              <div class="sell-section-label">🚗 Tu vehículo</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-3);margin-bottom:var(--sp-4)">
                <div class="form-group">
                  <label class="form-label">Año *</label>
                  <select class="input-base" id="sell-year" required>
                    <option value="">Selecciona</option>
                    ${years.map(y => `<option value="${y}">${y}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Marca *</label>
                  <select class="input-base" id="sell-brand" required>
                    <option value="">Selecciona</option>
                    ${AUTOMARKET_DB.marcas.map(m => `<option value="${m}">${m}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-3);margin-bottom:var(--sp-4)">
                <div class="form-group">
                  <label class="form-label">Modelo *</label>
                  <input type="text" class="input-base" id="sell-model" placeholder="Ej. Corolla" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Kilometraje *</label>
                  <select class="input-base" id="sell-km" required>
                    <option value="15000">Menos de 20,000 km</option>
                    <option value="35000">20,000 – 50,000 km</option>
                    <option value="65000">50,000 – 80,000 km</option>
                    <option value="100000">Más de 80,000 km</option>
                  </select>
                </div>
              </div>
              <div class="form-group" style="margin-bottom:var(--sp-4)">
                <label class="form-label">Condición general</label>
                <div style="display:flex;gap:var(--sp-2);flex-wrap:wrap">
                  ${['Excelente','Muy bueno','Bueno','Regular'].map((c,i) => `
                    <label class="pay-option ${i===1?'active':''}" style="cursor:pointer;flex:1;min-width:100px;justify-content:center" id="cond-${i}"
                      onclick="document.querySelectorAll('[id^=cond-]').forEach(el=>el.classList.remove('active'));this.classList.add('active');document.getElementById('sell-condicion').value='${c}'">
                      ${c}
                    </label>
                  `).join('')}
                  <input type="hidden" id="sell-condicion" value="Muy bueno">
                </div>
              </div>
              <div class="form-group" style="margin-bottom:var(--sp-6)">
                <label class="form-label">Notas adicionales (opcional)</label>
                <textarea class="input-base" id="sell-notas" rows="2" placeholder="Ej. tiene rines originales, un pequeño rayón en la puerta..."></textarea>
              </div>

              <!-- Tus datos -->
              <div class="sell-section-label">👤 Tus datos de contacto</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-3);margin-bottom:var(--sp-4)">
                <div class="form-group">
                  <label class="form-label">Nombre completo *</label>
                  <input type="text" class="input-base" id="sell-nombre" placeholder="Juan Pérez" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Teléfono / WhatsApp *</label>
                  <input type="tel" class="input-base" id="sell-tel" placeholder="55 1234 5678" required>
                </div>
              </div>
              <div class="form-group" style="margin-bottom:var(--sp-4)">
                <label class="form-label">Correo electrónico *</label>
                <input type="email" class="input-base" id="sell-email" placeholder="tu@correo.com" required>
              </div>

              <!-- ESTIMATED VALUE PREVIEW -->
              <div id="sell-preview" style="display:none;background:linear-gradient(135deg,rgba(235,10,30,0.08),rgba(235,10,30,0.04));border:1px solid rgba(235,10,30,0.2);border-radius:var(--r-xl);padding:var(--sp-4);margin-bottom:var(--sp-4)">
                <div style="font-size:var(--fs-xs);color:var(--clr-text-dim);margin-bottom:4px">Valuación estimada preliminar</div>
                <div id="sell-preview-val" style="font-size:var(--fs-2xl);font-weight:800;color:white"></div>
                <div style="font-size:11px;color:var(--clr-text-muted);margin-top:4px">*Oferta final confirmada tras inspección física</div>
              </div>

              <!-- ERROR -->
              <div id="sell-error" style="display:none;background:rgba(235,10,30,0.1);border:1px solid rgba(235,10,30,0.3);border-radius:var(--r-md);padding:var(--sp-3);font-size:13px;color:#ff6b7a;margin-bottom:var(--sp-4)"></div>

              <button type="submit" id="sell-submit" class="btn-primary-lg w-full">
                Obtener mi valuación gratuita →
              </button>
              <p style="text-align:center;font-size:11px;color:var(--clr-text-muted);margin-top:var(--sp-3)">
                Sin compromiso · Respuesta en 2 horas · WhatsApp o llamada
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
};

window.Pages.renderSellInit = () => {
  const form = document.getElementById('sell-form');
  if (!form) return;

  // Live preview calculation when fields change
  const calcPreview = () => {
    const year = parseInt(document.getElementById('sell-year')?.value);
    const km   = parseInt(document.getElementById('sell-km')?.value);
    if (!year || !km) return;

    const base = 280000 + (year - 2010) * 18000;
    const depr = km / 100000 * 60000;
    const est  = Math.max(80000, base - depr);

    const preview = document.getElementById('sell-preview');
    const val     = document.getElementById('sell-preview-val');
    if (preview && val) {
      val.textContent = DB.formatPrecio(Math.round(est / 5000) * 5000);
      preview.style.display = 'block';
    }
  };

  document.getElementById('sell-year')?.addEventListener('change', calcPreview);
  document.getElementById('sell-km')?.addEventListener('change',   calcPreview);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn     = document.getElementById('sell-submit');
    const errorEl = document.getElementById('sell-error');

    const data = {
      nombre:      document.getElementById('sell-nombre')?.value.trim(),
      email:       document.getElementById('sell-email')?.value.trim(),
      telefono:    document.getElementById('sell-tel')?.value.trim(),
      marca:       document.getElementById('sell-brand')?.value,
      modelo:      document.getElementById('sell-model')?.value.trim(),
      anio:        document.getElementById('sell-year')?.value,
      km:          document.getElementById('sell-km')?.value,
      condicion:   document.getElementById('sell-condicion')?.value,
      descripcion: document.getElementById('sell-notas')?.value.trim(),
    };

    // Validate
    const missing = ['nombre','email','telefono','marca','modelo','anio'].filter(k => !data[k]);
    if (missing.length) {
      errorEl.textContent = 'Por favor completa todos los campos requeridos (*)';
      errorEl.style.display = 'block';
      return;
    }
    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(data.email)) {
      errorEl.textContent = 'Ingresa un correo electrónico válido';
      errorEl.style.display = 'block';
      return;
    }

    btn.textContent = 'Enviando...';
    btn.disabled    = true;
    errorEl.style.display = 'none';

    try {
      const API_BASE = window.AM_CONFIG?.API_BASE;
      let folio;

      if (API_BASE) {
        const res  = await fetch(`${API_BASE}/api/leads`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Error del servidor');
        folio = json.folio;
      } else {
        // Fallback mock
        await new Promise(r => setTimeout(r, 800));
        folio = `LEAD-${Date.now().toString(36).toUpperCase()}`;
      }

      // Show success
      document.getElementById('sell-form-wrap').style.display = 'none';
      document.getElementById('sell-success').style.display   = 'block';
      document.getElementById('sell-folio-num').textContent   = folio;

    } catch (err) {
      errorEl.textContent = err.message || 'Error al enviar solicitud. Intenta de nuevo.';
      errorEl.style.display = 'block';
      btn.textContent = 'Obtener mi valuación gratuita →';
      btn.disabled    = false;
    }
  });
};

window.Pages.calculateValue = () => {}; // Legacy compat
