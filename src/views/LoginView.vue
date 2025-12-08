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
        <div>
          <img src="@/assets/svg/logo.svg" alt="BNG Logo" class="h-8 brightness-0 invert">
        </div>
        
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

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <!-- Social Login Buttons -->
        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.879 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4"/>
              <path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853"/>
              <path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05"/>
              <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335"/>
            </svg>
            <span class="text-sm font-medium text-gray-700">Google</span>
          </button>

          <button
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.0595 1.66699C13.4377 1.66699 13.7738 1.66699 14.0833 1.69533C14.5119 1.73366 14.9881 1.83366 15.4405 2.08366C16.2262 2.51699 16.8214 3.21699 17.1548 4.05866C17.369 4.61699 17.4405 5.22199 17.4643 5.75033C17.4762 6.05033 17.4762 6.37616 17.4762 6.73783V13.2628C17.4762 13.6245 17.4762 13.9503 17.4643 14.2503C17.4405 14.7787 17.369 15.3837 17.1548 15.942C16.8214 16.7837 16.2262 17.4837 15.4405 17.917C14.9881 18.167 14.5119 18.267 14.0833 18.3053C13.7738 18.3337 13.4377 18.3337 13.0595 18.3337H6.94048C6.56226 18.3337 6.2262 18.3337 5.91667 18.3053C5.48809 18.267 5.01191 18.167 4.55952 17.917C3.77381 17.4837 3.17857 16.7837 2.84524 15.942C2.63095 15.3837 2.55952 14.7787 2.53571 14.2503C2.52381 13.9503 2.52381 13.6245 2.52381 13.2628V6.73783C2.52381 6.37616 2.52381 6.05033 2.53571 5.75033C2.55952 5.22199 2.63095 4.61699 2.84524 4.05866C3.17857 3.21699 3.77381 2.51699 4.55952 2.08366C5.01191 1.83366 5.48809 1.73366 5.91667 1.69533C6.2262 1.66699 6.56226 1.66699 6.94048 1.66699H13.0595ZM10 5.83366C7.69762 5.83366 5.83333 7.69783 5.83333 10.0003C5.83333 12.3028 7.69762 14.167 10 14.167C12.3024 14.167 14.1667 12.3028 14.1667 10.0003C14.1667 7.69783 12.3024 5.83366 10 5.83366ZM10 7.50033C11.3807 7.50033 12.5 8.6195 12.5 10.0003C12.5 11.3812 11.3807 12.5003 10 12.5003C8.61905 12.5003 7.5 11.3812 7.5 10.0003C7.5 8.6195 8.61905 7.50033 10 7.50033ZM14.375 4.58366C13.8917 4.58366 13.5 4.97533 13.5 5.45866C13.5 5.94199 13.8917 6.33366 14.375 6.33366C14.8583 6.33366 15.25 5.94199 15.25 5.45866C15.25 4.97533 14.8583 4.58366 14.375 4.58366Z" fill="#E4405F"/>
            </svg>
            <span class="text-sm font-medium text-gray-700">Instagram</span>
          </button>
        </div>

        <!-- Sign Up Link -->
        <p class="text-center text-sm text-gray-600 mt-8">
          Don't have an account?
          <router-link to="/signup" class="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign up
          </router-link>
        </p>
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
