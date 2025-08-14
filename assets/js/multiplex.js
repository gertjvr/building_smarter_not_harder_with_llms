import Pusher from 'pusher-js';
import { pusherConfig, multiplexConfig } from '../../pusher.config.js';

/**
 * Custom Reveal.js Multiplex plugin using Pusher
 * Allows real-time synchronization of presentations across multiple devices
 */
const RevealMultiplex = () => {
  let pusher = null;
  let channel = null;
  let deck = null;
  let isConnected = false;

  const log = (message, data = null) => {
    console.log(`[Multiplex] ${message}`, data || '');
  };

  const initPusher = () => {
    try {
      log(`Initializing Pusher with key: ${pusherConfig.key}, cluster: ${pusherConfig.cluster}`);
      
      // Enable Pusher logging for debugging
      Pusher.logToConsole = import.meta.env.MODE === 'development';
      
      pusher = new Pusher(pusherConfig.key, {
        cluster: pusherConfig.cluster,
        forceTLS: true,
        // Remove authEndpoint since we're using public channels
        // authEndpoint: '/pusher/auth', 
      });

      log(`Subscribing to channel: ${pusherConfig.channel}`);
      channel = pusher.subscribe(pusherConfig.channel);
      
      pusher.connection.bind('connected', () => {
        isConnected = true;
        log('Connected to Pusher');
        showConnectionStatus('connected');
      });

      pusher.connection.bind('disconnected', () => {
        isConnected = false;
        log('Disconnected from Pusher');
        showConnectionStatus('disconnected');
      });

      pusher.connection.bind('error', (error) => {
        log('Pusher connection error:', error);
        showConnectionStatus('error');
      });

      // Add more detailed error handling
      pusher.connection.bind('unavailable', () => {
        log('Pusher connection unavailable');
        showConnectionStatus('error');
      });

      pusher.connection.bind('failed', () => {
        log('Pusher connection failed');
        showConnectionStatus('error');
      });

    } catch (error) {
      log('Failed to initialize Pusher:', error);
    }
  };

  const showConnectionStatus = (status) => {
    // Remove existing status indicators
    const existing = document.querySelector('.multiplex-status');
    if (existing) existing.remove();

    // Create status indicator
    const statusEl = document.createElement('div');
    statusEl.className = 'multiplex-status';
    statusEl.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-family: monospace;
      z-index: 1000;
      color: white;
      ${status === 'connected' ? 'background: #4CAF50;' : ''}
      ${status === 'disconnected' ? 'background: #FF9800;' : ''}
      ${status === 'error' ? 'background: #F44336;' : ''}
    `;
    
    const icons = {
      connected: '🟢',
      disconnected: '🟡',
      error: '🔴'
    };
    
    statusEl.textContent = `${icons[status]} ${multiplexConfig.isMaster ? 'Master' : 'Client'}`;
    document.body.appendChild(statusEl);

    // Auto-hide after 3 seconds if connected
    if (status === 'connected') {
      setTimeout(() => {
        if (statusEl.parentNode) {
          statusEl.style.opacity = '0.3';
        }
      }, 3000);
    }
  };

  const setupMasterEvents = () => {
    if (!multiplexConfig.isMaster) return;

    log('Setting up master events');

    // Listen for slide changes
    deck.addEventListener('slidechanged', (event) => {
      if (!isConnected) return;
      
      const slideData = {
        indexh: event.indexh,
        indexv: event.indexv,
        timestamp: Date.now()
      };
      
      channel.trigger(pusherConfig.events.slide, slideData);
      log('Slide changed broadcast:', slideData);
    });

    // Listen for fragment changes
    deck.addEventListener('fragmentshown', (event) => {
      if (!isConnected) return;
      
      const fragmentData = {
        fragment: event.fragment.dataset.fragmentIndex || 0,
        indexh: deck.getIndices().h,
        indexv: deck.getIndices().v,
        type: 'shown',
        timestamp: Date.now()
      };
      
      channel.trigger(pusherConfig.events.fragment, fragmentData);
      log('Fragment shown broadcast:', fragmentData);
    });

    deck.addEventListener('fragmenthidden', (event) => {
      if (!isConnected) return;
      
      const fragmentData = {
        fragment: event.fragment.dataset.fragmentIndex || 0,
        indexh: deck.getIndices().h,
        indexv: deck.getIndices().v,
        type: 'hidden',
        timestamp: Date.now()
      };
      
      channel.trigger(pusherConfig.events.fragment, fragmentData);
      log('Fragment hidden broadcast:', fragmentData);
    });
  };

  const setupClientEvents = () => {
    if (multiplexConfig.isMaster) return;

    log('Setting up client events');

    // Listen for slide changes from master
    channel.bind(pusherConfig.events.slide, (data) => {
      log('Received slide change:', data);
      deck.slide(data.indexh, data.indexv);
    });

    // Listen for fragment changes from master
    channel.bind(pusherConfig.events.fragment, (data) => {
      log('Received fragment change:', data);
      
      // First navigate to the correct slide
      deck.slide(data.indexh, data.indexv);
      
      // Then handle fragment visibility
      setTimeout(() => {
        const currentSlide = deck.getCurrentSlide();
        const fragments = currentSlide.querySelectorAll('.fragment');
        
        if (data.type === 'shown') {
          // Show fragments up to the specified index
          fragments.forEach((fragment, index) => {
            if (index <= data.fragment) {
              fragment.classList.add('visible');
              fragment.classList.remove('current-fragment');
            }
          });
        } else if (data.type === 'hidden') {
          // Hide fragments after the specified index
          fragments.forEach((fragment, index) => {
            if (index > data.fragment) {
              fragment.classList.remove('visible', 'current-fragment');
            }
          });
        }
      }, 100);
    });
  };

  const addKeyboardShortcuts = () => {
    if (!multiplexConfig.isMaster) return;

    document.addEventListener('keydown', (event) => {
      // Press 'M' to toggle multiplex status display
      if (event.key === 'm' || event.key === 'M') {
        const statusEl = document.querySelector('.multiplex-status');
        if (statusEl) {
          statusEl.style.opacity = statusEl.style.opacity === '0.3' ? '1' : '0.3';
        }
      }
    });
  };

  return {
    id: 'multiplex',
    
    init: (reveal) => {
      deck = reveal;
      
      log(`Initializing multiplex plugin as ${multiplexConfig.isMaster ? 'MASTER' : 'CLIENT'}`);
      
      // Initialize Pusher connection
      initPusher();
      
      // Setup event handlers based on role
      if (multiplexConfig.isMaster) {
        setupMasterEvents();
      } else {
        setupClientEvents();
      }
      
      // Add keyboard shortcuts
      addKeyboardShortcuts();
      
      // Show initial status
      showConnectionStatus('connecting');
    },

    destroy: () => {
      if (pusher) {
        pusher.disconnect();
        pusher = null;
        channel = null;
      }
      
      // Remove status indicator
      const statusEl = document.querySelector('.multiplex-status');
      if (statusEl) statusEl.remove();
      
      log('Multiplex plugin destroyed');
    }
  };
};

export default RevealMultiplex;
