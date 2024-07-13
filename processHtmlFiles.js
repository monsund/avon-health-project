const fs = require('fs');
const path = require('path');
const HtmlToJsonConverter = require('./src/HtmlToJsonConverter');

/**
 * Reads and converts multiple HTML files from a directory to JSON.
 * @param {string} inputDirectoryPath - The path to the directory containing HTML files.
 * @param {string} outputDirectoryPath - The path to the directory where JSON files will be saved.
 */
function processHtmlFilesFromDirectory(inputDirectoryPath, outputDirectoryPath) {
    fs.readdir(inputDirectoryPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${inputDirectoryPath}:`, err);
            return;
        }

        const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html');

        if (htmlFiles.length === 0) {
            console.log(`No HTML files found in directory ${inputDirectoryPath}`);
            return;
        }

        // Ensure the output directory exists
        fs.mkdir(outputDirectoryPath, { recursive: true }, (err) => {
            if (err) {
                console.error(`Error creating directory ${outputDirectoryPath}:`, err);
                return;
            }

            htmlFiles.forEach(file => {
                const filePath = path.join(inputDirectoryPath, file);
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Error reading file ${filePath}:`, err);
                        return;
                    }

                    const converter = new HtmlToJsonConverter(data);
                    const json = converter.convertToJson();
                    const outputFilePath = path.join(outputDirectoryPath, path.basename(filePath, '.html') + '.json');

                    fs.writeFile(outputFilePath, JSON.stringify(json, null, 2), err => {
                        if (err) {
                            console.error(`Error writing JSON to file ${outputFilePath}:`, err);
                        } else {
                            console.log(`Converted ${filePath} to JSON and saved as ${outputFilePath}`);
                        }
                    });
                });
            });
        });
    });
}

const inputDirectoryPath = './src/html_files';
const outputDirectoryPath = './src/output_json';
processHtmlFilesFromDirectory(inputDirectoryPath, outputDirectoryPath);