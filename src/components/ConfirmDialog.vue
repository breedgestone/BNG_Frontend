<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 opacity-bg flex items-center justify-center z-50 p-4" @click="handleBackdropClick">
        <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl relative" @click.stop>
          <!-- Close Button -->
          <button 
            v-if="showClose"
            @click="close"
            class="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="p-8 text-center">
            <!-- Icon -->
            <div class="mb-6 flex justify-center">
              <div :class="iconBgClass" class="rounded-full w-20 h-20 flex items-center justify-center">
                <slot name="icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z" stroke="currentColor" stroke-width="2.5"/>
                    <path d="M20 13.75V21.25M20 26.25H20.0125" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                  </svg>
                </slot>
              </div>
            </div>

            <!-- Title -->
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              <slot name="title">{{ title }}</slot>
            </h3>

            <!-- Description -->
            <p class="text-base text-gray-600 mb-8 leading-relaxed">
              <slot name="description">{{ description }}</slot>
            </p>

            <!-- Actions -->
            <div class="flex gap-4">
              <slot name="actions">
                <button 
                  v-if="showCancel"
                  @click="cancel"
                  class="flex-1 px-8 py-3 border-2 text-gray-700 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors"
                  :class="cancelButtonClass"
                >
                  {{ cancelText }}
                </button>
                <button 
                  @click="confirm"
                  :class="confirmButtonClass"
                  class="flex-1 px-8 py-3 rounded-lg text-base font-semibold transition-colors"
                >
                  {{ confirmText }}
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Are you sure?'
  },
  description: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  type: {
    type: String,
    default: 'danger', // 'danger', 'success', 'warning', 'info'
    validator: (value) => ['danger', 'success', 'warning', 'info'].includes(value)
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const iconBgClass = computed(() => {
  const classes = {
    danger: 'bg-error-100 text-primary',
    success: 'bg-success-100 text-success',
    warning: 'bg-orange-50 text-orange-600',
    info: 'bg-secondary-100 text-secondary'
  }
  return classes[props.type]
})

const cancelButtonClass = computed(() => {
  return 'border-gray-300'
})

const confirmButtonClass = computed(() => {
  const classes = {
    danger: 'bg-primary text-white hover:bg-primary-600',
    success: 'bg-primary text-white hover:bg-primary-600',
    warning: 'bg-orange-600 text-white hover:bg-orange-700',
    info: 'bg-secondary-500 text-white hover:bg-secondary-600'
  }
  return classes[props.type]
})

const close = () => {
  emit('update:modelValue', false)
}

const confirm = () => {
  emit('confirm')
  close()
}

const cancel = () => {
  emit('cancel')
  close()
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close()
  }
}
</script>

<style scoped>
/* Transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
.opacity-bg{
    background: rgba(0, 0, 0, 0.5);
}
</style>
