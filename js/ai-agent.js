/**
 * AUTOMARKET — Axel AI v2.0 — Agente Multimodal
 * ═══════════════════════════════════════════════
 * ✅ Chat de texto completo con historial
 * ✅ Entrada de VOZ (Web Speech API)
 * ✅ Salida de VOZ (SpeechSynthesis TTS)
 * ✅ Análisis de IMAGEN (base64 → Gemini multimodal)
 * ✅ Captura de CÁMARA en dispositivos móviles
 * ✅ Function calling → cards de inventario, crédito, citas, leads
 * ✅ NLP local como fallback sin API key
 * ✅ Contexto de página actual
 */
(function () {
  'use strict';

  // ═══════════════════════════════════════════════════
  // CONFIG
  // ═══════════════════════════════════════════════════
  const API_BASE = () => window.AM_CONFIG?.API_BASE || '';
  const IS_LIVE  = () => !!API_BASE() && !API_BASE().includes('YOUR');

  // Conversation history (para contexto multi-turno)
  let _history = [];
  let _isOpen  = false;
  let _isRecording = false;
  let _recognition = null;
  let _isTTSEnabled = false;
  let _pendingImage = null; // { data: base64, type: mime, preview: url }

  // ═══════════════════════════════════════════════════
  // NLP LOCAL FALLBACK (sin API key)
  // ═══════════════════════════════════════════════════
  let _flowState = 'idle', _pendingModel = '';

  function localNLP(query) {
    const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (/cita|agendar|visita|ver|probar|manejo/.test(q)) { _flowState = 'awaiting_model'; return '¡Excelente decisión! Con gusto te agendo una cita 📅 ¿Qué vehículo te interesa ver de nuestro inventario?'; }
    if (_flowState === 'awaiting_model') { _pendingModel = query; _flowState = 'awaiting_time'; return `Perfecto. El <b>${query}</b> está listo para prueba de manejo. ¿Qué día y hora te conviene visitarnos? (ej. "Mañana a las 5 PM")`; }
    if (_flowState === 'awaiting_time') {
      const folio = `RES-${Math.floor(Math.random() * 9000)+1000}`; _flowState = 'idle';
      
      // Simulamos los envíos (Toasts)
      setTimeout(() => window.showToast(`Confirmación enviada a tu correo ✉️`, 'success'), 1000);
      setTimeout(() => window.showToast(`Folio ${folio} enviado por WhatsApp ✅`, 'success'), 2500);

      document.getElementById('ai-notif-dot').classList.remove('visible'); // clear dot notification if any

      return buildCitaCard({ 
        folio, 
        auto_interes: _pendingModel, 
        fecha: query, 
        hora: 'Por definir con tu asesor', 
        direccion: 'Automarket Hub Santa Fe — Av. Santa Fe 495, CDMX',
        asesor: 'Lic. Laura M.',
        whatsapp: '+52 55 9000 0000'
      });
    }
    if (/credito|financiamiento|mensualidad|pago|abono|enganche|plazo/.test(q)) return '💳 Contamos con crédito aprobado en <b>2 horas</b>, plazos 12-60 meses y enganche desde 10%. ¿Te calculo una mensualidad? Dime el precio del auto.';
    if (/suv|camioneta|4x4|pickup/.test(q)) return buildSearchCard([{marca:'Toyota',modelo:'RAV4',año:2022,precio:580000,km:28000},{marca:'Jeep',modelo:'Grand Cherokee',año:2022,precio:720000,km:18000},{marca:'Mazda',modelo:'CX-5',año:2023,precio:610000,km:12000}]);
    if (/precio|barato|economico|presupuesto|cuanto/.test(q)) return '💰 Tenemos autos desde <b>$180,000 MXN</b> hasta modelos premium sobre $800K. ¿Cuál es tu presupuesto? Te busco opciones.';
    if (/garantia|revision|certificado|verificado/.test(q)) return '🔍 Todos pasan <b>inspección de 120 puntos</b> con garantía mínima de 3 meses / 5,000 km.';
    if (/vender|vendo|valua|mi auto/.test(q)) return '🏷️ ¡Vendemos tu auto en 24-48 hrs! ¿Cuál es la marca, modelo y año? Te doy una valuación preliminar.';
    if (/humano|asesor|persona|ejecutivo|llamar/.test(q)) return '👨‍💻 ¡Claro! Llámanos al <b>55 9000-0000</b> o escríbenos por WhatsApp. ¿Te agendo una llamada?';
    return `Entiendo tu consulta 🤔 Puedo ayudarte a <b>buscar autos</b>, <b>calcular crédito</b> o <b>agendar una cita</b>. ¿Qué necesitas?`;
  }

  // ═══════════════════════════════════════════════════
  // TOOL RESULT CARDS (renders ricos para cada tool)
  // ═══════════════════════════════════════════════════
  function buildSearchCard(autos) {
    if (!autos?.length) return '🔍 No encontré autos con esos filtros. ¿Quieres ajustar la búsqueda?';
    return `<div class="axel-tool-card axel-search-card">
      <div class="axel-tool-card-title">🚗 Resultados del inventario</div>
      <div class="axel-car-list">
        ${autos.map(a => `
          <a href="#/auto/${a.id||'1'}" class="axel-car-item" onclick="window.AIAgent.toggle()">
            <div class="axel-car-item-brand">${a.marca} <span>${a.modelo}</span></div>
            <div class="axel-car-item-details">
              ${a.año} · ${(a.km||0).toLocaleString()} km
              <span class="axel-car-price">$${(a.precio||0).toLocaleString()}</span>
            </div>
          </a>
        `).join('')}
      </div>
      <a href="#/catalogo" onclick="window.AIAgent.toggle()" class="axel-tool-link">Ver catálogo completo →</a>
    </div>`;
  }

  function buildCreditCard(d) {
    return `<div class="axel-tool-card axel-credit-card">
      <div class="axel-tool-card-title">💳 Simulación de Crédito</div>
      <div class="axel-credit-grid">
        <div class="axel-credit-main">
          <div class="axel-credit-label">Mensualidad estimada</div>
          <div class="axel-credit-amount">$${(d.mensualidad||0).toLocaleString()} <span>MXN</span></div>
        </div>
        <div class="axel-credit-detail">Precio: <b>$${(d.precio||0).toLocaleString()}</b></div>
        <div class="axel-credit-detail">Enganche (${d.enganche_pct||20}%): <b>$${(d.enganche||0).toLocaleString()}</b></div>
        <div class="axel-credit-detail">Plazo: <b>${d.plazo} meses</b></div>
        <div class="axel-credit-detail">Tasa anual: <b>${d.tasa_anual}</b></div>
        <div class="axel-credit-detail">Total a pagar: <b>$${(d.total||0).toLocaleString()}</b></div>
      </div>
      <a href="#/financiamiento" onclick="window.AIAgent.toggle()" class="axel-tool-link">Calculadora completa →</a>
    </div>`;
  }

  function buildCitaCard(d) {
    return `<div class="axel-tool-card axel-cita-card" style="border:1px solid var(--clr-primary); box-shadow: 0 4px 12px rgba(230,57,70,0.15)">
      <div class="axel-tool-card-title" style="color:var(--clr-primary)">✅ ¡Cita Generada con Éxito!</div>
      <div style="margin:12px 0; display:flex; flex-direction:column; gap:6px;">
        ${d.auto_interes ? `<div class="axel-cita-row">🚘 <b>Unidad:</b> ${d.auto_interes}</div>` : ''}
        ${d.fecha ? `<div class="axel-cita-row">📅 <b>Cuándo:</b> ${d.fecha}</div>` : ''}
        ${d.direccion ? `<div class="axel-cita-row">📍 <b>Dónde:</b> ${d.direccion}</div>` : ''}
        ${d.asesor ? `<div class="axel-cita-row">👩‍💼 <b>Tu Asesor:</b> ${d.asesor}</div>` : ''}
      </div>
      <div class="axel-folio" style="background:var(--clr-primary); color:white; font-size:16px; margin: 12px 0; padding:10px; border-radius:8px">
        Folio de Acceso: <b>${d.folio}</b>
      </div>
      <div style="font-size:11px;color:var(--clr-text-muted);margin-top:6px; line-height:1.4">
        Hemos enviado un correo de confirmación y en breve recibirás la ubicación precisa por WhatsApp al ${d.whatsapp}. ¡Te esperamos!
      </div>
    </div>`;
  }

  function buildLeadCard(d) {
    return `<div class="axel-tool-card axel-lead-card">
      <div class="axel-tool-card-title">🏷️ ¡Solicitud Enviada!</div>
      <div style="margin:8px 0">
        <div class="axel-cita-row">🚗 Vehículo: <b>${d.marca} ${d.modelo} ${d.anio}</b></div>
        ${d.nombre ? `<div class="axel-cita-row">👤 Nombre: <b>${d.nombre}</b></div>` : ''}
      </div>
      <div class="axel-folio">${d.folio}</div>
      <div style="font-size:11px;color:var(--clr-text-muted);margin-top:6px">Te contactaremos en menos de 2 horas con la valuación.</div>
    </div>`;
  }

  function buildImageCard(imgUrl, analysisText) {
    return `<div class="axel-tool-card" style="padding:0;overflow:hidden">
      <img src="${imgUrl}" style="width:100%;max-height:180px;object-fit:cover;display:block">
      <div style="padding:10px 12px;font-size:12px;color:var(--clr-text-muted)">📸 Imagen analizada por Axel</div>
    </div>`;
  }

  function renderToolResult(tr) {
    const { toolName, result } = tr;
    switch (toolName) {
      case 'search_inventory':   return buildSearchCard(result.autos);
      case 'calcular_credito':   return buildCreditCard(result);
      case 'crear_cita':         return buildCitaCard(result);
      case 'crear_lead':         return buildLeadCard(result);
      case 'analizar_imagen_auto': return ''; // analysis is in the text reply
      default: return '';
    }
  }

  // ═══════════════════════════════════════════════════
  // MAIN SEND FUNCTION
  // ═══════════════════════════════════════════════════
  async function sendMessage(textOverride) {
    const input   = document.getElementById('ai-input');
    const body    = document.getElementById('ai-chat-body');
    const sendBtn = document.getElementById('ai-send-btn');
    const text    = textOverride || input?.value.trim();

    if (!text && !_pendingImage) return;

    // Add user message
    if (text) appendMsg('user', text);
    if (_pendingImage) {
      const imgHtml = buildImageCard(_pendingImage.preview);
      appendMsg('user', imgHtml, true);
    }

    if (input) { input.value = ''; input.dispatchEvent(new Event('input')); }
    if (sendBtn) sendBtn.disabled = true;

    // Add to history
    if (text) _history.push({ role: 'user', text });

    // Typing indicator
    const typingId = addTypingIndicator();

    // Get page context
    const context = buildPageContext();

    try {
      let reply = '', toolResults = [];

      if (IS_LIVE()) {
        // LIVE MODE: Call backend
        const body_payload = {
          message:  text || undefined,
          context,
          history:  _history.slice(-8),
        };
        if (_pendingImage) {
          body_payload.imageData = _pendingImage.data;
          body_payload.imageType = _pendingImage.type;
        }

        const session = JSON.parse(localStorage.getItem('automarket_auth') || '{}');
        const res = await fetch(`${API_BASE()}/api/ai/chat`, {
          method:  'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(session.token ? { Authorization: `Bearer ${session.token}` } : {})
          },
          body: JSON.stringify(body_payload)
        });

        if (!res.ok) throw new Error('backend_error');
        const data = await res.json();
        reply       = data.reply || '';
        toolResults = data.toolResults || [];

      } else {
        // MOCK MODE
        await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
        if (_pendingImage) {
          reply = '📸 ¡Imagen recibida! Puedo ver que es un vehículo. <b>Para análisis real conecta tu API Key de Gemini.</b> Por ahora: ¿qué quieres saber de este auto?';
        } else {
          reply = localNLP(text || '');
        }
      }

      // Remove typing indicator
      removeTypingIndicator(typingId);
      _pendingImage = null;
      clearImagePreview();

      // Render tool result cards first
      for (const tr of toolResults) {
        const card = renderToolResult(tr);
        if (card) appendMsg('agent', card, true);
      }

      // Render text reply
      if (reply) {
        appendMsg('agent', reply, true);
        _history.push({ role: 'model', text: reply.replace(/<[^>]+>/g, '') });

        // TTS
        if (_isTTSEnabled && reply) {
          speakText(reply.replace(/<[^>]+>/g, '').substring(0, 300));
        }
      }

    } catch (err) {
      console.error('[Axel]', err);
      removeTypingIndicator(typingId);
      _pendingImage = null;
      clearImagePreview();
      const fallback = localNLP(text || 'hola');
      appendMsg('agent', fallback, true);
    }

    if (sendBtn && input?.value === '') sendBtn.disabled = true;
    body?.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  }

  function buildPageContext() {
    const hash  = window.location.hash;
    const session = JSON.parse(localStorage.getItem('automarket_auth') || '{}');
    const parts = [];
    if (hash.includes('/auto/')) parts.push(`El usuario está viendo el detalle de un auto (${hash})`);
    if (hash.includes('/catalogo')) parts.push('El usuario está en el catálogo de autos');
    if (hash.includes('/financiamiento')) parts.push('El usuario está en la calculadora de crédito');
    if (hash.includes('/vender')) parts.push('El usuario quiere vender su auto');
    if (session.name) parts.push(`Usuario autenticado: ${session.name} (${session.role})`);
    return parts.join('. ');
  }

  // ═══════════════════════════════════════════════════
  // DOM HELPERS
  // ═══════════════════════════════════════════════════
  function appendMsg(role, content, isHtml = false) {
    const body = document.getElementById('ai-chat-body');
    if (!body) return;

    const wrap = document.createElement('div');
    wrap.className = `ai-msg ai-msg-${role} animate-fade-in`;

    if (role === 'agent') {
      wrap.innerHTML = `
        <div class="ai-msg-avatar">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </div>
        <div class="ai-msg-bubble">${isHtml ? content : escapeHtml(content)}</div>
      `;
    } else {
      wrap.innerHTML = `<div class="ai-msg-bubble">${isHtml ? content : escapeHtml(content)}</div>`;
    }

    body.appendChild(wrap);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function addTypingIndicator() {
    const body = document.getElementById('ai-chat-body');
    if (!body) return null;
    const id   = `typing-${Date.now()}`;
    const el   = document.createElement('div');
    el.id      = id;
    el.className = 'ai-msg ai-msg-agent';
    el.innerHTML = `
      <div class="ai-msg-avatar">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      </div>
      <div class="ai-typing-dots"><span></span><span></span><span></span></div>
    `;
    body.appendChild(el);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
    return id;
  }

  function removeTypingIndicator(id) {
    if (id) document.getElementById(id)?.remove();
  }

  // ═══════════════════════════════════════════════════
  // VOICE INPUT (Web Speech API)
  // ═══════════════════════════════════════════════════
  function startVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Tu navegador no soporta reconocimiento de voz', 'info');
      return;
    }

    if (_isRecording) {
      _recognition?.stop();
      return;
    }

    _recognition = new SpeechRecognition();
    _recognition.lang = 'es-MX';
    _recognition.interimResults = true;
    _recognition.maxAlternatives = 1;

    const micBtn = document.getElementById('ai-mic-btn');
    const input  = document.getElementById('ai-input');
    _isRecording = true;
    if (micBtn) micBtn.classList.add('recording');

    _recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      if (input) input.value = transcript;
      if (e.results[0].isFinal) {
        _isRecording = false;
        if (micBtn) micBtn.classList.remove('recording');
        sendMessage();
      }
    };

    _recognition.onerror = () => {
      _isRecording = false;
      if (micBtn) micBtn.classList.remove('recording');
      showToast('No pude escucharte. Intenta de nuevo.', 'info');
    };

    _recognition.onend = () => {
      _isRecording = false;
      if (micBtn) micBtn.classList.remove('recording');
    };

    _recognition.start();
    showToast('Escuchando... habla ahora 🎤', 'info');
  }

  // ═══════════════════════════════════════════════════
  // TTS — Text-to-Speech
  // ═══════════════════════════════════════════════════
  function speakText(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = 'es-MX';
    utterance.rate  = 1.05;
    utterance.pitch = 1.0;
    // Prefer a Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const esp    = voices.find(v => v.lang.startsWith('es') && v.name.toLowerCase().includes('google')) ||
                   voices.find(v => v.lang.startsWith('es'));
    if (esp) utterance.voice = esp;
    window.speechSynthesis.speak(utterance);
  }

  function toggleTTS() {
    _isTTSEnabled = !_isTTSEnabled;
    const btn = document.getElementById('ai-tts-btn');
    if (btn) {
      btn.title = _isTTSEnabled ? 'Desactivar voz' : 'Activar voz';
      btn.style.color = _isTTSEnabled ? 'var(--clr-primary-light)' : '';
    }
    if (!_isTTSEnabled) window.speechSynthesis?.cancel();
    showToast(_isTTSEnabled ? 'Voz de Axel activada 🔊' : 'Voz desactivada 🔇', 'info');
  }

  // ═══════════════════════════════════════════════════
  // IMAGE UPLOAD & CAMERA
  // ═══════════════════════════════════════════════════
  function openImageUpload(useCamera = false) {
    const existing = document.getElementById('axel-file-input');
    if (existing) existing.remove();

    const input = document.createElement('input');
    input.id     = 'axel-file-input';
    input.type   = 'file';
    input.accept = 'image/*';
    if (useCamera) input.capture = 'environment';
    input.style.display = 'none';

    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { showToast('La imagen debe ser menor a 5MB', 'info'); return; }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        const base64  = dataUrl.split(',')[1];
        _pendingImage = { data: base64, type: file.type, preview: dataUrl };
        showImagePreview(dataUrl, file.name);
      };
      reader.readAsDataURL(file);
    };

    document.body.appendChild(input);
    input.click();
  }

  function showImagePreview(dataUrl, name) {
    const preview = document.getElementById('ai-image-preview');
    if (!preview) return;
    preview.innerHTML = `
      <div class="ai-image-preview-wrap animate-fade-in">
        <img src="${dataUrl}" alt="Imagen para analizar">
        <div class="ai-image-preview-info">
          <span>📸 ${name || 'imagen.jpg'}</span>
          <button onclick="window.AIAgent.clearImage()" title="Quitar imagen">✕</button>
        </div>
      </div>`;
    preview.style.display = 'block';
    const sendBtn = document.getElementById('ai-send-btn');
    if (sendBtn) sendBtn.disabled = false;
  }

  function clearImagePreview() {
    const preview = document.getElementById('ai-image-preview');
    if (preview) { preview.innerHTML = ''; preview.style.display = 'none'; }
    _pendingImage = null;
  }

  // ═══════════════════════════════════════════════════
  // WIDGET TEMPLATE
  // ═══════════════════════════════════════════════════
  const WIDGET_HTML = `
  <div id="ai-widget-container" class="ai-widget-container">
    <div id="ai-chat-window" class="ai-chat-window" role="dialog" aria-label="Asistente virtual Axel" aria-hidden="true">

      <!-- HEADER -->
      <div class="ai-chat-header">
        <div class="ai-chat-title">
          <div class="ai-chat-avatar">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </div>
          <div>
            <h3>Axel <span class="axel-badge">IA</span> <span id="axel-mode-badge" class="axel-mode">${IS_LIVE() ? '🔥 Live' : '🧪 Demo'}</span></h3>
            <span id="ai-status-txt">● En línea · AUTOMARKET</span>
          </div>
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <!-- TTS button -->
          <button id="ai-tts-btn" class="ai-icon-btn" onclick="window.AIAgent.toggleTTS()" title="Activar voz de Axel" aria-label="Activar/desactivar voz">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          </button>
          <!-- Clear chat -->
          <button class="ai-icon-btn" onclick="window.AIAgent.clearChat()" title="Nueva conversación" aria-label="Limpiar chat">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.65"/>
            </svg>
          </button>
          <!-- Close -->
          <button class="ai-close-btn" onclick="window.AIAgent.toggle()" aria-label="Cerrar chat">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- CHAT BODY -->
      <div id="ai-chat-body" class="ai-chat-body"></div>

      <!-- IMAGE PREVIEW -->
      <div id="ai-image-preview" style="display:none;padding:0 12px 4px"></div>

      <!-- QUICK CHIPS -->
      <div id="ai-chips" class="ai-chips-wrapper">
        <div class="ai-chip" onclick="window.AIAgent.chip('¿Qué SUVs tienen disponibles?')">🚙 SUVs</div>
        <div class="ai-chip" onclick="window.AIAgent.chip('Quiero agendar una prueba de manejo')">📅 Cita</div>
        <div class="ai-chip" onclick="window.AIAgent.chip('Calcúlame un crédito a 36 meses con 20% de enganche para un auto de $450,000')">💳 Crédito</div>
        <div class="ai-chip" onclick="window.AIAgent.chip('Quiero vender mi auto')">🏷️ Vender</div>
        <div class="ai-chip" onclick="window.AIAgent.openImage()">📸 Foto</div>
      </div>

      <!-- INPUT FOOTER -->
      <div class="ai-chat-footer">
        <form id="ai-form" onsubmit="event.preventDefault(); window.AIAgent.sendMessage();" class="ai-input-row">
          <!-- Mic button -->
          <button type="button" id="ai-mic-btn" class="ai-icon-btn ai-mic-btn"
            onclick="window.AIAgent.startVoice()" title="Entrada de voz" aria-label="Entrada de voz">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>

          <!-- Camera button -->
          <button type="button" class="ai-icon-btn" onclick="window.AIAgent.openCamera()"
            title="Tomar foto" aria-label="Subir imagen">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </button>

          <div class="ai-input-wrapper">
            <input type="text" id="ai-input" placeholder="Escribe o habla con Axel..." autocomplete="off"
              aria-label="Mensaje para Axel"
              oninput="document.getElementById('ai-send-btn').disabled = !this.value.trim() && !window.AIAgent._img()">
            <button type="submit" id="ai-send-btn" class="ai-send-btn" disabled aria-label="Enviar">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </form>
        <div class="ai-footer-note">Axel usa IA · puede cometer errores</div>
      </div>
    </div>

    <!-- FAB TRIGGER -->
    <button id="ai-trigger-btn" class="ai-trigger-btn" onclick="window.AIAgent.toggle()" aria-label="Abrir asistente virtual Axel">
      <div class="ai-trigger-icon ai-trigger-chat">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <div class="ai-trigger-icon ai-trigger-close" style="display:none">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </div>
      <span class="ai-notif-dot" id="ai-notif-dot"></span>
    </button>
  </div>`;

  // ═══════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════
  function init() {
    const container = document.createElement('div');
    container.innerHTML = WIDGET_HTML;
    document.body.appendChild(container);

    // Welcome message
    setTimeout(() => {
      appendMsg('agent',
        `¡Hola! 👋 Soy <b>Axel</b>, tu asesor IA de AUTOMARKET.<br>
        Puedo <b>buscar autos</b>, <b>calcular tu crédito</b>, <b>agendar citas</b> y analizar <b>fotos de vehículos</b>.<br>
        ${IS_LIVE() ? '🔥 <span style="color:var(--clr-primary-light)">Conectado a Gemini AI</span>' : '🧪 Modo demo — configura tu API key para activar IA real'}`,
        true
      );
    }, 800);

    // Notification dot after 4s
    setTimeout(() => {
      const dot = document.getElementById('ai-notif-dot');
      if (dot && !_isOpen) dot.classList.add('visible');
    }, 4000);
  }

  // ═══════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════
  window.AIAgent = {
    toggle() {
      _isOpen = !_isOpen;
      const win     = document.getElementById('ai-chat-window');
      const chat    = document.querySelector('.ai-trigger-chat');
      const close   = document.querySelector('.ai-trigger-close');
      const dot     = document.getElementById('ai-notif-dot');
      if (!win) return;
      win.classList.toggle('open', _isOpen);
      win.setAttribute('aria-hidden', String(!_isOpen));
      if (chat)  chat.style.display  = _isOpen ? 'none' : 'flex';
      if (close) close.style.display = _isOpen ? 'flex' : 'none';
      if (dot)   dot.classList.remove('visible');
      if (_isOpen) document.getElementById('ai-input')?.focus();
    },

    sendMessage: () => sendMessage(),

    chip(text) {
      const input = document.getElementById('ai-input');
      if (input) input.value = text;
      sendMessage(text);
    },

    clearChat() {
      _history = [];
      const body = document.getElementById('ai-chat-body');
      if (body) body.innerHTML = '';
      appendMsg('agent', '¡Listo! Nueva conversación iniciada. ¿En qué te ayudo? 😊', true);
    },

    startVoice: () => startVoiceInput(),
    toggleTTS:  () => toggleTTS(),
    openImage:  () => openImageUpload(false),
    openCamera: () => openImageUpload(true),
    clearImage: () => clearImagePreview(),
    _img:       () => _pendingImage,

    // Legacy
    handleChipClick: (t) => window.AIAgent.chip(t),
    open() { if (!_isOpen) window.AIAgent.toggle(); },
  };

  // ═══════════════════════════════════════════════════
  // AUTO-INIT on DOM ready
  // ═══════════════════════════════════════════════════
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
