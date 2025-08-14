# Pusher Cross-Device Setup Guide

## Problem
The current multiplex implementation works for same-device cross-tab communication but not for true cross-device presentation control. This is because it's using localStorage and BroadcastChannel APIs which are limited to the same browser/device.

## Root Cause
For cross-device communication with Pusher, you need either:
1. **Client Events** on public channels (requires enabling in Pusher dashboard)
2. **Private/Presence channels** with authentication
3. **Server-side event triggering** via webhooks

## Solutions

### Option 1: Enable Client Events (Recommended for Development)

1. **Log into your Pusher Dashboard**
   - Go to https://pusher.com/
   - Navigate to your app

2. **Enable Client Events**
   - Go to App Settings → App Keys
   - Scroll down to "Client Event Settings"
   - Check "Enable client events" checkbox
   - Save the settings

3. **Update your environment variables**
   ```bash
   # Create .env file with your actual Pusher credentials
   VITE_PUSHER_APP_KEY=your-actual-app-key
   VITE_PUSHER_CLUSTER=your-cluster-region
   VITE_MULTIPLEX_SECRET=your-secure-secret
   ```

### Option 2: Use Presence Channels (Better for Production)

1. **Update channel configuration**
   ```javascript
   // In pusher.config.js
   channel: 'presence-reveal-slides'
   ```

2. **Add authentication endpoint**
   - You'll need a server endpoint to authenticate channel subscriptions
   - Example using Express.js:
   ```javascript
   app.post('/pusher/auth', (req, res) => {
     const socketId = req.body.socket_id;
     const channel = req.body.channel_name;
     const presenceData = {
       user_id: 'unique-user-id',
       user_info: { name: 'Presenter' }
     };
     const auth = pusher.authenticate(socketId, channel, presenceData);
     res.send(auth);
   });
   ```

### Option 3: Server-Side Event Triggering

1. **Create webhook endpoint**
   ```javascript
   app.post('/trigger-slide-change', (req, res) => {
     pusher.trigger('reveal-slides', 'slide-changed', req.body);
     res.send('Event triggered');
   });
   ```

2. **Modify client to POST to webhook**
   ```javascript
   // Instead of client events, POST to your server
   fetch('/trigger-slide-change', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(slideData)
   });
   ```

## Testing Cross-Device Functionality

1. **Same Network Test**
   - Open master on one device: `http://your-ip:5173/?master=true`
   - Open client on another: `http://your-ip:5173/`

2. **Different Network Test**
   - Deploy to GitHub Pages or similar
   - Test with deployed URLs

3. **Debugging Tools**
   - Check browser developer console for Pusher connection logs
   - Use Pusher Debug Console in dashboard to monitor events
   - Press 'M' key to toggle connection status indicator

## Common Issues & Solutions

### Issue: "Client events not supported"
**Solution**: Enable client events in Pusher dashboard or use presence channels

### Issue: Connection established but events not received
**Solution**: 
- Check that both devices are subscribed to the same channel
- Verify event names match exactly
- Ensure both devices have internet connectivity

### Issue: CORS errors
**Solution**: 
- Ensure HTTPS in production
- Configure proper CORS headers if using custom auth endpoint

### Issue: Events only work same-device
**Solution**: This indicates client events are not enabled - follow Option 1 above

## Current Implementation Status

The multiplex.js has been updated to:
- ✅ Try Pusher client events first
- ✅ Fallback to localStorage/BroadcastChannel for same-device
- ✅ Better error handling and logging
- ✅ Connection status indicators
- ✅ Support for both public and presence channels

## Next Steps

1. **Enable client events in Pusher dashboard** (quickest solution)
2. **Create .env file** with your actual Pusher credentials
3. **Test on different devices** on same network first
4. **Deploy and test** on different networks
5. **Consider upgrading to presence channels** for production use

## Environment Variables Template

Create a `.env` file in the project root:

```bash
# Pusher Configuration
VITE_PUSHER_APP_KEY=your-pusher-app-key-here
VITE_PUSHER_CLUSTER=your-cluster-here
VITE_MULTIPLEX_SECRET=your-secure-secret-here
NODE_ENV=development
```
