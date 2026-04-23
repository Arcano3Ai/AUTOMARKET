window.Pages.renderCatalog = () => {
  return `
    <div class="catalog-page container animate-fade-in">
      
      <div class="catalog-header" style="flex-wrap:wrap; gap:var(--sp-4);">
        <div>
          <h1 class="section-title">Encuentra Tu Auto</h1>
          <p class="mb-results" id="catalog-count">Cargando resultados...</p>
        </div>
        <div style="display:flex; gap:var(--sp-3); align-items:center; margin-left:auto; flex-wrap:wrap;">
          <select id="sort-select" class="input-base" style="width:180px; margin:0;" onchange="document.getElementById('catalog-grid').dispatchEvent(new Event('refresh'))">
            <option value="recientes">Más Recientes</option>
            <option value="precio-asc">Menor Precio</option>
            <option value="precio-desc">Mayor Precio</option>
            <option value="km-asc">Menor Kilometraje</option>
          </select>
          <!-- View toggle -->
          <div style="display:flex;gap:6px;background:var(--clr-surface-mid);border-radius:var(--r-md);padding:4px;" id="view-toggle">
            <button id="btn-view-grid" onclick="window.Pages.setView('grid')" title="Vista cuadrícula"
              style="width:34px;height:34px;border-radius:6px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;background:var(--clr-primary);color:white;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
            </button>
            <button id="btn-view-list" onclick="window.Pages.setView('list')" title="Vista lista"
              style="width:34px;height:34px;border-radius:6px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;background:transparent;color:var(--clr-text-dim);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="3" rx="1"/><rect x="3" y="10.5" width="18" height="3" rx="1"/><rect x="3" y="17" width="18" height="3" rx="1"/></svg>
            </button>
          </div>
          <button class="btn-primary-sm" id="btn-toggle-filters">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Filtros
          </button>
        </div>
      </div>

      <div class="catalog-layout">
        <!-- FILTERS -->
        <aside class="filters-panel" id="filters-panel">
          
          <div class="filter-group">
            <h3 class="filter-title">Búsqueda Rápida</h3>
            <div class="search-bar">
              <input type="text" id="filter-search" class="search-input" placeholder="Ej: Jetta 2023...">
            </div>
          </div>

          <div class="filter-group">
            <h3 class="filter-title">Rango de Precio</h3>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--sp-2);">
              <input type="number" id="filter-price-min" class="input-base" placeholder="Mínimo">
              <input type="number" id="filter-price-max" class="input-base" placeholder="Máximo">
            </div>
          </div>

          <div class="filter-group">
            <h3 class="filter-title">Marca</h3>
            <div class="filter-options">
              <label class="filter-label"><input type="radio" name="marca" value="" checked> Todas las marcas</label>
              ${AUTOMARKET_DB.marcas.map(m => `
                <label class="filter-label"><input type="radio" name="marca" value="${m}"> ${m}</label>
              `).join('')}
            </div>
          </div>

          <div class="filter-group">
            <h3 class="filter-title">Categoría</h3>
            <div class="filter-options">
              <label class="filter-label"><input type="radio" name="categoria" value="" checked> Todas</label>
              ${AUTOMARKET_DB.categorias.map(c => `
                <label class="filter-label"><input type="radio" name="categoria" value="${c}"> ${c}</label>
              `).join('')}
            </div>
          </div>

          <button class="btn-ghost-md w-full" id="btn-reset-filters" style="margin-bottom:var(--sp-4);">Limpiar Filtros</button>
          <button class="btn-primary-md w-full mobile-filters-btn" id="btn-apply-filters">Ver Resultados</button>
          <div style="height:20px" class="mobile-filters-btn"></div> <!-- Spacer for mobile -->
        </aside>

        <!-- GRID -->
        <main>
          <div class="autos-grid" id="catalog-grid" style="margin-top:0">
            <!-- Rendered by JS -->
          </div>
        </main>
      </div>
    </div>
  `;
};

window.Pages.setView = (mode) => {
  const grid = document.getElementById('catalog-grid');
  const btnGrid = document.getElementById('btn-view-grid');
  const btnList = document.getElementById('btn-view-list');
  if (!grid) return;

  if (mode === 'list') {
    grid.classList.add('list-view');
    if (btnList) { btnList.style.background = 'var(--clr-primary)'; btnList.style.color = 'white'; }
    if (btnGrid) { btnGrid.style.background = 'transparent'; btnGrid.style.color = 'var(--clr-text-dim)'; }
  } else {
    grid.classList.remove('list-view');
    if (btnGrid) { btnGrid.style.background = 'var(--clr-primary)'; btnGrid.style.color = 'white'; }
    if (btnList) { btnList.style.background = 'transparent'; btnList.style.color = 'var(--clr-text-dim)'; }
  }
  sessionStorage.setItem('catalog_view', mode);
};

window.Pages.renderCatalogInit = () => {
  const panel = document.getElementById('filters-panel');
  const btnToggle = document.getElementById('btn-toggle-filters');
  const btnApply = document.getElementById('btn-apply-filters');
  const btnReset = document.getElementById('btn-reset-filters');
  const grid = document.getElementById('catalog-grid');
  const countSpan = document.getElementById('catalog-count');

  if(btnToggle) {
    btnToggle.addEventListener('click', () => panel.classList.toggle('open'));
  }
  if(btnApply) {
    btnApply.addEventListener('click', () => panel.classList.remove('open'));
  }

  const savedBrand = sessionStorage.getItem('filter_brand');
  if (savedBrand) {
    const radio = document.querySelector(`input[name="marca"][value="${savedBrand}"]`);
    if(radio) radio.checked = true;
    sessionStorage.removeItem('filter_brand');
  }

  const updateGrid = () => {
    const marca = document.querySelector('input[name="marca"]:checked')?.value || '';
    const categoria = document.querySelector('input[name="categoria"]:checked')?.value || '';
    const busqueda = document.getElementById('filter-search')?.value || '';
    const precio_min = document.getElementById('filter-price-min')?.value || '';
    const precio_max = document.getElementById('filter-price-max')?.value || '';
    const sort = document.getElementById('sort-select')?.value || 'recientes';

    let results = DB.filtrar({ marca, categoria, busqueda, precio_min, precio_max });

    // SORTING LOGIC
    if (sort === 'precio-asc') results.sort((a,b) => a.precio - b.precio);
    else if (sort === 'precio-desc') results.sort((a,b) => b.precio - a.precio);
    else if (sort === 'km-asc') results.sort((a,b) => a.km - b.km);
    else results.sort((a,b) => b.id - a.id); // recientes (ID highest = newest)

    countSpan.innerText = `${results.length} auto${results.length!==1?'s':''} encontrado${results.length!==1?'s':''}`;

    if (results.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1" class="no-results animate-fade-in">
          <h3>No encontramos autos</h3>
          <p>Ajusta el precio, marca o búsqueda para ver más resultados.</p>
        </div>
      `;
    } else {
      grid.innerHTML = results.map(a => AutoCard(a)).join('');
    }
  };

  // Bind Auto-updating events to inputs
  document.querySelectorAll('input[name="marca"], input[name="categoria"]').forEach(el => {
    el.addEventListener('change', updateGrid);
  });
  
  const searchInput = document.getElementById('filter-search');
  let timeoutId;
  if(searchInput) {
      searchInput.addEventListener('keyup', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(updateGrid, 300);
      });
  }

  document.getElementById('filter-price-min')?.addEventListener('input', updateGrid);
  document.getElementById('filter-price-max')?.addEventListener('input', updateGrid);
  
  if(btnReset) {
      btnReset.addEventListener('click', () => {
        document.querySelector('input[name="marca"][value=""]').checked = true;
        document.querySelector('input[name="categoria"][value=""]').checked = true;
        if(searchInput) searchInput.value = '';
        document.getElementById('filter-price-min').value = '';
        document.getElementById('filter-price-max').value = '';
        updateGrid();
      });
  }

  grid.addEventListener('refresh', updateGrid);

  // Restore saved view preference
  const savedView = sessionStorage.getItem('catalog_view') || 'grid';
  window.Pages.setView(savedView);

  // Initial load
  updateGrid();
};
