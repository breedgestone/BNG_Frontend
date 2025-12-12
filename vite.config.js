import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'nav-icons': [
            './src/assets/svg/nav-icons/DashboardIcon.vue',
            './src/assets/svg/nav-icons/UsersIcon.vue',
            './src/assets/svg/nav-icons/WorkoutsIcon.vue',
            './src/assets/svg/nav-icons/SubscriptionsIcon.vue',
            './src/assets/svg/nav-icons/SignInScansIcon.vue',
            './src/assets/svg/nav-icons/ScheduleIcon.vue',
            './src/assets/svg/nav-icons/ChallengesIcon.vue',
            './src/assets/svg/nav-icons/PromotionIcon.vue',
            './src/assets/svg/nav-icons/PayoutIcon.vue',
            './src/assets/svg/nav-icons/LeadershipBoardIcon.vue',
            './src/assets/svg/nav-icons/CustomerReviewsIcon.vue',
            './src/assets/svg/nav-icons/AdminsIcon.vue',
            './src/assets/svg/nav-icons/ProfileIcon.vue'
          ]
        }
      }
    },
    // Increase chunk size warning limit for SVG-heavy chunks
    chunkSizeWarningLimit: 600,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia']
  }
})
