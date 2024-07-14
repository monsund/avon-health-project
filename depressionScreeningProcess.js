const fs = require('fs').promises;
const path = require('path');
const DenominatorDeterminer = require("./src/algorithms/denominatorDeterminer");
const NumeratorDeterminer = require('./src/algorithms/numeratorDeterminer');

/**
 * Processes depression screening data from JSON files in a specified directory.
 * @param {string} inputDirectoryPath - The path to the directory containing the input JSON files.
 */
const depressionScreeiningProcess = async (inputDirectoryPath) => {
    try {
        // Read the directory and filter for JSON files
        const files = await fs.readdir(inputDirectoryPath);
        const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

        if (jsonFiles.length === 0) {
            console.log(`No JSON files found in directory ${inputDirectoryPath}`);
            return;
        }

        const eligiblePopulation = [];
        const ineligiblePopulation = [];
        const result = {};

        // Helper function to increment the count for a specific key in the result object
        const incrementCount = (key) => {
            if (result[key]) {
                result[key] += 1;
            } else {
                result[key] = 1;
            }
        };

         // Process each JSON file
        for (const file of jsonFiles) {
            const filePath = path.join(inputDirectoryPath, file);
            const data = await fs.readFile(filePath, 'utf8');

            // Check Population/Denominator eligibility
            const denominatorDeterminer = new DenominatorDeterminer(data);
            const denominatorCheckOutcome = denominatorDeterminer.checkDenominator();

            if (denominatorCheckOutcome.eligibility) {
                // If eligible, add to the eligible population list
                eligiblePopulation.push(denominatorCheckOutcome.patientData);

                // Determine the numerator and increment the corresponding count
                const numeratorDeterminer = new NumeratorDeterminer(denominatorCheckOutcome.patientData);
                incrementCount(numeratorDeterminer.checkNumerator());
            } else {
                // If not eligible, add to the ineligible population list
                ineligiblePopulation.push(denominatorCheckOutcome.patientData);
            }
        }
    } catch (err) {
        console.error(`Error processing files in directory ${inputDirectoryPath}:`, err);
    }
};

// Define the input directory path and start the processing
const inputDirectoryPath = './src/utility/data/output_json';
depressionScreeiningProcess(inputDirectoryPath).then(() => {
    console.log('Processing complete.');
});

module.exports = depressionScreeiningProcess;