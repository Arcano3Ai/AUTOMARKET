window.Pages.renderCompare = () => {
  return `
    <div class="compare-page container animate-fade-in">
      <div class="compare-header">
        <h1>Comparador de Vehículos</h1>
        <p style="color:var(--clr-text-muted); font-size:var(--fs-lg);">Selecciona dos vehículos para comparar sus especificaciones lado a lado.</p>
      </div>

      <div class="compare-selector-grid">
        <div class="compare-select-box">
          <label style="display:block; margin-bottom:8px; color:white; font-weight:700">Vehículo 1</label>
          <select id="compare-1" class="input-base" style="width:100%" onchange="window.Pages.updateComparison()">
            <option value="">Seleccionar vehículo...</option>
            ${DB.getAll().map(a => `<option value="${a.id}">${a.marca} ${a.modelo} ${a.año}</option>`).join('')}
          </select>
        </div>
        <div class="compare-select-box">
          <label style="display:block; margin-bottom:8px; color:white; font-weight:700">Vehículo 2</label>
          <select id="compare-2" class="input-base" style="width:100%" onchange="window.Pages.updateComparison()">
            <option value="">Seleccionar vehículo...</option>
            ${DB.getAll().map(a => `<option value="${a.id}">${a.marca} ${a.modelo} ${a.año}</option>`).join('')}
          </select>
        </div>
      </div>

      <div id="compare-results">
        <!-- Renders automatically -->
        <div style="text-align:center; padding:var(--sp-12); color:var(--clr-surface-high);">
            <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
            <p style="margin-top:var(--sp-4);">Esperando selección...</p>
        </div>
      </div>

    </div>
  `;
};

window.Pages.updateComparison = () => {
    const id1 = document.getElementById('compare-1').value;
    const id2 = document.getElementById('compare-2').value;
    const resultsDiv = document.getElementById('compare-results');

    if (!id1 || !id2) return;

    const a1 = DB.getById(id1);
    const a2 = DB.getById(id2);

    resultsDiv.innerHTML = `
      <div class="animate-slide-up">
        <table class="compare-table">
          <thead>
            <tr>
              <th style="text-align:left;">Especificaciones</th>
              <th>
                <img src="${a1.fotos[0]}" class="compare-table-img">
                <h3 style="color:white; font-size:var(--fs-xl)">${a1.marca} ${a1.modelo}</h3>
                <span class="text-dim">${a1.año}</span>
              </th>
              <th>
                <img src="${a2.fotos[0]}" class="compare-table-img">
                <h3 style="color:white; font-size:var(--fs-xl)">${a2.marca} ${a2.modelo}</h3>
                <span class="text-dim">${a2.año}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="spec-label">Precio</td>
              <td style="color:white; font-weight:bold; font-size:var(--fs-lg)">${DB.formatPrecio(a1.precio)}</td>
              <td style="color:white; font-weight:bold; font-size:var(--fs-lg)">${DB.formatPrecio(a2.precio)}</td>
            </tr>
            <tr>
              <td class="spec-label">Kilometraje</td>
              <td>${DB.formatKm(a1.km)}</td>
              <td>${DB.formatKm(a2.km)}</td>
            </tr>
            <tr>
              <td class="spec-label">Mensualidad Ext.</td>
              <td>${DB.formatPrecio(a1.pago_mensual)}/mes</td>
              <td>${DB.formatPrecio(a2.pago_mensual)}/mes</td>
            </tr>
            <tr>
              <td class="spec-label">Motor</td>
              <td>${a1.motor || 'N/A'}</td>
              <td>${a2.motor || 'N/A'}</td>
            </tr>
            <tr>
              <td class="spec-label">Transmisión</td>
              <td>${a1.transmision}</td>
              <td>${a2.transmision}</td>
            </tr>
            <tr>
              <td class="spec-label">Combustible</td>
              <td>${a1.combustible}</td>
              <td>${a2.combustible}</td>
            </tr>
            <tr>
              <td class="spec-label">Acción Rápida</td>
              <td><a href="#/auto/${a1.id}" class="btn-primary-sm w-full">Ver Detalles</a></td>
              <td><a href="#/auto/${a2.id}" class="btn-primary-sm w-full">Ver Detalles</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
};

window.Pages.renderCompareInit = () => {};
