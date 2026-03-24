const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/newsData.js');
const EN_FILE = path.join(__dirname, '../en_translations.json');

// Read existing newsData.js
let fileContent = fs.readFileSync(DATA_FILE, 'utf8');
const arrayStr = fileContent.replace('export const newsData = ', '').trim().replace(/;$/, '');

let newsArray;
try {
    newsArray = eval('(' + arrayStr + ')');
} catch (e) {
    console.error("Failed to parse newsData array", e);
    process.exit(1);
}

// Read translations
const translations = JSON.parse(fs.readFileSync(EN_FILE, 'utf8'));

// Map translations to the first 6 items
for(let i = 0; i < Math.min(newsArray.length, translations.length); i++) {
    const post = newsArray[i];
    const trans = translations[i];
    
    post.titleEn = trans.titleEn;
    post.descriptionEn = trans.descriptionEn;
    post.contentEn = trans.contentEn;
}

// Write the updated array back to newsData.js keeping clean formatting
const newContent = `// Automatically synchronized from live WordPress via REST API\nexport const newsData = ${JSON.stringify(newsArray, null, 4)};\n`;
fs.writeFileSync(DATA_FILE, newContent, 'utf8');

console.log(`✅ Translations applied successfully to ${translations.length} posts!`);
