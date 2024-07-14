**Project Setup Instructions**
1. Adding HTML Patient Input Files <br>
Add HTML patient input files to the directory ./src/utility/data/html_files.

2. Parsing HTML Files to JSON <br>
Run the following command to parse HTML patient detail inputs to JSON format:

_npm run processHTMLFile_

This command will process the HTML files located in _./src/utility/data/html_files_ and generate patient details in JSON format in the directory _./src/utility/data/output_json_.

3. Running Depression Screening <br>
After converting HTML to JSON, you can screen the patient data for depression using the following command:

_npm run depressionScreening_

This command initiates the depression screening process based on the JSON-formatted patient data located in _./src/utility/data/output_json_.
This will also create an xml file depression_screening_results.xml in _./src/utility/data_ directory.


