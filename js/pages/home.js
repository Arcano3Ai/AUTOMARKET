/* ================================================================
   HOME.JS — Página principal AUTOMARKET
   Velocity Noir Ultra — The Kinetic Gallery
   ================================================================ */

window.Pages.renderHome = () => {
  const destacados = DB.getDestacados().slice(0, 4);
  const { stats, marcasLogos, testimonios, pasos_compra } = AUTOMARKET_DB;

  return `
    <!-- ═══════════════════════════════════════
         HERO
    ═══════════════════════════════════════ -->
    <section class="hero" id="hero">
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=1600&q=80"
        alt="BMW SportsCar"
        class="hero-bg"
        loading="eager"
        fetchpriority="high"
      />
      <div class="container">
        <div class="hero-inner">
          <div class="hero-content animate-fade-in">
            <span class="hero-eyebrow">Marketplace #1 en México</span>

            <h1 class="hero-title">
              Tu Próximo Auto,<br>
              <span class="hero-accent">Garantizado</span>
            </h1>

            <p class="hero-subtitle">
              Más de 15,000 autos verificados con historial limpio, garantía incluida y financiamiento aprobado en minutos.
            </p>

            <div class="hero-ctas">
              <a href="#/catalogo" class="btn-primary-lg">
                Ver Catálogo
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#/financiamiento" class="btn-ghost-lg">
                Calcular Crédito
              </a>
            </div>

            <div class="hero-trust">
              <div class="hero-trust-avatars">
                <div class="hero-trust-avatar">CG</div>
                <div class="hero-trust-avatar">MR</div>
                <div class="hero-trust-avatar">JL</div>
                <div class="hero-trust-avatar">+</div>
              </div>
              <div class="hero-trust-text">
                <strong>+15,000 clientes satisfechos</strong>
                ⭐⭐⭐⭐⭐ 4.9 rating promedio
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         STATS
    ═══════════════════════════════════════ -->
    <div class="stats-banner">
      <div class="container">
        <div class="stats-grid">
          ${stats.map((s, i) => `
            <div class="stat-item animate-slide-up delay-${i * 100 + 100}">
              <div class="stat-value" data-target="${s.raw}" data-suffix="${s.sufijo}">${s.valor}</div>
              <div class="stat-label">${s.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════
         AUTOS DESTACADOS
    ═══════════════════════════════════════ -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Selección del editor</span>
          <h2 class="section-title">Autos Destacados</h2>
          <p class="section-subtitle">Cada vehículo en esta galería ha pasado por 120 puntos de inspección certificada.</p>
          <a href="#/catalogo" class="btn-ghost-md" style="margin-top:var(--sp-4)">
            Ver todos los autos
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div class="autos-grid">
          ${destacados.map(auto => AutoCard(auto)).join('')}
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         BRANDS
    ═══════════════════════════════════════ -->
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-header center">
          <span class="section-label">Inventario</span>
          <h2 class="section-title">Las Mejores Marcas</h2>
          <p class="section-subtitle">Desde confiables nacionales hasta lujo europeo — todas verificadas.</p>
        </div>
        <div class="brands-grid">
          ${marcasLogos.slice(0, 12).map(m => `
            <a href="#/catalogo?marca=${encodeURIComponent(m.nombre)}" class="brand-card">
              <div class="brand-logo-placeholder" style="background:${m.color}18; border:1px solid ${m.color}33">
                <span style="color:${m.color};font-size:11px;font-weight:900;line-height:1;text-align:center">${m.nombre.substring(0,3).toUpperCase()}</span>
              </div>
              <span class="brand-name">${m.nombre}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HOW IT WORKS
    ═══════════════════════════════════════ -->
    <section class="section" style="background:var(--clr-surface-low)">
      <div class="container">
        <div class="section-header center">
          <span class="section-label">El proceso</span>
          <h2 class="section-title">Comprar es Simple</h2>
          <p class="section-subtitle">En AUTOMARKET todo está diseñado para que encuentres y compres tu próximo auto sin complicaciones.</p>
        </div>
        <div class="steps-grid">
          ${pasos_compra.map((paso, i) => `
            <div class="step-card animate-slide-up delay-${i * 100 + 100}">
              <div class="step-num">${i + 1}</div>
              <span class="step-icon">${paso.icon}</span>
              <div class="step-title">${paso.titulo}</div>
              <p class="step-desc">${paso.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         TESTIMONIALS
    ═══════════════════════════════════════ -->
    <section class="section">
      <div class="container">
        <div class="section-header center">
          <span class="section-label">Clientes felices</span>
          <h2 class="section-title">Lo que dicen de nosotros</h2>
        </div>
        <div class="testimonials-grid">
          ${testimonios.map((t, i) => `
            <div class="testimonial-card animate-slide-up delay-${i * 100 + 100}">
              <div class="testimonial-stars">${'⭐'.repeat(t.estrellas)}</div>
              <p class="testimonial-text">"${t.texto}"</p>
              <div class="testimonial-author">
                <div class="testimonial-avatar">${t.nombre.split(' ').map(n=>n[0]).join('')}</div>
                <div>
                  <div class="testimonial-name">${t.nombre}</div>
                  <div class="testimonial-meta">${t.ciudad} · ${t.auto}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         CTA VENDER
    ═══════════════════════════════════════ -->
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="cta-banner">
          <span class="section-label" style="display:inline-block;margin-bottom:var(--sp-4)">Vende con nosotros</span>
          <h2>¿Tienes un auto que ya no usas?</h2>
          <p>Obtén una valuación en minutos, inspección gratuita y el pago en tu cuenta en menos de 24 horas.</p>
          <div class="cta-banner-actions">
            <a href="#/vender" class="btn-primary-lg">
              Valuar mi Auto Gratis
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#/financiamiento" class="btn-ghost-lg">¿Cómo funciona?</a>
          </div>
        </div>
      </div>
    </section>
  `;
};

window.Pages.renderHomeInit = () => {
  // Animated stat counters
  const statVals = document.querySelectorAll('.stat-value[data-target]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      if (!target || target === 0) return;

      let start = 0;
      const duration = 1800;
      const startTime = performance.now();
      const isFloat = target % 1 !== 0;

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        if (target >= 1000) {
          el.textContent = '+' + Math.round(current).toLocaleString('es-MX') + suffix;
        } else if (isFloat) {
          el.textContent = current.toFixed(1) + suffix;
        } else if (suffix === '%') {
          el.textContent = Math.round(current) + '%';
        } else {
          el.textContent = Math.round(current) + suffix;
        }

        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  statVals.forEach(el => observer.observe(el));

  // Wish toggle on home cards
  document.querySelectorAll('.btn-wish-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.id;
      if (id) window.Wishlist.toggleFavorite(id);
    });
  });
};
