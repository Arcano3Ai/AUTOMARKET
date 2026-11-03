/* ================================================================
   HOME.JS — Página principal AUTOMARKET
   Velocity Noir Ultra — The Kinetic Gallery
   ================================================================ */

window.Pages.renderHome = () => {
  const destacados = DB.getDestacados().slice(0, 4);
  const { stats, marcasLogos, testimonios, pasos_compra } = AUTOMARKET_DB;

  return `
    <!-- ═══════════════════════════════════════
         HERO EXOTIC & LUXURY SHOWCASE
    ═══════════════════════════════════════ -->
    <section class="hero" id="hero">
      <img
        src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&w=1920&q=85"
        alt="Ferrari SF90 Stradale Exotic"
        class="hero-bg"
        id="hero-bg-img"
        loading="eager"
        fetchpriority="high"
      />
      <div class="container">
        <div class="hero-inner">
          <div class="hero-content animate-fade-in">
            <span class="hero-eyebrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Exotic & Supercars Edition · #1 en México
            </span>

            <h1 class="hero-title">
              Tu Próximo <br>
              <span class="hero-accent">Exótico & Deportivo</span>
            </h1>

            <p class="hero-subtitle">
              Los superdeportivos más codiciados del planeta: <strong>Ferrari</strong>, <strong>Lamborghini</strong> y <strong>Porsche</strong>. Inspección certificada de 120 puntos y entrega inmediata blindada.
            </p>

            <div class="hero-ctas">
              <a href="#/catalogo?marca=Ferrari" class="btn-primary-lg">
                Colección Exótica
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#/catalogo" class="btn-ghost-lg">
                Ver Todo el Catálogo
              </a>
            </div>

            <div class="hero-trust">
              <div class="hero-trust-avatars">
                <div class="hero-trust-avatar">🏎️</div>
                <div class="hero-trust-avatar">🏁</div>
                <div class="hero-trust-avatar">💎</div>
                <div class="hero-trust-avatar">+</div>
              </div>
              <div class="hero-trust-text">
                <strong>+15,000 unidades y exóticos entregados</strong>
                ⭐⭐⭐⭐⭐ Experiencia VIP de compra garantizada
              </div>
            </div>
          </div>

          <!-- HERO VISUAL: SUPERCAR SHOWCASE CARD -->
          <div class="hero-visual animate-slide-up delay-200">
            <div class="supercar-hero-card">
              <div class="supercar-badge">
                <span class="pulse-dot"></span> UNIDAD DE EXHIBICIÓN VIP
              </div>
              <div class="supercar-img-container">
                <img id="hero-showcase-img" src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&w=900&q=85" alt="Lamborghini Revuelto" class="supercar-img">
              </div>
              <div class="supercar-card-body">
                <div class="supercar-brand-row">
                  <span id="hero-showcase-brand" class="supercar-brand">LAMBORGHINI</span>
                  <span id="hero-showcase-year" class="supercar-year">2024</span>
                </div>
                <h3 id="hero-showcase-model" class="supercar-model">Revuelto V12 HPEV</h3>
                <div class="supercar-specs-chips" id="hero-showcase-chips">
                  <span>🚀 0-100: 2.5s</span>
                  <span>⚡ 1,015 HP</span>
                  <span>🔊 V12 Híbrido</span>
                </div>
                <div class="supercar-price-row">
                  <div>
                    <span class="supercar-price-lbl">Precio de Entrega</span>
                    <strong id="hero-showcase-price" class="supercar-price">$14,200,000 MXN</strong>
                  </div>
                  <a id="hero-showcase-link" href="#/auto/102" class="btn-primary-sm">Apartar Unidad →</a>
                </div>

                <div class="supercar-carousels-thumbs">
                  <button class="thumb-btn active" onclick="window.Pages.setHeroCar('lambo', this)" title="Lamborghini Revuelto">
                    <img src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&w=200&q=70" alt="Lamborghini">
                  </button>
                  <button class="thumb-btn" onclick="window.Pages.setHeroCar('ferrari_sf90', this)" title="Ferrari SF90 Stradale">
                    <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&w=200&q=70" alt="Ferrari SF90">
                  </button>
                  <button class="thumb-btn" onclick="window.Pages.setHeroCar('ferrari_296', this)" title="Ferrari 296 GTB">
                    <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&w=200&q=70" alt="Ferrari 296">
                  </button>
                  <button class="thumb-btn" onclick="window.Pages.setHeroCar('porsche', this)" title="Porsche 911 GT3">
                    <img src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&w=200&q=70" alt="Porsche">
                  </button>
                </div>
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
              <div class="brand-logo-placeholder" style="background:#ffffff; border:1px solid var(--clr-surface-high); display:flex; align-items:center; justify-content:center; padding:16px;">
                ${m.logoUrl 
                  ? `<img src="${m.logoUrl}" alt="${m.nombre}" style="width:100%; height:100%; object-fit:contain;" loading="lazy">` 
                  : `<span style="color:${m.color};font-size:11px;font-weight:900;line-height:1;text-align:center">${m.nombre.substring(0,3).toUpperCase()}</span>`
                }
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

const HERO_SUPER_CARS = {
  lambo: {
    brand: 'LAMBORGHINI',
    year: '2024',
    model: 'Revuelto V12 HPEV',
    chips: ['🚀 0-100: 2.5s', '⚡ 1,015 HP', '🔊 V12 Híbrido'],
    price: '$14,200,000 MXN',
    img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&w=900&q=85',
    bg: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&w=1920&q=85',
    link: '#/auto/102'
  },
  ferrari_sf90: {
    brand: 'FERRARI',
    year: '2024',
    model: 'SF90 Stradale Assetto',
    chips: ['🏎️ 0-100: 2.5s', '⚡ 1,000 HP', '🔥 V8 Twin-Turbo'],
    price: '$12,500,000 MXN',
    img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&w=900&q=85',
    bg: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&w=1920&q=85',
    link: '#/auto/101'
  },
  ferrari_296: {
    brand: 'FERRARI',
    year: '2023',
    model: '296 GTB Assetto',
    chips: ['⚡ 830 HP', '🏁 0-100: 2.9s', '🟡 Giallo Modena'],
    price: '$7,950,000 MXN',
    img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&w=900&q=85',
    bg: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&w=1920&q=85',
    link: '#/auto/103'
  },
  porsche: {
    brand: 'PORSCHE',
    year: '2024',
    model: '911 GT3 RS Weissach',
    chips: ['🏁 9,000 RPM', '⚡ 525 HP', '⏱️ Nürburgring Spec'],
    price: '$7,500,000 MXN',
    img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&w=900&q=85',
    bg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=1920&q=85',
    link: '#/auto/106'
  }
};

window.Pages.setHeroCar = (key, btnEl) => {
  const data = HERO_SUPER_CARS[key];
  if (!data) return;

  const showcaseImg = document.getElementById('hero-showcase-img');
  const bgImg = document.getElementById('hero-bg-img');
  const brandEl = document.getElementById('hero-showcase-brand');
  const yearEl = document.getElementById('hero-showcase-year');
  const modelEl = document.getElementById('hero-showcase-model');
  const priceEl = document.getElementById('hero-showcase-price');
  const linkEl = document.getElementById('hero-showcase-link');
  const chipsEl = document.getElementById('hero-showcase-chips');

  if (showcaseImg) {
    showcaseImg.style.opacity = '0';
    setTimeout(() => {
      showcaseImg.src = data.img;
      showcaseImg.style.opacity = '1';
    }, 150);
  }
  if (bgImg && data.bg) {
    bgImg.src = data.bg;
  }
  if (brandEl) brandEl.textContent = data.brand;
  if (yearEl) yearEl.textContent = data.year;
  if (modelEl) modelEl.textContent = data.model;
  if (priceEl) priceEl.textContent = data.price;
  if (linkEl) linkEl.href = data.link;
  if (chipsEl) {
    chipsEl.innerHTML = data.chips.map(c => `<span>${c}</span>`).join('');
  }

  if (btnEl) {
    document.querySelectorAll('.supercar-carousels-thumbs .thumb-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
};
