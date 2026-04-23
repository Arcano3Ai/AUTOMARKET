const fs = require('fs');
const filePath = 'c:/Users/sergi/MisArchivosLocales/AUTOMARKET/js/data.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace standard unsplash URLs
content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[A-Za-z0-9\-]+/g, 'https://placehold.co/800x500/18181b/ef4444?text=Auto+Market');

// Write back
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed data.js images');
