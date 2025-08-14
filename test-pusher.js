#!/usr/bin/env node

/**
 * Pusher Connection Test Script
 * Tests basic Pusher connectivity and client event support
 */

import Pusher from 'pusher-js';

// Use the same config as the main app
const config = {
  key: process.env.VITE_PUSHER_APP_KEY || '09903e0e42c793c992c2',
  cluster: process.env.VITE_PUSHER_CLUSTER || 'ap4',
  channel: 'reveal-slides'
};

console.log('🧪 Testing Pusher Connection...');
console.log(`📡 Key: ${config.key}`);
console.log(`🌍 Cluster: ${config.cluster}`);
console.log(`📺 Channel: ${config.channel}`);
console.log('');

// Enable logging
Pusher.logToConsole = true;

const pusher = new Pusher(config.key, {
  cluster: config.cluster,
  forceTLS: true,
  enabledTransports: ['ws', 'wss'],
  enabledChannelEvents: true
});

const channel = pusher.subscribe(config.channel);

// Connection events
pusher.connection.bind('connected', () => {
  console.log('✅ Connected to Pusher successfully!');
  console.log(`🔗 Socket ID: ${pusher.connection.socket_id}`);
  
  // Test client event after a short delay
  setTimeout(() => {
    console.log('🚀 Attempting to send test client event...');
    try {
      channel.trigger('client-test-event', {
        message: 'Hello from test script!',
        timestamp: new Date().toISOString()
      });
      console.log('✅ Client event sent successfully!');
    } catch (error) {
      console.log('❌ Client event failed:', error.message);
      console.log('💡 This usually means client events are not enabled in your Pusher dashboard.');
    }
  }, 2000);
});

pusher.connection.bind('disconnected', () => {
  console.log('⚠️  Disconnected from Pusher');
});

pusher.connection.bind('error', (error) => {
  console.log('❌ Pusher connection error:', error);
});

pusher.connection.bind('unavailable', () => {
  console.log('❌ Pusher connection unavailable');
});

pusher.connection.bind('failed', () => {
  console.log('❌ Pusher connection failed');
});

// Channel events
channel.bind('pusher:subscription_succeeded', (data) => {
  console.log('✅ Successfully subscribed to channel');
  console.log('📊 Channel data:', data);
});

channel.bind('pusher:subscription_error', (error) => {
  console.log('❌ Channel subscription error:', error);
});

// Listen for test events
channel.bind('client-test-event', (data) => {
  console.log('📨 Received test event:', data);
});

// Cleanup after 10 seconds
setTimeout(() => {
  console.log('');
  console.log('🏁 Test completed. Disconnecting...');
  pusher.disconnect();
  process.exit(0);
}, 10000);

console.log('⏳ Testing for 10 seconds...');
console.log('');
