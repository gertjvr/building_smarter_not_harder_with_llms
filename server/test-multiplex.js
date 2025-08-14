/**
 * Test script to verify multiplex functionality
 * Tests that new clients receive current slide state when connecting
 */

import { spawn } from 'child_process';
import { createServer } from 'http';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Start the multiplex server
console.log('Starting multiplex server...');
const serverProcess = spawn('node', ['index.js', '-p', '8081'], {
  cwd: __dirname,
  stdio: 'inherit'
});

// Start a simple HTTP server for the presentation
const app = express();
app.use(express.static(__dirname));

const httpServer = createServer(app);

// Find an available port starting from 3002
let testPort = 3002;
const startServer = () => {
  httpServer.listen(testPort, () => {
    console.log(`Presentation server running on http://localhost:${testPort}`);
    console.log('\nTo test the multiplex synchronization:');
    console.log(`1. Open http://localhost:${testPort}?master=true&secret=test (Master)`);
    console.log('2. Navigate to a few slides on the master');
    console.log(`3. Open http://localhost:${testPort} in another tab/window (Client)`);
    console.log('4. The client should automatically jump to the current slide');
    console.log('\nPress Ctrl+C to stop both servers');
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${testPort} is busy, trying ${testPort + 1}...`);
      testPort++;
      startServer();
    } else {
      throw err;
    }
  });
};

startServer();

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  serverProcess.kill();
  httpServer.close();
  process.exit(0);
});

// Keep the process alive
setTimeout(() => {}, 1000000);
