const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

const xmlDir = path.join(__dirname, '../utility/data');
const outputDir = path.join(__dirname, '../utility/data');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Function to recursively remove "$" properties and merge them into their parent objects
const removeDollarProperties = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(removeDollarProperties);
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === '$') {
                    Object.assign(newObj, obj[key]);
                } else {
                    newObj[key] = removeDollarProperties(obj[key]);
                }
            }
        }
        return newObj;
    }
    return obj;
};

// Function to convert XML to JSON
const convertXmlToJson = (xmlFilePath, jsonFilePath) => {
    const xml = fs.readFileSync(xmlFilePath, 'utf8');
    const parser = new xml2js.Parser();

    parser.parseString(xml, (err, result) => {
        if (err) {
            console.error(`Error parsing XML file ${xmlFilePath}:`, err);
            return;
        }

        const cleanedResult = removeDollarProperties(result);
        const json = JSON.stringify(cleanedResult, null, 4);
        fs.writeFileSync(jsonFilePath, json, 'utf8');
        console.log(`Converted ${xmlFilePath} to ${jsonFilePath}`);
    });
};

// Read all XML files in the directory
fs.readdir(xmlDir, (err, files) => {
    if (err) {
        console.error('Error reading XML directory:', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file).toLowerCase() === '.xml') {
            const xmlFilePath = path.join(xmlDir, file);
            const jsonFilePath = path.join(outputDir, `${path.basename(file, '.xml')}.json`);
            convertXmlToJson(xmlFilePath, jsonFilePath);
        }
    });
});

