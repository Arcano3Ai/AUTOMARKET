window.Pages.renderMagazine = () => {
  const articles = [
    {
      title: "Los 5 SUVs compactos que dominarán en 2026",
      excerpt: "Analizamos las nuevas propuestas de Mazda, Honda y Toyota para el segmento más demandado del país. Descubre cuál rinde mejor.",
      img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
      tag: "Reseñas", author: "Eduardo Lozano", date: "12 Abr, 2026"
    },
    {
      title: "¿Qué revisar antes de comprar un seminuevo?",
      excerpt: "Nuestros inspectores master comparten sus 10 puntos clave de revisión que pueden salvarte de un dolor de cabeza financiero.",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      tag: "Guías", author: "Carla Miranda", date: "10 Abr, 2026"
    },
    {
      title: "Eléctricos vs Híbridos: La decisión financiera",
      excerpt: "Con los incentivos actuales, ¿es momento de dar el salto total al eléctrico o el híbrido sigue siendo el rey de la transición?",
      img: "https://images.unsplash.com/photo-1593941707882-a5bba14938cb?w=800&q=80",
      tag: "Industria", author: "Miguel Torres", date: "05 Abr, 2026"
    },
    {
      title: "Mantenimiento Preventivo: Calendario 2026",
      excerpt: "Mantén tu vehículo en excelente estado y asegura su valor de reventa futuro con este calendario de servicios por kilometraje.",
      img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
      tag: "Mecánica", author: "Taller Automarket", date: "01 Abr, 2026"
    }
  ];

  return `
    <div class="magazine-page container animate-fade-in">
      <div class="mag-hero animate-slide-up">
        <div class="mag-hero-content">
          <span class="mag-hero-tag">A Fondo</span>
          <h1>La Evolución del Porsche 911 a través de sus 8 generaciones</h1>
          <p style="color:var(--clr-text-muted); font-size:var(--fs-lg);">Exploramos cómo el diseño más icónico de la historia del automóvil ha logrado la perfecta síntesis entre purismo analógico y vanguardia digital.</p>
          <button class="btn-primary-md" style="margin-top:var(--sp-6);">Leer Artículo</button>
        </div>
      </div>

      <div class="section-title text-center" style="margin:var(--sp-12) 0 var(--sp-8);">
        Últimas Publicaciones
      </div>

      <div class="mag-grid">
        ${articles.map((art, i) => `
          <div class="mag-card animate-slide-up" style="animation-delay:${(i+1)*100}ms">
            <img src="${art.img}" class="mag-card-img" alt="${art.title}" loading="lazy">
            <div class="mag-card-body">
              <span class="mag-card-meta">${art.tag} &bull; ${art.date}</span>
              <h3 class="mag-card-title">${art.title}</h3>
              <p class="mag-card-excerpt">${art.excerpt}</p>
              <div class="mag-card-footer">
                <div class="mag-author">
                  <div style="width:24px; height:24px; background:var(--clr-surface-high); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:10px;">
                    ${art.author.charAt(0)}
                  </div>
                  <span>${art.author}</span>
                </div>
                <button class="btn-ghost-sm" style="padding:4px;" onclick="showToast('Abrir artículo')">
                  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};
window.Pages.renderMagazineInit = () => {
    // Analytics or bindings
};
