Project Setup Instructions
1. Adding HTML Patient Input Files
Add HTML patient input files to the directory ./src/utility/data/html_files.

2. Parsing HTML Files to JSON
Run the following command to parse HTML patient detail inputs to JSON format:

npm run processHTMLFile

This command will process the HTML files located in ./src/utility/data/html_files and generate patient details in JSON format in the directory ./src/utility/data/output_json.

3. Running Depression Screening
After converting HTML to JSON, you can screen the patient data for depression using the following command:

npm run depressionScreening

This command initiates the depression screening process based on the JSON-formatted patient data located in ./src/utility/data/output_json.
This will also create an xml file depression_screening_results.xml in ./src/utility/data directory


