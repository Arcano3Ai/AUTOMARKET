window.Pages.renderAbout = () => {
  return `
    <div class="animate-fade-in" style="min-height: 80vh;">
      
      <!-- Hero Section -->
      <section class="section" style="padding-top: calc(var(--nav-h) + var(--sp-12)); text-align:center;">
        <div class="container">
          <span class="section-label">NUESTRA HISTORIA</span>
          <h1 style="font-size: var(--fs-4xl); font-weight: 900; color: white; margin-bottom: var(--sp-6);">Revolucionando la industria <br/>automotriz en México</h1>
          <p class="text-dim" style="max-width: 600px; margin: 0 auto var(--sp-8); font-size: var(--fs-lg);">
            AUTOMARKET nació con una misión simple: hacer que la compra y venta de autos sea 100% transparente, rápida y sin riesgos.
          </p>
        </div>
      </section>

      <!-- Stats Grid -->
      <section class="section container" style="margin-bottom: var(--sp-20);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--sp-6);">
          ${AUTOMARKET_DB.stats.map(s => `
            <div style="background: var(--clr-surface-mid); border: 1px solid var(--clr-surface-high); border-radius: var(--r-2xl); padding: var(--sp-8); text-align: center;">
              <h3 style="font-size: var(--fs-3xl); color: var(--clr-primary-light); margin-bottom: var(--sp-2);">${s.valor}</h3>
              <p style="color: var(--clr-text-dim); font-weight: 600;">${s.label}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Ubicaciones (Google Maps Integration) -->
      <section class="section">
        <div class="container">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--sp-12); align-items:center;">
            <div class="animate-slide-up delay-100">
               <span class="section-label">VISÍTANOS</span>
               <h2 style="font-size:var(--fs-3xl); color:white; margin-bottom:var(--sp-4);">Sucursal Principal (Hub CDMX)</h2>
               <p style="color:var(--clr-text-dim); line-height:1.6; margin-bottom:var(--sp-6);">Nuestro Centro de Inspección y Ventas principal está estratégicamente ubicado para brindarte el mejor servicio. Puedes venir a conocer nuestro inventario físico y ser atendido por un experto.</p>
               
               <ul style="list-style:none; display:flex; flex-direction:column; gap:var(--sp-4); color:var(--clr-text-muted);">
                  <li><strong style="color:white">📍 Dirección:</strong> Av. de los Insurgentes Sur 1602, Crédito Constructor, Benito Juárez, 03940 Ciudad de México, CDMX</li>
                  <li><strong style="color:white">🕒 Horario:</strong> Lunes a Domingo de 09:00 AM a 07:00 PM</li>
                  <li><strong style="color:white">📞 Teléfono:</strong> 55 9000 0000</li>
               </ul>

               <button class="btn-primary-lg w-full" style="margin-top:var(--sp-8);" onclick="window.location.hash='#/testdrive'; showToast('Redirigiendo a Agendar Cita')">Agendar Cita en Sucursal</button>
            </div>
            
            <div class="animate-slide-up delay-200" style="border-radius:var(--r-2xl); overflow:hidden; border:1px solid var(--clr-surface-high); box-shadow:var(--sh-xl);">
               <!-- Google Maps Ecosystem Embed -->
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15053.475098935293!2d-99.18663840742188!3d19.366258957827878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fff8494b8e6f%3A0xe54d6be20c35520!2sInsurgentes%20Sur%201602!5e0!3m2!1sen!2smx!4v1700000000000!5m2!1sen!2smx" width="100%" height="450" style="border:0; margin-bottom:-4px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </section>

    </div>
  `;
};

window.Pages.renderAboutInit = () => {};
