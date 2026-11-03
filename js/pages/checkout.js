window.Pages.renderCheckout = (id) => {
  const auto = DB.getById(id);
  if (!auto) { window.location.hash = '#/catalogo'; return ''; }

  return `
    <div class="checkout-page container animate-fade-in">
      
      <!-- PROGRESS BAR -->
      <div class="checkout-progress">
        <div class="cp-step active" id="cp-1">
          <div class="cp-number">1</div>
          <span>Tus Datos</span>
        </div>
        <div class="cp-line"></div>
        <div class="cp-step" id="cp-2">
          <div class="cp-number">2</div>
          <span>Pago</span>
        </div>
        <div class="cp-line"></div>
        <div class="cp-step" id="cp-3">
          <div class="cp-number">3</div>
          <span>Confirmar</span>
        </div>
      </div>

      <div class="checkout-grid">
        <!-- WIZARD FORM -->
        <div class="checkout-form-container animate-slide-up">
          
          <!-- STEP 1: Contact -->
          <div id="step-1" class="checkout-step">
            <h2>Tus datos de contacto</h2>
            <p style="color:var(--clr-text-dim);margin-bottom:var(--sp-6)">Para confirmar el apartado del vehículo.</p>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-4);margin-bottom:var(--sp-4)">
              <div class="form-group">
                <label class="form-label">Nombre *</label>
                <input type="text" id="co-name" class="input-base" placeholder="Nombre completo" required>
              </div>
              <div class="form-group">
                <label class="form-label">Teléfono / WhatsApp *</label>
                <input type="tel" id="co-phone" class="input-base" placeholder="55 1234 5678" required>
              </div>
            </div>
            <div class="form-group" style="margin-bottom:var(--sp-4)">
              <label class="form-label">Correo Electrónico *</label>
              <input type="email" id="co-email" class="input-base" placeholder="tu@correo.com" required>
            </div>
            <div class="form-group" style="margin-bottom:var(--sp-6)">
              <label class="form-label">¿Necesitas financiamiento?</label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-3);margin-top:var(--sp-2)">
                <label class="pay-option" id="fin-si" style="cursor:pointer" onclick="document.getElementById('fin-si').classList.add('active');document.getElementById('fin-no').classList.remove('active')">
                  <input type="radio" name="financing" value="si" style="display:none"> 💳 Sí, quiero crédito
                </label>
                <label class="pay-option active" id="fin-no" style="cursor:pointer" onclick="document.getElementById('fin-no').classList.add('active');document.getElementById('fin-si').classList.remove('active')">
                  <input type="radio" name="financing" value="no" style="display:none"> 💵 Pago de contado
                </label>
              </div>
            </div>
            <button class="btn-primary-lg w-full" onclick="window.Pages.checkoutNext(1)">Continuar →</button>
          </div>

          <!-- STEP 2: Payment -->
          <div id="step-2" class="checkout-step hidden">
            <h2>Anticipo del apartado</h2>
            <p style="color:var(--clr-text-dim);margin-bottom:var(--sp-6)">$5,000 MXN reembolsables si no continúas con la compra.</p>

            <div class="pay-options" style="margin-bottom:var(--sp-6)">
              <div class="pay-option active" style="cursor:default">
                <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <div><div style="font-weight:700;margin-bottom:2px">Efectivo / Transferencia</div><div style="font-size:11px;color:var(--clr-text-dim)">Pago directo al asesor</div></div>
              </div>
            </div>

            <div id="spei-fields" style="background:var(--clr-surface-mid);border:1px solid var(--clr-surface-high);border-radius:var(--r-lg);padding:var(--sp-4)">
              <p style="color:var(--clr-text-muted);font-size:var(--fs-sm);margin-bottom:var(--sp-3)">Al confirmar el apartado:</p>
              <div style="display:flex;flex-direction:column;gap:var(--sp-2);font-size:var(--fs-sm)">
                <div>📞 Un asesor te contactará a la brevedad.</div>
                <div>🏦 Te compartiremos las instrucciones para depositar o hacer transferencia directa.</div>
                <div>💰 Monto requerido: <strong style="color:var(--clr-primary-light)">$5,000.00 MXN</strong></div>
              </div>
            </div>

            <div style="display:flex;gap:var(--sp-3);margin-top:var(--sp-6)">
              <button class="btn-ghost-md" style="flex:1" onclick="window.Pages.checkoutGo(1)">← Regresar</button>
              <button class="btn-primary-lg" style="flex:2" onclick="window.Pages.checkoutNext(2)">Revisar pedido →</button>
            </div>
          </div>

          <!-- STEP 3: Confirm -->
          <div id="step-3" class="checkout-step hidden">
            <h2>Confirma tu apartado</h2>
            <p style="color:var(--clr-text-dim);margin-bottom:var(--sp-6)">Revisa los detalles antes de confirmar.</p>

            <div style="background:var(--clr-surface-mid);border:1px solid var(--clr-surface-high);border-radius:var(--r-xl);padding:var(--sp-5);margin-bottom:var(--sp-6)">
              <div style="display:flex;justify-content:space-between;padding:var(--sp-3) 0;border-bottom:1px solid var(--clr-surface-high);font-size:var(--fs-sm)">
                <span style="color:var(--clr-text-dim)">Vehículo</span>
                <span style="color:white;font-weight:600">${auto.marca} ${auto.modelo} ${auto.año}</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:var(--sp-3) 0;border-bottom:1px solid var(--clr-surface-high);font-size:var(--fs-sm)">
                <span style="color:var(--clr-text-dim)">Precio</span>
                <span style="color:white;font-weight:600">${DB.formatPrecio(auto.precio)}</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:var(--sp-3) 0;border-bottom:1px solid var(--clr-surface-high);font-size:var(--fs-sm)">
                <span style="color:var(--clr-text-dim)">Garantía</span>
                <span style="color:var(--clr-primary-light);font-weight:600">${auto.garantia}</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding-top:var(--sp-3);font-size:var(--fs-lg)">
                <span style="font-weight:700;color:white">Apartado hoy</span>
                <span style="font-weight:800;color:var(--clr-primary-light)">$5,000 MXN</span>
              </div>
            </div>

            <label style="display:flex;gap:12px;align-items:start;color:var(--clr-text-dim);font-size:12px;cursor:pointer;margin-bottom:var(--sp-6)">
              <input type="checkbox" id="co-terms" style="margin-top:3px;accent-color:var(--clr-primary)">
              <span>Acepto los <a href="#" style="color:var(--clr-primary-light)">Términos y Condiciones</a> y el <a href="#" style="color:var(--clr-primary-light)">Aviso de Privacidad</a>. El apartado es reembolsable si no se concreta la compra o no se aprueba el crédito.</span>
            </label>
            
            <div style="display:flex;gap:var(--sp-3)">
              <button class="btn-ghost-md" style="flex:1" onclick="window.Pages.checkoutGo(2)">← Regresar</button>
              <button class="btn-primary-lg" style="flex:2" onclick="window.Pages.checkoutSubmit('${auto.id}', event)">
                🔒 Confirmar Apartado
              </button>
            </div>
            <p style="text-align:center;color:var(--clr-text-muted);font-size:11px;margin-top:var(--sp-3)">
              🛡️ Pago seguro con encriptación SSL 256-bit
            </p>
          </div>

          <!-- STEP SUCCESS -->
          <div id="step-success" class="checkout-step hidden" style="text-align:center;padding:var(--sp-10) 0">
            <div style="font-size:4rem;margin-bottom:var(--sp-4);animation:bounceIn 0.5s ease">🎉</div>
            <h2 style="color:white;font-size:var(--fs-2xl);margin-bottom:var(--sp-3)">¡Apartado Confirmado!</h2>
            <p style="color:var(--clr-text-dim);margin-bottom:var(--sp-6)">Recibirás un correo de confirmación en los próximos minutos. Un asesor te contactará para coordinar la entrega.</p>
            <div id="folio-display" style="background:var(--clr-surface-mid);border:1px dashed var(--clr-primary);border-radius:var(--r-xl);padding:var(--sp-4);margin-bottom:var(--sp-6)">
              <div style="font-size:var(--fs-xs);color:var(--clr-text-dim);margin-bottom:var(--sp-1)">Tu folio de seguimiento</div>
              <div style="font-size:var(--fs-xl);font-weight:800;color:var(--clr-primary-light);letter-spacing:2px">---</div>
            </div>
            <a href="#/" class="btn-primary-lg" style="text-decoration:none;display:inline-block">Ir al Inicio →</a>
          </div>

        </div>

        <!-- ORDER SUMMARY -->
        <aside class="checkout-summary animate-slide-up delay-100">
          <img src="${auto.fotos[0]}" class="summary-img" alt="${auto.marca}" onerror="this.src='https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&w=800&q=80'">
          <div class="summary-body">
            <div style="font-size:var(--fs-xs);color:var(--clr-text-dim);margin-bottom:var(--sp-1)">${auto.categoria}</div>
            <h3>${auto.marca} ${auto.modelo} ${auto.año}</h3>
            <p style="color:var(--clr-text-dim);font-size:var(--fs-sm);margin-bottom:var(--sp-4)">${DB.formatKm(auto.km)} &bull; ${auto.color}</p>
            
            <div class="summary-line"><span>Precio del vehículo</span><span>${DB.formatPrecio(auto.precio)}</span></div>
            <div class="summary-line"><span>Inspección certificada</span><span style="color:var(--clr-primary-light)">✓ Incluida</span></div>
            <div class="summary-line"><span>Garantía ${auto.garantia}</span><span style="color:var(--clr-primary-light)">✓ Incluida</span></div>
            <div class="summary-line"><span>Trámites</span><span style="color:var(--clr-primary-light)">✓ Incluidos</span></div>
            
            <div class="summary-total">
              <span>Apartado hoy</span>
              <span style="color:var(--clr-primary-light)">$5,000 MXN</span>
            </div>

            <div style="margin-top:var(--sp-4);padding:var(--sp-3);background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:var(--r-md)">
              <p style="font-size:11px;color:#10b981;font-weight:600">✓ Reembolsable si no continúas</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
};

window.Pages.checkoutNext = (step) => {
  if (step === 1) {
    const name = document.getElementById('co-name')?.value?.trim();
    const phone = document.getElementById('co-phone')?.value?.trim();
    const email = document.getElementById('co-email')?.value?.trim();
    if (!name || !phone || !email) {
      showToast('Por favor completa todos los campos', 'error'); return;
    }
    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
      showToast('Ingresa un correo válido', 'error'); return;
    }
  }
  if (step === 2) {
    // Ya no hay validación de tarjeta de crédito, es flujo directo
  }
  window.Pages.checkoutGo(step + 1);
};

window.Pages.checkoutGo = (step) => {
  [1,2,3,'success'].forEach(s => {
    const el = document.getElementById(`step-${s}`);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById(`step-${step}`);
  if (target) target.classList.remove('hidden');

  [1,2,3].forEach(s => {
    const dot = document.getElementById(`cp-${s}`);
    if (dot) dot.classList.toggle('active', s <= step);
    if (dot) dot.classList.toggle('done', s < step);
  });
};

window.Pages.checkoutSubmit = async (autoId, evt) => {
  const terms = document.getElementById('co-terms');
  if (!terms?.checked) {
    showToast('Debes aceptar los términos y condiciones', 'error'); return;
  }

  // Deshabilitar botón para evitar doble submit
  const btn = evt?.currentTarget || document.querySelector('#step-3 .btn-primary-lg');
  const originalText = btn ? btn.innerHTML : 'Confirmar';
  if (btn) {
    btn.innerHTML = 'Procesando...';
    btn.disabled = true;
  }

  try {
    const res = await window.API.crearApartado(autoId, { 
      metodoPago: 'efectivo_transferencia',
      datosContacto: { 
        nombre: document.getElementById('co-name')?.value,
        telefono: document.getElementById('co-phone')?.value,
        email: document.getElementById('co-email')?.value
      } 
    });
    
    window.Pages.checkoutGo('success');
    const folioEl = document.getElementById('folio-display');
    if (folioEl) folioEl.querySelector('div:last-child').textContent = res?.folio || 'AMKT-CONFIRMADO';
  } catch (error) {
    showToast('Hubo un error al confirmar el apartado', 'error');
    if (btn) {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }
};

window.Pages.renderCheckoutInit = () => {};
