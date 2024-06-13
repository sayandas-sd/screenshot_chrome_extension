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
                chrome.runtime.sendMessage({ command: 'takeScreenshot' }, (response) => {
                  console.log('Screenshot URL:', response.screenshotUrl);
                });
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
  