// Pusher configuration for reveal.js multiplex (Static Website Compatible)
// You'll need to create a Pusher account and get these credentials
export const pusherConfig = {
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  
  // Channel and events configuration
  // Using PUBLIC channel - no authentication required for static websites
  // Note: We'll use localStorage + BroadcastChannel for cross-device sync
  channel: 'reveal-slides',
  events: {
    slide: 'slide-changed',
    fragment: 'fragment-changed',
    notes: 'notes-updated'
  }
};

// Master presentation configuration
export const multiplexConfig = {
  // Set to true for the master/presenter view
  // Set to false for client/audience view
  isMaster: window.location.search.includes('master=true'),
  
  // Optional: Secret for master authentication
  // Only the master should have this secret
  secret: import.meta.env.VITE_MULTIPLEX_SECRET || (window.location.search.includes('secret=') ? new URLSearchParams(window.location.search).get('secret') : null)
};
