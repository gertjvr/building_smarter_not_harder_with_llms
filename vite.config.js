import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';
import { getSlides } from './slides-loader.js';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/building_smarter_not_harder_with_llms/' : './',
  publicDir: 'public',
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          get slides() {
            return getSlides();
          }
        }
      },
      minify: false
    }),
    {
      name: 'watch-slides',
      apply: 'serve',
      configureServer(server) {
        const slidesPath = path.resolve(process.cwd(), 'slides');
        server.watcher.add(slidesPath);
        server.watcher.on('change', (file) => {
          if (file.startsWith(slidesPath)) {
            console.log(`[HMR] Slide changed: ${file}`);
            server.ws.send({ type: 'full-reload', path: '*' });
          }
        });
      }
    }
  ],
  server: {
    hmr: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(process.cwd(), 'index.html')
      }
    }
  }
});
