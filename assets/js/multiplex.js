/**
 * RevealJS Multiplex Plugin
 * Handles socket-based presentation synchronization between master and client presentations
 */
import io from 'socket.io-client';

const multiplexConfig = {
  server: import.meta.env.VITE_MULTIPLEX_SERVER_URL,
  id: import.meta.env.VITE_MULTIPLEX_ID,
  secret: import.meta.env.VITE_MULTIPLEX_SECRET
};

function createConnectionStatus() {
  // Create the connection status element
  const statusElement = document.createElement('div');
  statusElement.className = 'multiplex-status';
  statusElement.innerHTML = `
    <div class="status-indicator">
      <span class="status-icon">●</span>
      <span class="status-text">Disconnected</span>
    </div>
  `;

  // Add element to the document
  document.body.appendChild(statusElement);

  // Initial state
  let isVisible = false;
  let isConnected = false;
  let isMaster = false;

  // Toggle visibility function
  function toggleVisibility() {
    isVisible = !isVisible;
    statusElement.classList.toggle('visible', isVisible);
  }

  // Update connection status
  function updateStatus(connected, master = false) {
    isConnected = connected;
    isMaster = master;

    statusElement.classList.toggle('connected', connected);
    statusElement.classList.toggle('disconnected', !connected);
    statusElement.classList.toggle('presenter', master);
    statusElement.classList.toggle('audience', !master);

    const statusText = statusElement.querySelector('.status-text');
    statusText.textContent = connected ? 'Connected' : 'Disconnected';
  }

  // Register keyboard shortcut
  document.addEventListener('keydown', event => {
    if (event.key === 'c') {
      toggleVisibility();
    }
  });

  // Show initially
  toggleVisibility();

  // Return the API
  return {
    show: () => {
      isVisible = true;
      statusElement.classList.add('visible');
    },
    hide: () => {
      isVisible = false;
      statusElement.classList.remove('visible');
    },
    toggle: toggleVisibility,
    updateStatus: updateStatus
  };
}

const Plugin = () => {
  let deck;
  let socket;
  let connectionStatus;
  let isMaster = false;
  let masterEventListenersSetup = false;

  return {
    id: 'multiplex',

    init: (reveal) => {
      deck = reveal;

      // Parse URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      isMaster = urlParams.get('master') === 'true';
      const secret = urlParams.get('secret') || '';

      // Create connection status indicator
      connectionStatus = createConnectionStatus();

      // Initialize socket connection if multiplex is enabled
      if (multiplexConfig.server && multiplexConfig.id) {
        initializeSocket();
      }
    }
  };

  function initializeSocket() {
    socket = io(multiplexConfig.server);

    // Handle connection events
    socket.on('connect', () => {
      console.log('Connected to multiplex server');
      connectionStatus.updateStatus(true, isMaster);

      // Identify as master if applicable
      if (isMaster && multiplexConfig.secret) {
        socket.emit('multiplex-master', {
          secret: multiplexConfig.secret
        });
      }
    });

    // Handle server request for current state (master only)
    socket.on('multiplex-request-state', () => {
      if (isMaster) {
        const state = deck.getState();
        socket.emit('multiplex-statechanged', {
          state: state,
          secret: multiplexConfig.secret
        });
        console.log('Sent current state to server upon request');
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from multiplex server');
      connectionStatus.updateStatus(false, isMaster);
    });

    // Handle master status updates
    socket.on('multiplex-master-status', (data) => {
      console.log('Master status:', data.connected ? 'Connected' : 'Disconnected');
      // Only update if we're not the master
      if (!isMaster) {
        connectionStatus.updateStatus(data.connected, false);
      }
    });

    // Listen for slide changes from the server (client mode)
    socket.on('multiplex-statechanged', function(data) {
      // Ignore if we're the master
      if (isMaster) return;

      // Apply the state changes
      deck.setState(data.state);
    });

    // Set up master event listeners
    if (isMaster) {
      setupMasterEventListeners();
    }
  }

  function setupMasterEventListeners() {
    // Prevent duplicate event listener registration
    if (masterEventListenersSetup) {
      return;
    }

    masterEventListenersSetup = true;

    // Send state changes to the server when we're the master
    deck.on('slidechanged', function() {
      const state = deck.getState();
      socket.emit('multiplex-statechanged', {
        state: state,
        secret: multiplexConfig.secret
      });
    });

    deck.on('fragmentshown', function() {
      const state = deck.getState();
      socket.emit('multiplex-statechanged', {
        state: state,
        secret: multiplexConfig.secret
      });
    });

    deck.on('fragmenthidden', function() {
      const state = deck.getState();
      socket.emit('multiplex-statechanged', {
        state: state,
        secret: multiplexConfig.secret
      });
    });
  }
};

export default Plugin;
