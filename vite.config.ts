import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
const url = 'http://localhost:5001'
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    open: true     ,  // 自动打开浏览器（可选）
    port: 1881,
    proxy: {
      '/api': {
        target: url,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
    hmr: true,
    watch: {
      usePolling: true, // 轮询监听文件变化
      interval: 1000, // 监听的间隔时间（ms）
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer],
    },
  },
  build: {
    chunkSizeWarningLimit: 150000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'antd-vendor': ['antd'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },
    reportCompressedSize: false,
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
});