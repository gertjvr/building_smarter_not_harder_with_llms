#!/usr/bin/env node

/**
 * Setup script for Reveal.js Multiplex
 * Helps configure Pusher credentials and validates setup
 */

import { readFile, writeFile, access } from 'fs/promises';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

async function checkEnvFile() {
  try {
    await access('.env');
    console.log('✅ .env file exists');
    return true;
  } catch {
    console.log('❌ .env file not found');
    return false;
  }
}

async function createEnvFile() {
  console.log('\n🔧 Setting up environment configuration...\n');
  
  const appKey = await question('Enter your Pusher App Key: ');
  const cluster = await question('Enter your Pusher Cluster (e.g., us2, eu): ');
  const secret = await question('Enter a secure secret for master auth (or press Enter for auto-generated): ');
  
  const finalSecret = secret || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  const envContent = `# Pusher Configuration
VITE_PUSHER_APP_KEY=${appKey}
VITE_PUSHER_CLUSTER=${cluster}
VITE_MULTIPLEX_SECRET=${finalSecret}
NODE_ENV=development
`;
  
  await writeFile('.env', envContent);
  console.log('\n✅ Created .env file with your configuration');
}

async function validateConfig() {
  try {
    const envContent = await readFile('.env', 'utf-8');
    const hasKey = envContent.includes('PUSHER_APP_KEY=') && !envContent.includes('your-pusher-app-key');
    const hasCluster = envContent.includes('PUSHER_CLUSTER=');
    
    if (hasKey && hasCluster) {
      console.log('✅ Configuration appears valid');
      return true;
    } else {
      console.log('❌ Configuration incomplete - please check your .env file');
      return false;
    }
  } catch (error) {
    console.log('❌ Error reading configuration:', error.message);
    return false;
  }
}

async function showUsageInstructions() {
  console.log('\n🚀 Setup Complete! Here\'s how to use the multiplex feature:\n');
  
  console.log('📋 Commands:');
  console.log('  pnpm dev:master  - Start as master/presenter (controls slides)');
  console.log('  pnpm dev:client  - Start as client/audience (follows master)');
  console.log('  pnpm dev:notes   - Start speaker notes view');
  console.log('  pnpm dev         - Start normal development server\n');
  
  console.log('🎯 URLs:');
  console.log('  Master:  http://localhost:5173/?master=true');
  console.log('  Client:  http://localhost:5173/');
  console.log('  Notes:   http://localhost:5173/?notes=true\n');
  
  console.log('⌨️  Keyboard Shortcuts:');
  console.log('  S        - Open speaker notes');
  console.log('  M        - Toggle multiplex status (master only)');
  console.log('  F        - Fullscreen');
  console.log('  ESC      - Exit fullscreen\n');
  
  console.log('🔍 Troubleshooting:');
  console.log('  - Check browser console for connection errors');
  console.log('  - Verify Pusher app is active in dashboard');
  console.log('  - Ensure WebSocket connections aren\'t blocked');
  console.log('  - Read MULTIPLEX_README.md for detailed guide\n');
}

async function main() {
  console.log('🎭 Reveal.js Multiplex Setup\n');
  
  const envExists = await checkEnvFile();
  
  if (!envExists) {
    const create = await question('Create .env file now? (y/n): ');
    if (create.toLowerCase() === 'y' || create.toLowerCase() === 'yes') {
      await createEnvFile();
    } else {
      console.log('\n⚠️  Please create a .env file manually using .env.example as template');
      rl.close();
      return;
    }
  }
  
  const isValid = await validateConfig();
  
  if (isValid) {
    await showUsageInstructions();
  } else {
    console.log('\n⚠️  Please check your .env file configuration');
  }
  
  rl.close();
}

main().catch(console.error);
