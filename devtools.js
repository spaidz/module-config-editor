let youClickedOn; 
chrome.devtools.panels.create("MC Editor", "icon.png", "panel.html", panel => {
    panel.onShown.addListener(extPanelWindow => {
        chrome.devtools.inspectedWindow.eval('JSON.stringify(sessionStorage)', (result, exception) => {
            if (exception) {
                console.error('Error retrieving session storage:', exception);
                return;
            }

            const sessionStorageData = JSON.parse(result);
            const blModuleConfigs = sessionStorageData['blModuleConfigs'];

            if (blModuleConfigs) {
                const parsedConfigs = JSON.parse(blModuleConfigs);
                populateTableWithData(parsedConfigs);
            }
        });
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Messages from content scripts should have sender.tab set
    if (sender.tab && request.click == true) {
        console.log('I am here!');
        if (youClickedOn) {
            youClickedOn.innerHTML = `You clicked on position (${request.xPosition}, ${request.yPosition}) in the inspected page.`;
        }
        sendResponse({
            xPosition: request.xPosition,
            yPosition: request.yPosition
        });
    }
});

// Create a connection to the background service worker
const backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});

// Relay the tab ID to the background service worker
backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});