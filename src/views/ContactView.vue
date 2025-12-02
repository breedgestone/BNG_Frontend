<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  issue: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  // Handle form submission
}
</script>

<template>
  <div class="contact-page bg-gray-50 pb-16 font-poppins">
    <!-- Hero Section -->
    <section class="bg-gray-100 py-8 md:py-16 px-4">
      <div class="container mx-auto py-8 sm:pt-16 ">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p class="text-sm md:text-base text-gray-600 mb-2 font-medium">Get Started</p>
            <h1     class="text-xl md:text-3xl  xl:text-5xl font-bold text-gray-900 sm:leading-tight leading-normal mb-6 md:mb-8 font-campton!">
              Get in touch with us. We're here to<br class="hidden md:block"> assist you.
            </h1>
          </div>
          
          <!-- Social Icons - Desktop -->
          <div class="hidden md:flex flex-col gap-4 ml-8">
            <a href="#" class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Section -->
    <section class="py-8 md:py-16  px-4">
      <div class="container mx-auto py-8 sm:pt-16 ">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name, Email, Phone Row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <input
              v-model="formData.name"
              type="text"
              placeholder="Your Name"
              class="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary placeholder-gray-500"
              required
            />
            <input
              v-model="formData.email"
              type="email"
              placeholder="Email Address"
              class="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary placeholder-gray-500"
              required
            />
            <input
              v-model="formData.phone"
              type="tel"
              placeholder="Phone Number"
              class="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary placeholder-gray-500"
              required
            />
          </div>

          <!-- Issue Dropdown -->
          <div class="relative">
            <select
              v-model="formData.issue"
              class="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary appearance-none text-gray-500"
              required
            >
              <option value="" disabled selected>Your Issue</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="other">Other</option>
            </select>
            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

          <!-- Message Textarea -->
          <textarea
            v-model="formData.message"
            placeholder="Message"
            rows="6"
            class="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary placeholder-gray-500 resize-none"
            required
          ></textarea>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full md:w-auto px-12 py-3 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>

    <!-- Contact Info Section -->
    <section class="hero-section relative h-fit py-8 md:py-16  flex items-center bg-cover bg-center"
      style="background-image: url('/contactbg.png')">
      <div class="absolute inset-0 bg-black/30"></div>
      
      <div class="container mx-auto py-8 sm:pt-16  relative z-10">
        <div class="mb-8">
          <h2 class="text-sm md:text-base text-gray-600 font-medium mb-2">Contact Info</h2>
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900">
            We are always happy to assist you
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <!-- Email Address -->
          <div class="space-y-3">
            <div>
              <h4 class="text-base font-bold text-gray-900 mb-1">Email Address</h4>
              <div class="w-12 h-0.5 bg-gray-900"></div>
            </div>
            <p class="text-xl md:text-2xl font-bold text-gray-900">help@info.com</p>
            <div class="text-sm text-gray-600">
              <p>Assistance hours:</p>
              <p>Monday - Friday 6 am</p>
              <p>to 8 pm EST</p>
            </div>
          </div>

          <!-- Phone Number -->
          <div class="space-y-3">
            <div>
              <h4 class="text-base font-bold text-gray-900 mb-1">Phone Number</h4>
              <div class="w-12 h-0.5 bg-gray-900"></div>
            </div>
            <div class="space-y-2">
              <p class="text-xl md:text-2xl font-bold text-gray-900">(+234) 998-345 6546</p>
              <p class="text-xl md:text-2xl font-bold text-gray-900">(+234) 998-345 6546</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
