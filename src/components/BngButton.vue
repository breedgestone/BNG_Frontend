<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'error', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!this.disabled && !this.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="[
      'btn inline-flex items-center justify-center font-medium transition-all rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        // Variants
        'bg-primary text-white hover:bg-primary-600 focus:ring-primary': variant === 'primary',
        'bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary': variant === 'secondary',
        'bg-success text-white hover:bg-success-600 focus:ring-success': variant === 'success',
        'bg-error text-white hover:bg-error-600 focus:ring-error': variant === 'error',
        'bg-transparent border! border-primary text-primary hover:bg-primary hover:text-white': variant === 'outline',
        'bg-transparent hover:bg-gray-100 text-gray-700': variant === 'ghost',
        
        // Sizes
        'text-sm px-4 py-2': size === 'sm',
        'text-base px-6 py-3': size === 'md',
        'text-lg px-8 py-4': size === 'lg',
        'text-xl px-10 py-5': size === 'xl',
        
        // States
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-wait': loading,
        'w-full': fullWidth,
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <svg 
      v-if="loading" 
      class="animate-spin -ml-1 mr-3 h-5 w-5" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot />
  </button>
</template>

<style scoped>
</style>
