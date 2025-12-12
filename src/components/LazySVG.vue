<!-- Lazy-loading wrapper component for SVG images -->
<template>
  <div class="relative" :class="wrapperClass">
    <img
      ref="imageRef"
      :data-src="src"
      :alt="alt"
      :class="[imageClass, { 'opacity-0': !isLoaded, 'opacity-100': isLoaded }]"
      class="transition-opacity duration-300"
      loading="lazy"
    />
    <div
      v-if="showLoader && !isLoaded && !hasError"
      class="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse"
    >
      <slot name="loader">
        <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </slot>
    </div>
    <div
      v-if="hasError"
      class="absolute inset-0 flex items-center justify-center bg-gray-100"
    >
      <slot name="error">
        <span class="text-gray-400 text-sm">Failed to load</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { useLazySVG } from '@/composables/useLazySVG'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  imageClass: {
    type: String,
    default: ''
  },
  wrapperClass: {
    type: String,
    default: ''
  },
  showLoader: {
    type: Boolean,
    default: true
  }
})

const { imageRef, isLoaded, hasError } = useLazySVG(props.src)
</script>
