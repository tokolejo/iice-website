const fs = require('fs');
const path = require('path');

function replaceColor(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceColor(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.mjs')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('#2E073F')) {
                content = content.replace(/#2E073F/g, '#60318e');
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}
replaceColor('./src');
