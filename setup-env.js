#!/usr/bin/env node

/**
 * Setup script for Pusher environment variables
 * Helps configure the .env file for cross-device presentation sync
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  console.log('🚀 Pusher Environment Setup for Static Website\n');
  
  console.log('This script will help you configure Pusher for cross-device presentation sync.');
  console.log('You\'ll need a free Pusher account from https://pusher.com/\n');

  // Check if .env already exists
  if (existsSync('.env')) {
    console.log('⚠️  .env file already exists');
    const overwrite = await ask('Do you want to overwrite it? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('❌ Setup cancelled');
      rl.close();
      return;
    }
  }

  console.log('\n📋 First, make sure you have:');
  console.log('1. Created a free account at https://pusher.com/');
  console.log('2. Created a new app in your Pusher dashboard');
  console.log('3. Enabled "Client Events" in App Settings → Enable client events ✅');
  console.log('4. Copied your App Key and Cluster from the "App Keys" tab\n');

  const proceed = await ask('Ready to continue? (Y/n): ');
  if (proceed.toLowerCase() === 'n' || proceed.toLowerCase() === 'no') {
    console.log('❌ Setup cancelled');
    rl.close();
    return;
  }

  // Get Pusher credentials
  console.log('\n🔑 Enter your Pusher credentials:');
  
  const appKey = await ask('App Key: ');
  if (!appKey.trim()) {
    console.log('❌ App Key is required');
    rl.close();
    return;
  }

  const cluster = await ask('Cluster (e.g., us2, eu, ap1): ');
  if (!cluster.trim()) {
    console.log('❌ Cluster is required');
    rl.close();
    return;
  }

  // Optional secret
  const useSecret = await ask('Do you want to set a multiplex secret? (y/N): ');
  let secret = '';
  if (useSecret.toLowerCase() === 'y' || useSecret.toLowerCase() === 'yes') {
    secret = await ask('Multiplex secret (or press Enter to generate): ');
    if (!secret.trim()) {
      secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      console.log(`Generated secret: ${secret}`);
    }
  }

  // Create .env content
  const envContent = `# Pusher Configuration for Static Website
# Get these values from your Pusher dashboard: https://pusher.com/

# Your Pusher app key (public) - VITE_ prefix is required for client-side access
VITE_PUSHER_APP_KEY=${appKey}

# Your Pusher cluster (e.g., us2, eu, ap1, ap2, ap3, ap4)
VITE_PUSHER_CLUSTER=${cluster}

${secret ? `# Optional: Secret for master authentication
VITE_MULTIPLEX_SECRET=${secret}

` : ''}# Environment
NODE_ENV=development

# IMPORTANT: For cross-device sync to work, you MUST enable "Client Events" 
# in your Pusher dashboard:
# 1. Go to pusher.com → Your App → App Settings
# 2. Check "Enable client events" ✅
# 3. Save settings
`;

  try {
    writeFileSync('.env', envContent);
    console.log('\n✅ .env file created successfully!');
    
    console.log('\n🧪 Next steps:');
    console.log('1. Test locally: pnpm dev:master (in one terminal) and pnpm dev:client (in another)');
    console.log('2. Test cross-device: Use your local IP address (check with ipconfig/ifconfig)');
    console.log('3. For debugging: Open test-pusher.html in your browser');
    console.log('4. Deploy: Add these environment variables to your hosting platform (GitHub, Netlify, etc.)');
    
    console.log('\n🔧 Environment variables to add to your hosting platform:');
    console.log(`VITE_PUSHER_APP_KEY=${appKey}`);
    console.log(`VITE_PUSHER_CLUSTER=${cluster}`);
    if (secret) {
      console.log(`VITE_MULTIPLEX_SECRET=${secret}`);
    }

    console.log('\n⚠️  REMEMBER: Enable "Client Events" in your Pusher dashboard for cross-device sync!');
    
  } catch (error) {
    console.log(`❌ Failed to create .env file: ${error.message}`);
  }

  rl.close();
}

main().catch(console.error);
