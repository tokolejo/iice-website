import fs from 'fs';

const newsDataPath = 'd:/PROJECTS/iice-website/src/data/newsData.js';
let content = fs.readFileSync(newsDataPath, 'utf-8');

let code = content.replace('export const newsData =', 'global.newsData =');
eval(code);

let updateCount = 0;

for (let post of global.newsData) {
    let imagesDir = `d:/PROJECTS/iice-website/public/images/news/post-${post.id}`;
    let hasImages = false;
    
    if (fs.existsSync(imagesDir)) {
        let files = fs.readdirSync(imagesDir).filter(f => /\.(png|jpe?g|gif|webp)$/i.test(f));
        if (files.length > 0) {
            post.images = files.map(f => `/images/news/post-${post.id}/${f}`);
            let mainImage = files.find(f => f.toLowerCase().includes('main')) || files[0];
            post.imageUrl = `/images/news/post-${post.id}/${mainImage}`;
            hasImages = true;
        }
    }
    
    if (!hasImages) {
        post.images = [];
        post.imageUrl = '/images/news-placeholder.jpg';
    }
    updateCount++;
}

let newContent = `export const newsData = ${JSON.stringify(global.newsData, null, 4)};\n`;
fs.writeFileSync(newsDataPath, newContent);
console.log(`Updated ${updateCount} posts.`);
