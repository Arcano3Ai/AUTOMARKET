/**
 * fix_images_final.js
 * Uses source.unsplash.com which serves CORS-free, no-auth required images.
 * Query parameter ensures car-specific images always load.
 */
const fs = require('fs');
const path = require('path');

// source.unsplash.com/featured/{width}x{height}?{query} → always returns a photo matching query
// This is the PUBLIC endpoint that requires NO API key and has no CORS restrictions
const CAR_URLS = {
  1:  ['https://source.unsplash.com/featured/800x500?toyota,corolla,car',  'https://source.unsplash.com/featured/800x500?sedan,silver,car'],
  2:  ['https://source.unsplash.com/featured/800x500?honda,civic,car',      'https://source.unsplash.com/featured/800x500?blue,sedan,car'],
  3:  ['https://source.unsplash.com/featured/800x500?nissan,versa,car',     'https://source.unsplash.com/featured/800x500?red,sedan,car'],
  4:  ['https://source.unsplash.com/featured/800x500?bmw,sedan,car',        'https://source.unsplash.com/featured/800x500?bmw,luxury,car'],
  5:  ['https://source.unsplash.com/featured/800x500?toyota,rav4,suv',      'https://source.unsplash.com/featured/800x500?suv,grey,toyota'],
  6:  ['https://source.unsplash.com/featured/800x500?mercedes,benz,car',    'https://source.unsplash.com/featured/800x500?luxury,sedan,silver'],
  7:  ['https://source.unsplash.com/featured/800x500?mazda,cx5,suv',        'https://source.unsplash.com/featured/800x500?red,mazda,suv'],
  8:  ['https://source.unsplash.com/featured/800x500?volkswagen,tiguan,suv','https://source.unsplash.com/featured/800x500?vw,white,suv'],
  9:  ['https://source.unsplash.com/featured/800x500?ford,mustang,v8',      'https://source.unsplash.com/featured/800x500?muscle,car,red'],
  10: ['https://source.unsplash.com/featured/800x500?audi,a4,car',          'https://source.unsplash.com/featured/800x500?audi,black,sedan'],
  11: ['https://source.unsplash.com/featured/800x500?honda,crv,suv',        'https://source.unsplash.com/featured/800x500?silver,suv,honda'],
  12: ['https://source.unsplash.com/featured/800x500?nissan,kicks,suv',     'https://source.unsplash.com/featured/800x500?blue,crossover,car'],
  13: ['https://source.unsplash.com/featured/800x500?chevrolet,camaro,car', 'https://source.unsplash.com/featured/800x500?yellow,sports,car'],
  14: ['https://source.unsplash.com/featured/800x500?toyota,camry,sedan',   'https://source.unsplash.com/featured/800x500?grey,sedan,toyota'],
  15: ['https://source.unsplash.com/featured/800x500?volkswagen,jetta,car', 'https://source.unsplash.com/featured/800x500?white,german,car'],
  16: ['https://source.unsplash.com/featured/800x500?audi,q5,suv',          'https://source.unsplash.com/featured/800x500?audi,luxury,suv'],
  17: ['https://source.unsplash.com/featured/800x500?mercedes,gla,suv',     'https://source.unsplash.com/featured/800x500?white,luxury,suv'],
  18: ['https://source.unsplash.com/featured/800x500?mazda,3,sedan',        'https://source.unsplash.com/featured/800x500?red,mazda,sedan'],
  19: ['https://source.unsplash.com/featured/800x500?ford,explorer,suv',    'https://source.unsplash.com/featured/800x500?big,ford,suv'],
  20: ['https://source.unsplash.com/featured/800x500?chevrolet,equinox,suv','https://source.unsplash.com/featured/800x500?grey,chevrolet,suv'],
  21: ['https://source.unsplash.com/featured/800x500?honda,hrv,crossover',  'https://source.unsplash.com/featured/800x500?green,honda,suv'],
  22: ['https://source.unsplash.com/featured/800x500?nissan,pathfinder,suv','https://source.unsplash.com/featured/800x500?blue,nissan,suv'],
  23: ['https://source.unsplash.com/featured/800x500?toyota,highlander,suv','https://source.unsplash.com/featured/800x500?white,toyota,suv'],
  24: ['https://source.unsplash.com/featured/800x500?bmw,x5,suv',           'https://source.unsplash.com/featured/800x500?bmw,black,luxury'],
  25: ['https://source.unsplash.com/featured/800x500?volkswagen,golf,gti',  'https://source.unsplash.com/featured/800x500?red,vw,hatchback'],
  26: ['https://source.unsplash.com/featured/800x500?honda,civic,grey',     'https://source.unsplash.com/featured/800x500?honda,sedan,used'],
  27: ['https://source.unsplash.com/featured/800x500?jeep,wrangler,offroad','https://source.unsplash.com/featured/800x500?jeep,grey,suv'],
  28: ['https://source.unsplash.com/featured/800x500?mazda,cx3,compact',    'https://source.unsplash.com/featured/800x500?white,mazda,compact'],
  29: ['https://source.unsplash.com/featured/800x500?kia,forte,sedan',      'https://source.unsplash.com/featured/800x500?kia,blue,sedan'],
  30: ['https://source.unsplash.com/featured/800x500?ford,escape,suv',      'https://source.unsplash.com/featured/800x500?red,ford,suv'],
  31: ['https://source.unsplash.com/featured/800x500?kia,sportage,suv',     'https://source.unsplash.com/featured/800x500?white,kia,suv'],
  32: ['https://source.unsplash.com/featured/800x500?hyundai,tucson,suv',   'https://source.unsplash.com/featured/800x500?grey,hyundai,suv'],
  33: ['https://source.unsplash.com/featured/800x500?mg,suv,car',           'https://source.unsplash.com/featured/800x500?red,compact,suv'],
  34: ['https://source.unsplash.com/featured/800x500?volvo,xc60,luxury',    'https://source.unsplash.com/featured/800x500?volvo,black,suv'],
  35: ['https://source.unsplash.com/featured/800x500?suzuki,swift,compact', 'https://source.unsplash.com/featured/800x500?yellow,hatchback,small'],
  36: ['https://source.unsplash.com/featured/800x500?seat,ibiza,hatchback', 'https://source.unsplash.com/featured/800x500?blue,hatchback,european'],
  37: ['https://source.unsplash.com/featured/800x500?peugeot,2008,suv',     'https://source.unsplash.com/featured/800x500?orange,french,suv'],
  38: ['https://source.unsplash.com/featured/800x500?renault,duster,suv',   'https://source.unsplash.com/featured/800x500?silver,renault,suv'],
  39: ['https://source.unsplash.com/featured/800x500?porsche,macan,suv',    'https://source.unsplash.com/featured/800x500?black,porsche,sports'],
  40: ['https://source.unsplash.com/featured/800x500?volvo,xc40,suv',       'https://source.unsplash.com/featured/800x500?blue,volvo,hybrid'],
};

const dataFile = path.join(__dirname, 'js', 'data.js');
let content = fs.readFileSync(dataFile, 'utf8');

let replaced = 0;
for (const [id, urls] of Object.entries(CAR_URLS)) {
  const regex = new RegExp(
    `(id:\\s*${id},[\\s\\S]{0,600}?fotos:\\s*\\[)[^\\]]*?(\\])`,
    'g'
  );
  const newContent = content.replace(regex, (match, open, close) => {
    replaced++;
    const urlStrings = urls.map(u => `'${u}'`).join(',\n        ');
    return `${open}\n        ${urlStrings},\n      ${close}`;
  });
  content = newContent;
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log(`✅ Done! Replaced ${replaced} foto arrays with source.unsplash.com car-specific URLs.`);
