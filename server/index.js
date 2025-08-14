/**
 * Socket.io server for RevealJS Multiplex
 * Based on https://github.com/reveal/multiplex
 */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false
  }
});

// Parse command line arguments
const args = process.argv.slice(2);
let port = process.env.PORT || 8080;

// Check for -p flag
const portIndex = args.indexOf('-p');
if (portIndex !== -1 && portIndex + 1 < args.length) {
  const customPort = parseInt(args[portIndex + 1], 10);
  if (!isNaN(customPort)) {
    port = customPort;
  }
}

// Client tracking
let connectedClients = 0;
let masterConnected = false;
let currentSlideState = null;

// Serve a simple status page
app.get('/', (req, res) => {
  res.send(`
    <h1>RevealJS Multiplex Server</h1>
    <p>Status: Running</p>
    <p>Connected clients: ${connectedClients}</p>
    <p>Master connected: ${masterConnected ? 'Yes' : 'No'}</p>
  `);
});

// Socket.io connection handling
io.on('connection', socket => {
  connectedClients++;

  // Log connection
  console.log(`Client connected (${connectedClients} total)`);

  // Send current slide state to newly connected clients
  if (currentSlideState && masterConnected) {
    socket.emit('multiplex-statechanged', { state: currentSlideState });
    console.log('Sent current slide state to new client');
  }

  // Handle multiplex events
  socket.on('multiplex-statechanged', data => {
    // Check if this is coming from the master
    if (typeof data.secret !== 'undefined' && data.secret.length) {
      masterConnected = true;
      console.log('Master: State changed');

      // Store the current slide state
      currentSlideState = data.state;

      // Remove secret before broadcasting to clients
      const stateData = { ...data };
      delete stateData.secret;

      // Broadcast to all clients except sender
      socket.broadcast.emit('multiplex-statechanged', stateData);
    }
  });

  // Handle master connection status
  socket.on('multiplex-master', data => {
    if (typeof data.secret !== 'undefined' && data.secret.length) {
      masterConnected = true;
      console.log('Master connected');

      // Request current state from master if we don't have it
      if (!currentSlideState) {
        socket.emit('multiplex-request-state');
        console.log('Requested current state from master');
      }

      // Broadcast master status to all clients
      io.emit('multiplex-master-status', { connected: true });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    connectedClients--;
    console.log(`Client disconnected (${connectedClients} total)`);

    // If all clients disconnected, reset master status
    if (connectedClients === 0) {
      masterConnected = false;
    }

    // Broadcast master status to all clients
    io.emit('multiplex-master-status', { connected: masterConnected });
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Multiplex server running on port ${port}`);
});
