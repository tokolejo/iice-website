const https = require('https');

https.get('https://iice.ge/wp-json/wp/v2/posts?lang=en&per_page=100', (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const posts = JSON.parse(rawData);
            console.log(`Found ${posts.length} English posts.`);
            posts.forEach(p => {
                console.log(`ID: ${p.id} | Date: ${p.date.split('T')[0]} | Title: ${p.title.rendered}`);
            });
        } catch (e) {
            console.error(e.message);
        }
    });
});
