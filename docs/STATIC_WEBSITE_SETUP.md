# Static Website Pusher Setup (No Server Required)

## Quick Fix for Cross-Device Communication

Since you're deploying as a static website (GitHub Pages, Netlify, etc.), here's the **exact** steps to make Pusher work across devices using **presence channels**:

### Step 1: Create/Configure Your Pusher App

1. **Go to [pusher.com](https://pusher.com/)** and log into your account
2. **Select your app** (or create a new free one)
3. **No special settings needed!** ✅ Presence channels work out of the box

⚠️ **Note:** We're now using presence channels instead of public channels because public channels don't support client events on the free tier.

### Step 2: Get Your Pusher Credentials

1. In your Pusher dashboard, go to **"App Keys"**
2. Copy your **App Key** and **Cluster**
3. Create a `.env` file in your project root:

```bash
VITE_PUSHER_APP_KEY=your-actual-app-key-here
VITE_PUSHER_CLUSTER=your-cluster-here
```

### Step 3: Test Locally

```bash
# Terminal 1 - Master (presenter)
pnpm dev:master

# Terminal 2 - Client (audience) 
pnpm dev:client
```

Open both URLs and test if slide changes sync between windows.

### Step 4: Test Cross-Device (Same Network)

1. **Find your local IP address:**
   ```bash
   # Windows
   ipconfig
   
   # Look for IPv4 Address, e.g., 192.168.1.100
   ```

2. **Access from different devices:**
   - **Master:** `http://192.168.1.100:5173/?master=true`
   - **Client:** `http://192.168.1.100:5173/`

### Step 5: Deploy and Test

1. **Deploy to your static hosting** (GitHub Pages, Netlify, Vercel)
2. **Set environment variables** in your hosting platform:
   - `VITE_PUSHER_APP_KEY=your-key`
   - `VITE_PUSHER_CLUSTER=your-cluster`
3. **Test with deployed URLs:**
   - **Master:** `https://yoursite.com/?master=true`
   - **Client:** `https://yoursite.com/`

## Troubleshooting

### ❌ "Events only work on same device"

**Fix:** This should now work with presence channels! If still having issues, check console for errors.

### ❌ "Pusher connection failed"

**Fix:** Check your App Key and Cluster are correct in `.env`

### ❌ "Client events not supported"  

**Fix:** Should not happen with presence channels - they support client events by default

### ❌ "Mixed content error in production"

**Fix:** Ensure your site is served over HTTPS (most static hosts do this automatically)

## How It Works

```
┌─────────────────┐    Pusher Cloud     ┌─────────────────┐
│   Master Device │ ───────────────────▶ │  Client Device  │
│  (Presenter)    │  Presence Channel   │   (Audience)    │
│                 │   Client Events     │                 │
└─────────────────┘                     └─────────────────┘
```

- **No server needed** ✅
- **Presence channels** ✅ (support client events out of the box)
- **Works across any network** ✅  
- **Real-time synchronization** ✅
- **Free Pusher tier compatible** ✅

## GitHub Pages Deployment

Your GitHub Actions workflow is already configured correctly. Just make sure to:

1. **Add repository secrets:**
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Add `VITE_PUSHER_APP_KEY` 
   - Add `VITE_PUSHER_CLUSTER`

2. **Update the workflow** (already done in your deploy.yml)

## Status Indicators

- 🟢 **Green dot:** Connected and working
- 🟡 **Yellow dot:** Connected but no events 
- 🔴 **Red dot:** Connection failed

Press **'M'** key to toggle status visibility.

## Free Tier Limits

Pusher free tier includes:
- ✅ 100 concurrent connections
- ✅ 200,000 messages/day  
- ✅ Client events on public channels
- ✅ Perfect for presentations!

---

**Bottom Line:** Enable client events in your Pusher dashboard and it will work across any devices, anywhere! 🚀
