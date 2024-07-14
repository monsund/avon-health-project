const moment = require("moment");

class DenominatorDeterminer {
    /**
     * Creates an instance of DenominatorDeterminer.
     * @param {string} patientData - The patient data in JSON format.
     */
    constructor(patientData) {
        this.patientData = JSON.parse(patientData);
    }

    /**
     * Checks if the patient meets the age criteria.
     * @returns {boolean} - Returns true if the patient's age is less than 12 years, otherwise false.
     */
    checkAgeCriteria() {
        const dateOfBirth = moment(this.patientData.dateOfBirth);
        const encounterDate = moment(this.patientData.encounters[0].time.relevantPeriodStart);
        const dateDiff = dateOfBirth.diff(encounterDate);
        
        // Convert milliseconds to other units
        const duration = moment.duration(dateDiff);
        const years = duration.years();
        const months = duration.months();
        const days = Math.floor(duration.asDays()) % 365;
        if (years < 12 || (years > 12 && months < 1 && days < 1)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks if the patient meets the CPT/HCPCS code criteria.
     * @returns {boolean} - Returns true if the patient's encounters include a valid CPT/HCPCS code, otherwise false.
     */
    checkCptHcpscCriteria() {
        let result = false;
        const encounters = this.patientData.encounters;
        const CPT = [];
        encounters.forEach(encounter => {
            const cptHcpsCode = encounter.codes?.CPT?.split('-')[0].trim();
            cptHcpsCode && CPT.push(cptHcpsCode);
        });
        
        for(let i=0; i<CPT.length; i++) {
            if (cptHCPCS.includes(CPT[i])) {
                result = true;
                break;
            }
        }

        return result;
    }
    
    /**
     * Checks if the patient meets the denominator criteria.
     * @returns {Object} - Returns an object with the eligibility status and patient data.
     */
    checkDenominator() {
        if (this.checkAgeCriteria() && this.checkCptHcpscCriteria()) {
            return { eligibility: true, patientData: this.patientData };
        } else {
            // console.log('not eligible denominator', this.patientData);
            return {eligibility: false, patientData: this.patientData};
        }
    }
}

/**
 * Array of valid CPT/HCPCS codes.
 * @type {string[]}
 */
const cptHCPCS = [ 
    '59400', '59510', '59610', '59618', '90791','90792', '90832', '90834', '90837', '92622', '92625', 
    '96105', '96110', '96112', '96116', '96125', '96136', '96138', '96156', '96158', '97161',
    '97162', '97163', '97164', '97165', '97166', '97167', '97802', '97803', '98966', '98967', '98968', '99078',
    '99202', '99203', '99204', '99205', '99212','99213', '99214', '99215', '99304', '99305', '99306', '99307', 
    '99308', '99309', '99310', '99315', '99316', '99341', '99342', '99344', '99345', '99347', '99348', '99349', 
    '99350', '99401', '99402', '99403', '99424', '99441', '99442', '99443', '99483', '99484', '99491',
    '99492', '99493', '99384', '99385', '99386', '99387', '99394', '99395', 
    '99396', '99397', 'G0101', 'G0270', 'G0271', 'G0402', 'G0438', 'G0439', 'G0444'
]

module.exports = DenominatorDeterminer;