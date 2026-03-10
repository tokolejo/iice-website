const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const directoryPath = 'c:\\Users\\tokol\\OneDrive\\Desktop\\PROJECT\\iice-website\\public\\staff';

// Recursively get all PDF files
function getPdfFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getPdfFiles(filePath, fileList);
        } else if (file.toLowerCase().endsWith('.pdf')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

async function parsePDFs() {
    const allPdfs = getPdfFiles(directoryPath);
    // Sort by modification time to see newest first
    allPdfs.sort((a, b) => fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime());
    
    // Only check the top 15 most recently modified PDFs to save time
    const recentPdfs = allPdfs.slice(0, 15);

    for (const filePath of recentPdfs) {
        try {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            const text = data.text;
            
            // Extract URLs
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const urls = text.match(urlRegex) || [];
            
            // Extract Emails
            const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
            const emails = text.match(emailRegex) || [];
            
            console.log(`\n========================================`);
            console.log(`FILE: ${path.basename(filePath)}`);
            console.log(`PATH: ${filePath}`);
            
            const uniqueUrls = [...new Set(urls)];
            if (uniqueUrls.length > 0) {
                console.log(`\n--- URLs ---`);
                uniqueUrls.forEach(url => console.log(url));
            }
            
            const uniqueEmails = [...new Set(emails)];
            if (uniqueEmails.length > 0) {
                console.log(`\n--- EMAILS ---`);
                uniqueEmails.forEach(email => console.log(email));
            }
        } catch (err) {
            console.error(`Error reading ${filePath}:`, err.message);
        }
    }
}

parsePDFs();
