const fs = require('fs');
const path = require('path');

const phpDir = 'C:\\Users\\tokol\\OneDrive\\Desktop\\PROJECT\\iice-new\\php';
const outputDir = path.join(__dirname, 'src', 'data', 'parsed');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to extract staff array from the PHP string
function extractStaffArray(content) {
    const match = content.match(/const\s+staff\s*=\s*(\[[\s\S]*?\]);/);
    if (match && match[1]) {
        try {
            // Un-javascriptify it lightly before eval, though eval is okay here for static known strings
            /* eslint-disable no-eval */
            let staffCode = match[1];
            // Just replace simple things or return raw string to write later
            return staffCode;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    return null;
}

// Helper to extract description
function extractDescription(content) {
    // Look for <div class="app-text"> text inside
    const match = content.match(/<div class="app-text">([\s\S]*?)<\/div>/);
    if (match && match[1]) {
        // clean up html
        let text = match[1].trim();
        return text;
    }
    return "";
}

const files = fs.readdirSync(phpDir).filter(f => f.endsWith('.php'));

let indexExports = [];

files.forEach(file => {
    const filePath = path.join(phpDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    console.log(`Analyzing ${file}...`);

    // Determine type
    const isDept = file.includes('_dept.');

    if (isDept) {
        const staffArrayStr = extractStaffArray(content);
        const descHtml = extractDescription(content);

        const baseName = file.replace('.code-snippets.php', '').replace(/_/g, '-');
        const jsName = baseName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

        let jsContent = `// Parsed from ${file}\n\n`;
        jsContent += `export const ${jsName}Description = \`${descHtml.replace(/`/g, '\\`')}\`;\n\n`;

        if (staffArrayStr) {
            jsContent += `export const ${jsName}StaffRaw = ${staffArrayStr};\n\n`;
        }

        const outPath = path.join(outputDir, `${jsName}.js`);
        fs.writeFileSync(outPath, jsContent);
        console.log(`-> Saved ${jsName}.js`);

        indexExports.push(`export * from './${jsName}';`);
    } else {
        // Non-department page. Usually just HTML content.
        // We'll extract everything inside #iice-app-[name] or generic wrapper if any
        let htmlMatch = content.match(/<div id="iice-app[^>]*>([\s\S]*?)<\/div>\s*<script>/);
        if (!htmlMatch) {
            htmlMatch = content.match(/\?>([\s\S]*?)<\?php/);
        }

        let html = htmlMatch ? htmlMatch[1] : '';
        const baseName = file.replace('.code-snippets.php', '').replace(/-/g, '_');

        let jsContent = `// Parsed from ${file}\nexport const ${baseName}_html = \`${html.replace(/`/g, '\\`')}\`;\n`;
        const outPath = path.join(outputDir, `${baseName}.js`);
        fs.writeFileSync(outPath, jsContent);
        console.log(`-> Saved ${baseName}.js`);

        indexExports.push(`export * from './${baseName}';`);
    }
});

// Create index.js
fs.writeFileSync(path.join(outputDir, 'index.js'), indexExports.join('\n'));
console.log('Parser complete.');
