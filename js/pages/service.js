window.Pages.renderService = () => {
  return `
    <div class="service-page container animate-fade-in">
      <div class="service-grid">
        <div class="service-info animate-slide-up">
          <span class="section-label">Taller Certificado</span>
          <h1>Mantenimiento y Reparación</h1>
          <p>Confía tu vehículo a los expertos. Nuestro taller cuenta con tecnología de punta y mecánicos certificados para garantizar el rendimiento óptimo de tu auto.</p>
          
          <div class="service-features">
            <div class="s-feat">
              <div class="s-feat-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <h3>Precios Transparentes</h3>
                <p>Sin sorpresas. Conocerás el costo exacto antes de iniciar cualquier reparación en tu vehículo.</p>
              </div>
            </div>
            <div class="s-feat">
              <div class="s-feat-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <h3>Refacciones Originales</h3>
                <p>Utilizamos exclusivamente piezas OEM para asegurar la máxima calidad y durabilidad.</p>
              </div>
            </div>
            <div class="s-feat">
              <div class="s-feat-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div>
                <h3>Garantía de Servicio</h3>
                <p>Respaldamos todos nuestros trabajos con una garantía de 3 meses o 5,000 kilómetros.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="service-form animate-slide-up delay-100">
          <h3>Agendar Cita</h3>
          <p style="color:var(--clr-text-dim); margin-bottom:var(--sp-6)">Selecciona el tipo de servicio que requieres para tu vehículo.</p>
          
          <div class="service-type-grid">
            <div class="s-type-card active" onclick="document.querySelectorAll('.s-type-card').forEach(c=>c.classList.remove('active')); this.classList.add('active');">
              <h4>Mantenimiento</h4>
              <span>Servicio General</span>
            </div>
            <div class="s-type-card" onclick="document.querySelectorAll('.s-type-card').forEach(c=>c.classList.remove('active')); this.classList.add('active');">
              <h4>Diagnóstico</h4>
              <span>Revisión de Fallas</span>
            </div>
            <div class="s-type-card" onclick="document.querySelectorAll('.s-type-card').forEach(c=>c.classList.remove('active')); this.classList.add('active');">
              <h4>Frenos</h4>
              <span>Balatas y Discos</span>
            </div>
            <div class="s-type-card" onclick="document.querySelectorAll('.s-type-card').forEach(c=>c.classList.remove('active')); this.classList.add('active');">
              <h4>Otro</h4>
              <span>Especificar abajo</span>
            </div>
          </div>

          <form onsubmit="event.preventDefault(); showToast('Cita agendada exitosamente. Te contactaremos pronto.', 'success'); this.reset();">
            <div class="form-group">
              <label class="form-label">Vehículo (Marca, Modelo, Año)</label>
              <input type="text" class="input-base" placeholder="Ej. Toyota Corolla 2021" required>
            </div>
            <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:var(--sp-4);">
              <div>
                <label class="form-label">Fecha deseada</label>
                <input type="date" class="input-base" required>
              </div>
              <div>
                <label class="form-label">Horario</label>
                <select class="input-base" required>
                  <option value="">Seleccionar...</option>
                  <option value="9:00">09:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Comentarios o Síntomas</label>
              <textarea class="input-base" rows="3" placeholder="Describe brevemente el problema..."></textarea>
            </div>
            <div class="form-group" style="border-top:1px solid var(--clr-surface-high); padding-top:var(--sp-4); margin-top:var(--sp-2);">
              <label class="form-label">Tus Datos</label>
              <input type="text" class="input-base" placeholder="Nombre completo" required style="margin-bottom:var(--sp-2)">
              <input type="tel" class="input-base" placeholder="Teléfono a 10 dígitos" required pattern="[0-9]{10}">
            </div>
            <button type="submit" class="btn-primary-lg w-full" style="margin-top:var(--sp-4)">Confirmar Cita</button>
          </form>
        </div>
      </div>
    </div>
  `;
};
window.Pages.renderServiceInit = () => {};
