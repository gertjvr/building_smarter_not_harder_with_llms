/**
 * Test script for RevealJS Multiplex
 * This script tests the connection to the multiplex server
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file if it exists
let config = {
  server: 'http://localhost:1948',
  id: 'default-id',
  secret: 'default-secret'
};

try {
  const envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  const envLines = envFile.split('\n');

  for (const line of envLines) {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key === 'MULTIPLEX_SERVER_URL') config.server = value;
      if (key === 'MULTIPLEX_ID') config.id = value;
      if (key === 'MULTIPLEX_SECRET') config.secret = value;
    }
  }
} catch (err) {
  console.log('No .env file found, using default configuration');
}

// Extract the hostname and port from the server URL
const serverUrl = new URL(config.server);
const hostname = serverUrl.hostname;
const port = serverUrl.port || 80;

console.log('Testing multiplex server connection...');
console.log('Server:', config.server);
console.log('ID:', config.id);
console.log('Secret:', config.secret);

// Test the connection to the server
const req = http.request({
  hostname: hostname,
  port: port,
  path: '/',
  method: 'GET'
}, (res) => {
  console.log('Status:', res.statusCode);

  if (res.statusCode === 200) {
    console.log('✅ Server is running');
    console.log('\nTo start the master presentation:');
    console.log(`  pnpm dev:master`);
    console.log('\nTo start a client presentation:');
    console.log(`  pnpm dev:client`);
  } else {
    console.log('❌ Server returned an error');
    console.log('\nMake sure the server is running:');
    console.log('  docker-compose up -d');
  }
});

req.on('error', (err) => {
  console.log('❌ Error connecting to server:', err.message);
  console.log('\nMake sure the server is running:');
  console.log('  docker-compose up -d');
});

req.end();
