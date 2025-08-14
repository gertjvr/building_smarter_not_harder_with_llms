# Reveal.js Multiplex Setup Guide

This presentation now includes real-time multiplex functionality using Pusher as the WebSocket provider, allowing you to broadcast your presentation to multiple devices in real-time.

## Features

- **Real-time Synchronization**: Slides, fragments, and navigation are synchronized across all connected devices
- **Master/Client Architecture**: One master controls the presentation, clients follow along
- **Speaker Notes**: Enhanced speaker notes with timer, current/next slide preview, and progress tracking
- **Connection Status**: Visual indicators showing connection status
- **Keyboard Shortcuts**: Easy access to multiplex and speaker notes features

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Create Pusher Account

1. Go to [Pusher.com](https://pusher.com/) and create a free account
2. Create a new app in your Pusher dashboard
3. Note down your App Key and Cluster information

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your Pusher credentials:
   ```env
   PUSHER_APP_KEY=your-actual-pusher-app-key
   PUSHER_CLUSTER=your-cluster (e.g., us2, eu, ap1)
   MULTIPLEX_SECRET=your-secure-random-secret
   ```

### 4. Update Pusher Configuration

Edit `pusher.config.js` if you need to customize:
- Channel names
- Event names  
- Additional security settings

## Usage

### Running the Presentation

1. **Start the development server:**
   ```bash
   pnpm dev
   ```

2. **Master/Presenter View:**
   - Open: `http://localhost:5173/?master=true`
   - This is the controlling presentation
   - All navigation will be broadcast to clients

3. **Client/Audience View:**
   - Open: `http://localhost:5173/`
   - These presentations will follow the master
   - Navigation is synchronized automatically

### Speaker Notes

- **Open Speaker Notes:** Press `S` or click the 📝 button
- **Features:**
  - Current and next slide preview
  - Speaker notes for each slide
  - Presentation timer
  - Progress bar
  - Connection status

### Keyboard Shortcuts

- `S` - Open speaker notes window
- `M` - Toggle multiplex status indicator (master only)
- `ESC` - Exit fullscreen
- `F` - Enter fullscreen

## Troubleshooting

### Connection Issues

1. **Check Environment Variables**: Ensure your `.env` file has correct Pusher credentials
2. **Verify Pusher App**: Make sure your Pusher app is active in the dashboard
3. **Check Console**: Open browser dev tools to see connection logs
4. **Firewall/Network**: Ensure WebSocket connections aren't blocked

### Common Problems

- **"Pusher connection error"**: Check your app key and cluster settings
- **Notes window not updating**: Ensure popups are allowed in your browser
- **Slides not syncing**: Verify both master and client are connected (check status indicator)

## Connection Status Indicators

- 🟢 **Connected**: Successfully connected to Pusher
- 🟡 **Disconnected**: Connection lost, attempting to reconnect
- 🔴 **Error**: Connection failed, check configuration

## Security Considerations

- **Environment Variables**: Never commit `.env` files to version control
- **Master Secret**: Use a strong, unique secret for master authentication
- **Public Presentations**: Be aware that anyone with the URL can join as a client
- **Pusher Limits**: Free Pusher accounts have connection and message limits

## Production Deployment

For production use:

1. **Environment Variables**: Set environment variables in your hosting platform
2. **HTTPS**: Ensure your site is served over HTTPS for WebSocket security
3. **Domain Restrictions**: Configure Pusher to only allow your domain
4. **Rate Limiting**: Implement rate limiting if needed

## Advanced Configuration

### Custom Styling

The multiplex status indicators and speaker notes can be styled by modifying the CSS in:
- `assets/js/multiplex.js` (status indicators)
- `assets/js/speaker-notes.js` (notes interface)

### Additional Events

You can extend the multiplex plugin to broadcast additional events by modifying the `pusherConfig.events` object in `pusher.config.js`.

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your Pusher configuration
3. Test with a simple setup first
4. Consult the [Reveal.js documentation](https://revealjs.com/)
5. Check [Pusher documentation](https://pusher.com/docs) for connection issues

## License

This multiplex implementation is provided under the same license as the main presentation.
