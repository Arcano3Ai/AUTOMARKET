// restore_images.js - Replaces placeholder images with real auto CDN images
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'js', 'data.js');
let content = fs.readFileSync(file, 'utf8');

// Map of real, publicly accessible auto images by model keywords
// Using WikiMedia/Wikimedia Commons direct links (stable, no auth needed)
const REAL_IMAGES = {
  toyota_corolla: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/2019_Toyota_Corolla_%28ZWE211R%29_Ascent_Sport_hybrid_sedan_%282019-10-18%29_01.jpg/800px-2019_Toyota_Corolla_%28ZWE211R%29_Ascent_Sport_hybrid_sedan_%282019-10-18%29_01.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/2023_Toyota_Corolla_Hybrid_%28ZWE219R%29_sedan_%282023-07-08%29_01.jpg/800px-2023_Toyota_Corolla_Hybrid_%28ZWE219R%29_sedan_%282023-07-08%29_01.jpg',
  ],
  honda_civic: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/11th_gen_Honda_Civic_sedan_%28front%29%2C_2022_Los_Angeles_Auto_Show.jpg/800px-11th_gen_Honda_Civic_sedan_%28front%29%2C_2022_Los_Angeles_Auto_Show.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/2022_Honda_Civic%2C_Front_Left%2C_08-04-2021.jpg/800px-2022_Honda_Civic%2C_Front_Left%2C_08-04-2021.jpg',
  ],
  nissan_versa: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/2013_Nissan_Versa_Sedan.jpg/800px-2013_Nissan_Versa_Sedan.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/2021_Nissan_Versa_Sedan_SV%2C_Front_8.23.20.jpg/800px-2021_Nissan_Versa_Sedan_SV%2C_Front_8.23.20.jpg',
  ],
  bmw_serie3: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/2019_BMW_330i_M_Sport_%28G20%29%2C_front_8.22.19.jpg/800px-2019_BMW_330i_M_Sport_%28G20%29%2C_front_8.22.19.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/2022_BMW_330i_M_Sport_%28G20%2C_facelift%29%2C_front_7.2.22.jpg/800px-2022_BMW_330i_M_Sport_%28G20%2C_facelift%29%2C_front_7.2.22.jpg',
  ],
  toyota_rav4: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/2019_Toyota_RAV4_XRV_2.0_Front.jpg/800px-2019_Toyota_RAV4_XRV_2.0_Front.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Toyota_RAV4_XLE_Premium.jpg/800px-Toyota_RAV4_XLE_Premium.jpg',
  ],
};

// Generic fallback pool of real car images (stable CDN)
const GENERIC_CAR_IMGS = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2018_Ford_Mustang_GT_fastback_%28facelift%2C_black%29%2C_front_8.18.18.jpg/800px-2018_Ford_Mustang_GT_fastback_%28facelift%2C_black%29%2C_front_8.18.18.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Seat_leon_fr_2012.jpg/800px-Seat_leon_fr_2012.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camry_XV70_--_2017_NAIAS.jpg/800px-Camry_XV70_--_2017_NAIAS.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/2019_Porsche_Macan_S_%2895B%2C_facelift%29%2C_front_8.8.19.jpg/800px-2019_Porsche_Macan_S_%2895B%2C_facelift%29%2C_front_8.8.19.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Jeep_Grand_Cherokee_SRT_%28XK%29_--_2010_DC.jpg/800px-Jeep_Grand_Cherokee_SRT_%28XK%29_--_2010_DC.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2023_Mercedes-Benz_E-Class_%28W214%29_E_200%2C_front-right.jpg/800px-2023_Mercedes-Benz_E-Class_%28W214%29_E_200%2C_front-right.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/2021_Kia_Sportage_EX_Premium_AWD%2C_front_9.20.20.jpg/800px-2021_Kia_Sportage_EX_Premium_AWD%2C_front_9.20.20.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hyundai_Tucson_%28NX4%29_1.6_T-GDi_HEV_Trend_in_Aurora_Silver.jpg/800px-Hyundai_Tucson_%28NX4%29_1.6_T-GDi_HEV_Trend_in_Aurora_Silver.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Volvo_V90_%28facelift%2C_2020%29_at_IAA_2019_IMG_0536.jpg/800px-Volvo_V90_%28facelift%2C_2020%29_at_IAA_2019_IMG_0536.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mazda_cx5_2017.jpg/800px-Mazda_cx5_2017.jpg',
];

let imgIndex = 0;
// Replace ALL placehold.co URLs with rotating real images
content = content.replace(/'https:\/\/placehold\.co\/[^']+'/g, () => {
  const img = GENERIC_CAR_IMGS[imgIndex % GENERIC_CAR_IMGS.length];
  imgIndex++;
  return `'${img}'`;
});

fs.writeFileSync(file, content, 'utf8');
console.log(`Done! Replaced ${imgIndex} placeholder images with real auto photos.`);
