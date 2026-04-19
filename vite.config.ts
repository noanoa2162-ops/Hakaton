import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/analyze': {
        target: 'https://3fy7gs-8080.csb.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/analyze/, '/analyze'),
      },
      '/candidates': {
        target: 'https://candicheck-last-agent.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/candidates/, '/candidates'),
      },
    },
  },
})
