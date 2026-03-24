const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/newsData.js');
const IMAGE_DIR = path.join(__dirname, '../public/images/news');

// Read the js file content
const jsContent = fs.readFileSync(DATA_FILE, 'utf8');

// Use regex to locate all strings containing "/images/news/something.ext"
const imgRegex = /\/images\/news\/([^'"]+)/g;
const referencedImages = new Set();
let match;
while ((match = imgRegex.exec(jsContent)) !== null) {
    referencedImages.add(match[1]);
}

// Whitelist array for standard assets that shouldn't be deleted even if unreferenced directly in data file
const WHITE_LIST = ['pdf-icon.png', 'placeholder.jpg'];

const allFiles = fs.readdirSync(IMAGE_DIR);

let deletedCount = 0;
let bytesSaved = 0;

for (const file of allFiles) {
    // If it is a media file and NOT in the referenced set and NOT whitelisted
    if (!referencedImages.has(file) && !WHITE_LIST.includes(file)) {
        const filePath = path.join(IMAGE_DIR, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
            bytesSaved += stats.size;
            fs.unlinkSync(filePath);
            console.log(`❌ Deleted orphan file: ${file}`);
            deletedCount++;
        }
    }
}

console.log(`\n✅ Cleanup Complete!`);
console.log(`- Files removed: ${deletedCount}`);
console.log(`- Space saved: ${(bytesSaved / 1024 / 1024).toFixed(2)} MB`);
