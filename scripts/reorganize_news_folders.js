const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/newsData.js');
const IMAGE_DIR = path.join(__dirname, '../public/images/news');

// Read newsData.js
let fileContent = fs.readFileSync(DATA_FILE, 'utf8');
const arrayStr = fileContent.replace('export const newsData = ', '').trim().replace(/;$/, '');

let newsArray;
try {
    newsArray = eval('(' + arrayStr + ')');
} catch (e) {
    console.error("Failed to parse newsData array", e);
    process.exit(1);
}

let movedFiles = 0;

newsArray.forEach(post => {
    // Generate folder name based on post ID
    const folderName = `post-${post.id}`;
    const targetDir = path.join(IMAGE_DIR, folderName);
    
    // Create folder if it doesn't exist
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }

    // Helper to move a file intelligently and update path
    const processImage = (imgPath) => {
        if (!imgPath || imgPath.includes('placeholder.jpg') || imgPath.startsWith(`/images/news/${folderName}/`)) {
            return imgPath; // Skip if empty, placeholder, or already moved
        }
        
        const oldFile = path.basename(imgPath);
        const oldPath = path.join(IMAGE_DIR, oldFile);
        const newPath = path.join(targetDir, oldFile);
        
        if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath);
            movedFiles++;
        }
        
        return `/images/news/${folderName}/${oldFile}`;
    };

    // Update main imageUrl
    if (post.imageUrl) {
        post.imageUrl = processImage(post.imageUrl);
    }

    // Update array of images
    if (post.images && Array.isArray(post.images)) {
        post.images = post.images.map(img => processImage(img));
    }
});

// Write the updated array back to newsData.js keeping clean formatting
const newContent = `// Automatically synchronized from live WordPress via REST API\nexport const newsData = ${JSON.stringify(newsArray, null, 4)};\n`;
fs.writeFileSync(DATA_FILE, newContent, 'utf8');

console.log(`✅ Organization Complete! Successfully moved ${movedFiles} images into individual post folders.`);
console.log(`✅ newsData.js references updated accordingly.`);
