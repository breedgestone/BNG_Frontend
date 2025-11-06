<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'error', 'outline', 'outline-blue', 'outline-red', 'ghost'].includes(value)
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
  },
  responsive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="[
      'btn inline-flex items-center justify-center gap-2 font-medium transition-all rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        // Variants
        'bg-primary text-white hover:bg-primary-600 focus:ring-primary': variant === 'primary',
        'bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary': variant === 'secondary',
        'bg-success text-white hover:bg-success-600 focus:ring-success': variant === 'success',
        'bg-error text-white hover:bg-error-600 focus:ring-error': variant === 'error',
        'bg-transparent border! border-primary text-primary hover:bg-primary hover:text-white': variant === 'outline',
        'bg-transparent border! text-secondary-600 hover:bg-secondary-50': variant === 'outline-blue',
        'bg-transparent border! text-primary hover:bg-primary-50': variant === 'outline-red',
        'bg-transparent hover:bg-gray-100 text-gray-700': variant === 'ghost',
        
        // Sizes
        'text-sm px-4 py-2': size === 'sm',
        'text-sm px-4 lg:px-6 py-2.5': size === 'md' && responsive,
        'text-sm px-6 py-2.5': size === 'md' && !responsive,
        'text-base px-8 py-3': size === 'lg',
        'text-lg px-10 py-4': size === 'xl',
        
        // States
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-wait': loading,
        'w-full': fullWidth && !responsive,
        'flex-1 lg:flex-none': fullWidth && responsive,
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <svg 
      v-if="loading" 
      class="animate-spin h-5 w-5" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot name="icon" />
    <slot />
  </button>
</template>

<style scoped>
.border.text-secondary {
  border-color: var(--color-secondary);
}

.border.text-secondary:hover {
  background-color: var(--color-secondary-50);
}

.border.text-primary {
  border-color: var(--color-primary);
}

.border.text-primary:hover {
  background-color: var(--color-primary-50);
}
</style>
