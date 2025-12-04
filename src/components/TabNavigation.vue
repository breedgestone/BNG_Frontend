<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    // Expected format: [{ name: 'Users', value: 'users' }, { name: 'Trainers', value: 'trainers' }]
  },
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const handleTabClick = (tabValue) => {
  emit('update:modelValue', tabValue)
}

const isActive = (tabValue) => {
  return props.modelValue === tabValue
}
</script>

<template>
  <div class="flex items-center gap-0 bg-gray-900 rounded-full p-1 w-fit">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      @click="handleTabClick(tab.value)"
      :class="[
        'px-12 py-3 rounded-full transition-all duration-300 font-medium text-base',
        'min-w-[140px]',
        isActive(tab.value)
          ? 'bg-primary text-white shadow-md'
          : 'text-white hover:text-gray-200'
      ]"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<style scoped>
button {
  white-space: nowrap;
}
</style>
