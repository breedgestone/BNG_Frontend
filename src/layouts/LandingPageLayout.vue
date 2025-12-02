<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="mt-auto" style="border-top: 1.33px solid #C0C0C0;">
      <div class="container mx-auto px-4 py-6 md:py-8">
        <div class="text-center space-y-3 md:space-y-4">
          <!-- Copyright and Links -->
          <div class="space-y-2 md:space-y-2">
            <p class="text-sm md:text-base text-gray-900 font-medium">
              © 2025 BNG Fitness Hub  All rights reserved.
            </p>
            <div class="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-sm md:text-base text-gray-900 font-medium">
              <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" class="hover:text-primary transition-colors">Terms & Conditions</a>
            </div>
          </div>

          <!-- Social Media -->
          <div class="flex items-center justify-center gap-2 md:gap-3">
            <span class="text-sm md:text-base text-gray-900">Follow us:</span>
            <a href="#" class="inline-block" aria-label="Instagram">
                <img src="@/assets/svg/instagram.svg" alt="bng instagram" class="w-7 h-7 md:w-8 md:h-8"/>
            </a>
            <a href="#" class="inline-block" aria-label="Facebook">
                           <img src="@/assets/svg/facebook.svg" alt="bng facebook" class="w-7 h-7 md:w-8 md:h-8"/>

            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
</style>
