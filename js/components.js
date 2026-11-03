// ── AUTO CARD COMPONENT (Velocity Noir Ultra) ──────────────────
window.AutoCard = (auto) => {
  const isFav = window.Wishlist?.getFavorites().some(f => String(f) === String(auto.id));
  const isOutlet = auto.tipo === 'outlet';

  return `
    <article class="auto-card">
      <!-- Image block -->
      <div class="auto-card__image-wrap">
        <div class="auto-card__badges">
          ${auto.verificado ? '<span class="badge-verificado">✓ Verificado</span>' : ''}
          ${auto.destacado  ? '<span class="badge-destacado">Destacado</span>'    : ''}
          ${isOutlet        ? '<span class="badge-outlet">Outlet</span>'           : ''}
        </div>
        <button
          class="btn-wish-toggle ${isFav ? 'active' : ''}"
          data-id="${auto.id}"
          onclick="event.preventDefault(); event.stopPropagation(); window.Wishlist.toggleFavorite('${auto.id}')"
          aria-label="${isFav ? 'Quitar de favoritos' : 'Guardar en favoritos'}"
        >
          <svg width="16" height="16" fill="${isFav ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <a href="#/auto/${auto.id}" aria-label="Ver ${auto.marca} ${auto.modelo} ${auto.año}" tabindex="-1">
          <img
            src="${auto.fotos[0]}"
            alt="${auto.marca} ${auto.modelo} ${auto.año}"
            class="auto-card__img"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=70'"
          />
        </a>
      </div>

      <!-- Body -->
      <div class="auto-card__body">
        <div class="auto-card__year">${auto.año}</div>
        <a href="#/auto/${auto.id}" style="text-decoration:none">
          <h3 class="auto-card__name">${auto.marca} ${auto.modelo}</h3>
        </a>
        <div class="auto-card__price">${DB.formatPrecio(auto.precio)}</div>
        <div class="auto-card__monthly">desde ${DB.formatPrecio(auto.pago_mensual)}/mes</div>

        <div class="auto-card__specs">
          <span class="auto-card__spec">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${DB.formatKm(auto.km)}
          </span>
          <span class="auto-card__spec">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            ${auto.transmision.split(' ')[0]}
          </span>
          <span class="auto-card__spec">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${auto.ciudad.split(' ').slice(-1)[0]}
          </span>
        </div>

        <div class="auto-card__cta">
          <a href="#/auto/${auto.id}" class="btn-primary-md w-full" style="justify-content:center">
            Ver Detalles
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </article>
  `;
};


// Toast notification — soporta tipo: 'success' | 'error' | 'info' | 'warning'
window.showToast = (msg, type = 'info') => {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const colors = {
    success: 'var(--clr-success)',
    error:   'var(--clr-primary)',
    warning: 'var(--clr-warning)',
    info:    'var(--clr-text-dim)',
  };
  const icons = {
    success: '✓ ',
    error:   '✕ ',
    warning: '⚠ ',
    info:    'ℹ ',
  };

  toast.innerText = (icons[type] || '') + msg;
  toast.style.borderLeftColor = colors[type] || colors.info;
  toast.classList.remove('show');

  // Force reflow to restart animation
  void toast.offsetWidth;
  toast.classList.add('show');

  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 3500);
};

// Modal helper
window.openModal = (htmlContent) => {
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('modal-body');
  body.innerHTML = htmlContent;
  overlay.classList.remove('hidden');
};
window.closeModal = () => {
  document.getElementById('modal-overlay').classList.add('hidden');
};
