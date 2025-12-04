<template>
  <div class="w-full flex flex-col items-center justify-center py-12 px-6 text-center">
    <!-- Icon Container -->
    <div class="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-primary-50 border border-primary-100">
      <!-- Custom Icon Slot -->
      <slot name="icon">
        <!-- Default Empty Box Icon -->
        <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-4H7" />
        </svg>
      </slot>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-semibold text-gray-800 mb-2">
      {{ title || 'No Data Available' }}
    </h3>

    <!-- Description -->
    <p class="text-gray-600 mb-6 max-w-md">
      {{ description || 'There are no items to display at the moment.' }}
    </p>

    <!-- Action Button Slot -->
    <slot name="action">
      <button 
        v-if="actionText && actionClick"
        @click="actionClick"
        class="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        {{ actionText }}
      </button>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  actionText: {
    type: String,
    default: ''
  },
  actionClick: {
    type: Function,
    default: null
  }
})
</script>
