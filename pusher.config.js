// Pusher configuration for reveal.js multiplex
// You'll need to create a Pusher account and get these credentials
export const pusherConfig = {
  // Get these from your Pusher dashboard
  key: import.meta.env.VITE_PUSHER_APP_KEY || '09903e0e42c793c992c2',
  cluster: import.meta.env.VITE_PUSHER_CLUSTER || 'ap4', // e.g., 'us2', 'eu', 'ap1'
  
  // For security, you might want to use environment variables
  // Create a .env file with your actual Pusher credentials:
  // VITE_PUSHER_APP_KEY=your-actual-key
  // VITE_PUSHER_CLUSTER=your-cluster
  
  // Channel and events configuration
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
