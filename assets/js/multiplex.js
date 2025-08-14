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
  let statusVisible = true; // Track if status should be visible

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
        enabledTransports: ['ws', 'wss']
        // No authentication needed for public channels
      });

      log(`Subscribing to public channel: ${pusherConfig.channel}`);
      channel = pusher.subscribe(pusherConfig.channel);
      
      // Handle successful subscription
      channel.bind('pusher:subscription_succeeded', () => {
        log('Successfully subscribed to public channel');
        showConnectionStatus('connected');
      });

      // Handle subscription errors
      channel.bind('pusher:subscription_error', (error) => {
        log('Channel subscription error:', error);
        showConnectionStatus('error');
      });

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
    // Don't show status if visibility is disabled
    if (!statusVisible) return;
    
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
    
    statusEl.textContent = `${icons[status]} ${multiplexConfig.isMaster ? 'Presenter' : 'Audience'}`;
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

  // Simple broadcast for static websites - uses localStorage + BroadcastChannel
  const broadcastEvent = (eventType, data) => {
    const broadcastData = {
      type: eventType,
      data: data,
      timestamp: Date.now(),
      masterId: multiplexConfig.isMaster ? 'master' : 'client',
      sessionId: getSessionId()
    };
    
    // Strategy 1: localStorage for same-device cross-tab communication
    localStorage.setItem('reveal-multiplex', JSON.stringify(broadcastData));
    
    // Strategy 2: BroadcastChannel API if available (same device)
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('reveal-multiplex');
      bc.postMessage(broadcastData);
    }
    
    log(`📡 Broadcasted ${eventType} (localStorage + BroadcastChannel):`, data);
  };

  // Generate unique session ID to prevent echo
  const getSessionId = () => {
    if (!window.multiplexSessionId) {
      window.multiplexSessionId = `session-${Math.random().toString(36).substr(2, 9)}`;
    }
    return window.multiplexSessionId;
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
      
      broadcastEvent(pusherConfig.events.slide, slideData);
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
      
      broadcastEvent(pusherConfig.events.fragment, fragmentData);
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
      
      broadcastEvent(pusherConfig.events.fragment, fragmentData);
      log('Fragment hidden broadcast:', fragmentData);
    });
  };

  const setupClientEvents = () => {
    if (multiplexConfig.isMaster) return;

    log('Setting up client events');

    // Listen for localStorage changes (same-device cross-tab communication)
    window.addEventListener('storage', (event) => {
      if (event.key === 'reveal-multiplex' && event.newValue) {
        try {
          const broadcastData = JSON.parse(event.newValue);
          if (broadcastData.masterId === 'master' && broadcastData.sessionId !== getSessionId()) {
            handleReceivedEvent(broadcastData.type, broadcastData.data);
          }
        } catch (error) {
          log('Error parsing localStorage event:', error);
        }
      }
    });

    // Listen for BroadcastChannel messages (same-device cross-tab)
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('reveal-multiplex');
      bc.addEventListener('message', (event) => {
        const broadcastData = event.data;
        if (broadcastData.masterId === 'master' && broadcastData.sessionId !== getSessionId()) {
          handleReceivedEvent(broadcastData.type, broadcastData.data);
        }
      });
    }

    log('💡 Cross-device sync: Not available with public channels');
    log('💡 Same-device sync: localStorage + BroadcastChannel enabled');
  };

  const handleReceivedEvent = (eventType, data) => {
    log(`Received ${eventType}:`, data);
    
    if (eventType === pusherConfig.events.slide) {
      deck.slide(data.indexh, data.indexv);
    } else if (eventType === pusherConfig.events.fragment) {
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
    }
  };

  const addKeyboardShortcuts = () => {
    document.addEventListener('keydown', (event) => {
      // Press 'M' or 'C' to toggle multiplex status display
      if (event.key === 'm' || event.key === 'M' || event.key === 'c' || event.key === 'C') {
        statusVisible = !statusVisible;
        
        if (statusVisible) {
          // Show current connection status
          const currentStatus = isConnected ? 'connected' : 'disconnected';
          showConnectionStatus(currentStatus);
        } else {
          // Hide status completely
          const statusEl = document.querySelector('.multiplex-status');
          if (statusEl) {
            statusEl.remove();
          }
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
