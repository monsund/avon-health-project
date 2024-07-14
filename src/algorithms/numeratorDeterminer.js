const SCREENING_RESULTS = {
    POSITIVE: 'positive',
    NEGATIVE: 'negative',
    INCOMPLETE_MEDICAL_REASON: 'incompleteMedicalReason',
    NOT_DOCUMENTED: 'notDocumented',
    DATA_COMPLETENESS_NOT_MET: 'dataCompletenessNotMet'
}

class NumeratorDeterminer {
    /**
     * Creates an instance of NumeratorDeterminer.
     * @param {Object} patientData - The patient data.
     */
    constructor(patientData) {
        this.patient = patientData;
    }
    
    /**
     * Checks if the patient has been diagnosed with bipolar disorder.
     * @returns {boolean} - Returns true if the patient has a bipolar disorder diagnosis, otherwise false.
     */
    checkBipolarDisorder() {
        const diagnoses = this.patient.diagnoses;
        const isBipolarDiagnosed = diagnoses.length && diagnoses.some(record => record.description.toLowerCase().includes('bipolar'));
        return isBipolarDiagnosed;
    }

    /**
     * Checks the patient's screening results.
     * @returns {string} - Returns the screening result.
     */
    checkScreening() {
        let screeningResult;
        const screening = this.patient.screening;
        if (screening.length) {
            const screeningResultFound = screening[0].result.result?.toLowerCase();
            const screeningNegationReason = screening[0].result.negationReason?.toLowerCase();
            const screeningNotDocumented = Object.keys(screening[0].result).length === 0;
            if (screeningResultFound) {
                if (screeningResultFound.includes('depression screening positive')) {
                    screeningResult = SCREENING_RESULTS.POSITIVE;
                } else screeningResult = SCREENING_RESULTS.NEGATIVE;
            } else if (screeningNegationReason) {
                screeningResult = SCREENING_RESULTS.INCOMPLETE_MEDICAL_REASON;
            } else if (screeningNotDocumented) {
                screeningResult = SCREENING_RESULTS.NOT_DOCUMENTED;
            }
        } else {
            screeningResult = SCREENING_RESULTS.DATA_COMPLETENESS_NOT_MET;
        }
        return screeningResult;
    }

    /**
     * Checks if the screening result is positive and a follow-up plan is in place.
     * @returns {boolean} - Returns true if the screening result is positive and a follow-up plan is in place, otherwise false.
     */
    checkScreenPositiveAndFollowUpPlan() {
        const screeningOutcome = this.checkScreening();
        const isMedicationPrescribed = this.patient.medication.length;
        const isInterventionPerformed = this.patient.intervention;
        if (screeningOutcome === SCREENING_RESULTS.POSITIVE && isMedicationPrescribed && isInterventionPerformed) {
            return true;
        } else return false;
    };
    
    /**
     * Checks if the screening result is negative and no follow-up plan is required.
     * @returns {boolean} - Returns true if the screening result is negative and no follow-up plan is required, otherwise false.
     */
    checkScreenNegativeAndNoFollowUpPlan() {
        const screeningOutcome = this.checkScreening();
        if (screeningOutcome === SCREENING_RESULTS.NEGATIVE) {
            return true;
        } else return false;
    };

    /**
     * Checks if the screening result is incomplete due to medical reasons.
     * @returns {boolean} - Returns true if the screening result is incomplete due to medical reasons, otherwise false.
     */
    checkScreenIncompleteMedicalReason() {
        const screeningOutcome = this.checkScreening();
        if (screeningOutcome === SCREENING_RESULTS.INCOMPLETE_MEDICAL_REASON) {
            return true;
        } else return false;
    };

    /**
     * Checks if the screening result is not documented.
     * @returns {boolean} - Returns true if the screening result is not documented, otherwise false.
     */
    checkScreenNotDocumented() {
        const screeningOutcome = this.checkScreening();
        if (screeningOutcome === SCREENING_RESULTS.NOT_DOCUMENTED) {
            return true;
        } else return false;
    };

    /**
     * Checks if the screening result is positive and no follow-up plan is in place.
     * @returns {boolean} - Returns true if the screening result is positive and no follow-up plan is in place, otherwise false.
     */
    checkScreenPositiveAndNoFollowUpPlan() {
        const screeningOutcome = this.checkScreening();
        const isMedicationPrescribed = this.patient.medication.length;
        const isInterventionPerformed = this.patient.intervention;
        if (screeningOutcome === SCREENING_RESULTS.POSITIVE && (isMedicationPrescribed || isInterventionPerformed)) {
            return true;
        } else return false;
    }

    /**
     * Determines the numerator based on the patient's data.
     * @returns {string} - Returns the numerator code based on the patient's data.
     */
    checkNumerator() {
        if (this.checkBipolarDisorder()) {
            return 'bipolar-G9717';
        } else if (this.checkScreenPositiveAndFollowUpPlan()) {
            return 'screenPositiveFollowUpPlan-G8431';
        } else if (this.checkScreenNegativeAndNoFollowUpPlan()) {
            return 'screenNegativeNoFollowUpPlan-G8510';
        } else if (this.checkScreenIncompleteMedicalReason()) {
            return 'screenIncompleteMedicalReason-G8433';
        } else if (this.checkScreenNotDocumented()) {
            return 'screenNotDocumented-G8432';
        } else if (this.checkScreenPositiveAndNoFollowUpPlan()) {
            return 'screenPositiveNoFollowUpPlan-G8511';
        } else {
            return 'dataCompletenessNotMet';
        }
    }
}

module.exports = NumeratorDeterminer;
