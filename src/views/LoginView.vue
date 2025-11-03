<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Image (Hidden on mobile) -->
    <div 
      class="hidden lg:flex lg:w-3/5 xl:w-2/3 bg-cover bg-center relative"
      style="background-image: url('/aboutHero.jpg')"
    >
      <div class="absolute inset-0 bg-black/40"></div>
      
      <!-- Logo and Text Overlay -->
      <div class="relative z-10 flex flex-col justify-between p-12 text-white w-full">
        <!-- Logo -->
        <button @click="$router.push('/')">
          <img src="@/assets/svg/logo.svg" alt="BNG Logo" class="h-8 brightness-0 invert">
        </button>
        
        <!-- Bottom Text -->
        <div class="max-w-lg">
          <h2 class="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
            Welcome Back to<br>BNG Fitness Hub
          </h2>
          <p class="text-lg text-white/90">
            Your journey to a healthier, stronger you continues here.
          </p>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="w-full lg:w-2/5 xl:w-1/3 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden mb-8 text-center">
          <img src="@/assets/svg/logo.svg" alt="BNG Logo" class="h-8 mx-auto">
        </div>

        <!-- Form Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Login</h1>
          <p class="text-gray-600">Enter your credentials to access your account</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              placeholder="Enter your email"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Enter your password"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.66602 10C1.66602 10 4.16602 4.16666 9.99935 4.16666C15.8327 4.16666 18.3327 10 18.3327 10C18.3327 10 15.8327 15.8333 9.99935 15.8333C4.16602 15.8333 1.66602 10 1.66602 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.9493 14.9497C13.5281 16.0473 11.8088 16.6667 9.99935 16.6667C4.16602 16.6667 1.66602 10.8333 1.66602 10.8333C2.49489 9.19085 3.64605 7.72869 5.04935 6.5497M8.24935 5.0747C8.82351 4.93607 9.41029 4.86574 9.99935 4.86637C15.8327 4.86637 18.3327 10.6997 18.3327 10.6997C17.882 11.5738 17.3484 12.3991 16.741 13.1622M11.766 11.7664C11.5381 12.0123 11.2626 12.2093 10.9558 12.3456C10.649 12.4819 10.3173 12.5547 9.98146 12.5597C9.64563 12.5646 9.31187 12.5017 9.00114 12.3746C8.69042 12.2476 8.40898 12.0589 8.17387 11.8198C7.93877 11.5807 7.75443 11.2963 7.63185 10.9834C7.50927 10.6704 7.45089 10.3354 7.46028 9.99957C7.46967 9.66374 7.54663 9.33253 7.68746 9.02703C7.82829 8.72152 8.03029 8.44795 8.28102 8.22304" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.66602 1.66663L18.3327 18.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="formData.rememberMe"
                type="checkbox"
                class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <span class="text-sm text-gray-700">Remember me</span>
            </label>
            <router-link
              to="/forgot-password"
              class="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Forgot Password?
            </router-link>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">Login</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          </button>
        </form>

        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  email: '',
  password: '',
  rememberMe: false
})

const showPassword = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  
  try {
    // TODO: Implement actual login API call
    console.log('Login attempt:', {
      email: formData.value.email,
      rememberMe: formData.value.rememberMe
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to admin dashboard after successful login
    router.push({ name: 'admin-dashboard' })
  } catch (error) {
    console.error('Login error:', error)
    // TODO: Show error message to user
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Custom scrollbar for the form area */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
