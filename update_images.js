const fs = require('fs');
const path = require('path');

const newsDataPath = path.resolve('src/data/newsData.js');
const imagesBasePath = path.resolve('public/images/news');

let content = fs.readFileSync(newsDataPath, 'utf8');
const prefix = 'export const newsData = ';
const arrayStart = content.indexOf(prefix);
if (arrayStart === -1) {
    console.error("Could not find start of newsData");
    process.exit(1);
}
let arrayStr = content.substring(arrayStart + prefix.length).trim();
if (arrayStr.endsWith(';')) {
    arrayStr = arrayStr.substring(0, arrayStr.length - 1);
}

// Evaluate as a JS array (handles unquoted keys if any, though JSON might be better if valid, but we need to handle trailing commas etc)
let newsData;
try {
    newsData = eval('(' + arrayStr + ')');
} catch (e) {
    console.error("Error evaluating newsData:", e);
    process.exit(1);
}

newsData.forEach(post => {
    const postDir = path.join(imagesBasePath, 'post-' + post.id);
    if (!fs.existsSync(postDir)) return;
    
    let files = fs.readdirSync(postDir).filter(f => f.match(/\.(jpg|jpeg|png|gif|webp)$/i));
    if (files.length === 0) return;
    
    let mainImg = files.find(f => f.includes('-main'));
    if (!mainImg) {
        // Fallback to -img-0 or just the first one
        mainImg = files.find(f => f.includes('-img-0')) || files[0];
    }
    
    post.imageUrl = `/images/news/post-${post.id}/${mainImg}`;
    post.images = files.map(f => `/images/news/post-${post.id}/${f}`);
});

const newContent = prefix + JSON.stringify(newsData, null, 4) + ';\n';
fs.writeFileSync(newsDataPath, newContent, 'utf8');
console.log("Successfully updated newsData.js");
