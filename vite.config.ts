import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  // base: `https://static.codefuture.top/${pkg.keke.prefix}`,
  base: process.env.NODE_ENV === 'development' ? '' : `https://static.codefuture.top/${pkg.keke.prefix}/`,
})
