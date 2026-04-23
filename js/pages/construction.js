window.Pages.renderConstruction = (hash) => {
  // If the route starts with /auto/ or /checkout/ with no id, show a specific 404
  const is404 = hash && hash.length > 1;
  return `
    <div class="notfound-page container animate-fade-in">
      <div class="notfound-inner">
        <div class="notfound-graphic">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="notfound-car-svg">
            <!-- Road -->
            <rect x="0" y="155" width="200" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
            <rect x="40" y="155" width="30" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
            <rect x="90" y="155" width="30" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
            <rect x="140" y="155" width="30" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
            <!-- Car body -->
            <rect x="30" y="115" width="140" height="42" rx="8" fill="var(--clr-surface-mid)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
            <path d="M65 115 Q85 85 100 82 Q115 79 140 115" fill="var(--clr-surface-top)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
            <!-- Headlights -->
            <rect x="30" y="128" width="18" height="10" rx="4" fill="rgba(235,10,30,0.8)"/>
            <!-- Windows -->
            <rect x="70" y="88" width="60" height="26" rx="4" fill="rgba(100,160,220,0.2)" stroke="rgba(255,255,255,0.05)"/>
            <!-- Wheels -->
            <circle cx="65" cy="157" r="16" fill="var(--clr-surface-low)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
            <circle cx="65" cy="157" r="8" fill="var(--clr-surface-mid)"/>
            <circle cx="135" cy="157" r="16" fill="var(--clr-surface-low)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
            <circle cx="135" cy="157" r="8" fill="var(--clr-surface-mid)"/>
          </svg>
        </div>
        
        <div class="notfound-text">
          <div class="notfound-code">4 <span style="color:var(--clr-primary)">0</span> 4</div>
          <h1>Esta ruta no existe</h1>
          <p>Parece que te perdiste en el camino. ${is404 ? `La página <code style="background:var(--clr-surface-mid);padding:2px 6px;border-radius:4px;font-size:12px">${hash}</code> no existe.` : ''}</p>
          
          <div class="notfound-actions">
            <a href="#/" class="btn-primary-lg">🏠 Ir al Inicio</a>
            <a href="#/catalogo" class="btn-ghost-lg">Ver Catálogo</a>
          </div>

          <div class="notfound-suggestions">
            <span style="color:var(--clr-text-dim);font-size:var(--fs-sm)">¿Estabas buscando?</span>
            <div style="display:flex;flex-wrap:wrap;gap:var(--sp-2);margin-top:var(--sp-3);justify-content:center">
              <a href="#/catalogo" class="notfound-link">🚗 Catálogo</a>
              <a href="#/financiamiento" class="notfound-link">💳 Financiamiento</a>
              <a href="#/vender" class="notfound-link">🏷️ Vender mi Auto</a>
              <a href="#/favoritos" class="notfound-link">❤️ Favoritos</a>
              <a href="#/nosotros" class="notfound-link">📍 Nosotros</a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
};
