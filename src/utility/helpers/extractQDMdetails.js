const extractQDMdetails = (rows) => {
    const output = [];

    rows.forEach(row => {
        let qdmDetails = {};
        qdmDetails.description = row.querySelector('.description-heading').textContent;

        // Extracts codes data
        const codesPanel = row.querySelectorAll('.div-table-cell')[1];
        const codesRows = codesPanel ? codesPanel.querySelectorAll('.div-head-row') : [];
        const codesData = {};
        codesRows.forEach(row => {
            const codeText = row.querySelector('.div-table-head--no-border')?.textContent || '';
            const [codeType, ...codeDescription] = codeText.split(':');
            if (codeType && codeDescription.length > 0) {
                codesData[codeType.trim()] = codeDescription.join(':').trim();
            }
        });
        qdmDetails.codes = codesData;

        // Extracts time
        const timeElementsPanel = row.querySelectorAll('.div-table-cell')[2];
        const timeElementsRows = timeElementsPanel ? timeElementsPanel.querySelectorAll('.div-head-row') : [];
        const timeElementsData = {};
        timeElementsRows.forEach(row => {
            const timeText = row.querySelector('.div-table-head--no-border')?.textContent || '';
            const [timeType, ...timeValueParts] = timeText.split(': ');
            if (timeType && timeValueParts.length > 0) {
                const key = timeType.trim();
                const dynamicKey = key.charAt(0).toLowerCase() + key.slice(1).replace(/\s+/g, '');
                timeElementsData[dynamicKey] = timeValueParts.join(': ').trim();
            }
        });
        qdmDetails.time = timeElementsData;

        // Extracts results
        const resultPanel = row.querySelectorAll('.div-table-cell')[3];
        const resultRows = resultPanel ? resultPanel.querySelectorAll('.div-head-row') : [];
        const resultData = {};
        resultRows.forEach(row => {
            const resultText = row.querySelector('.div-table-head--no-border')?.textContent || '';
            const [resultType, ...resultValueParts] = resultText.split(': ');
            if (resultType && resultValueParts.length > 0) {
                const key = resultType.trim();
                const dynamicKey = key.charAt(0).toLowerCase() + key.slice(1).replace(/\s+/g, '');
                resultData[dynamicKey] = resultValueParts.join(': ').trim();
            }
        });
        qdmDetails.result = resultData;

        output.push(qdmDetails);
    });

    return output;
}

module.exports = extractQDMdetails;
