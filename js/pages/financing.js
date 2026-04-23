window.Pages.renderFinancing = () => {
  return `
    <div class="animate-fade-in">
      <section class="form-page-hero">
        <div class="container">
          <span class="section-label" style="justify-content:center">Plan a tu Medida</span>
          <h1>Calculadora de Financiamiento</h1>
          <p>Encuentra el plazo y mensualidad perfectos para estrenar hoy mismo de forma transparente.</p>
        </div>
      </section>

      <div class="container form-layout">
        
        <!-- Calculator Form -->
        <div class="form-panel animate-slide-up delay-100">
          <h3 class="section-title" style="font-size:var(--fs-2xl); margin-bottom:var(--sp-6);">Personaliza tu crédito</h3>
          
          <div class="input-group" style="margin-bottom:var(--sp-6)">
            <label class="input-label">Precio del Vehículo ($)</label>
            <input type="number" id="fin-price" class="input-field" value="350000" step="10000">
          </div>

          <div class="input-group" style="margin-bottom:var(--sp-6)">
            <div class="flex justify-between items-center mb-2">
              <label class="input-label">Enganche (%)</label>
              <span id="eng-percent-val" class="fw-bold" style="color:var(--clr-primary-light)">20%</span>
            </div>
            <div class="range-wrap">
              <input type="range" id="fin-downpayment" min="10" max="80" value="20" step="5">
              <div class="range-value-display">
                <span id="eng-money-val">$70,000</span>
              </div>
            </div>
          </div>

          <div class="input-group" style="margin-bottom:var(--sp-8)">
            <label class="input-label">Plazo (meses)</label>
            <div class="flex gap-4">
              <label class="filter-label" style="flex:1; background:var(--clr-surface-mid); padding:var(--sp-3); border-radius:var(--r-md); justify-content:center;">
                <input type="radio" name="fin-term" value="12"> 12
              </label>
              <label class="filter-label" style="flex:1; background:var(--clr-surface-mid); padding:var(--sp-3); border-radius:var(--r-md); justify-content:center;">
                <input type="radio" name="fin-term" value="24"> 24
              </label>
              <label class="filter-label" style="flex:1; background:var(--clr-surface-mid); padding:var(--sp-3); border-radius:var(--r-md); justify-content:center;">
                <input type="radio" name="fin-term" value="36" checked> 36
              </label>
              <label class="filter-label" style="flex:1; background:var(--clr-surface-mid); padding:var(--sp-3); border-radius:var(--r-md); justify-content:center;">
                <input type="radio" name="fin-term" value="48"> 48
              </label>
              <label class="filter-label" style="flex:1; background:var(--clr-surface-mid); padding:var(--sp-3); border-radius:var(--r-md); justify-content:center;">
                <input type="radio" name="fin-term" value="60"> 60
              </label>
            </div>
          </div>

          <div class="result-card">
            <div class="result-label">Pago Mensual Estimado</div>
            <div class="result-value" id="fin-result">---</div>
            <p style="color:var(--clr-text-muted); font-size:var(--fs-xs); margin-top:var(--sp-2);">Tasa de interés fija anual 13.99% (CAT 15.2%). Cálculos informativos.</p>
          </div>

          <button class="btn-primary-lg w-full" style="margin-top:var(--sp-6);" onclick="showToast('Solicitud iniciada de forma segura')">Iniciar Solicitud de Crédito</button>

        </div>

        <!-- Info Panel -->
        <div class="info-panel animate-slide-up delay-200">
          <h2>Ventajas de nuestro financiamiento</h2>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-icon">⚡</div>
              <div>
                <h3>Aprobación Rápida</h3>
                <p>Pre-aprobación en 2 minutos directamente en la plataforma, sin llamadas telefónicas.</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-icon">🔓</div>
              <div>
                <h3>Sin Penalización por Prepago</h3>
                <p>Adelanta mensualidades o liquida antes sin ninguna comisión adicional.</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-icon">🏦</div>
              <div>
                <h3>Multi-banco</h3>
                <p>Comparamos opciones entre las mejores instituciones para ofrecerte la tasa más baja posible.</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-icon">📱</div>
              <div>
                <h3>Todo 100% Digital</h3>
                <p>Firma tus documentos desde el celular con tecnología de biometría segura.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
};

window.Pages.renderFinancingInit = () => {
  const priceInput = document.getElementById('fin-price');
  const engInput = document.getElementById('fin-downpayment');
  const termInputs = document.querySelectorAll('input[name="fin-term"]');
  
  const engPctVal = document.getElementById('eng-percent-val');
  const engMoneyVal = document.getElementById('eng-money-val');
  const resultVal = document.getElementById('fin-result');

  const updateCalculations = () => {
    let price = parseFloat(priceInput.value) || 0;
    let engPct = parseFloat(engInput.value);
    
    // Get term
    let term = 36;
    termInputs.forEach(r => { if(r.checked) term = parseInt(r.value); });

    let downPaymentAmount = price * (engPct / 100);
    let loanAmount = price - downPaymentAmount;

    engPctVal.innerText = engPct + '%';
    engMoneyVal.innerText = DB.formatPrecio(downPaymentAmount);

    if (price <= 0 || loanAmount <= 0) {
      resultVal.innerText = '$0';
      return;
    }

    // Formula de amortizacion basica
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1]
    const annualInterestRate = 0.1399; // 13.99%
    const monthlyRate = annualInterestRate / 12;
    
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);

    resultVal.innerHTML = `${DB.formatPrecio(Math.round(monthlyPayment))} <span style="font-size:var(--fs-sm);color:var(--clr-text-muted);font-weight:400">/mes</span>`;
  };

  priceInput.addEventListener('input', updateCalculations);
  engInput.addEventListener('input', updateCalculations);
  termInputs.forEach(r => r.addEventListener('change', updateCalculations));

  // Init call
  updateCalculations();
};
