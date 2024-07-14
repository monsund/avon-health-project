const { JSDOM } = require('jsdom');
const extractQDMdetails = require('../utility/helpers/extractQDMdetails');

class HtmlToJsonConverter {
    /**
   * Creates an instance of HtmlToJsonConverter.
   * @param {string} htmlContent - The HTML content to be converted to JSON.
   */
  constructor(htmlContent) {
    this.htmlContent = htmlContent;
    this.doc = this.parseHtml(htmlContent);
  }

  /**
   * Parses the HTML content into a DOM document.
   * @param {string} htmlContent - The HTML content to parse.
   * @returns {Document} - The parsed HTML document.
   */
  parseHtml(htmlContent) {
    const dom = new JSDOM(htmlContent);
    return dom.window.document;
  }

  /**
   * Extracts patient details from the HTML document.
   * @returns {Object} - The extracted patient details.
   */
  extractPatientDetails() {
    const patientDetails = {};

    // Extracting patient name
    let patientNameElement = this.doc.querySelector('.div-head-row:nth-child(1) > div:nth-child(2)');
    if (patientNameElement) {
      patientDetails.name = patientNameElement.textContent.trim();
    }

    // Extracting patient sex
    let patientSexElement = this.doc.querySelector('.div-head-row:nth-child(1) > div:nth-child(4)');
    if (patientSexElement) {
      patientDetails.sex = patientSexElement.textContent.trim();
    }

    // Extracting date of birth
    let dobElement = this.doc.querySelector('.div-head-row:nth-child(2) > div:nth-child(2)');
    if (dobElement) {
      patientDetails.dateOfBirth = dobElement.textContent.trim();
    }

    // Extracting date of expiration
    let doeElement = this.doc.querySelector('.div-head-row:nth-child(2) > div:nth-child(4)');
    if (doeElement) {
      patientDetails.dateOfExpiration = doeElement.textContent.trim();
    }

    // Extracting race
    let raceElement = this.doc.querySelector('.div-head-row:nth-child(3) > div:nth-child(2)');
    if (raceElement) {
      patientDetails.race = raceElement.textContent.trim();
    }

    // Extracting ethnicity
    let ethnicityElement = this.doc.querySelector('.div-head-row:nth-child(3) > div:nth-child(4)');
    if (ethnicityElement) {
      patientDetails.race = ethnicityElement.textContent.trim();
    }

    // Extracting ethnicity
    let insuranceProviderElement = this.doc.querySelector('.div-head-row:nth-child(4) > div:nth-child(2)');
    if (insuranceProviderElement) {
      patientDetails.insuranceProvider = insuranceProviderElement.textContent.trim();
    }

    // Extracting patient id
    let patientIdElement = this.doc.querySelector('.div-head-row:nth-child(4) > div:nth-child(4)');
    if (patientIdElement) {
      patientDetails.id = patientIdElement.textContent.trim();
    }

    // Extracting address
    let addressElement = this.doc.querySelector('.div-head-row:nth-child(5) > div:nth-child(2)');
    if (addressElement) {
      patientDetails.address = addressElement.textContent.trim();
    }

    // Extracting contact
    let contactElement = this.doc.querySelector('.div-head-row:nth-child(5) > div:nth-child(4)');
    if (contactElement) {
      patientDetails.contact = contactElement.textContent.trim();
    }

    return patientDetails;
  }

  /**
   * Extracts diagnoses from the HTML document.
   * @returns {Array<Object>} - The extracted diagnoses.
   */
  extractDiagnoses() {
    const panels = this.doc.querySelectorAll('.panel-default');

    let diagnosesPanel = null;
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('Diagnosis')) {
            diagnosesPanel = panels[i];
            break;
        }
    }

    if (!diagnosesPanel) {
        console.error('Diagnosis panel not found');
        return [];
    }

    const rows = diagnosesPanel.querySelectorAll('.div-table-body .div-table-row.narr_tr')

    return extractQDMdetails(rows);
  }

  /**
   * Extracts encounters from the HTML document.
   * @returns {Array<Object>} - The extracted encounters.
   */
  extractEncounters() {
    const panels = this.doc.querySelectorAll('.panel-default');

    let encountersPanel = null;
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('Encounter')) {
            encountersPanel = panels[i];
            break;
        }
    }

    if (!encountersPanel) {
        console.error('Encounter panel not found');
        return [];
    }

    const rows = encountersPanel.querySelectorAll('.div-table-body .div-table-row.narr_tr');
    
    return extractQDMdetails(rows);
  }

  /**
   * Extracts Screening from the HTML document.
   * @returns {Array<Object>} - The extracted Screening.
   */
  extractScreening() {
    const panels = this.doc.querySelectorAll('.panel-default');

    let screeningPanel = null;
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('AssessmentPerformed')) {
          screeningPanel = panels[i];
            break;
        }
    }

    if (!screeningPanel) {
        console.error('Screening panel not found');
        return [];
    }

    const rows = screeningPanel.querySelectorAll('.div-table-body .div-table-row.narr_tr');
    
    return extractQDMdetails(rows);
  }

  /**
   * Extracts Medication from the HTML document.
   * @returns {Array<Object>} - The extracted Screening.
   */
  extractMedication() {
    const panels = this.doc.querySelectorAll('.panel-default');

    let medicationPanel = null;
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('Medication')) {
          medicationPanel = panels[i];
            break;
        }
    }

    if (!medicationPanel) {
        console.error('Medication panel not found');
        return [];
    }

    const rows = medicationPanel.querySelectorAll('.div-table-body .div-table-row.narr_tr');
    
    return extractQDMdetails(rows);
  }
  /**
   * Extracts Intervention from the HTML document.
   * @returns {Array<Object>} - The extracted Intervention.
   */
  extractIntervention() {
    const panels = this.doc.querySelectorAll('.panel-default');

    let interventionPanel = null;
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('Medication')) {
          interventionPanel = panels[i];
            break;
        }
    }

    if (!interventionPanel) {
        console.error('Intervention panel not found');
        return [];
    }

    const rows = interventionPanel.querySelectorAll('.div-table-body .div-table-row.narr_tr');
    
    return extractQDMdetails(rows);
  }

  /**
   * Extracts PatientCharacteristicExpired from the HTML document.
   * @returns {Array<Object>} - The extracted PatientCharacteristicExpired.
   */
  extractPatientCharacteristicExpired() {
    const panels = this.doc.querySelectorAll('.panel-default');

    let charExpiredPanel = null;
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('PatientCharacteristicExpired')) {
          charExpiredPanel = panels[i];
            break;
        }
    }

    if (!charExpiredPanel) {
      console.error('Characteristics Expired panel not found');
      return [];
    }
    const rows = charExpiredPanel.querySelectorAll('.div-table-body .div-table-row.narr_tr');
    
    return extractQDMdetails(rows);
  }

  /**
   * Extracts PatientCharacteristicPayer from the HTML document.
   * @returns {Array<Object>} - The extracted PatientCharacteristicPayer.
   */
  extractPatientCharacteristicPayer() {
    const panels = this.doc.querySelectorAll('.panel-default');

    let charPayerPanel = null;
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('PatientCharacteristicPayer')) {
          charPayerPanel = panels[i];
            break;
        }
    }

    if (!charPayerPanel) {
      console.error('Characteristics Payer panel not found');
      return [];
    }
    const rows = charPayerPanel.querySelectorAll('.div-table-body .div-table-row.narr_tr');
    
    return extractQDMdetails(rows);
  }


  /**
   * Extracts PatientCharacteristicSex from the HTML document.
   * @returns {Array<Object>} - The extracted PatientCharacteristicSex.
   */
  extractPatientCharacteristicSex() {
    const panels = this.doc.querySelectorAll('.panel-default');

    let charSexPanel = null;
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('PatientCharacteristicBirthdate')) {
          charSexPanel = panels[i];
            break;
        }
    }

    if (!charSexPanel) {
      console.error('Characteristics Sex panel not found');
      return [];
    }
    const rows = charSexPanel.querySelectorAll('.div-table-body .div-table-row.narr_tr');
    
    return extractQDMdetails(rows);
  }

  /**
   * Extracts PatientCharacteristicBirthdate from the HTML document.
   * @returns {Array<Object>} - The extracted PatientCharacteristicBirthdate.
   */
  extractPatientCharacteristicBirthdate() {
    const panels = this.doc.querySelectorAll('.panel-default');

    let charBirthDatePanel = null;
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('PatientCharacteristicBirthdate')) {
          charBirthDatePanel = panels[i];
            break;
        }
    }

    if (!charBirthDatePanel) {
      console.error('Characteristics Expired panel not found');
      return [];
    }
    const rows = charBirthDatePanel.querySelectorAll('.div-table-body .div-table-row.narr_tr');
    
    return extractQDMdetails(rows);
  }

  /**
   * Extracts PatientCharacteristicRace from the HTML document.
   * @returns {Array<Object>} - The extracted PatientCharacteristicRace.
   */
  extractPatientCharacteristicRace() {
    const panels = this.doc.querySelectorAll('.panel-default');

    let charRacePanel = null;
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('PatientCharacteristicRace')) {
          charRacePanel = panels[i];
            break;
        }
    }

    if (!charRacePanel) {
      console.error('Characteristics Race panel not found');
      return [];
    }
    const rows = charRacePanel.querySelectorAll('.div-table-body .div-table-row.narr_tr');
    
    return extractQDMdetails(rows);
  }

  /**
   * Extracts PatientCharacteristicEthnicity from the HTML document.
   * @returns {Array<Object>} - The extracted PatientCharacteristicEthnicity.
   */
  extractPatientCharacteristicEthnicity() {
    const panels = this.doc.querySelectorAll('.panel-default');

    let charEthnicityPanel = null;
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('PatientCharacteristicEthnicity')) {
          charEthnicityPanel = panels[i];
            break;
        }
    }

    if (!charEthnicityPanel) {
      console.error('Characteristics Ethnicity panel not found');
      return [];
    }
    const rows = charEthnicityPanel.querySelectorAll('.div-table-body .div-table-row.narr_tr');
    
    return extractQDMdetails(rows);
  }

  /**
   * Converts the entire HTML content to JSON.
   * @returns {Object} - The JSON representation of the HTML content.
   */
  convertToJson() {
    const patientDetails = this.extractPatientDetails();
    const diagnoses = this.extractDiagnoses();
    const encounters = this.extractEncounters();
    const screening = this.extractScreening();
    const medication = this.extractMedication();
    const intervention = this.extractIntervention();
    const characteristicExpired = this.extractPatientCharacteristicExpired();
    const characteristicPayer = this.extractPatientCharacteristicPayer();
    const characteristicBirthDate = this.extractPatientCharacteristicBirthdate();
    const characteristicSex = this.extractPatientCharacteristicSex();
    const characteristicRace = this.extractPatientCharacteristicRace();
    const characteristicEthnicity = this.extractPatientCharacteristicEthnicity();

    return {
      patientDetails,
      diagnoses,
      encounters,
      screening,
      medication,
      intervention,
      characteristicExpired,
      characteristicPayer,
      characteristicBirthDate,
      characteristicSex,
      characteristicRace,
      characteristicEthnicity
    };
  }
}

module.exports = HtmlToJsonConverter;
