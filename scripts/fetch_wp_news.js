const fs = require('fs');
const https = require('https');
const path = require('path');
const crypto = require('crypto');

const WP_API_BASE = 'https://new.conference23iice.ge/wp-json/wp/v2/posts';
const IMAGE_DIR = path.join(__dirname, '../public/images/news');
const DATA_FILE = path.join(__dirname, '../src/data/newsData.js');

const GEORGIAN_CATEGORIES = '128,131,145,70';
const ENGLISH_CATEGORIES = '1,71,139';

// Ensure image directory exists
if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// Helper to fetch JSON from URL
function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

// Helper to extract image URLs from HTML content
function extractImagesFromHtml(html) {
    const imgRegex = /<img[^>]+src="(https?:\/\/[^">]+)"/g;
    const images = [];
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
        images.push(match[1]);
    }
    return images;
}

// Download a single binary file to a path
function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
            return resolve(destPath); // already exists
        }
        const file = fs.createWriteStream(destPath);
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                fs.unlinkSync(destPath);
                return resolve(null); // Skip invalid
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(destPath);
            });
        }).on('error', (err) => {
            fs.unlinkSync(destPath);
            resolve(null);
        });
    });
}

function truncateString(str, num) {
    if (!str) return "";
    // Remove HTML tags for description
    const plain = str.replace(/<\/?[^>]+(>|$)/g, "");
    if (plain.length <= num) {
        return plain;
    }
    return plain.slice(0, num) + '...';
}

function generateExcerpt(html) {
    // Use first paragraph if possible
    const pMatch = html.match(/<p>(.*?)<\/p>/s);
    if (pMatch && pMatch[1]) {
        return truncateString(pMatch[1], 150);
    }
    return truncateString(html, 150);
}

async function run() {
    console.log("Fetching Georgian Posts...");
    const gePosts = await fetchJson(`${WP_API_BASE}?categories=${GEORGIAN_CATEGORIES}&per_page=100&_embed=1`);
    console.log(`Fetched ${gePosts.length} Georgian posts.`);

    console.log("Fetching English Posts...");
    const enPosts = await fetchJson(`${WP_API_BASE}?categories=${ENGLISH_CATEGORIES}&per_page=100&_embed=1`);
    console.log(`Fetched ${enPosts.length} English posts.`);

    const mergedData = [];
    let idCounter = 1;

    for (const post of gePosts) {
        const dateStr = post.date.split('T')[0];
        
        // Try to find matching english post by date (same day)
        const enPost = enPosts.find(ep => ep.date.startsWith(dateStr));
        
        // Process images
        const localImages = [];
        let mainImageLocal = null;

        // 1. Featured Media
        if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
            const featuredMediaStr = post._embedded['wp:featuredmedia'][0].source_url;
            if (featuredMediaStr) {
                const ext = path.extname(new URL(featuredMediaStr).pathname) || '.jpg';
                const filename = `post-${post.id}-main${ext}`;
                const dest = path.join(IMAGE_DIR, filename);
                console.log(`Downloading main image for post ${post.id}...`);
                const success = await downloadImage(featuredMediaStr, dest);
                if (success) {
                    mainImageLocal = `/images/news/${filename}`;
                    localImages.push(mainImageLocal);
                }
            }
        }

        // 2. Content Images
        const contentImgs = extractImagesFromHtml(post.content.rendered);
        for (let i = 0; i < contentImgs.length; i++) {
            const imgUrl = contentImgs[i];
            const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
            const filename = `post-${post.id}-img-${i}${ext}`;
            const dest = path.join(IMAGE_DIR, filename);
            console.log(`Downloading content image ${i} for post ${post.id}...`);
            const success = await downloadImage(imgUrl, dest);
            if (success) {
                const localPath = `/images/news/${filename}`;
                if (!localImages.includes(localPath)) {
                    localImages.push(localPath);
                }
            }
        }

        // If no images found, set a default or null
        if (!mainImageLocal && localImages.length > 0) {
            mainImageLocal = localImages[0];
        }

        mergedData.push({
            id: idCounter++,
            category: "news",
            date: dateStr,
            title: post.title.rendered,
            titleEn: enPost ? enPost.title.rendered : `[ENG] Translation needed for: ${post.title.rendered}`,
            description: generateExcerpt(post.content.rendered),
            descriptionEn: enPost ? generateExcerpt(enPost.content.rendered) : `[ENG] Translation needed`,
            content: post.content.rendered,
            contentEn: enPost ? enPost.content.rendered : `[ENG] Translation needed`,
            imageUrl: mainImageLocal || "/images/news/placeholder.jpg",
            images: localImages
        });
    }

    console.log("Writing to newsData.js...");
    const jsContent = `// Automatically synchronized from live WordPress via REST API
export const newsData = ${JSON.stringify(mergedData, null, 4)};
`;
    fs.writeFileSync(DATA_FILE, jsContent, 'utf-8');
    console.log("newsData.js has been successfully regenerated with high-quality localized images!");
}

run().catch(console.error);
