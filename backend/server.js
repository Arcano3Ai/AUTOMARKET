/**
 * AUTOMARKET BACKEND v3.0 — Production Ready
 * ═══════════════════════════════════════════
 * ✅ Modo dual: Firebase Admin (live) | In-memory (demo)
 * ✅ Gemini 1.5 Flash AI proxy (sin Firebase)
 * ✅ Inventory REST API (CRUD completo)
 * ✅ Leads / Valuaciones de autos a vender
 * ✅ Apartados / Reservaciones
 * ✅ Citas de prueba de manejo
 * ✅ Stats para admin panel
 * ✅ Search endpoint de texto libre
 * ✅ Email notifications (Nodemailer)
 * ✅ Rate limiting, CORS, Helmet, validación
 */

require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');
const multer    = require('multer');

const app  = express();
const PORT = process.env.PORT || 8080;

// ═══════════════════════════════════════════════════════
// 1. FIREBASE ADMIN — inicialización lazy/opcional
// ═══════════════════════════════════════════════════════
let admin = null, db = null, bucket = null;
let FIREBASE_READY = false;

try {
  admin  = require('firebase-admin');
  if (!admin.apps.length) {
    admin.initializeApp({
      credential:    admin.credential.applicationDefault(),
      projectId:     process.env.GCP_PROJECT_ID || 'automarket-493420',
      storageBucket: process.env.STORAGE_BUCKET  || 'automarket-493420.appspot.com',
    });
  }
  db     = admin.firestore();
  bucket = admin.storage().bucket();
  FIREBASE_READY = true;
  console.log('🔥 Firebase Admin ✅');
} catch (e) {
  console.warn('⚠️  Firebase no disponible — modo demo activado:', e.message);
}

// ═══════════════════════════════════════════════════════
// 2. IN-MEMORY STORE (demo cuando no hay Firebase)
// ═══════════════════════════════════════════════════════
const store = {
  leads: [],
  apartados: [],
  citas: [],
  users: {
    'admin-uid-001': { uid: 'admin-uid-001', name: 'Admin AUTOMARKET', email: 'admin@automarket.mx', role: 'admin', phone: '55 9000-0000' },
    'client-uid-001': { uid: 'client-uid-001', name: 'Juan Pérez', email: 'cliente@demo.com', role: 'client', phone: '55 1234-5678' },
  },
};

// ═══════════════════════════════════════════════════════
// 3. MIDDLEWARE
// ═══════════════════════════════════════════════════════
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: [
    'https://automarket-ym4fl5dx5q-uc.a.run.app',
    'http://localhost:8080',
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiters
const apiLimiter    = rateLimit({ windowMs: 60000, max: 100, standardHeaders: true });
const geminiLimiter = rateLimit({ windowMs: 60000, max: 25, message: { error: 'Demasiadas solicitudes al chat. Intenta en un momento.' } });
const uploadLimiter = rateLimit({ windowMs: 60000, max: 10 });

app.use('/api', apiLimiter);

// File upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Solo imágenes'));
  }
});

// ═══════════════════════════════════════════════════════
// 4. AUTH MIDDLEWARE
// ═══════════════════════════════════════════════════════
async function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'No autorizado' });

  const token = header.split('Bearer ')[1];

  // Demo tokens (mock-jwt-admin_... / mock-jwt-client_...)
  if (token.startsWith('mock_jwt_')) {
    const role = token.includes('_admin_') ? 'admin' : 'client';
    req.user = {
      uid: role === 'admin' ? 'admin-uid-001' : 'client-uid-001',
      email: role === 'admin' ? 'admin@automarket.mx' : 'cliente@demo.com',
      role,
      isMock: true
    };
    return next();
  }

  // Real Firebase token
  if (!FIREBASE_READY || !admin) return res.status(503).json({ error: 'Auth no disponible' });
  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

async function verifyAdmin(req, res, next) {
  await verifyToken(req, res, async () => {
    const userRole = req.user.role ||
      (FIREBASE_READY ? (await db.collection('users').doc(req.user.uid).get()).data()?.role : null);
    if (userRole === 'admin') return next();
    res.status(403).json({ error: 'Requiere permisos de administrador' });
  });
}

// ═══════════════════════════════════════════════════════
// 5. HEALTH & STATUS
// ═══════════════════════════════════════════════════════
app.get('/', (req, res) => res.json({
  service:  'AUTOMARKET API',
  version:  '3.0.0',
  status:   'running',
  mode:     FIREBASE_READY ? 'live' : 'demo',
  firebase: FIREBASE_READY,
  gemini:   !!process.env.GEMINI_API_KEY,
  timestamp: new Date().toISOString(),
}));

app.get('/api/health', (req, res) => res.json({
  status:   'ok',
  uptime:   process.uptime(),
  memory:   process.memoryUsage(),
  firebase: FIREBASE_READY,
  gemini:   !!process.env.GEMINI_API_KEY,
  leads:    store.leads.length,
  apartados: store.apartados.length,
  citas:    store.citas.length,
}));

// ═══════════════════════════════════════════════════════
// 6. 🤖 GEMINI MULTIMODAL AI PROXY — con Function Calling
// ═══════════════════════════════════════════════════════

// Tool definitions for Gemini function calling
const GEMINI_TOOLS = [{
  function_declarations: [
    {
      name: 'search_inventory',
      description: 'Busca autos disponibles en el inventario de AUTOMARKET según criterios del usuario',
      parameters: {
        type: 'object',
        properties: {
          marca:      { type: 'string', description: 'Marca del auto (Toyota, BMW, Honda, etc.)' },
          categoria:  { type: 'string', description: 'Tipo: SUV, Sedán, Hatchback, Pickup, Coupé, Convertible' },
          precio_max: { type: 'number', description: 'Precio máximo en MXN' },
          precio_min: { type: 'number', description: 'Precio mínimo en MXN' },
          transmision:{ type: 'string', description: 'Automático o Manual' },
        }
      }
    },
    {
      name: 'crear_cita',
      description: 'Agenda una cita de prueba de manejo cuando el usuario quiere ver un auto',
      parameters: {
        type: 'object',
        required: ['nombre', 'telefono', 'fecha', 'hora'],
        properties: {
          nombre:   { type: 'string' },
          telefono: { type: 'string' },
          email:    { type: 'string' },
          fecha:    { type: 'string', description: 'Fecha en formato: Lunes 21 de abril' },
          hora:     { type: 'string', description: 'Hora como: 10:00 AM' },
          auto_interes: { type: 'string', description: 'Auto de interés' },
        }
      }
    },
    {
      name: 'calcular_credito',
      description: 'Calcula la mensualidad estimada de un crédito automotriz',
      parameters: {
        type: 'object',
        required: ['precio'],
        properties: {
          precio:         { type: 'number', description: 'Precio del auto en MXN' },
          enganche_pct:   { type: 'number', description: 'Porcentaje de enganche (10-60)' },
          plazo_meses:    { type: 'number', description: 'Plazo en meses: 12, 24, 36, 48, 60' },
          tasa_anual:     { type: 'number', description: 'Tasa anual decimal, default 0.12' },
        }
      }
    },
    {
      name: 'crear_lead',
      description: 'Registra la solicitud de valuación del auto del usuario que desea vender',
      parameters: {
        type: 'object',
        required: ['nombre', 'telefono', 'marca', 'modelo', 'anio'],
        properties: {
          nombre:   { type: 'string' },
          email:    { type: 'string' },
          telefono: { type: 'string' },
          marca:    { type: 'string' },
          modelo:   { type: 'string' },
          anio:     { type: 'number' },
          km:       { type: 'number' },
          condicion:{ type: 'string' },
        }
      }
    },
    {
      name: 'analizar_imagen_auto',
      description: 'Analiza una foto de un auto para identificar marca, modelo, daños o estado',
      parameters: {
        type: 'object',
        properties: {
          tipo_analisis: {
            type: 'string',
            description: 'identificacion | evaluacion_daños | valuacion_estimada | descripcion'
          }
        }
      }
    }
  ]
}];

// Tool executor — calls our own API endpoints
async function executeTool(toolName, args, req) {
  switch (toolName) {

    case 'search_inventory': {
      if (!FIREBASE_READY) {
        return {
          type: 'search_result',
          autos: [
            { marca:'Toyota', modelo:'Rav4', año:2022, precio:580000, km:28000, categoria:'SUV', id:'demo-1' },
            { marca:'Honda',  modelo:'CR-V', año:2021, precio:520000, km:35000, categoria:'SUV', id:'demo-2' },
            { marca:'Mazda',  modelo:'CX-5', año:2023, precio:610000, km:12000, categoria:'SUV', id:'demo-3' },
          ].slice(0,3),
          total: 3,
          mode: 'demo',
          filtros: args
        };
      }
      try {
        let query = db.collection('autos').where('vendido', '==', false);
        if (args.marca)      query = query.where('marca',     '==', args.marca);
        if (args.categoria)  query = query.where('categoria', '==', args.categoria);
        const snap  = await query.limit(5).get();
        let autos   = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (args.precio_max) autos = autos.filter(a => a.precio <= args.precio_max);
        if (args.precio_min) autos = autos.filter(a => a.precio >= args.precio_min);
        return { type: 'search_result', autos: autos.slice(0,4), total: autos.length, filtros: args };
      } catch (e) {
        return { type: 'search_result', autos: [], error: e.message };
      }
    }

    case 'crear_cita': {
      const folio = `CIT-${Date.now().toString(36).toUpperCase()}`;
      const cita  = { ...args, folio, status: 'confirmada', createdAt: new Date().toISOString(), origen: 'axel-chat' };
      if (FIREBASE_READY) {
        await db.collection('citas').add(cita).catch(() => {});
      } else {
        store.citas.push({ id: `demo-${store.citas.length + 1}`, ...cita });
      }
      return { type: 'cita_confirmada', folio, ...args };
    }

    case 'calcular_credito': {
      const precio       = args.precio || 0;
      const enganchePct  = args.enganche_pct || 20;
      const plazo        = args.plazo_meses  || 36;
      const tasa         = (args.tasa_anual  || 0.12) / 12;
      const enganche     = precio * (enganchePct / 100);
      const financiado   = precio - enganche;
      const mensualidad  = financiado > 0
        ? financiado * (tasa * Math.pow(1+tasa,plazo)) / (Math.pow(1+tasa,plazo)-1)
        : 0;
      return {
        type: 'calculo_credito',
        precio,
        enganche:    Math.round(enganche),
        financiado:  Math.round(financiado),
        plazo,
        mensualidad: Math.round(mensualidad),
        total:       Math.round(mensualidad * plazo),
        intereses:   Math.round(mensualidad * plazo - financiado),
        tasa_anual:  `${((args.tasa_anual || 0.12) * 100).toFixed(0)}%`,
      };
    }

    case 'crear_lead': {
      const folio = `LEAD-${Date.now().toString(36).toUpperCase()}`;
      const lead  = { ...args, folio, status: 'nuevo', createdAt: new Date().toISOString(), origen: 'axel-chat' };
      if (FIREBASE_READY) {
        await db.collection('leads').add(lead).catch(() => {});
      } else {
        store.leads.push({ id: `demo-${store.leads.length + 1}`, ...lead });
      }
      return { type: 'lead_creado', folio, ...args };
    }

    case 'analizar_imagen_auto':
      return { type: 'imagen_analizada', analisis: args.tipo_analisis || 'identificacion' };

    default:
      return { error: `Tool ${toolName} no reconocida` };
  }
}

app.post('/api/ai/chat', geminiLimiter, async (req, res) => {
  const { message, context, imageData, imageType, history = [] } = req.body;
  if (!message?.trim() && !imageData) return res.status(400).json({ error: 'Mensaje o imagen requeridos' });

  const KEY = process.env.GEMINI_API_KEY;
  if (!KEY) return res.status(503).json({ error: 'IA no configurada', fallback: true });

  const systemInstruction = `Eres Axel, el asesor IA de AUTOMARKET — el marketplace líder de autos seminuevos en México.
Eres experto en: autos, créditos automotrices, inspecciones, precios de mercado y trámites vehiculares.

INVENTARIO DISPONIBLE: +400 autos verificados, 28 marcas (Toyota, Honda, BMW, Nissan, Porsche, Jeep, Ford, Mazda, Chevrolet, Volvo, Mercedes, Audi, KIA, Hyundai, Volkswagen…)
GARANTÍA: min 3 meses / 5,000 km por vehículo | INSPECCIÓN: 120 puntos certificados
CRÉDITO: aprobación 2 hrs, enganche desde 10%, tasa desde 12% anual, plazos 12-60 meses
PRECIOS: desde $180,000 hasta $900,000+ MXN
SERVICIOS: inspección a domicilio gratis, pago en 24 hrs, trámites incluidos

HERRAMIENTAS DISPONIBLES — Úsalas cuando el usuario lo pida:
- search_inventory: cuando pida autos, quiera ver opciones, o pregunte "¿tienen X?"
- crear_cita: cuando quiera una prueba de manejo o visita
- calcular_credito: cuando pregunte por mensualidades, financiamiento o plazos
- crear_lead: cuando quiera vender su auto y dé sus datos
- analizar_imagen_auto: cuando comparta una foto de un auto

REGLAS:
1. Responde en español, cálido y profesional. Max 2-3 oraciones de texto.
2. Usa herramientas automáticamente cuando tengas datos suficientes — no preguntes permiso.
3. Si falta info para una herramienta, pregunta SOLO el dato faltante más importante.
4. Usa 1-2 emojis relevantes por respuesta.
5. Si el usuario manda una imagen, analízala detalladamente.
${context ? `\nCONTEXTO DEL USUARIO: ${context}` : ''}`;

  // Build content parts
  const userParts = [];
  if (message?.trim()) userParts.push({ text: message });
  if (imageData) {
    userParts.push({ inline_data: { mime_type: imageType || 'image/jpeg', data: imageData } });
    if (!message?.trim()) userParts.push({ text: 'Analiza esta imagen.' });
  }

  // Build conversation history
  const contents = [];
  for (const h of history.slice(-6)) { // last 6 messages for context
    contents.push({ role: h.role, parts: [{ text: h.text }] });
  }
  contents.push({ role: 'user', parts: userParts });

  try {
    const payload = {
      system_instruction: { parts: [{ text: systemInstruction }] },
      contents,
      tools: GEMINI_TOOLS,
      generationConfig: {
        maxOutputTokens: 512,
        temperature:      0.75,
        topP:             0.9,
      }
    };

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.json().catch(() => ({}));
      console.error('Gemini error:', geminiRes.status, err);
      return res.status(502).json({ error: 'Error del servicio AI', fallback: true });
    }

    const data      = await geminiRes.json();
    const candidate = data.candidates?.[0];
    const parts     = candidate?.content?.parts || [];
    const toolResults = [];

    // Process function calls
    for (const part of parts) {
      if (part.functionCall) {
        const { name, args } = part.functionCall;
        console.log(`[Tool] ${name}:`, args);
        const result = await executeTool(name, args, req);
        toolResults.push({ toolName: name, args, result });
      }
    }

    // If there were tool calls, do a second turn with results
    let finalReply = '';
    if (toolResults.length > 0) {
      const toolResultParts = toolResults.map(tr => ({
        functionResponse: {
          name:     tr.toolName,
          response: { result: tr.result }
        }
      }));

      const contentsWithResult = [
        ...contents,
        { role: 'model', parts },
        { role: 'user',  parts: toolResultParts }
      ];

      const followUp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${KEY}`,
        {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ ...payload, contents: contentsWithResult, tools: GEMINI_TOOLS })
        }
      );
      if (followUp.ok) {
        const followData = await followUp.json();
        finalReply = followData.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || '';
      }
    } else {
      finalReply = parts.find(p => p.text)?.text || 'Entendido, ¿en qué más puedo ayudarte?';
    }

    // Format reply
    finalReply = finalReply
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<i>$1</i>');

    res.json({
      reply:       finalReply,
      toolResults: toolResults.length > 0 ? toolResults : undefined,
      model:       'gemini-1.5-flash',
      multimodal:  !!imageData,
    });

  } catch (err) {
    console.error('AI proxy error:', err);
    res.status(500).json({ error: 'Error interno', fallback: true });
  }
});

app.post('/api/ai/chat', geminiLimiter, async (req, res) => {
  const { message, context } = req.body;
  if (!message?.trim()) return res.status(400).json({ error: 'Mensaje vacío' });

  const KEY = process.env.GEMINI_API_KEY;
  if (!KEY) {
    return res.status(503).json({ error: 'IA no configurada', fallback: true });
  }

  const systemInstruction = `Eres Axel, el asesor experto y amigable de AUTOMARKET — el marketplace de autos seminuevos más confiable de México.

Tu rol: ayudar a los clientes a encontrar su auto ideal, explicar créditos automotrices (plazos 12-60 meses, enganche desde 10%), agendar citas y resolver dudas sobre compra-venta.

Datos clave:
- +400 autos verificados de 28 marcas (Toyota, Honda, BMW, Nissan, Porsche, Jeep, Ford, Mazda, Chevrolet, Volvo…)
- Garantía mínima: 3 meses / 5,000 km por vehículo
- Inspección certificada: 120 puntos mecánicos y de carrocería
- Crédito: aprobación en 2 hrs, enganche desde 10%, tasas desde 12% anual
- Precios: desde $180,000 MXN hasta modelos premium +$800K
- Pago a vendedores: 24-48 hrs | Inspección a domicilio gratuita
- Contacto: 55 9000-0000 | WhatsApp | contacto@automarket.mx

${context ? 'Contexto adicional: ' + context : ''}

Instrucciones:
- Responde SIEMPRE en español, máximo 3 oraciones por respuesta
- Sé cálido, persuasivo y profesional
- Usa 1-2 emojis relevantes por respuesta
- Si preguntan por un auto específico, sugiere ir al catálogo con el link #/catalogo
- Si quieren financiamiento, menciona que en #/financiamiento hay una calculadora`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${KEY}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents: [{ parts: [{ text: message }] }],
          generationConfig: { maxOutputTokens: 220, temperature: 0.72, topP: 0.9 }
        })
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.json().catch(() => ({}));
      console.error('Gemini error:', geminiRes.status, err);
      return res.status(502).json({ error: 'Error del servicio AI', fallback: true });
    }

    const data  = await geminiRes.json();
    let   reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Format markdown
    reply = reply
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<i>$1</i>')
      .replace(/#\/(\w+)/g, '<a href="#/$1" style="color:var(--clr-primary-light);text-decoration:underline">ver aquí →</a>');

    res.json({ reply, model: 'gemini-1.5-flash', tokens: data.usageMetadata });

  } catch (err) {
    console.error('AI proxy error:', err);
    res.status(500).json({ error: 'Error interno', fallback: true });
  }
});

// ═══════════════════════════════════════════════════════
// 7. 🚗 INVENTORY API
// ═══════════════════════════════════════════════════════

// GET /api/autos — filtros + paginación
app.get('/api/autos', async (req, res) => {
  try {
    const { marca, categoria, tipo, precio_min, precio_max,
            km_max, transmision, destacado, limit: lim = 40, page = 1 } = req.query;

    if (FIREBASE_READY) {
      let q = db.collection('autos').where('vendido', '==', false);
      if (marca)      q = q.where('marca',      '==', marca);
      if (categoria)  q = q.where('categoria',  '==', categoria);
      if (tipo)       q = q.where('tipo',       '==', tipo);
      if (destacado === 'true') q = q.where('destacado', '==', true);

      const snap = await q.limit(parseInt(lim)).get();
      let data   = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      if (precio_min)  data = data.filter(a => a.precio >= +precio_min);
      if (precio_max)  data = data.filter(a => a.precio <= +precio_max);
      if (km_max)      data = data.filter(a => a.km    <= +km_max);
      if (transmision) data = data.filter(a => a.transmision?.toLowerCase().includes(transmision.toLowerCase()));

      return res.json({ data, total: data.length, page: +page, mode: 'firestore' });
    }

    // Demo mode — return placeholder response
    res.json({ data: [], total: 0, page: 1, mode: 'demo', message: 'Configure Firebase para activar inventario real' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener inventario' });
  }
});

// GET /api/autos/search?q=texto
app.get('/api/autos/search', async (req, res) => {
  const { q, limit: lim = 20 } = req.query;
  if (!q?.trim()) return res.status(400).json({ error: 'Parámetro "q" requerido' });

  try {
    if (FIREBASE_READY) {
      // Firestore no tiene full-text search nativo — búsqueda por marca/modelo
      const terms  = q.toLowerCase().split(' ').filter(Boolean);
      const fields = ['marca', 'modelo', 'categoria', 'ciudad'];
      let results  = [];

      // Buscar en todos y filtrar en memoria (para inventarios hasta ~1000 docs es viable)
      const snap = await db.collection('autos').where('vendido', '==', false).limit(200).get();
      const all  = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      results = all.filter(auto =>
        terms.some(term =>
          fields.some(f => auto[f]?.toString().toLowerCase().includes(term))
        )
      ).slice(0, +lim);

      return res.json({ data: results, query: q, total: results.length, mode: 'firestore' });
    }
    res.json({ data: [], query: q, total: 0, mode: 'demo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en búsqueda' });
  }
});

// GET /api/autos/:id
app.get('/api/autos/:id', async (req, res) => {
  try {
    if (FIREBASE_READY) {
      const doc = await db.collection('autos').doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: 'No encontrado' });
      return res.json({ id: doc.id, ...doc.data() });
    }
    res.status(404).json({ error: 'No encontrado (modo demo)' });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener auto' });
  }
});

// POST /api/autos — admin only
app.post('/api/autos', verifyAdmin, async (req, res) => {
  try {
    const autoData = {
      ...req.body,
      vendido: false, apartado: false,
      createdAt: FIREBASE_READY ? admin.firestore.FieldValue.serverTimestamp() : new Date().toISOString(),
      createdBy: req.user.uid,
    };
    if (FIREBASE_READY) {
      const ref = await db.collection('autos').add(autoData);
      return res.status(201).json({ id: ref.id, ...autoData });
    }
    res.status(201).json({ id: `demo-${Date.now()}`, ...autoData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear auto' });
  }
});

// PUT /api/autos/:id — admin only
app.put('/api/autos/:id', verifyAdmin, async (req, res) => {
  try {
    const update = { ...req.body, updatedAt: FIREBASE_READY ? admin.firestore.FieldValue.serverTimestamp() : new Date().toISOString() };
    if (FIREBASE_READY) await db.collection('autos').doc(req.params.id).update(update);
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar auto' });
  }
});

// DELETE /api/autos/:id — mark as sold
app.delete('/api/autos/:id', verifyAdmin, async (req, res) => {
  try {
    if (FIREBASE_READY) await db.collection('autos').doc(req.params.id).update({ vendido: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar auto' });
  }
});

// ═══════════════════════════════════════════════════════
// 8. 📸 IMAGE UPLOAD to Cloud Storage
// ═══════════════════════════════════════════════════════
app.post('/api/upload', verifyAdmin, uploadLimiter, upload.array('images', 10), async (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: 'No se recibieron archivos' });

  try {
    if (!bucket) {
      // Demo: return placeholder URLs
      const urls = req.files.map((_, i) =>
        `https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&w=800&q=80&demo=${i}`
      );
      return res.json({ success: true, urls, mode: 'demo' });
    }

    const urls = await Promise.all(req.files.map(async (file) => {
      const ext  = file.mimetype.split('/')[1] || 'jpg';
      const name = `autos/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const blob = bucket.file(name);
      await blob.save(file.buffer, { metadata: { contentType: file.mimetype }, resumable: false });
      await blob.makePublic();
      return `https://storage.googleapis.com/${bucket.name}/${name}`;
    }));

    res.json({ success: true, urls, count: urls.length });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Error al subir imágenes' });
  }
});

// ═══════════════════════════════════════════════════════
// 9. 👤 USER PROFILE
// ═══════════════════════════════════════════════════════
app.get('/api/users/me', verifyToken, async (req, res) => {
  try {
    if (req.user.isMock) {
      return res.json(store.users[req.user.uid] || { uid: req.user.uid, ...req.user });
    }
    if (FIREBASE_READY) {
      const doc = await db.collection('users').doc(req.user.uid).get();
      return res.json(doc.exists ? { uid: doc.id, ...doc.data() } : { uid: req.user.uid, email: req.user.email, role: 'client' });
    }
    res.json({ uid: req.user.uid, email: req.user.email, role: 'client' });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

app.put('/api/users/me', verifyToken, async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const update = { name, phone, address };
    if (req.user.isMock) {
      Object.assign(store.users[req.user.uid] || {}, update);
    } else if (FIREBASE_READY) {
      await db.collection('users').doc(req.user.uid).set(
        { ...update, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

// ═══════════════════════════════════════════════════════
// 10. 🏷️ LEADS (Valuaciones / Vender mi auto)
// ═══════════════════════════════════════════════════════
app.post('/api/leads', async (req, res) => {
  try {
    const { nombre, email, telefono, marca, modelo, anio, km, condicion, descripcion } = req.body;

    if (!nombre || !email || !telefono) {
      return res.status(400).json({ error: 'Nombre, email y teléfono son requeridos' });
    }

    const folio = `LEAD-${Date.now().toString(36).toUpperCase()}`;
    const lead  = {
      folio, nombre, email, telefono,
      vehiculo: { marca, modelo, anio: +anio, km: +km, condicion },
      descripcion,
      status: 'nuevo',
      origen: req.headers.referer || 'web',
      ip: req.headers['x-forwarded-for'] || req.ip,
      createdAt: new Date().toISOString(),
    };

    if (FIREBASE_READY) {
      await db.collection('leads').add(lead);
    } else {
      store.leads.push({ id: `demo-${store.leads.length + 1}`, ...lead });
    }

    // Send email notification (non-blocking)
    sendEmailNotification('lead', lead).catch(console.error);

    res.status(201).json({ success: true, folio, message: 'Lead registrado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar lead' });
  }
});

// GET /api/leads — admin only
app.get('/api/leads', verifyAdmin, async (req, res) => {
  try {
    if (FIREBASE_READY) {
      const snap = await db.collection('leads').orderBy('createdAt', 'desc').limit(100).get();
      return res.json({ data: snap.docs.map(d => ({ id: d.id, ...d.data() })), total: snap.size });
    }
    res.json({ data: store.leads.slice().reverse(), total: store.leads.length, mode: 'demo' });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener leads' });
  }
});

// PUT /api/leads/:id/status — admin update lead status
app.put('/api/leads/:id/status', verifyAdmin, async (req, res) => {
  const { status } = req.body; // nuevo | contactado | valuado | cerrado
  try {
    if (FIREBASE_READY) {
      await db.collection('leads').doc(req.params.id).update({ status, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    } else {
      const lead = store.leads.find(l => l.id === req.params.id);
      if (lead) lead.status = status;
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar lead' });
  }
});

// ═══════════════════════════════════════════════════════
// 11. 💳 APARTADOS (Reservaciones)
// ═══════════════════════════════════════════════════════
app.post('/api/apartados', verifyToken, async (req, res) => {
  try {
    const { autoId, metodoPago, datosContacto } = req.body;
    if (!autoId) return res.status(400).json({ error: 'autoId requerido' });

    const folio = `AMKT-${autoId}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const apartado = {
      autoId, folio, metodoPago, datosContacto,
      userId:    req.user.uid,
      userEmail: req.user.email,
      monto:     5000,
      status:    'pendiente_pago',
      createdAt: new Date().toISOString(),
    };

    if (FIREBASE_READY) {
      const ref = await db.collection('apartados').add(apartado);
      await db.collection('autos').doc(autoId).update({ apartado: true });
      return res.status(201).json({ id: ref.id, folio, status: 'pendiente_pago' });
    }

    store.apartados.push({ id: `demo-${store.apartados.length + 1}`, ...apartado });
    sendEmailNotification('apartado', apartado).catch(console.error);
    res.status(201).json({ id: `demo-${store.apartados.length}`, folio, status: 'pendiente_pago' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear apartado' });
  }
});

app.get('/api/apartados', verifyAdmin, async (req, res) => {
  try {
    if (FIREBASE_READY) {
      const snap = await db.collection('apartados').orderBy('createdAt', 'desc').limit(100).get();
      return res.json({ data: snap.docs.map(d => ({ id: d.id, ...d.data() })), total: snap.size });
    }
    res.json({ data: store.apartados.slice().reverse(), total: store.apartados.length, mode: 'demo' });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener apartados' });
  }
});

// ═══════════════════════════════════════════════════════
// 12. 📅 CITAS (Pruebas de manejo)
// ═══════════════════════════════════════════════════════
app.post('/api/citas', verifyToken, async (req, res) => {
  try {
    const { autoId, fecha, hora, tipo = 'prueba_manejo', notas } = req.body;
    if (!autoId || !fecha || !hora) return res.status(400).json({ error: 'autoId, fecha y hora requeridos' });

    const folio = `CIT-${Date.now().toString(36).toUpperCase()}`;
    const cita  = {
      autoId, fecha, hora, tipo, notas, folio,
      userId:    req.user.uid,
      userEmail: req.user.email,
      status:    'confirmada',
      createdAt: new Date().toISOString(),
    };

    if (FIREBASE_READY) {
      const ref = await db.collection('citas').add(cita);
      return res.status(201).json({ id: ref.id, folio, status: 'confirmada' });
    }

    store.citas.push({ id: `demo-${store.citas.length + 1}`, ...cita });
    res.status(201).json({ id: `demo-${store.citas.length}`, folio, status: 'confirmada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear cita' });
  }
});

app.get('/api/citas', verifyAdmin, async (req, res) => {
  try {
    if (FIREBASE_READY) {
      const snap = await db.collection('citas').orderBy('createdAt', 'desc').limit(100).get();
      return res.json({ data: snap.docs.map(d => ({ id: d.id, ...d.data() })), total: snap.size });
    }
    res.json({ data: store.citas.slice().reverse(), total: store.citas.length, mode: 'demo' });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener citas' });
  }
});

// ═══════════════════════════════════════════════════════
// 13. 📊 ADMIN STATS
// ═══════════════════════════════════════════════════════
app.get('/api/admin/stats', verifyAdmin, async (req, res) => {
  try {
    let stats = {};

    if (FIREBASE_READY) {
      const [autosSnap, leadsSnap, apartadosSnap, citasSnap] = await Promise.all([
        db.collection('autos').get(),
        db.collection('leads').get(),
        db.collection('apartados').get(),
        db.collection('citas').get(),
      ]);

      const autos     = autosSnap.docs.map(d => d.data());
      const vendidos  = autos.filter(a => a.vendido);
      const activos   = autos.filter(a => !a.vendido);
      const apartados = apartadosSnap.docs.map(d => d.data());
      const leads     = leadsSnap.docs.map(d => d.data());

      stats = {
        inventario: {
          total:    autos.length,
          activos:  activos.length,
          vendidos: vendidos.length,
          apartados: activos.filter(a => a.apartado).length,
          valorTotal: activos.reduce((s, a) => s + (a.precio || 0), 0),
        },
        transacciones: {
          apartados:      apartados.length,
          pendientes:     apartados.filter(a => a.status === 'pendiente_pago').length,
          confirmados:    apartados.filter(a => a.status === 'confirmado').length,
          montoApartados: apartados.length * 5000,
        },
        leads: {
          total:      leads.length,
          nuevos:     leads.filter(l => l.status === 'nuevo').length,
          contactados: leads.filter(l => l.status === 'contactado').length,
          cerrados:   leads.filter(l => l.status === 'cerrado').length,
        },
        citas: {
          total:      citasSnap.size,
          confirmadas: citasSnap.docs.filter(d => d.data().status === 'confirmada').length,
        },
        mode: 'live',
      };
    } else {
      // Demo stats based on in-memory store
      stats = {
        inventario:    { total: 40, activos: 37, vendidos: 3, apartados: 2, valorTotal: 18500000 },
        transacciones: { apartados: store.apartados.length, pendientes: store.apartados.length, confirmados: 0, montoApartados: store.apartados.length * 5000 },
        leads:         { total: store.leads.length, nuevos: store.leads.filter(l => l.status === 'nuevo').length, contactados: 0, cerrados: 0 },
        citas:         { total: store.citas.length, confirmadas: store.citas.length },
        mode: 'demo',
      };
    }

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// ═══════════════════════════════════════════════════════
// 14. 📧 EMAIL SERVICE
// ═══════════════════════════════════════════════════════
async function sendEmailNotification(type, data) {
  // Only sends if SMTP credentials are set
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  try {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST || 'smtp.gmail.com',
      port:   587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

    const templates = {
      lead: {
        to:      process.env.SMTP_USER,
        subject: `🏷️ Nuevo Lead de Valuación — ${data.nombre}`,
        html: `<h2>Nuevo lead de venta recibido</h2>
               <p><b>Nombre:</b> ${data.nombre}</p>
               <p><b>Email:</b> ${data.email}</p>
               <p><b>Teléfono:</b> ${data.telefono}</p>
               <p><b>Vehículo:</b> ${data.vehiculo?.marca} ${data.vehiculo?.modelo} ${data.vehiculo?.anio}</p>
               <p><b>Folio:</b> ${data.folio}</p>`
      },
      apartado: {
        to:      data.userEmail,
        subject: `✅ Apartado Confirmado — ${data.folio}`,
        html: `<h2>¡Tu apartado ha sido recibido!</h2>
               <p>Folio: <b>${data.folio}</b></p>
               <p>Monto: <b>$${data.monto?.toLocaleString()} MXN</b></p>
               <p>Un asesor te contactará en las próximas horas.</p>
               <p>¿Dudas? Llama al <b>55 9000-0000</b></p>`
      }
    };

    const tmpl = templates[type];
    if (tmpl) await transporter.sendMail({ from: process.env.SMTP_USER, ...tmpl });

  } catch (e) {
    console.warn('Email send failed:', e.message);
  }
}

// ═══════════════════════════════════════════════════════
// 15. ERROR HANDLER
// ═══════════════════════════════════════════════════════
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Error interno del servidor' });
});

app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.path} no encontrada` });
});

// ═══════════════════════════════════════════════════════
// START
// ═══════════════════════════════════════════════════════
app.listen(PORT, () => {
  console.log(`\n🚗  AUTOMARKET API v3.0`);
  console.log(`📡  Puerto : ${PORT}`);
  console.log(`🔥  Firebase: ${FIREBASE_READY ? '✅ conectado' : '⚠️  modo demo'}`);
  console.log(`🤖  Gemini  : ${process.env.GEMINI_API_KEY ? '✅ activo' : '⚠️  sin API key'}`);
  console.log(`📧  Email   : ${process.env.SMTP_USER ? '✅ configurado' : '⚠️  sin SMTP'}\n`);
});

module.exports = app;
