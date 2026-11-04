/* ================================================
   AUTOMARKET — Mock Database
   24 autos con datos completos para el inventario
   ================================================ */

const AUTOMARKET_DB = {
  autos: [
    {
      id: 101,
      marca: 'Ferrari', modelo: 'SF90 Stradale Assetto Fiorano', año: 2024,
      precio: 12500000, pago_mensual: 195000,
      km: 1200, transmision: 'Automático F1 DCT 8 vel', motor: '4.0L V8 Twin-Turbo PHEV 1,000 HP',
      color: 'Rosso Corsa', combustible: 'Híbrido Enchufable',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&w=1200&q=85',
        'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&w=1200&q=85',
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&w=1200&q=85'
      ],
      descripcion: 'Ferrari SF90 Stradale 2024 con paquete Assetto Fiorano original. Tracción integral eAWD, suspensión Multimatic derivada de competición GT, alerón de fibra de carbono y escapes de titanio. 0 a 100 km/h en 2.5 segundos. Garantía oficial Ferrari Power 7 años.',
      caracteristicas: ['Paquete Assetto Fiorano', 'Frenos Carbono-Cerámicos CCM', 'Interior Fibra de Carbono Racing', 'Sistema de Telemetría Ferrari', 'Capó con venting activo'],
      garantia: 'Garantía Oficial Ferrari 7 Años',
      verificado: true, destacado: true, vendido: false,
      categoria: 'Deportivo',
      tipo: 'regular'
    },
    {
      id: 102,
      marca: 'Lamborghini', modelo: 'Revuelto V12 Híbrido HPEV', año: 2024,
      precio: 14200000, pago_mensual: 220000,
      km: 850, transmision: 'Automático Doble Embrague 8 vel', motor: '6.5L V12 Atmosférico + 3 Motores Eléctricos 1,015 HP',
      color: 'Verde Mantis', combustible: 'Híbrido',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&w=1200&q=85',
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&w=1200&q=85',
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&w=1200&q=85'
      ],
      descripcion: 'Lamborghini Revuelto 2024 — El primer superdeportivo V12 HPEV de la historia. Chasis monocasco de carbono Monofuselage, alerón trasero activo con 3 posiciones y vectorización de par eléctrico. Estado de concurso con inspección de 120 puntos certificada AUTOMARKET.',
      caracteristicas: ['Monocasco de Carbono Monofuselage', 'Frenos Carbocerámicos CCB Plus', 'Sonido V12 a 9,500 RPM', 'Cámara 360 y Asistente ADAS', 'Llantas forjadas Altanero 21"/22"'],
      garantia: 'Garantía Lamborghini Selezione 24 Meses',
      verificado: true, destacado: true, vendido: false,
      categoria: 'Deportivo',
      tipo: 'regular'
    },
    {
      id: 103,
      marca: 'Ferrari', modelo: '296 GTB Assetto', año: 2023,
      precio: 7950000, pago_mensual: 125000,
      km: 3800, transmision: 'Automático F1 8 vel', motor: '3.0L V6 Twin-Turbo PHEV 830 HP',
      color: 'Giallo Modena', combustible: 'Híbrido Enchufable',
      ciudad: 'Monterrey', estado: 'NL',
      fotos: [
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&w=1200&q=85',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&w=1200&q=85'
      ],
      descripcion: 'Ferrari 296 GTB 2023 en color Giallo Modena con franjas Assetto Fiorano. Emocionante entrega de potencia con sonido V6 apodado "pequeño V12". Factura original, un solo dueño.',
      caracteristicas: ['Asientos Daytona Racing Carbono', 'Apple CarPlay Inalámbrico', 'Frenos Cerámicos Brembo', 'Sistema de Elevación Frontal (Lifter)'],
      garantia: '12 meses / 20,000 km Certificada',
      verificado: true, destacado: true, vendido: false,
      categoria: 'Deportivo',
      tipo: 'regular'
    },
    {
      id: 104,
      marca: 'Lamborghini', modelo: 'Huracán STO', año: 2023,
      precio: 8400000, pago_mensual: 132000,
      km: 4200, transmision: 'Automático LDF 7 vel', motor: '5.2L V10 Atmosférico 640 HP',
      color: 'Blu Laufey / Arancio California', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'JAL',
      fotos: [
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&w=1200&q=85',
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&w=1200&q=85'
      ],
      descripcion: 'Lamborghini Huracán STO (Super Trofeo Omologata) 2023. El auto de carreras homologado para la calle. Cofango de fibra de carbono de una sola pieza, toma de aire snorkel de techo y alerón aerodinámico ajustable.',
      caracteristicas: ['Carrocería 75% Fibra de Carbono', 'Arnés de 4 puntos y Jaula Titanio', 'Frenos Brembo CCM-R F1', 'Escape Akrapovic Deportivo'],
      garantia: '12 meses AUTOMARKET Black Edition',
      verificado: true, destacado: true, vendido: false,
      categoria: 'Deportivo',
      tipo: 'regular'
    },
    {
      id: 105,
      marca: 'Lamborghini', modelo: 'Urus Performante', año: 2023,
      precio: 6900000, pago_mensual: 108000,
      km: 9500, transmision: 'Automático 8 vel', motor: '4.0L V8 BiTurbo 666 HP',
      color: 'Giallo Auge', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&w=1200&q=85',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=1200&q=85'
      ],
      descripcion: 'Lamborghini Urus Performante 2023 — El SUV más rápido en Pikes Peak. Capó de fibra de carbono visible con ventilación activa, alerón trasero con carga aerodinámica aumentada y modo de manejo RALLY.',
      caracteristicas: ['Modo de Manejo RALLY', 'Capó y Techo en Fibra de Carbono', 'Escape Akrapovic de Titanio', 'Sistema de Sonido Bang & Olufsen 3D'],
      garantia: '12 meses Certificada',
      verificado: true, destacado: true, vendido: false,
      categoria: 'SUV Premium',
      tipo: 'regular'
    },
    {
      id: 1,
      marca: 'Toyota', modelo: 'Corolla', año: 2023,
      precio: 349000, pago_mensual: 5820,
      km: 15400, transmision: 'Automático', motor: '1.8L 4 cilindros',
      color: 'Blanco Perla', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80'
      ],
      descripcion: 'Toyota Corolla 2023 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos de tela premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 25,
      marca: 'Kia', modelo: 'Sorento', año: 2021,
      precio: 760000, pago_mensual: 12667,
      km: 8200, transmision: 'Manual', motor: '4 cilindros',
      color: 'Azul', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80'
      ],
      descripcion: 'Kia Sorento 2021 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 26,
      marca: 'Mazda', modelo: 'CX-30', año: 2023,
      precio: 270000, pago_mensual: 4500,
      km: 76300, transmision: 'Automático', motor: '4 cilindros',
      color: 'Rojo', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80'
      ],
      descripcion: 'Mazda CX-30 2023 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 27,
      marca: 'VW', modelo: 'Tiguan', año: 2022,
      precio: 560000, pago_mensual: 9333,
      km: 47900, transmision: 'Manual', motor: '4 cilindros',
      color: 'Plata', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&w=800&q=80'
      ],
      descripcion: 'VW Tiguan 2022 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 28,
      marca: 'Audi', modelo: 'A4', año: 2021,
      precio: 440000, pago_mensual: 7333,
      km: 16700, transmision: 'Automático', motor: '4 cilindros',
      color: 'Plata', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80'
      ],
      descripcion: 'Audi A4 2021 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 29,
      marca: 'Audi', modelo: 'Q5', año: 2020,
      precio: 390000, pago_mensual: 6500,
      km: 71600, transmision: 'Automático', motor: '4 cilindros',
      color: 'Negro', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=800&q=80'
      ],
      descripcion: 'Audi Q5 2020 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 30,
      marca: 'Toyota', modelo: 'Yaris', año: 2020,
      precio: 270000, pago_mensual: 4500,
      km: 17200, transmision: 'Automático', motor: '4 cilindros',
      color: 'Rojo', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80'
      ],
      descripcion: 'Toyota Yaris 2020 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 31,
      marca: 'VW', modelo: 'Jetta', año: 2023,
      precio: 760000, pago_mensual: 12667,
      km: 70300, transmision: 'Manual', motor: '4 cilindros',
      color: 'Azul', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80'
      ],
      descripcion: 'VW Jetta 2023 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 32,
      marca: 'Audi', modelo: 'Q3', año: 2019,
      precio: 770000, pago_mensual: 12833,
      km: 56100, transmision: 'Automático', motor: '4 cilindros',
      color: 'Negro', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80'
      ],
      descripcion: 'Audi Q3 2019 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 33,
      marca: 'Mazda', modelo: 'Mazda 3', año: 2021,
      precio: 570000, pago_mensual: 9500,
      km: 68900, transmision: 'Automático', motor: '4 cilindros',
      color: 'Rojo', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=800&q=80'
      ],
      descripcion: 'Mazda Mazda 3 2021 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 34,
      marca: 'Audi', modelo: 'A3', año: 2021,
      precio: 300000, pago_mensual: 5000,
      km: 53400, transmision: 'Manual', motor: '4 cilindros',
      color: 'Negro', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80'
      ],
      descripcion: 'Audi A3 2021 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 35,
      marca: 'Nissan', modelo: 'Altima', año: 2023,
      precio: 200000, pago_mensual: 3333,
      km: 27800, transmision: 'Manual', motor: '4 cilindros',
      color: 'Azul', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80'
      ],
      descripcion: 'Nissan Altima 2023 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 36,
      marca: 'Mazda', modelo: 'CX-30', año: 2023,
      precio: 570000, pago_mensual: 9500,
      km: 11900, transmision: 'Automático', motor: '4 cilindros',
      color: 'Gris Oxford', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&w=800&q=80'
      ],
      descripcion: 'Mazda CX-30 2023 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 37,
      marca: 'Hyundai', modelo: 'Tucson', año: 2022,
      precio: 700000, pago_mensual: 11667,
      km: 68900, transmision: 'Automático', motor: '4 cilindros',
      color: 'Plata', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80'
      ],
      descripcion: 'Hyundai Tucson 2022 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 38,
      marca: 'VW', modelo: 'Tiguan', año: 2023,
      precio: 710000, pago_mensual: 11833,
      km: 8700, transmision: 'Automático', motor: '4 cilindros',
      color: 'Blanco', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=800&q=80'
      ],
      descripcion: 'VW Tiguan 2023 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 39,
      marca: 'Kia', modelo: 'Forte', año: 2022,
      precio: 370000, pago_mensual: 6167,
      km: 73800, transmision: 'Automático', motor: '4 cilindros',
      color: 'Blanco', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&w=800&q=80'
      ],
      descripcion: 'Kia Forte 2022 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 40,
      marca: 'Hyundai', modelo: 'Santa Fe', año: 2023,
      precio: 360000, pago_mensual: 6000,
      km: 81600, transmision: 'Manual', motor: '4 cilindros',
      color: 'Rojo', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80'
      ],
      descripcion: 'Hyundai Santa Fe 2023 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 41,
      marca: 'Nissan', modelo: 'Altima', año: 2022,
      precio: 240000, pago_mensual: 4000,
      km: 83700, transmision: 'Automático', motor: '4 cilindros',
      color: 'Rojo', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&w=800&q=80'
      ],
      descripcion: 'Nissan Altima 2022 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 42,
      marca: 'Nissan', modelo: 'Sentra', año: 2021,
      precio: 540000, pago_mensual: 9000,
      km: 17100, transmision: 'Automático', motor: '4 cilindros',
      color: 'Blanco', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80'
      ],
      descripcion: 'Nissan Sentra 2021 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 43,
      marca: 'Nissan', modelo: 'Frontier PRO-4X', año: 2023,
      precio: 685000, pago_mensual: 11416,
      km: 38000, transmision: 'Automática 7 velocidades', motor: '2.5L 4 cilindros 166 HP',
      color: 'Blanco Glaciar', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&w=800&q=80'
      ],
      descripcion: 'Nissan Frontier PRO-4X 2023. Pick-up todoterreno con bloqueo de diferencial trasero, suspensión calibrada para terracería y sistema Nissan Intelligent Mobility.',
      caracteristicas: ['Bloqueo de Diferencial Trasero', 'Cámara 360 con detección off-road', 'Asientos Zero Gravity con costuras rojas', 'Capacidad de arrastre 3,500 kg'],
      garantia: '6 meses / 10,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Pick-Up',
      tipo: 'catalogo'
    },
    {
      id: 44,
      marca: 'Toyota', modelo: 'Prius', año: 2021,
      precio: 690000, pago_mensual: 11500,
      km: 41600, transmision: 'Automático', motor: '4 cilindros',
      color: 'Gris Oxford', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80'
      ],
      descripcion: 'Toyota Prius 2021 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 45,
      marca: 'Audi', modelo: 'A4', año: 2020,
      precio: 210000, pago_mensual: 3500,
      km: 61600, transmision: 'Automático', motor: '4 cilindros',
      color: 'Plata', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80'
      ],
      descripcion: 'Audi A4 2020 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 46,
      marca: 'Hyundai', modelo: 'Creta', año: 2020,
      precio: 670000, pago_mensual: 11167,
      km: 12600, transmision: 'Automático', motor: '4 cilindros',
      color: 'Negro', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&w=800&q=80'
      ],
      descripcion: 'Hyundai Creta 2020 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 47,
      marca: 'Audi', modelo: 'A4', año: 2023,
      precio: 270000, pago_mensual: 4500,
      km: 81700, transmision: 'Manual', motor: '4 cilindros',
      color: 'Blanco', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80'
      ],
      descripcion: 'Audi A4 2023 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'regular'
    },
    {
      id: 48,
      marca: 'Hyundai', modelo: 'Creta', año: 2022,
      precio: 420000, pago_mensual: 7000,
      km: 16400, transmision: 'Manual', motor: '4 cilindros',
      color: 'Azul', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80'
      ],
      descripcion: 'Hyundai Creta 2022 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 49,
      marca: 'VW', modelo: 'Jetta', año: 2022,
      precio: 470000, pago_mensual: 7833,
      km: 56600, transmision: 'Automático', motor: '4 cilindros',
      color: 'Plata', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80'
      ],
      descripcion: 'VW Jetta 2022 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 50,
      marca: 'Nissan', modelo: 'Sentra', año: 2022,
      precio: 630000, pago_mensual: 10500,
      km: 66800, transmision: 'Automático', motor: '4 cilindros',
      color: 'Azul', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'MX',
      fotos: [
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80'
      ],
      descripcion: 'Nissan Sentra 2022 en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
      tipo: 'regular'
    },
    {
      id: 2,
      marca: 'Honda', modelo: 'Civic', año: 2022,
      precio: 318000, pago_mensual: 5300,
      km: 26800, transmision: 'Automático', motor: '1.5L Turbo',
      color: 'Azul Sonic', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80',
      ],
      descripcion: 'Honda Civic 2022 Sport, motor turbo de 1.5L con 174 HP. Diseño deportivo con interior premium, sistema Honda Sensing completo y excelente economía de combustible (14 km/l en carretera).',
      caracteristicas: ['Honda Sensing','Motor 1.5T 174 HP','Pantalla 9" Honda Connect','Wireless CarPlay','Llantas 18" bicolor','Techo solar','Asientos de tela premium','Control de velocidad adaptativo'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: true, vendido: false,
      categoria: 'Sedán',
    },
    {
      id: 3,
      marca: 'Nissan', modelo: 'Versa', año: 2024,
      precio: 268000, pago_mensual: 4470,
      km: 3200, transmision: 'Automático', motor: '1.6L 4 cilindros',
      color: 'Rojo Sunset', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
      ],
      descripcion: 'Nissan Versa 2024 prácticamente nuevo. 3,200 kms de uso, garantía de agencia vigente. Ideal para ciudad con excelente economía de combustible y amplio espacio interior.',
      caracteristicas: ['NissanConnect 8"','Cámara 360°','Sensores delanteros y traseros','Pantalla digital de instrumentos','ProPilot Assist','6 bolsas de aire','Control de crucero'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: true, vendido: false,
      categoria: 'Sedán',
    },
    {
      id: 4,
      marca: 'BMW', modelo: 'Serie 3', año: 2023,
      precio: 649000, pago_mensual: 10820,
      km: 18500, transmision: 'Automático', motor: '2.0L Turbo',
      color: 'Azul Marino', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80',
      ],
      descripcion: 'BMW Serie 3 2023 en impecable estado. Motor B48 de 258 HP con aceleración 0-100 en 5.8s. Interior cuero Dakota negro, iDrive 8 con pantalla curva 14.9", Live Cockpit Professional.',
      caracteristicas: ['iDrive 8 Pantalla 14.9"','Motor B48 258 HP','Cuero Dakota negro','Park Distance Control','Driving Assist Professional','M Sport Package','Llantas 19" M Sport','Head-Up Display'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: true, vendido: false,
      categoria: 'Sedán Premium',
    },
    {
      id: 5,
      marca: 'Toyota', modelo: 'RAV4', año: 2023,
      precio: 558000, pago_mensual: 9300,
      km: 22100, transmision: 'Automático', motor: '2.5L 4 cilindros',
      color: 'Gris Magnético', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&w=800&q=80',
      ],
      descripcion: 'Toyota RAV4 XLE Premium 2023. SUV familiar con tracción AWD, sistema multimedia JBL de 9 altavoces y el paquete de seguridad Toyota Safety Sense 2.0 completo.',
      caracteristicas: ['AWD Toyota','Toyota Safety Sense 2.0','Sistema JBL 9 altavoces','Techo panorámico','Pantalla 10.5"','Wireless Charging','Asientos ventilados','Llantas 18"'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
    },
    {
      id: 6,
      marca: 'Mercedes-Benz', modelo: 'Clase C', año: 2022,
      precio: 729000, pago_mensual: 12150,
      km: 31000, transmision: 'Automático', motor: '2.0L Turbo',
      color: 'Plata Iridio', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&w=800&q=80',
      ],
      descripcion: 'Mercedes-Benz Clase C 2022 AMG Line. Diseño elegante con pantalla MBUX de 11.9" vertical, conducción autónoma Nivel 2+ y el exclusivo interior amb ambientación de 64 colores.',
      caracteristicas: ['MBUX 11.9" vertical','AMG Line interior/exterior','Active Parking Assist','Distronic Plus','Memorias de asiento','Vidrios panorámicos','64 colores de ambiente','Llantas AMG 19"'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán Premium',
    },
    {
      id: 7,
      marca: 'Mazda', modelo: 'CX-5', año: 2023,
      precio: 498000, pago_mensual: 8300,
      km: 14700, transmision: 'Automático', motor: '2.5L Turbo',
      color: 'Rojo Soul Crystal', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'Puebla',
      fotos: [
        'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&w=800&q=80',
      ],
      descripcion: 'Mazda CX-5 Signature 2023 con el motor Skyactiv-G 2.5T de 256 HP. Interior de cuero Nappa con ventilación y calefacción. El SUV más elegante de su segmento.',
      caracteristicas: ['Skyactiv-G 2.5T 256 HP','i-Activ AWD','Cuero Nappa ventilado','Mazda Connect 10.25"','Bose 12 altavoces','Techo solar eléctrico','Llantas 19"','Driver Attention Alert'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
    },
    {
      id: 8,
      marca: 'Volkswagen', modelo: 'Tiguan', año: 2023,
      precio: 526000, pago_mensual: 8770,
      km: 19300, transmision: 'Automático', motor: '2.0L TSI',
      color: 'Blanco Platino', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&w=800&q=80',
      ],
      descripcion: 'Volkswagen Tiguan Highline 2023. Motor TSI de 200 HP con caja DSG 7 velocidades. Amplio interior con 3a fila de asientos opcional, Digital Cockpit Pro y asistente de carril.',
      caracteristicas: ['Motor TSI 200 HP','DSG 7 velocidades','Travel Assist (semi-autónomo)','Digital Cockpit Pro','Pantalla 8" MIB3','Frenado de emergencia automático','Park Pilot','Llantas 20"'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
    },
    {
      id: 9,
      marca: 'Ford', modelo: 'Mustang', año: 2022,
      precio: 649000, pago_mensual: 10820,
      km: 28900, transmision: 'Manual', motor: '5.0L V8',
      color: 'Rojo Race Red', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&w=800&q=80',
      ],
      descripcion: 'Ford Mustang GT 2022 con el legendario motor Coyote V8 de 450 HP. Transmisión manual de 6 velocidades, escape activo Quad-Tip y suspensión MagneRide de amortiguadores adaptativos.',
      caracteristicas: ['Motor Coyote V8 450 HP','Escape activo Quad-Tip','Suspensión MagneRide','SYNC 4 12"','Bang & Olufsen Sound','Launch Control','Modos de manejo 7','Sellos Brembo'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Deportivo',
    },
    {
      id: 10,
      marca: 'Audi', modelo: 'A4', año: 2022,
      precio: 598000, pago_mensual: 9970,
      km: 35200, transmision: 'Automático', motor: '2.0L TFSI',
      color: 'Negro Mythos', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80',
      ],
      descripcion: 'Audi A4 Dynamic 2022. Motor TFSI de 190 HP con caja S-Tronic y Quattro AWD. Virtual Cockpit Plus de 12.3", MMI Navigation Plus y asistentes de conducción avanzados.',
      caracteristicas: ['Quattro AWD','Virtual Cockpit Plus 12.3"','MMI Navigation Plus','S-Tronic 7 velocidades','Parking System Plus','Matrix LED','Audi Pre Sense','Llantas 18" 5x arm'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán Premium',
    },
    {
      id: 11,
      marca: 'Honda', modelo: 'CR-V', año: 2023,
      precio: 489000, pago_mensual: 8150,
      km: 11200, transmision: 'Automático', motor: '1.5L Turbo',
      color: 'Plata Lunar', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80',
      ],
      descripcion: 'Honda CR-V Touring 2023. El SUV más vendido ahora con nuevo diseño exterior, pantalla de 9" con Google Built-In, Honda Sensing 360° y el espacioso interior con techo panorámico.',
      caracteristicas: ['Honda Sensing 360°','Google Built-In','Wireless CarPlay/Android','Techo panorámico','Asientos de cuero con ventilación','Llantas 19"','Cámara surround','Wireless Charging'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
    },
    {
      id: 12,
      marca: 'Nissan', modelo: 'Kicks', año: 2024,
      precio: 318000, pago_mensual: 5300,
      km: 6800, transmision: 'CVT', motor: '1.6L 4 cilindros',
      color: 'Azul Vivid', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'Puebla',
      fotos: [
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
      ],
      descripcion: 'Nissan Kicks Exclusive 2024. El crossover urbano más moderno con e-Pedal, ProPilot Assist 2.0 y la nueva pantalla de 8" con sistema de sonido Bose Performance.',
      caracteristicas: ['ProPilot Assist 2.0','e-Pedal','Bose Performance 10 alt.','Pantalla 8"','Intelligent Around View Monitor','LED Matrix','Wireless Charging','Llantas 17"'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV Compacto',
    },
    {
      id: 13,
      marca: 'Chevrolet', modelo: 'Camaro', año: 2022,
      precio: 588000, pago_mensual: 9800,
      km: 42100, transmision: 'Automático', motor: '3.6L V6',
      color: 'Amarillo Rally', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80',
      ],
      descripcion: 'Chevrolet Camaro 2LT V6 2022. Diseño agresivo con motor V6 de 335 HP, ventanas laterales "infinity", sistema Bose y el Performance Data Recorder para grabar sesiones en pista.',
      caracteristicas: ['Motor V6 335 HP','Performance Data Recorder','Bose 9 altavoces','MyLink 8"','Modos de manejo','Llantas 20" forjadas','Ventanas infinity','Cámara reversa HD'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Deportivo',
    },
    {
      id: 14,
      marca: 'Toyota', modelo: 'Camry', año: 2023,
      precio: 478000, pago_mensual: 7970,
      km: 16800, transmision: 'Automático', motor: '2.5L 4 cilindros',
      color: 'Gris Cereza', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&w=800&q=80',
      ],
      descripcion: 'Toyota Camry XSE 2023. El sedán ejecutivo con suspensión sport ajustada de fábrica, pantalla JBL de 10 altavoces, panorámica y el completo paquete Toyota Safety Sense 2.5.',
      caracteristicas: ['Toyota Safety Sense 2.5','JBL 10 altavoces','Techo panorámico','Pantalla 9"','Control crucero adaptativo','BSM + RCTB','Llantas 19" bicolor','Digital gauge cluster'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
    },
    {
      id: 15,
      marca: 'Volkswagen', modelo: 'Jetta', año: 2023,
      precio: 348000, pago_mensual: 5800,
      km: 21400, transmision: 'Automático', motor: '1.4L TSI',
      color: 'Blanco Puro', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&w=800&q=80',
      ],
      descripcion: 'Volkswagen Jetta Style 2023. Sedán alemán con motor TSI de 150 HP, caja DSG automática, pantalla MIB3 de 10" con inalámbrico y el completo paquete IQ.DRIVE de asistentes.',
      caracteristicas: ['IQ.DRIVE completo','Motor TSI 150 HP','DSG 7 velocidades','MIB3 10" inalámbrico','Travel Assist','Digital Cockpit','Park Pilot Plus','Llantas 17"'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
    },
    {
      id: 16,
      marca: 'Audi', modelo: 'Q5', año: 2022,
      precio: 769000, pago_mensual: 12820,
      km: 38700, transmision: 'Automático', motor: '2.0L TFSI',
      color: 'Azul Navarra',combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&w=800&q=80',
      ],
      descripcion: 'Audi Q5 S Line 2022. El SUV premium con Quattro AWD, Virtual Cockpit Plus de 12.3", Bang & Olufsen 3D Sound y el exclusivo paquete S Line que incluye faldones deportivos y llantas 20".',
      caracteristicas: ['Quattro AWD','Virtual Cockpit Plus','B&O 3D Sound 19 alt.','S Line Package','Panorámica Plus','Adaptive Cruise','Audi AI Active Suspension','Mem. asientos + volante'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV Premium',
    },
    {
      id: 17,
      marca: 'Mercedes-Benz', modelo: 'GLA', año: 2023,
      precio: 698000, pago_mensual: 11640,
      km: 12300, transmision: 'Automático', motor: '2.0L Turbo',
      color: 'Polar White', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&w=800&q=80',
      ],
      descripcion: 'Mercedes-Benz GLA 250 2023. El SUV compacto más tecnológico con MBUX de segunda generación, pantalla 10.25" + 10.25" dual, 4MATIC AWD y el exclusivo diseño interior de cuero artico.',
      caracteristicas: ['4MATIC AWD','MBUX 2a generación','Dual Pantalla 10.25"','Cuero Artico','Distronic Plus','PRE-SAFE','Ambient Light 64 col.','Llantas AMG 19"'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV Premium',
    },
    {
      id: 18,
      marca: 'Mazda', modelo: '3', año: 2023,
      precio: 368000, pago_mensual: 6140,
      km: 18200, transmision: 'Automático', motor: '2.5L Turbo',
      color: 'Rojo Soul Crystal', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'Puebla',
      fotos: [
        'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&w=800&q=80',
      ],
      descripcion: 'Mazda 3 Turbo 2023. El compacto más premium de su segmento con motor Skyactiv-G Turbo de 227 HP, i-Activ AWD, cuero Nappa con ventilación y la icónica experiencia de manejo Jinba Ittai.',
      caracteristicas: ['Skyactiv-G Turbo 227 HP','i-Activ AWD','Cuero Nappa ventilado','Bose 12 altavoces','Mazda Connect 8.8"','Smart City Brake','360° Monitor','HUD Head-Up Display'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
    },
    {
      id: 19,
      marca: 'Ford', modelo: 'Explorer', año: 2023,
      precio: 768000, pago_mensual: 12800,
      km: 24600, transmision: 'Automático', motor: '3.0L EcoBoost',
      color: 'Azul Antimatter', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80',
      ],
      descripcion: 'Ford Explorer Platinum 2023. La SUV de 7 pasajeros con motor EcoBoost de 400 HP, tracción integral inteligente AWD, 3 filas de asientos de cuero y el sistema SYNC 4A de 13.2".',
      caracteristicas: ['EcoBoost 400 HP','SYNC 4A 13.2"','3 filas de lujo','AWD inteligente','B&O Sound 14 alt.','Active Park Assist 2.0','Adaptive Cruise Control','Llantas 21"'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
    },
    {
      id: 20,
      marca: 'Chevrolet', modelo: 'Equinox', año: 2023,
      precio: 418000, pago_mensual: 6970,
      km: 29800, transmision: 'Automático', motor: '1.5L Turbo',
      color: 'Gris Carbonite', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80',
      ],
      descripcion: 'Chevrolet Equinox Premier 2023. SUV mediana con pantalla Infotainment 3 Plus de 8", tecnología WiFi hotspot, cámara 360° y el completo paquete de seguridad Chevy Safety Assist.',
      caracteristicas: ['Chevy Safety Assist','Infotainment 3 Plus','WiFi Hotspot 4G LTE','Cámara 360°','Calefacción asientos','Control crucero adaptativo','Teen Driver','Llantas 19"'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
    },
    {
      id: 21,
      marca: 'Honda', modelo: 'HR-V', año: 2023,
      precio: 378000, pago_mensual: 6300,
      km: 8900, transmision: 'CVT', motor: '1.5L 4 cilindros',
      color: 'Verde Sonic', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
      ],
      descripcion: 'Honda HR-V EX-L 2023. Crossover compacto con diseño completamente renovado, interior Magic Seat configurable, pantalla de 9" y Honda Sensing estándar en toda la línea.',
      caracteristicas: ['Honda Sensing completo','Magic Seat configurable','Pantalla 9"','Wireless CarPlay','Cuero con ventilación','LED Matrix','Llantas 18"','Cámara LaneWatch'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV Compacto',
    },
    {
      id: 22,
      marca: 'Nissan', modelo: 'Pathfinder', año: 2023,
      precio: 698000, pago_mensual: 11640,
      km: 17400, transmision: 'Automático', motor: '3.5L V6',
      color: 'Azul Caspian', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80',
      ],
      descripcion: 'Nissan Pathfinder Platinum 2023. SUV de 3 filas con capacidad para 8 pasajeros, motor V6 de 284 HP, pantalla de 12.3", sistema de audio Bose 13 altavoces y tracción 4WD Intelligent.',
      caracteristicas: ['V6 284 HP','4WD Intelligent','Pantalla 12.3"','Bose 13 altavoces','3 filas asientos cuero','ProPilot Assist','Around View Monitor','Llantas 20"'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
    },
    {
      id: 23,
      marca: 'Toyota', modelo: 'Highlander', año: 2023,
      precio: 748000, pago_mensual: 12470,
      km: 20800, transmision: 'Automático', motor: '2.4L Turbo',
      color: 'Blanco Blizzard', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&w=800&q=80',
      ],
      descripcion: 'Toyota Highlander Platinum 2023. La SUV premium de 8 pasajeros con el nuevo motor 2.4L Turbo de 265 HP, pantalla multimedia de 12.3" y el completo paquete JBL con amplificador dedicado.',
      caracteristicas: ['Motor 2.4T 265 HP','AWD Toyota','JBL Premium Audio','Pantalla 12.3"','HUD Head-Up Display','Asientos cuero ventilados','3 filas de asientos','Llantas 20"'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV',
    },
    {
      id: 24,
      marca: 'BMW', modelo: 'X5', año: 2022,
      precio: 1298000, pago_mensual: 21640,
      km: 29100, transmision: 'Automático', motor: '3.0L Turbo',
      color: 'Negro Zafiro', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&w=800&q=80',
      ],
      descripcion: 'BMW X5 xDrive40i 2022. El SUV premium definitivo con motor B58 de 340 HP, sistema BMW Live Cockpit Professional con pantalla curva 14.9", xDrive AWD y el paquete de lujo con cierre suave en todas las puertas.',
      caracteristicas: ['B58 340 HP','xDrive AWD','Live Cockpit Pro 14.9"','Harman Kardon 16 alt.','Techo panorámico sky lounge','Air Suspension','Cuero Merino','Llantas 22"'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV Premium',
    },
    {
      id: 51,
      marca: 'Volkswagen', modelo: 'Golf GTI', año: 2018,
      precio: 369000, pago_mensual: 6150,
      km: 68500, transmision: 'Automático', motor: '2.0L TSI',
      color: 'Rojo Tornado', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&w=800&q=80',
      ],
      descripcion: 'Volkswagen Golf GTI 2018 en perfecto estado. Clásico hatchback deportivo, motor TSI de 230HP con transmisión DSG. Mantenimientos estrictamente al día en agencia.',
      caracteristicas: ['Asientos Clark','Pantalla Táctil 8"','Rines 18" Austin','Laucn Control','Faros LED adaptativos'],
      garantia: '1 mes / 2,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Deportivo',
      tipo: 'outlet'
    },
    {
      id: 52,
      marca: 'Honda', modelo: 'Civic EX', año: 2016,
      precio: 215000, pago_mensual: 3583,
      km: 85200, transmision: 'Automático', motor: '2.0L 4 cilindros',
      color: 'Gris Grafito', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&w=800&q=80',
      ],
      descripcion: 'Honda Civic 2016 EX. Excelente rendimiento de combustible, gran espacio interior y confiabilidad japonesa insuperable. Un sedán ideal para el día a día.',
      caracteristicas: ['Cámara de reversa','Climatizador automático','Encendido por botón','Bluetooth audio'],
      garantia: '1 mes / 2,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'outlet'
    },
    {
      id: 53,
      marca: 'Jeep', modelo: 'Wrangler Sahara', año: 2017,
      precio: 520000, pago_mensual: 8666,
      km: 72400, transmision: 'Automático', motor: '3.6L V6',
      color: 'Gris Billet', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&w=800&q=80',
      ],
      descripcion: 'Jeep Wrangler Sahara 2017 4x4. El legendario todo terreno con techo duro removible, sistema de audio Alpine y capacidad off-road incomparable.',
      caracteristicas: ['Tracción 4x4','Techo de 3 piezas','Sonido Alpine 9 alt.','Control de descenso','Estribos laterales'],
      garantia: '1 mes / 2,000 km',
      verificado: true, destacado: true, vendido: false,
      categoria: 'SUV',
      tipo: 'outlet'
    },
    {
      id: 54,
      marca: 'Mazda', modelo: 'CX-3', año: 2019,
      precio: 295000, pago_mensual: 4916,
      km: 55300, transmision: 'Automático', motor: '2.0L Skyactiv',
      color: 'Blanco Perla', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80',
      ],
      descripcion: 'Mazda CX-3 iGrand Touring 2019. Crossover estilizado, asientos de piel, Head-Up Display y sistema de audio Bose.',
      caracteristicas: ['Asientos de piel','Head-Up Display','Quemacocos','Pantalla 7"'],
      garantia: '1 mes / 2,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV Compacto',
      tipo: 'outlet'
    },
    {
      id: 55,
      marca: 'Kia', modelo: 'Forte', año: 2020,
      precio: 278000, pago_mensual: 4633,
      km: 41000, transmision: 'Automático', motor: '2.0L MPI',
      color: 'Azul', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'Puebla',
      fotos: [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80',
      ],
      descripcion: 'Kia Forte LX 2020. Prácticamente seminuevo con tecnología de conectividad, cámara de visión trasera y gran rendimiento de combustible.',
      caracteristicas: ['Android Auto & Apple CarPlay','Cámara trasera','Sensores estacionamiento'],
      garantia: '1 mes / 2,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Sedán',
      tipo: 'outlet'
    },
    {
      id: 56,
      marca: 'Ford', modelo: 'Escape', año: 2015,
      precio: 185000, pago_mensual: 3083,
      km: 98000, transmision: 'Automático', motor: '2.5L 4 cilindros',
      color: 'Rojo Rubí', combustible: 'Gasolina',
      ciudad: 'Tijuana', estado: 'Baja California',
      fotos: [
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
      ],
      descripcion: 'Ford Escape S 2015. SUV económica, confiable y con amplio espacio de cajuela. Ideal para familias o primer SUV.',
      caracteristicas: ['SYCN 1','Controles al volante','Frenos ABS + ESP'],
      garantia: '1 mes / 2,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV Compacto',
      tipo: 'outlet'
    },
    {
      id: 57,
      marca: 'Kia', modelo: 'Sportage', año: 2022,
      precio: 479000, pago_mensual: 7983,
      km: 38000, transmision: 'Automático', motor: '2.0L 4 cilindros',
      color: 'Blanco Perla', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80',
      ],
      descripcion: 'Kia Sportage EX 2022. Única dueña, servicios de agencia. Cuenta con pantalla de 8" con Apple CarPlay.',
      caracteristicas: ['Cámara de Reversa','Apple CarPlay','Sensores'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: true, vendido: false,
      categoria: 'SUV Compacto', tipo: 'catalogo'
    },
    {
      id: 58,
      marca: 'Hyundai', modelo: 'Tucson', año: 2023,
      precio: 585000, pago_mensual: 9750,
      km: 21000, transmision: 'Automático', motor: '2.5L 4 cilindros',
      color: 'Gris Metálico', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&w=800&q=80',
      ],
      descripcion: 'Hyundai Tucson Limited. Diseño futurista con parrilla LED integrada. Asistencias de seguridad avanzada FCA y LKA.',
      caracteristicas: ['Techo panorámico','Clúster digital','Asientos piel'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV', tipo: 'catalogo'
    },
    {
      id: 59,
      marca: 'MG', modelo: 'ZS', año: 2021,
      precio: 319000, pago_mensual: 5316,
      km: 54000, transmision: 'Manual', motor: '1.5L',
      color: 'Rojo', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&w=800&q=80',
      ],
      descripcion: 'MG ZS Excite. Excelente opción relación costo-beneficio. Pantalla táctil de rápida respuesta y vestiduras en tactopiel.',
      caracteristicas: ['Pantalla 8"','Rines Aluminio 17"','Barras de techo'],
      garantia: '1 mes / 2,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV Compacto', tipo: 'outlet'
    },
    {
      id: 60,
      marca: 'Jeep', modelo: 'Wrangler', año: 2020,
      precio: 890000, pago_mensual: 14833,
      km: 42000, transmision: 'Automático', motor: '3.6L V6',
      color: 'Gris Mantarraya', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&w=800&q=80',
      ],
      descripcion: 'Jeep Wrangler Unlimited Sahara 2020. Equipado para off-road moderado pero con el confort de ciudad. Suspensión elevada 2 pulgadas.',
      caracteristicas: ['Tracción 4x4','Techo Removible','Pantalla Uconnect'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: true, vendido: false,
      categoria: 'SUV Premium', tipo: 'catalogo'
    },
    {
      id: 61,
      marca: 'Suzuki', modelo: 'Swift', año: 2023,
      precio: 295000, pago_mensual: 4916,
      km: 18000, transmision: 'Manual', motor: '1.2L Dualjet',
      color: 'Amarillo', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'Puebla',
      fotos: [
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&w=800&q=80',
      ],
      descripcion: 'Suzuki Swift GLX 2023. Uno de los autos más ahorradores de su segmento. Súper ágil en ciudad e ideal para universitarios.',
      caracteristicas: ['Faros LED','Llave inteligente','Rdt. 21 km/L'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Hatchback', tipo: 'catalogo'
    },
    {
      id: 62,
      marca: 'Seat', modelo: 'Ibiza', año: 2021,
      precio: 345000, pago_mensual: 5750,
      km: 41000, transmision: 'Automático', motor: '1.6L MPI',
      color: 'Azul Deseo', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&w=800&q=80',
      ],
      descripcion: 'Seat Ibiza Xcellence Tiptronic. Elegante diseño europeo. Incluye quemacocos panorámico, iluminación ambiental LED.',
      caracteristicas: ['Quemacocos','LED Ambiental','Full Link'],
      garantia: '1 mes / 2,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'Hatchback', tipo: 'catalogo'
    },
    {
      id: 63,
      marca: 'Peugeot', modelo: '2008', año: 2022,
      precio: 468000, pago_mensual: 7800,
      km: 26000, transmision: 'Automático', motor: '1.2L PureTech Turbo',
      color: 'Naranja Fusión', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&w=800&q=80',
      ],
      descripcion: 'Peugeot 2008 Allure. Ganador a premios de diseño. Motor tricilíndrico turbo súper eficiente y i-Cockpit 3D espectacular.',
      caracteristicas: ['i-Cockpit 3D','Motor Turbo','Llantas Michelin'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: true, vendido: false,
      categoria: 'SUV Compacto', tipo: 'catalogo'
    },
    {
      id: 64,
      marca: 'Renault', modelo: 'Duster', año: 2020,
      precio: 255000, pago_mensual: 4250,
      km: 79000, transmision: 'Manual', motor: '1.6L',
      color: 'Plata', combustible: 'Gasolina',
      ciudad: 'León', estado: 'Guanajuato',
      fotos: [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80',
      ],
      descripcion: 'Renault Duster Zen 2020. Súper aguantadora, suspensión diseñada para las calles de México. Muy amplia de interiores.',
      caracteristicas: ['Altura de piso','Sensor reversa','Pantalla 7"'],
      garantia: '1 mes / 2,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV Compacto', tipo: 'outlet'
    },
    {
      id: 65,
      marca: 'Porsche', modelo: 'Macan', año: 2021,
      precio: 1450000, pago_mensual: 24166,
      km: 35000, transmision: 'PDK (Automático)', motor: '2.0L Turbo',
      color: 'Negro Profundo', combustible: 'Gasolina',
      ciudad: 'Tijuana', estado: 'Baja California',
      fotos: [
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&w=800&q=80',
      ],
      descripcion: 'Porsche Macan PDK. Comprada y configurada en agencia. Sonido Bose, Paquete Sport Chrono y Asientos deportivos 14 vías.',
      caracteristicas: ['Sport Chrono','Modos Manejo','Sonido Premium'],
      garantia: '6 meses / 10,000 km',
      verificado: true, destacado: true, vendido: false,
      categoria: 'SUV Premium', tipo: 'catalogo'
    },
    {
      id: 66,
      marca: 'Volvo', modelo: 'XC40', año: 2022,
      precio: 820000, pago_mensual: 13666,
      km: 22000, transmision: 'Automático', motor: '2.0L Mild-Hybrid',
      color: 'Azul Denim', combustible: 'Híbrido',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80',
      ],
      descripcion: 'Volvo XC40 Inscription. Máxima seguridad escandinava, sistema de mantenimiento de carril y frenado autónomo City Safety.',
      caracteristicas: ['City Safety','Asientos de piel','Híbrido'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: 'SUV Premium', tipo: 'catalogo'
    }
  ,
    {
      id: 110,
      marca: 'Ford', modelo: 'F-150 Lobo Raptor SVT', año: 2024,
      precio: 2150000, pago_mensual: 35833, km: 12500,
      transmision: 'Automática 10 velocidades', motor: '3.5L V6 EcoBoost High-Output 450 HP',
      color: 'Azul Performance', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&w=800&q=80'
      ],
      descripcion: 'Ford F-150 Lobo Raptor 2024. Imponente pick-up todoterreno de alto rendimiento con amortiguadores FOX Live Valve, tracción 4WD con bloqueo electrónico y pantalla de 12 pulgadas SYNC 4.',
      caracteristicas: ['Amortiguadores FOX Live Valve', 'Tracción 4WD con 7 modos de manejo', 'Audio B&O Unleashed 18 bocinas', 'Techo panorámico'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'Pick-Up', tipo: 'catalogo'
    },
    {
      id: 111,
      marca: 'Chevrolet', modelo: 'Cheyenne High Country', año: 2023,
      precio: 1680000, pago_mensual: 28000, km: 24000,
      transmision: 'Automática 10 velocidades', motor: '6.2L EcoTec3 V8 420 HP',
      color: 'Negro Azabache', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&w=800&q=80'
      ],
      descripcion: 'Chevrolet Cheyenne High Country 2023. El pináculo del lujo en pick-ups de trabajo y viaje. Asientos de piel genuina calefactables, portón multifunción Multi-Flex y suspensión adaptativa.',
      caracteristicas: ['Motor V8 6.2L 420 HP', 'Portón trasero Multi-Flex', 'Head-Up Display 15 pulgadas', 'Cámara de 360 grados'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'Pick-Up', tipo: 'catalogo'
    },
    {
      id: 112,
      marca: 'RAM', modelo: '1500 TRX 6.2L Supercharged', año: 2023,
      precio: 2490000, pago_mensual: 41500, km: 9800,
      transmision: 'TorqueFlite 8 velocidades', motor: '6.2L HEMI V8 Supercargado 702 HP',
      color: 'Gris Grafito', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&w=800&q=80'
      ],
      descripcion: 'RAM 1500 TRX 2023. La super pick-up más rápida y potente del mundo con motor Hellcat de 702 HP. Suspensión Bilstein Black Hawk e2 y Launch Control para acelerar de 0-100 en 4.5s.',
      caracteristicas: ['HEMI Hellcat 702 HP', 'Suspensión Bilstein Black Hawk', 'Launch Control activo', 'Audio Harman Kardon 19 bocinas'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'Pick-Up', tipo: 'catalogo'
    },
    {
      id: 113,
      marca: 'Toyota', modelo: 'Tacoma TRD Pro 4x4', año: 2023,
      precio: 1045000, pago_mensual: 17416, km: 31000,
      transmision: 'Automática 6 velocidades', motor: '3.5L V6 DOHC 278 HP',
      color: 'Gris Cemento', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'Querétaro',
      fotos: [
        'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&w=800&q=80'
      ],
      descripcion: 'Toyota Tacoma TRD Pro 2023. Indestructible y líder en valor de reventa. Equipada de fábrica con placas protectoras de acero, amortiguadores Fox y tracción 4x4 con Crawl Control.',
      caracteristicas: ['Crawl Control y Multi-Terrain Select', 'Snorkel TRD Pro original', 'Placas de protección en chasis', 'Apple CarPlay / Android Auto'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: false, vendido: false,
      categoria: 'Pick-Up', tipo: 'catalogo'
    },
    {
      id: 114,
      marca: 'GMC', modelo: 'Sierra Denali Ultimate', año: 2023,
      precio: 1950000, pago_mensual: 32500, km: 18000,
      transmision: 'Automática 10 velocidades', motor: '6.2L EcoTec3 V8 420 HP',
      color: 'Blanco Perla', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'Puebla',
      fotos: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&w=800&q=80'
      ],
      descripcion: 'GMC Sierra Denali Ultimate 2023. Lujo ejecutivo en formato de gran troka. Interiores en madera auténtica de poro abierto, masajeador de asientos y caja de batea CarbonPro ultrarresistente.',
      caracteristicas: ['Batea de Fibra de Carbono CarbonPro', 'Asientos con masaje en 16 posiciones', 'Super Cruise / Conducción Asistida', 'Sonido Bose Premium Series'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: false, vendido: false,
      categoria: 'Pick-Up', tipo: 'catalogo'
    },
    {
      id: 115,
      marca: 'Ford', modelo: 'Ranger Wildtrak 4x4', año: 2023,
      precio: 920000, pago_mensual: 15333, km: 27500,
      transmision: 'Automática 10 velocidades', motor: '2.3L EcoBoost Turbo 270 HP',
      color: 'Naranja Cyber', combustible: 'Gasolina',
      ciudad: 'Mérida', estado: 'Yucatán',
      fotos: [
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&w=800&q=80'
      ],
      descripcion: 'Ford Ranger Wildtrak 4x4 2023. La combinación ideal para trabajo y aventura familiar. Gran capacidad de remolque de 3.5 toneladas, tracción 4x4 con reductora y pantalla vertical de 12 pulgadas.',
      caracteristicas: ['Tracción 4x4 con reductora', 'Pantalla vertical SYNC 4A 12 pulgadas', 'Capacidad de remolque 3.5 ton', 'Cámara 360 grados'],
      garantia: '6 meses / 10,000 km', verificado: true,
      destacado: false, vendido: false,
      categoria: 'Pick-Up', tipo: 'catalogo'
    },
    {
      id: 120,
      marca: 'Volkswagen', modelo: 'Golf GTI Mk8 DSG', año: 2023,
      precio: 799000, pago_mensual: 13316, km: 19000,
      transmision: 'Automática DSG 7 velocidades', motor: '2.0L TSI Turbo 241 HP',
      color: 'Blanco Puro', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'Puebla',
      fotos: [
        'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&w=800&q=80'
      ],
      descripcion: 'Volkswagen Golf GTI 2023 Mk8. El hot-hatch de referencia mundial. Motor 2.0 TSI de 241 HP acoplado a caja DSG, diferencial autoblocante VAQ y asientos deportivos con patrón tartán clásico.',
      caracteristicas: ['Diferencial autoblocante VAQ', 'Innovision Cockpit digital', 'Faros IQ.Light Matrix LED', 'Audio Harman Kardon'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'Hatchback', tipo: 'catalogo'
    },
    {
      id: 121,
      marca: 'Mini', modelo: 'Cooper S John Cooper Works', año: 2023,
      precio: 745000, pago_mensual: 12416, km: 21500,
      transmision: 'Steptronic Deportivo 8 vel', motor: '2.0L TwinPower Turbo 231 HP',
      color: 'Verde British Racing', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&w=800&q=80'
      ],
      descripcion: 'Mini Cooper S JCW 2023. Agilidad tipo karting incomparable. Frenos Brembo de 4 pistones, escape deportivo con petardeo afinado y techo en contraste rojo chilli.',
      caracteristicas: ['Frenos Brembo JCW 4 pistones', 'Escape deportivo con válvula', 'Head-Up Display deportivo', 'Suspensión adaptativa'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'Hatchback', tipo: 'catalogo'
    },
    {
      id: 122,
      marca: 'Cupra', modelo: 'León VZ 300 HP', año: 2023,
      precio: 715000, pago_mensual: 11916, km: 26000,
      transmision: 'DSG 7 velocidades', motor: '2.0L TSI Turbo 300 HP',
      color: 'Gris Magnético Mate', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&w=800&q=80'
      ],
      descripcion: 'Cupra León VZ 2023. Diseño agresivo con toques en cobre mate. 300 caballos de fuerza al eje delantero con bloqueo VAQ y asientos baquet de piel Petroleum Blue.',
      caracteristicas: ['Motor 300 HP TSI', 'Asientos Baquet calefactables', 'Pintura original mate', 'Frenos Brembo perforados'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: false, vendido: false,
      categoria: 'Hatchback', tipo: 'catalogo'
    },
    {
      id: 123,
      marca: 'Mazda', modelo: 'Mazda 3 Hatchback Turbo AWD', año: 2023,
      precio: 529000, pago_mensual: 8816, km: 28000,
      transmision: 'Automática Skyactiv-Drive 6 vel', motor: '2.5L Turbo Skyactiv-G 227 HP',
      color: 'Rojo Titanio', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&w=800&q=80'
      ],
      descripcion: 'Mazda 3 Hatchback Turbo S Grand Touring AWD 2023. Diseño KODO ganador de premios, torque contundente de 310 lb-pie, tracción integral i-Activ AWD y sistema de audio Bose con 12 altavoces.',
      caracteristicas: ['Tracción Integral i-Activ AWD', 'Audio Bose de 12 bocinas', 'Piel negra con costuras rojas', 'Paletas de cambio al volante'],
      garantia: '6 meses / 10,000 km', verificado: true,
      destacado: false, vendido: false,
      categoria: 'Hatchback', tipo: 'catalogo'
    },
    {
      id: 124,
      marca: 'Honda', modelo: 'Civic Type R FL5', año: 2024,
      precio: 1390000, pago_mensual: 23166, km: 7500,
      transmision: 'Manual 6 vel con Rev-Match', motor: '2.0L VTEC Turbo 315 HP',
      color: 'Blanco Championship', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&w=800&q=80'
      ],
      descripcion: 'Honda Civic Type R FL5 2024. El rey de Nürburgring en tracción delantera. Caja manual perfecta con punta-tacón automático, asientos rojos Type R y alerón trasero de aluminio aerodinámico.',
      caracteristicas: ['Transmisión Manual Rev-Match', 'Log-R Telemetría en pista', 'Frenos Brembo 2 piezas', 'Diferencial Helicoidal Torsen'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'Hatchback', tipo: 'catalogo'
    },
    {
      id: 130,
      marca: 'BMW', modelo: 'M3 Competition xDrive', año: 2023,
      precio: 2190000, pago_mensual: 36500, km: 14000,
      transmision: 'M Steptronic 8 vel con Drivelogic', motor: '3.0L BMW M TwinPower Turbo 503 HP',
      color: 'Verde Isla de Man', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&w=800&q=80'
      ],
      descripcion: 'BMW M3 Competition xDrive 2023. Sedán deportivo supremo con 503 caballos de fuerza y tracción integral inteligente M xDrive con modo 2WD para drift. Asientos bucket de fibra de carbono M.',
      caracteristicas: ['Tracción M xDrive con modo 2WD', 'Asientos M Carbon Bucket', 'Techo de fibra de carbono', 'Frenos Carbonocerámicos'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'Sedán Premium', tipo: 'catalogo'
    },
    {
      id: 131,
      marca: 'Mercedes-Benz', modelo: 'Mercedes-AMG C63 S E-Performance', año: 2024,
      precio: 2380000, pago_mensual: 39666, km: 8200,
      transmision: 'AMG SPEEDSHIFT MCT 9G', motor: '2.0L Turbo Híbrido F1 671 HP',
      color: 'Gris Selenita Magno', combustible: 'Híbrido Enchufable',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&w=800&q=80'
      ],
      descripcion: 'Mercedes-AMG C63 S E-Performance 2024. Tecnología derivada directamente del equipo de Fórmula 1 Mercedes-AMG Petronas. 671 caballos de fuerza combinados y 1,020 Nm de torque instantáneo.',
      caracteristicas: ['Tecnología Híbrida F1 671 HP', 'Eje trasero direccional', 'AMG Ride Control adaptable', 'Sonido Burmester 3D Surround'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'Sedán Premium', tipo: 'catalogo'
    },
    {
      id: 132,
      marca: 'Audi', modelo: 'RS5 Sportback Quattro', año: 2023,
      precio: 1890000, pago_mensual: 31500, km: 19500,
      transmision: 'Tiptronic 8 velocidades', motor: '2.9L TFSI Biturbo V6 444 HP',
      color: 'Gris Nardo', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80'
      ],
      descripcion: 'Audi RS5 Sportback 2023 en emblemático Gris Nardo. Silueta coupé de 4 puertas con tracción Quattro con diferencial deportivo, escape RS y paquete óptico en negro brillante.',
      caracteristicas: ['Tracción Quattro con diferencial RS', 'Color exclusivo Gris Nardo', 'Escape deportivo RS con válvulas', 'Virtual Cockpit Plus RS'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: false, vendido: false,
      categoria: 'Sedán Premium', tipo: 'catalogo'
    },
    {
      id: 133,
      marca: 'Lexus', modelo: 'IS 500 F SPORT Performance', año: 2023,
      precio: 1450000, pago_mensual: 24166, km: 16000,
      transmision: 'Sport Direct-Shift 8 vel', motor: '5.0L V8 Atmosférico 472 HP',
      color: 'Negro Caviar', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'Querétaro',
      fotos: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80'
      ],
      descripcion: 'Lexus IS 500 F SPORT 2023. Uno de los últimos sedanes con glorioso motor V8 atmosférico de 5.0L que gira a 7,300 RPM. Confiabilidad japonesa, sonido puro y escape cuádruple en diagonal.',
      caracteristicas: ['Motor V8 5.0L Atmosférico 472 HP', 'Escape cuádruple F SPORT', 'Diferencial Torsen de deslizamiento limitado', 'Sonido Mark Levinson 17 altavoces'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: false, vendido: false,
      categoria: 'Sedán Premium', tipo: 'catalogo'
    },
    {
      id: 140,
      marca: 'Mercedes-Benz', modelo: 'Mercedes-AMG G63 Biturbo', año: 2023,
      precio: 4650000, pago_mensual: 77500, km: 11000,
      transmision: 'AMG SPEEDSHIFT TCT 9G', motor: '4.0L V8 Biturbo AMG 577 HP',
      color: 'Negro Obsidiana Metalizado', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&w=800&q=80'
      ],
      descripcion: 'Mercedes-AMG G63 2023. La icónica Clase G con salidas de escape laterales AMG, 3 diferenciales bloqueables al 100%, tapicería en piel Napa designo y presencia inconfundible.',
      caracteristicas: ['Escapes laterales AMG cromados', '3 Bloqueos de diferencial 100%', 'Piel Napa bicolor designo', 'Rines forjados AMG 22 pulgadas'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'SUV Premium', tipo: 'catalogo'
    },
    {
      id: 141,
      marca: 'Land Rover', modelo: 'Range Rover Sport Autobiography', año: 2023,
      precio: 2950000, pago_mensual: 49166, km: 17500,
      transmision: 'Automática ZF 8 velocidades', motor: '3.0L i6 Turbo MHEV 400 HP',
      color: 'Gris Eiger', combustible: 'Híbrido',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&w=800&q=80'
      ],
      descripcion: 'Range Rover Sport Autobiography 2023. Elegancia británica moderna con suspensión neumática dinámica de doble cámara, dirección en las cuatro ruedas y sistema de infoentretenimiento Pivi Pro de 13.1 pulgadas.',
      caracteristicas: ['Suspensión Neumática Dinámica', 'Dirección en las 4 ruedas', 'Audio Meridian 3D Signature', 'Asientos climatizados con masaje de piedras calientes'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: false, vendido: false,
      categoria: 'SUV Premium', tipo: 'catalogo'
    },
    {
      id: 142,
      marca: 'Porsche', modelo: 'Macan GTS PDK', año: 2023,
      precio: 1980000, pago_mensual: 33000, km: 15300,
      transmision: 'Porsche Doppelkupplung (PDK) 7 vel', motor: '2.9L V6 Biturbo 434 HP',
      color: 'Rojo Carmín', combustible: 'Gasolina',
      ciudad: 'Guadalajara', estado: 'Jalisco',
      fotos: [
        'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&w=800&q=80'
      ],
      descripcion: 'Porsche Macan GTS 2023. La versión cumbre de Macan con motor 2.9L biturbo de 434 HP, paquete Sport Chrono con Launch Control, suspensión neumática rebajada 10mm y escape deportivo GTS con botón sonoro.',
      caracteristicas: ['Paquete Sport Chrono', 'Suspensión neumática rebajada GTS', 'Frenos Porsche Surface Coated PSCB', 'Escape deportivo activo con colas negras'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'SUV Premium', tipo: 'catalogo'
    },
    {
      id: 150,
      marca: 'Chevrolet', modelo: 'Corvette Z06 3LZ', año: 2024,
      precio: 3650000, pago_mensual: 60833, km: 5200,
      transmision: 'Doble Embrague Tremec 8 vel', motor: '5.5L LT6 V8 Flat-Plane Crank 670 HP',
      color: 'Amarillo Acelerador', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80'
      ],
      descripcion: 'Chevrolet Corvette Z06 2024. El superdeportivo estadounidense con el motor V8 atmosférico más potente de la historia de producción en serie: 670 HP que aúllan hasta las 8,600 RPM con cigüeñal plano.',
      caracteristicas: ['Motor LT6 Flat-Plane Crank 8,600 RPM', 'Paquete aerodinámico de carbono', 'Frenos Carbonocerámicos Brembo', 'Interior 3LZ en gamuza y fibra de carbono'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'Deportivo', tipo: 'catalogo'
    },
    {
      id: 151,
      marca: 'Ford', modelo: 'Mustang Shelby GT500', año: 2023,
      precio: 2550000, pago_mensual: 42500, km: 11000,
      transmision: 'Tremec Doble Embrague 7 vel', motor: '5.2L Predator V8 Supercargado 760 HP',
      color: 'Azul Ford Performance con Franjas Blancas', combustible: 'Gasolina',
      ciudad: 'Monterrey', estado: 'Nuevo León',
      fotos: [
        'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&w=800&q=80'
      ],
      descripcion: 'Ford Mustang Shelby GT500 2023. La leyenda del músculo americano llevada a su máxima expresión. 760 caballos de fuerza sobrealimentados, frenos Brembo gigantescos de 420mm y suspensión MagneRide.',
      caracteristicas: ['Motor Predator 760 HP Supercargado', 'Suspensión adaptativa MagneRide', 'Rines de fibra de carbono', 'Track Apps con Line Lock y Launch Control'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'Deportivo', tipo: 'catalogo'
    },
    {
      id: 152,
      marca: 'Porsche', modelo: '911 Carrera S (992)', año: 2023,
      precio: 3150000, pago_mensual: 52500, km: 14200,
      transmision: 'PDK 8 velocidades', motor: '3.0L Boxer 6 cilindros Biturbo 443 HP',
      color: 'Gris Cizaña (Crayon)', combustible: 'Gasolina',
      ciudad: 'Querétaro', estado: 'Querétaro',
      fotos: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&w=800&q=80'
      ],
      descripcion: 'Porsche 911 Carrera S 2023 generación 992. El ícono definitivo del automovilismo deportivo. Motor bóxer trasero de 443 HP, paquete Sport Chrono con selector de modos al volante y escape deportivo con colas dobles ovaladas.',
      caracteristicas: ['Paquete Sport Chrono', 'Techo corredizo de cristal', 'Frenos deportivos Porsche', 'Sistema de sonido BOSE Surround'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: true, vendido: false,
      categoria: 'Deportivo', tipo: 'catalogo'
    },
    {
      id: 160,
      marca: 'Cupra', modelo: 'Formentor VZ 310 HP AWD', año: 2023,
      precio: 855000, pago_mensual: 14250, km: 21000,
      transmision: 'DSG 7 velocidades', motor: '2.0L TSI Turbo 310 HP',
      color: 'Azul Petróleo Mate', combustible: 'Gasolina',
      ciudad: 'Ciudad de México', estado: 'CDMX',
      fotos: [
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&w=800&q=80'
      ],
      descripcion: 'Cupra Formentor VZ 2023. Crossover deportivo de alto impacto con tracción integral 4Drive, 310 caballos de fuerza, control de chasis adaptativo DCC y volante multifunción con botones satélite de encendido y modo Cupra.',
      caracteristicas: ['Tracción Integral 4Drive', 'Control Dinámico de Chasis DCC', 'Pintura mate de fábrica', 'Modo Cupra con sonido activo'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: false, vendido: false,
      categoria: 'SUV Compacto', tipo: 'catalogo'
    },
    {
      id: 161,
      marca: 'Toyota', modelo: 'Corolla Cross GR-Sport', año: 2023,
      precio: 589000, pago_mensual: 9816, km: 19500,
      transmision: 'Direct Shift-CVT', motor: '2.0L Dynamic Force 168 HP',
      color: 'Rojo Mica con Techo Negro', combustible: 'Gasolina',
      ciudad: 'Puebla', estado: 'Puebla',
      fotos: [
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&w=800&q=80',
        'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80'
      ],
      descripcion: 'Toyota Corolla Cross GR-Sport 2023. Versión deportiva Gazoo Racing con suspensión ajustada deportivamente, difusor trasero aerodinámico, emblemas GR e interiores en piel perforada con costuras rojas.',
      caracteristicas: ['Ajuste de suspensión Gazoo Racing', 'Toyota Safety Sense 2.5', 'Piel GR con costuras rojas', 'Quemacocos eléctrico'],
      garantia: '12 meses / 20,000 km', verificado: true,
      destacado: false, vendido: false,
      categoria: 'SUV Compacto', tipo: 'catalogo'
    }
  ],

  marcas: [
    'Ferrari', 'Lamborghini', 'Porsche', 'BMW', 'Audi', 'Mercedes-Benz', 
    'Nissan', 'Chevrolet', 'Volkswagen', 'Toyota', 'Kia', 'Honda', 
    'Mazda', 'Ford', 'MG', 'Hyundai', 'Seat', 'Renault', 'Suzuki', 
    'Jeep', 'Peugeot', 'Dodge', 'Fiat', 'Volvo', 'GMC', 'Mitsubishi'
  ],
  categorias: ['Sedán','Hatchback','SUV','SUV Compacto','SUV Premium','Sedán Premium','Deportivo','Pick-Up'],
  ciudades: ['Ciudad de México','Guadalajara','Monterrey','Puebla','Tijuana','León','Querétaro','Mérida','Toluca'],

  testimonios: [
    { nombre:'Carlos M.', ciudad:'CDMX', texto:'Compré mi Toyota Corolla en 2 días. El proceso fue increíble, financiamiento aprobado en horas.', estrellas:5, auto:'Toyota Corolla 2023' },
    { nombre:'Fernanda R.', ciudad:'Guadalajara', texto:'Vendí mi auto anterior por encima del precio de mercado. Sin trámites, sin estrés. Totalmente recomendado.', estrellas:5, auto:'Vendedora' },
    { nombre:'Roberto L.', ciudad:'Monterrey', texto:'La garantía de 3 meses me dio mucha tranquilidad. El auto llegó exactamente como se describía en las fotos.', estrellas:5, auto:'BMW Serie 3 2022' },
  ],

  stats: [
    { valor:'+15,000', label:'Autos Comprados',    raw: 15000, sufijo: '' },
    { valor:'100%',    label:'Verificados',         raw: 100,   sufijo: '%' },
    { valor:'3 Meses', label:'Garantía',            raw: 0,     sufijo: '' },
    { valor:'24 hrs',  label:'Pago al Vendedor',    raw: 0,     sufijo: '' },
  ],
  marcasLogos: [
    { nombre:'Ferrari', color:'#D40000', logoUrl:'https://www.google.com/s2/favicons?domain=ferrari.com&sz=128' },
    { nombre:'Lamborghini', color:'#DDB321', logoUrl:'https://www.google.com/s2/favicons?domain=lamborghini.com&sz=128' },
    { nombre:'Porsche', color:'#A8191C', logoUrl:'https://www.google.com/s2/favicons?domain=porsche.com&sz=128' },
    { nombre:'BMW', color:'#0066B1', logoUrl:'https://www.google.com/s2/favicons?domain=bmw.com.mx&sz=128' },
    { nombre:'Mercedes-Benz', color:'#636369', logoUrl:'https://www.google.com/s2/favicons?domain=mercedes-benz.com.mx&sz=128' },
    { nombre:'Audi', color:'#BB0A30', logoUrl:'https://www.google.com/s2/favicons?domain=audi.com.mx&sz=128' },
    { nombre:'Nissan', color:'#C3002F', logoUrl:'https://www.google.com/s2/favicons?domain=nissan.com.mx&sz=128' },
    { nombre:'Toyota', color:'#EB0A1E', logoUrl:'https://www.google.com/s2/favicons?domain=toyota.com&sz=128' },
    { nombre:'Honda', color:'#CC0000', logoUrl:'https://www.google.com/s2/favicons?domain=honda.mx&sz=128' },
    { nombre:'Ford', color:'#003478', logoUrl:'https://www.google.com/s2/favicons?domain=ford.mx&sz=128' },
    { nombre:'Chevrolet', color:'#CC9900', logoUrl:'https://www.google.com/s2/favicons?domain=chevrolet.com.mx&sz=128' },
    { nombre:'Volkswagen', color:'#001E50', logoUrl:'https://www.google.com/s2/favicons?domain=vw.com.mx&sz=128' },
    { nombre:'Mazda', color:'#1B2B4B', logoUrl:'https://www.google.com/s2/favicons?domain=mazda.mx&sz=128' },
    { nombre:'Jeep', color:'#FFBA00', logoUrl:'https://www.google.com/s2/favicons?domain=jeep.com.mx&sz=128' },
    { nombre:'Volvo', color:'#002561', logoUrl:'https://www.google.com/s2/favicons?domain=volvocars.com&sz=128' },
  ],

  pasos_compra: [
    { icon:'🔍', titulo:'Encuentra tu Auto', desc:'Usa nuestros filtros avanzados para encontrar el auto de tus sueños entre miles de opciones verificadas.' },
    { icon:'✅', titulo:'Inspección Certificada', desc:'Cada auto pasa por 300 puntos de inspección. Recibes el reporte completo antes de comprar.' },
    { icon:'💳', titulo:'Financia en Minutos', desc:'Obtén tu aprobación de crédito en menos de 10 minutos con las mejores tasas del mercado.' },
    { icon:'🚗', titulo:'Entrega a Domicilio', desc:'Tu auto llega a tu puerta en 24 horas con garantía incluida y documentación en regla.' },
  ],

  pasos_venta: [
    { icon:'📱', titulo:'Valuación Gratis', desc:'Ingresa los datos de tu auto y obtén una estimación de precio en tiempo real, sin compromiso.' },
    { icon:'🏠', titulo:'Inspección en Casa', desc:'Nuestro inspector llega a donde tú estés. La cita es gratis y dura aproximadamente 1 hora.' },
    { icon:'💰', titulo:'Pago en 24 Horas', desc:'Acepta la oferta y recibe tu dinero en cuenta bancaria en menos de 24 horas hábiles.' },
  ],

  faq_venta: [
    { pregunta:'¿Cuánto tarda el proceso de venta?', respuesta:'El proceso completo toma entre 24 y 48 horas. La valuación es inmediata, la inspección toma 1-2 días, y el pago se realiza dentro de las 24 horas siguientes a aceptar la oferta.' },
    { pregunta:'¿Qué documentos necesito?', respuesta:'Necesitas: título o factura del auto, identificación oficial vigente, comprobante de domicilio no mayor a 3 meses, y en caso de tener crédito, carta de liquidación del banco.' },
    { pregunta:'¿AUTOMARKET compra autos con adeudos?', respuesta:'Sí, podemos comprar tu auto aunque tenga saldo pendiente en el banco. Nosotros nos encargamos de liquidar el crédito directamente con la institución financiera.' },
    { pregunta:'¿Cómo determinan el precio de mi auto?', respuesta:'Usamos datos de mercado en tiempo real, historial del vehículo, condición física y mecánica, y demanda actual para ofrecerte el precio más justo y competitivo.' },
    { pregunta:'¿La inspección tiene algún costo?', respuesta:'No. La inspección es completamente gratuita y sin compromiso. Si no estás de acuerdo con la oferta, no hay ningún costo ni penalización.' },
  ],
};

// Helper functions
const DB = {
  getAll: () => AUTOMARKET_DB.autos.filter(a => !a.vendido),
  getById: (id) => AUTOMARKET_DB.autos.find(a => a.id == id || String(a.id) === String(id)),
  getDestacados: () => AUTOMARKET_DB.autos.filter(a => a.destacado && !a.vendido),
  getSimilares: (auto, limit=4) => AUTOMARKET_DB.autos.filter(a =>
    String(a.id) !== String(auto?.id) && !a.vendido &&
    (a.categoria === auto?.categoria || a.marca === auto?.marca)
  ).slice(0, limit),
  filtrar: ({ marca, año_min, año_max, precio_min, precio_max, transmision, combustible, categoria, busqueda } = {}) => {
    return AUTOMARKET_DB.autos.filter(a => {
      if (a.vendido) return false;
      if (marca && a.marca !== marca) return false;
      if (año_min && a.año < parseInt(año_min)) return false;
      if (año_max && a.año > parseInt(año_max)) return false;
      if (precio_min && a.precio < parseInt(precio_min)) return false;
      if (precio_max && a.precio > parseInt(precio_max)) return false;
      if (transmision && a.transmision !== transmision) return false;
      if (combustible && a.combustible !== combustible) return false;
      if (categoria && a.categoria !== categoria) return false;
      if (busqueda) {
        const q = busqueda.toLowerCase();
        if (!`${a.marca} ${a.modelo} ${a.año}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  },
  formatPrecio: (n) => `$${n.toLocaleString('es-MX')}`,
  formatKm: (n) => `${n.toLocaleString('es-MX')} km`,
};
