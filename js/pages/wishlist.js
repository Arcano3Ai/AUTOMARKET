// WISHLIST LOGIC
window.Wishlist = {
  getFavorites: () => {
    try {
      return JSON.parse(localStorage.getItem('am_favorites') || '[]');
    } catch(e) { return []; }
  },
  toggleFavorite: (id) => {
    const strId = String(id);
    let favs = window.Wishlist.getFavorites().map(String);
    const index = favs.indexOf(strId);
    if (index === -1) {
      favs.push(strId);
      showToast('Guardado en favoritos ❤️', 'success');
    } else {
      favs.splice(index, 1);
      showToast('Eliminado de favoritos', 'info');
    }
    localStorage.setItem('am_favorites', JSON.stringify(favs));
    window.Wishlist.updateBadge();

    // Trigger re-render if we are in wishlist page
    if (window.location.hash === '#/favoritos') {
      document.getElementById('app').innerHTML = window.Pages.renderWishlist();
    } else {
      // Toggle button visual state safely if present
      document.querySelectorAll(`.btn-wish-toggle[data-id="${id}"]`).forEach(btn => {
        btn.classList.toggle('active');
      });
    }
  },
  updateBadge: () => {
    // Soporte para ambos IDs posibles (navbar usa 'wishlist-badge')
    const badge = document.getElementById('wishlist-badge') || document.getElementById('nav-wish-badge');
    if (badge) {
      const num = window.Wishlist.getFavorites().length;
      badge.textContent = num;
      badge.style.display = num > 0 ? 'flex' : 'none';
      badge.classList.add('pop');
      setTimeout(() => badge.classList.remove('pop'), 300);
    }
  }
};

window.Pages.renderWishlist = () => {
  const favIds = window.Wishlist.getFavorites().map(String);
  const favAutos = AUTOMARKET_DB.autos.filter(a => favIds.includes(String(a.id)));

  return `
    <div class="wishlist-page container animate-fade-in">
      <div class="wishlist-header">
        <h1>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Mis Favoritos
        </h1>
        <span style="color:var(--clr-text-dim); font-weight:600">${favAutos.length} guardado${favAutos.length !== 1 ? 's' : ''}</span>
      </div>

      ${favAutos.length === 0 ? `
        <div class="wishlist-empty animate-slide-up">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <h2 style="color:white; margin-bottom:var(--sp-2)">Aún no tienes autos guardados</h2>
          <p style="color:var(--clr-text-muted); margin-bottom:var(--sp-6)">Explora nuestro catálogo y guarda los autos que te interesen.</p>
          <a href="#/catalogo" class="btn-primary-md">Explorar Catálogo</a>
        </div>
      ` : `
        <div class="wish-grid">
          ${favAutos.map(a => `
            <div style="position:relative;" class="animate-slide-up">
              ${AutoCard(a)}
              <button class="btn-wish-toggle active" data-id="${a.id}"
                onclick="window.Wishlist.toggleFavorite('${a.id}')"
                style="top:12px; right:12px"
                aria-label="Quitar de favoritos">
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
};

window.Pages.renderWishlistInit = () => {
  window.Wishlist.updateBadge(); // Initial mount refresh
};
