/**
 * Enhanced Speaker Notes plugin for Reveal.js
 * Extends the default notes plugin with multiplex integration
 */
const RevealSpeakerNotes = () => {
  let notesWindow = null;
  let deck = null;
  let isNotesOpen = false;

  const openNotes = () => {
    if (notesWindow && !notesWindow.closed) {
      notesWindow.focus();
      return;
    }

    // Calculate window size and position
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const notesWidth = Math.floor(screenWidth * 0.4);
    const notesHeight = Math.floor(screenHeight * 0.7);
    const notesLeft = screenWidth - notesWidth - 50;
    const notesTop = 50;

    const notesUrl = createNotesURL();
    
    notesWindow = window.open(
      notesUrl,
      'reveal-notes',
      `width=${notesWidth},height=${notesHeight},left=${notesLeft},top=${notesTop},` +
      'menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes'
    );

    if (notesWindow) {
      isNotesOpen = true;
      
      // Monitor the notes window
      const checkClosed = setInterval(() => {
        if (notesWindow.closed) {
          isNotesOpen = false;
          clearInterval(checkClosed);
        }
      }, 1000);

      // Send initial state after window loads
      notesWindow.addEventListener('load', () => {
        updateNotesWindow();
      });
    }
  };

  const createNotesURL = () => {
    const baseURL = window.location.href.split('?')[0];
    const params = new URLSearchParams();
    params.set('notes', 'true');
    
    // Pass master status to notes window
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('master')) {
      params.set('master', 'true');
    }
    
    return `${baseURL}?${params.toString()}`;
  };

  const updateNotesWindow = () => {
    if (!notesWindow || notesWindow.closed) return;

    const currentSlide = deck.getCurrentSlide();
    const indices = deck.getIndices();
    const nextSlide = deck.getSlide(indices.h, indices.v + 1) || 
                     deck.getSlide(indices.h + 1, 0);

    const data = {
      current: {
        slide: currentSlide ? currentSlide.innerHTML : '',
        notes: getSlideNotes(currentSlide),
        index: `${indices.h}.${indices.v}`,
        total: deck.getTotalSlides()
      },
      next: {
        slide: nextSlide ? nextSlide.innerHTML : '',
        notes: getSlideNotes(nextSlide)
      },
      progress: deck.getProgress(),
      timestamp: new Date().toLocaleTimeString()
    };

    // Send data to notes window
    try {
      notesWindow.postMessage(JSON.stringify({
        type: 'slide-update',
        data: data
      }), '*');
    } catch (error) {
      console.warn('Failed to update notes window:', error);
    }
  };

  const getSlideNotes = (slide) => {
    if (!slide) return '';
    
    const notesElement = slide.querySelector('aside.notes');
    return notesElement ? notesElement.innerHTML : '';
  };

  const createNotesInterface = () => {
    // Only create notes interface if we're in the notes window
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.get('notes')) return;

    // Hide the main presentation and show notes interface
    document.querySelector('.reveal').style.display = 'none';
    
    const notesContainer = document.createElement('div');
    notesContainer.id = 'speaker-notes-container';
    notesContainer.innerHTML = `
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 20px;
          background: #f5f5f5;
          color: #333;
        }
        
        #speaker-notes-container {
          max-width: 100%;
          margin: 0 auto;
        }
        
        .notes-header {
          background: white;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .slide-info {
          font-size: 14px;
          color: #666;
        }
        
        .timer {
          font-family: monospace;
          font-size: 18px;
          font-weight: bold;
          color: #2196F3;
        }
        
        .slides-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .slide-preview {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .slide-preview h3 {
          background: #2196F3;
          color: white;
          margin: 0;
          padding: 10px 15px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .slide-content {
          padding: 15px;
          max-height: 200px;
          overflow-y: auto;
          font-size: 12px;
          line-height: 1.4;
        }
        
        .slide-content * {
          max-width: 100%;
          font-size: inherit !important;
        }
        
        .slide-content img {
          max-width: 100px;
          height: auto;
        }
        
        .notes-section {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .notes-section h3 {
          background: #4CAF50;
          color: white;
          margin: 0;
          padding: 10px 15px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .notes-content {
          padding: 15px;
          min-height: 100px;
          line-height: 1.6;
        }
        
        .progress-bar {
          width: 100%;
          height: 4px;
          background: #e0e0e0;
          border-radius: 2px;
          overflow: hidden;
          margin: 10px 0;
        }
        
        .progress-fill {
          height: 100%;
          background: #2196F3;
          transition: width 0.3s ease;
        }
        
        .connection-status {
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .status-connected { background: #E8F5E8; color: #4CAF50; }
        .status-disconnected { background: #FFF3E0; color: #FF9800; }
        .status-error { background: #FFEBEE; color: #F44336; }
      </style>
      
      <div class="notes-header">
        <div class="slide-info">
          <span id="slide-number">Loading...</span>
          <div class="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
          </div>
        </div>
        <div class="timer" id="timer">00:00:00</div>
        <div class="connection-status" id="connection-status">Connecting...</div>
      </div>
      
      <div class="slides-container">
        <div class="slide-preview">
          <h3>Current Slide</h3>
          <div class="slide-content" id="current-slide">Loading...</div>
        </div>
        <div class="slide-preview">
          <h3>Next Slide</h3>
          <div class="slide-content" id="next-slide">Loading...</div>
        </div>
      </div>
      
      <div class="notes-section">
        <h3>Speaker Notes</h3>
        <div class="notes-content" id="speaker-notes">No notes for this slide.</div>
      </div>
    `;
    
    document.body.appendChild(notesContainer);
    
    // Start timer
    startTimer();
    
    // Listen for messages from parent window
    window.addEventListener('message', (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'slide-update') {
          updateNotesDisplay(message.data);
        }
      } catch (error) {
        // Ignore invalid messages
      }
    });
  };

  const updateNotesDisplay = (data) => {
    const slideNumber = document.getElementById('slide-number');
    const currentSlide = document.getElementById('current-slide');
    const nextSlide = document.getElementById('next-slide');
    const speakerNotes = document.getElementById('speaker-notes');
    const progressFill = document.getElementById('progress-fill');
    
    if (slideNumber) {
      slideNumber.textContent = `Slide ${data.current.index} of ${data.current.total}`;
    }
    
    if (currentSlide) {
      currentSlide.innerHTML = data.current.slide;
    }
    
    if (nextSlide) {
      nextSlide.innerHTML = data.next.slide || '<em>Last slide</em>';
    }
    
    if (speakerNotes) {
      speakerNotes.innerHTML = data.current.notes || '<em>No notes for this slide.</em>';
    }
    
    if (progressFill) {
      progressFill.style.width = `${data.progress * 100}%`;
    }
  };

  const startTimer = () => {
    const startTime = Date.now();
    const timerElement = document.getElementById('timer');
    
    setInterval(() => {
      const elapsed = Date.now() - startTime;
      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      
      if (timerElement) {
        timerElement.textContent = 
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }, 1000);
  };

  const addKeyboardShortcuts = () => {
    document.addEventListener('keydown', (event) => {
      // Press 'S' to open speaker notes
      if (event.key === 's' || event.key === 'S') {
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
          event.preventDefault();
          openNotes();
        }
      }
    });
  };

  return {
    id: 'speaker-notes',
    
    init: (reveal) => {
      deck = reveal;
      
      // Check if we're in the notes window
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('notes')) {
        createNotesInterface();
        return;
      }
      
      // Otherwise, set up the main presentation
      addKeyboardShortcuts();
      
      // Listen for slide changes to update notes window
      deck.addEventListener('slidechanged', updateNotesWindow);
      deck.addEventListener('fragmentshown', updateNotesWindow);
      deck.addEventListener('fragmenthidden', updateNotesWindow);
      
      // Add notes button to reveal.js controls (optional)
      setTimeout(() => {
        const controls = document.querySelector('.reveal .controls');
        if (controls) {
          const notesButton = document.createElement('button');
          notesButton.innerHTML = '📝';
          notesButton.title = 'Open Speaker Notes (S)';
          notesButton.style.cssText = `
            position: absolute;
            bottom: 20px;
            right: 80px;
            background: rgba(0,0,0,0.4);
            color: white;
            border: none;
            border-radius: 4px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-size: 14px;
          `;
          notesButton.addEventListener('click', openNotes);
          document.body.appendChild(notesButton);
        }
      }, 1000);
    }
  };
};

export default RevealSpeakerNotes;
