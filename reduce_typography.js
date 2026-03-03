const fs = require("fs");
const path = require("path");

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith(".js") && file !== "layout.js") {
            results.push(file);
        }
    });
    return results;
}

const files = walk("src/app");
try { files.push(...walk("src/components")); } catch(e) {}
try { files.push(...walk("src/data")); } catch(e) {}

const scaling = {
    "lg:text-6xl": "lg:text-5xl",
    "md:text-5xl": "md:text-4xl",
    "text-5xl": "text-4xl",
    
    "lg:text-5xl": "lg:text-4xl",
    "md:text-4xl": "md:text-3xl",
    "text-4xl": "text-3xl",
    
    "lg:text-4xl": "lg:text-3xl",
    "md:text-3xl": "md:text-2xl",
    "text-3xl": "text-2xl",
    
    "lg:text-3xl": "lg:text-2xl",
    "md:text-2xl": "md:text-xl",
    "text-2xl": "text-xl",
    
    "lg:text-2xl": "lg:text-xl",
    "md:text-xl": "md:text-lg",
    "text-xl": "text-lg",
    
    "text-lg": "text-base",
    "md:text-lg": "md:text-base",
    "lg:text-lg": "lg:text-base",
    
    "text-base": "text-sm",
    "md:text-base": "md:text-sm",
    "lg:text-base": "lg:text-sm"
};

let count = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, "utf8");
    let original = content;
    
    const regex = /\b(lg:text-6xl|md:text-5xl|text-5xl|lg:text-5xl|md:text-4xl|text-4xl|lg:text-4xl|md:text-3xl|text-3xl|lg:text-3xl|md:text-2xl|text-2xl|lg:text-2xl|md:text-xl|text-xl|lg:text-lg|md:text-lg|text-lg|lg:text-base|md:text-base|text-base)\b/g;
    
    content = content.replace(regex, (match) => {
        return scaling[match] || match;
    });

    if (content !== original) {
        fs.writeFileSync(file, content, "utf8");
        console.log("Updated", file);
        count++;
    }
});

console.log(`Total files updated: ${count}`);

