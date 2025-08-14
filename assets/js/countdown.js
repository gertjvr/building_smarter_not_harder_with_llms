// Custom Countdown Plugin for Reveal.js
const RevealCountdown = () => {
  let timers = new Map();
  
  return {
    id: 'countdown',
    init: (deck) => {
      // Initialize countdown timers when slide is shown
      deck.addEventListener('slidechanged', (event) => {
        // Clear previous timers
        timers.forEach(timer => clearInterval(timer));
        timers.clear();
        
        // Find countdown elements in current slide
        const countdownElements = event.currentSlide.querySelectorAll('.countdown[data-time]');
        
        countdownElements.forEach(element => {
          const totalTime = parseInt(element.dataset.time);
          let remainingTime = totalTime;
          
          const updateDisplay = () => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            element.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            element.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              background: rgba(0,0,0,0.8);
              color: white;
              padding: 10px 15px;
              border-radius: 5px;
              font-family: monospace;
              font-size: 18px;
              z-index: 1000;
            `;
          };
          
          // Initial display
          updateDisplay();
          
          // Start countdown
          const timer = setInterval(() => {
            remainingTime--;
            updateDisplay();
            
            // Change color when time is running low
            if (remainingTime <= 60) {
              element.style.background = 'rgba(255,0,0,0.8)';
            } else if (remainingTime <= 300) {
              element.style.background = 'rgba(255,165,0,0.8)';
            }
            
            if (remainingTime <= 0) {
              clearInterval(timer);
              element.textContent = '00:00';
              element.style.background = 'rgba(255,0,0,0.9)';
            }
          }, 1000);
          
          timers.set(element, timer);
        });
      });
    }
  };
};

export default RevealCountdown;
