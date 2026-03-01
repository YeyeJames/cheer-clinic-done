import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
      // 確保與您的新倉庫名稱完全一致
      base: '/cheer-clinic-done/', 
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // 確保 @ 指向 src 資料夾
          '@': path.resolve(__dirname, './src'),
        }
      },
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        // 移除錯誤的 hash 屬性，Vite 預設就會在 build 時處理快取問題
        sourcemap: false,
        chunkSizeWarningLimit: 1500
      }
    };
});
