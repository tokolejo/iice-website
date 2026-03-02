const fs = require('fs');
const path = require('path');

const srcBase = 'C:\\Users\\tokol\\OneDrive\\Desktop\\PROJECT\\iicedepartment-member-files';
const destBase = path.join(__dirname, 'public', 'staff');

// Clear existing flat files in destBase
if (fs.existsSync(destBase)) {
    console.log('Cleaning up existing public/staff directory...');
    fs.rmSync(destBase, { recursive: true, force: true });
}
fs.mkdirSync(destBase, { recursive: true });

const mappings = [
    { src: 'applied-chemistry-dept-files', dest: 'applied-chemistry' },
    { src: 'applied_chemistry_dept-img', dest: 'applied-chemistry' },
    { src: 'high_energy_chemistry_dept-files', dest: 'high-energy-chemistry' },
    { src: 'high_energy_chemistry_dept-img', dest: 'high-energy-chemistry' },
    { src: 'phys_chem_analysis_dept-files', dest: 'phys-chem-analysis' },
    { src: 'phys_chem_analysis_dept-img', dest: 'phys-chem-analysis' },
];

mappings.forEach(mapping => {
    const srcDir = path.join(srcBase, mapping.src);
    const destDir = path.join(destBase, mapping.dest);

    if (fs.existsSync(srcDir)) {
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        const files = fs.readdirSync(srcDir);
        for (const file of files) {
            const srcPath = path.join(srcDir, file);
            const destPath = path.join(destDir, file);
            if (fs.statSync(srcPath).isFile()) {
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied ${file} to ${mapping.dest}`);
            }
        }
    }
});

console.log('Structured copy complete!');
