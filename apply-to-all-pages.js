/**
 * This script automatically adds the mobile optimization script reference to all HTML files in the pages directory
 * Run with Node.js: node apply-to-all-pages.js
 */

const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const pagesDir = path.join(__dirname, 'pages');

// Script to add
const scriptToAdd = '<script src="../assets/js/apply-mobile-optimizations.js"></script>';

// Process all HTML files in the pages directory
fs.readdir(pagesDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter for HTML files
    const htmlFiles = files.filter(file => 
        file.toLowerCase().endsWith('.html') || file.toLowerCase().endsWith('.htm')
    );

    console.log(`Found ${htmlFiles.length} HTML files to process.`);

    // Process each HTML file
    htmlFiles.forEach(file => {
        const filePath = path.join(pagesDir, file);
        
        // Read file content
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err);
                return;
            }

            // Check if script is already added
            if (data.includes('apply-mobile-optimizations.js')) {
                console.log(`${file} already has the script. Skipping.`);
                return;
            }

            // Find the head closing tag
            const headCloseIndex = data.indexOf('</head>');
            if (headCloseIndex === -1) {
                console.log(`Could not find </head> in ${file}. Skipping.`);
                return;
            }

            // Insert script before head closing tag
            const newData = data.slice(0, headCloseIndex) + 
                            '\n    <!-- Add our automatic mobile optimization script -->\n    ' + 
                            scriptToAdd + 
                            '\n' + 
                            data.slice(headCloseIndex);

            // Write modified content back to file
            fs.writeFile(filePath, newData, 'utf8', err => {
                if (err) {
                    console.error(`Error writing to file ${file}:`, err);
                    return;
                }
                console.log(`Successfully updated ${file}`);
            });
        });
    });
});

console.log('Script execution started. Check console for results.'); 