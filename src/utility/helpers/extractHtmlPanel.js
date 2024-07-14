const extractHtmlPanel = (panels, relevantPanel) => {
    for (let i = 0; i<panels.length; i++) {
        const title = panels[i].querySelector('div.panel-heading h3.panel-title')?.textContent;
        if (title?.includes('PatientCharacteristicExpired')) {
            relevantPanel = panels[i];
            break;
        }
    }
    return relevantPanel;
}

module.exports = extractHtmlPanel;