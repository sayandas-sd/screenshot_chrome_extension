

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "takeScreenshot") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        //console.error("Error: " + chrome.runtime.lastError.message);
        sendResponse({ error: chrome.runtime.lastError.message });
      } else if (dataUrl) {
        console.log("Screenshot captured:", dataUrl);
        sendResponse({ screenshotUrl: dataUrl });
      } else {
        console.error("Error: Unable to capture screenshot.");
        sendResponse({ error: "Unable to capture screenshot." });
      }
    });
    return true; // Required to use sendResponse asynchronously
  }
});

