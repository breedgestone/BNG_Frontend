<!-- Reusable SVG icon component using sprite system -->
<template>
  <svg :width="size" :height="size" :class="className" :aria-label="ariaLabel">
    <use :href="`#icon-${name}`" :fill="color" />
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [String, Number],
    default: 20
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  className: {
    type: String,
    default: ''
  },
  ariaLabel: {
    type: String,
    default: null
  }
})
</script>
