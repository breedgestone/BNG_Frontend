<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="text-center">
      <!-- 404 Number -->
      <h1 class="text-9xl font-bold text-primary mb-4">404</h1>
      
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
        Page Not Found
      </h2>
      
      <p class="text-gray-600 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track with your fitness journey!
      </p>
      
      <!-- Helpful Links -->
      <div class="mb-8">
        <p class="text-sm text-gray-500 mb-4">You might be looking for:</p>
        <div class="flex flex-wrap gap-2 justify-center">
          <router-link 
            to="/"
            class="px-4 py-2 text-sm text-primary hover:underline"
          >
            Home
          </router-link>
          <router-link 
            to="/about"
            class="px-4 py-2 text-sm text-primary hover:underline"
          >
            About Us
          </router-link>
          <router-link 
            to="/contact"
            class="px-4 py-2 text-sm text-primary hover:underline"
          >
            Contact
          </router-link>
          <router-link 
            to="/login"
            class="px-4 py-2 text-sm text-primary hover:underline"
          >
            Login
          </router-link>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link 
          to="/"
          class="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Go Home
        </router-link>
        
        <button 
          @click="goBack"
          class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useSEO } from '@/composables/useSEO'

const router = useRouter()

// SEO Optimization for 404 page
useSEO({
  title: '404 - Page Not Found | BNG Fitness Hub',
  description: 'The page you are looking for cannot be found. Return to BNG Fitness Hub homepage to continue your fitness journey.',
  keywords: '404, page not found, BNG fitness',
})

const goBack = () => {
  router.go(-1)
}
</script>
