// content.js

// Function to send message to background script to take screenshot
function takeScreenshot() {
    chrome.scripting.executeScript({
      target: { tabId: chrome.tabs.getCurrent().id },
      func: () => {
        return document.documentElement.outerHTML;
      }
    }, (results) => {
      const htmlContent = results[0].result;
      
      // Sending HTML content to background script
      chrome.runtime.sendMessage({ command: 'takeScreenshot', htmlContent: htmlContent }, (response) => {
        if (response && response.screenshotUrl) {
          console.log('Screenshot URL:', response.screenshotUrl);
        } else if (response && response.error) {
          console.error('Error:', response.error);
        } else {
          console.error('Error: Unexpected response from background script.');
        }
      });
    });
  }
  
  // Event listener for starting voice recognition
  document.addEventListener('DOMContentLoaded', () => {
    let recognition;
    
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
  
    if (startButton && stopButton) {
      startButton.addEventListener('click', () => {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
      
        recognition.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              const transcript = event.results[i][0].transcript.trim().toLowerCase();
              if (transcript === 'bang bang') {
                takeScreenshot(); // Call function to take screenshot
              }
            }
          }
        };
      
        recognition.start();
        console.log('Voice recognition started.');
      });
  
      stopButton.addEventListener('click', () => {
        if (recognition) {
          recognition.stop();
          console.log('Voice recognition stopped.');
        }
      });
    } else {
      console.error('Start or Stop button not found in the DOM.');
    }
  });
  