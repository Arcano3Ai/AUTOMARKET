const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'js', 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const endOfAutosIndex = fileContent.indexOf('],', fileContent.indexOf('autos: ['));

const marcasMap = {
  'Toyota': ['Camry', 'Prius', 'Yaris', 'Sienna', 'Tacoma'],
  'Honda': ['Accord', 'CR-V', 'HR-V', 'City', 'Pilot'],
  'Nissan': ['Sentra', 'Kicks', 'Altima', 'Frontier', 'X-Trail'],
  'VW': ['Jetta', 'Tiguan', 'Golf', 'Polo', 'Taos'],
  'Ford': ['Mustang', 'Explorer', 'Escape', 'Ranger', 'F-150'],
  'Mazda': ['Mazda 3', 'CX-30', 'CX-9', 'Mazda 2'],
  'Audi': ['A3', 'A4', 'Q5', 'Q3', 'A1'],
  'Kia': ['Rio', 'Sportage', 'Forte', 'Sorento'],
  'Hyundai': ['Tucson', 'Elantra', 'Creta', 'Santa Fe']
};

const colores = ['Plata', 'Negro', 'Blanco', 'Rojo', 'Azul', 'Gris Oxford'];
const ciudades = ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Querétaro'];
const fotosDemo = [
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db?auto=format&w=800&q=80',
  'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&w=800&q=80',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=800&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=800&q=80',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&w=800&q=80',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&w=800&q=80',
  'https://images.unsplash.com/photo-1612544448765-9d2670c2054e?auto=format&w=800&q=80',
  'https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&w=800&q=80',
  'https://images.unsplash.com/photo-1603386329726-ac573b01eaa5?auto=format&w=800&q=80',
  'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&w=800&q=80'
];

let generatedStr = '';

for(let i = 25; i <= 50; i++) {
  const marcas = Object.keys(marcasMap);
  const marca = marcas[Math.floor(Math.random() * marcas.length)];
  const modelo = marcasMap[marca][Math.floor(Math.random() * marcasMap[marca].length)];
  const anio = Math.floor(Math.random() * 5) + 2019; // 2019-2023
  const precio = Math.floor(Math.random() * 60) * 10000 + 200000; // 200k - 800k
  const mensual = Math.round(precio / 60);
  const km = Math.floor(Math.random() * 800) * 100 + 5000;
  const color = colores[Math.floor(Math.random() * colores.length)];
  const ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];
  
  const f1 = fotosDemo[Math.floor(Math.random() * fotosDemo.length)];
  const f2 = fotosDemo[Math.floor(Math.random() * fotosDemo.length)];

  generatedStr += `    {
      id: ${i},
      marca: '${marca}', modelo: '${modelo}', año: ${anio},
      precio: ${precio}, pago_mensual: ${mensual},
      km: ${km}, transmision: '${Math.random()>0.3?'Automático':'Manual'}', motor: '4 cilindros',
      color: '${color}', combustible: 'Gasolina',
      ciudad: '${ciudad}', estado: 'MX',
      fotos: [
        '${f1}',
        '${f2}'
      ],
      descripcion: '${marca} ${modelo} ${anio} en impecables condiciones. Garantía AUTOMARKET Plus incluida y revisión técnica de 120 puntos certificada. Listo para cualquier prueba.',
      caracteristicas: ['Sensores de reversa', 'Asientos premium', 'Apple CarPlay / Android Auto', 'Factura de agencia'],
      garantia: '3 meses / 5,000 km',
      verificado: true, destacado: false, vendido: false,
      categoria: '${Math.random()>0.5?'Sedán':'SUV'}',
      tipo: 'regular'
    },\n`;
}

const newContent = fileContent.slice(0, endOfAutosIndex) + ',\n' + generatedStr + fileContent.slice(endOfAutosIndex);

fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Autos generados hasta 50 correctamente.');
