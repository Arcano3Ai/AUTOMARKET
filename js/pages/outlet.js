window.Pages.renderOutlet = () => {
  // Filtramos autos que tengan tipo 'outlet' 
  // (Los que agregamos de 2015 a 2020)
  const outletAutos = AUTOMARKET_DB.autos.filter(a => a.tipo === 'outlet');

  return `
    <div class="outlet-page container animate-fade-in">
      <div class="outlet-hero animate-slide-up">
        <div>
          <span class="section-label" style="justify-content:center; color:var(--clr-primary-light)">Classic & Outlet Collection</span>
          <h1>Oportunidades 2015 - 2020</h1>
          <p>Autos certificados de años anteriores que mantienen la calidad AUTOMARKET. Excelentes condiciones y precios increíbles de outlet con la garantía que nos respalda.</p>
        </div>
      </div>

      <div class="outlet-grid">
        ${outletAutos.map(a => `
          <div class="outlet-card animate-slide-up delay-100">
            <div style="position:relative; overflow:hidden;">
              <span class="outlet-card-badge">Outlet</span>
              <img src="${a.fotos[0]}" alt="${a.marca} ${a.modelo}" class="outlet-card-img" loading="lazy">
            </div>
            <div class="outlet-card-body">
              <h3 class="outlet-card-title">${a.marca} ${a.modelo}</h3>
              
              <div class="outlet-card-specs">
                <div class="outlet-spec">
                  <span class="outlet-spec-label">Año</span>
                  <span class="outlet-spec-val">${a.año}</span>
                </div>
                <div class="outlet-spec">
                  <span class="outlet-spec-label">Kilometraje</span>
                  <span class="outlet-spec-val">${DB.formatKm(a.km)}</span>
                </div>
                <div class="outlet-spec">
                  <span class="outlet-spec-label">Transmisión</span>
                  <span class="outlet-spec-val">${a.transmision}</span>
                </div>
                <div class="outlet-spec">
                  <span class="outlet-spec-label">Ubicación</span>
                  <span class="outlet-spec-val">${a.ciudad}</span>
                </div>
              </div>

              <div class="outlet-card-footer">
                <div class="outlet-price">${DB.formatPrecio(a.precio)}</div>
                <a href="#/auto/${a.id}" class="btn-ghost-sm" style="border:1px solid var(--clr-surface-top)">Ver Historial</a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};
