<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary', 'success', 'error', 'gradient'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  padding: {
    type: String,
    default: 'lg'
  }
})
</script>

<template>
  <div
    :class="[
      'rounded-xl transition-all',
      {
        'bg-white shadow-md': variant === 'default',
        'bg-primary text-white shadow-md': variant === 'primary',
        'bg-secondary text-white shadow-md': variant === 'secondary',
        'bg-success text-white shadow-md': variant === 'success',
        'bg-error text-white shadow-md': variant === 'error',
        'gradient-primary text-white shadow-lg': variant === 'gradient',
        'hover:shadow-xl hover:-translate-y-1': hoverable,
        'p-4': padding === 'sm',
        'p-6': padding === 'md',
        'p-8': padding === 'lg',
        'p-10': padding === 'xl',
      }
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
</style>
