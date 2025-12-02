<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact us', path: '/contact' },
]

const isActive = (path) => {
  return route.path === path
}

const navigate = (path) => {
  router.push(path)
}
</script>

<template>
  <header class="bg-white sticky top-0 z-50">
    <nav class="container mx-auto sm:px-6 px-4 sm:py-6 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="sm:flex hidden items-center gap-2">
          <img 
            src="@/assets/svg/logo.svg" 
            alt="Breedgestone Logo" 
            class="h-9 w-auto"
          />
        </RouterLink>

        <!-- Segmented Navigation -->
        <div class="sm:w-fit w-full flex items-center sm:justify-center justify-between gap-0 bg-gray-900 rounded-full p-1">
          <button
            v-for="item in navItems"
            :key="item.path"
            @click="navigate(item.path)"
            :class="[
              'sm:px-8 px-4 sm:py-3 py-2 rounded-full transition-all duration-300 font-medium sm:text-base text-sm',
              'poppins-medium',
              isActive(item.path)
                ? 'bg-primary text-white shadow-md'
                : 'text-white hover:text-gray-200'
            ]"
          >
            {{ item.name }}
          </button>
        </div>
        <div class="sm:block hidden"></div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
</style>
