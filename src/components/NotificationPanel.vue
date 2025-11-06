<template>
  <!-- Backdrop -->
  <transition name="fade">
    <div 
      v-if="show"
      @click="$emit('close')"
      class="fixed inset-0 opacity-bg z-40"
    ></div>
  </transition>

  <!-- Notification Panel -->
  <transition name="slide">
    <div 
      v-if="show"
      class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
    >
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Notifications</h2>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Notifications List -->
      <div class="divide-y divide-gray-100">
        <div 
          v-for="notification in notifications" 
          :key="notification.id"
          class="px-6 py-4 hover:bg-gray-50 transition-colors relative group"
        >
          <!-- Blue indicator for unread -->
          <div 
            v-if="!notification.read"
            class="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"
          ></div>

          <!-- Notification Content -->
          <div class="flex items-start gap-3">
            <!-- Icon -->
            <div class="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#EE3E24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 6.66667V10" stroke="#EE3E24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 13.3333H10.0083" stroke="#EE3E24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-medium text-gray-900 uppercase">{{ notification.name }}</span>
                <span class="text-xs text-gray-400">•</span>
                <span class="text-xs text-gray-400">{{ notification.time }}</span>
              </div>
              <h3 class="text-sm font-medium text-gray-900 mb-1">{{ notification.title }}</h3>
              <p class="text-xs text-gray-600 line-clamp-2">{{ notification.message }}</p>
            </div>

            <!-- Close button -->
            <button 
              @click="removeNotification(notification.id)"
              class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="notifications.length === 0" class="px-6 py-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <p class="text-gray-500 text-sm">No notifications</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

defineEmits(['close'])

// Mock notifications data
const notifications = ref([
  {
    id: 1,
    name: 'NOTIFICATION NAME',
    time: 'NOW',
    title: 'New notification',
    message: 'Do ullamco ex velit anim do probiont exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna anim...',
    read: false
  },
  {
    id: 2,
    name: 'NOTIFICATION NAME',
    time: 'NOW',
    title: 'New notification',
    message: 'Do ullamco ex velit anim do probiont exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna anim...',
    read: false
  },
  {
    id: 3,
    name: 'NOTIFICATION NAME',
    time: 'NOW',
    title: 'New notification',
    message: 'Do ullamco ex velit anim do probiont exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna anim...',
    read: false
  },
  {
    id: 4,
    name: 'NOTIFICATION NAME',
    time: 'NOW',
    title: 'New notification',
    message: 'Do ullamco ex velit anim do probiont exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna anim...',
    read: false
  },
  {
    id: 5,
    name: 'NOTIFICATION NAME',
    time: 'NOW',
    title: 'New notification',
    message: 'Do ullamco ex velit anim do probiont exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna anim...',
    read: false
  },
  {
    id: 6,
    name: 'NOTIFICATION NAME',
    time: 'NOW',
    title: 'New notification',
    message: 'Do ullamco ex velit anim do probiont exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna anim...',
    read: false
  },
  {
    id: 7,
    name: 'NOTIFICATION NAME',
    time: 'NOW',
    title: 'New notification',
    message: 'Do ullamco ex velit anim do probiont exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna anim...',
    read: false
  },
  {
    id: 8,
    name: 'NOTIFICATION NAME',
    time: 'NOW',
    title: 'New notification',
    message: 'Do ullamco ex velit anim do probiont exercitation et anim tempor. Lorem sunt deserunt labore non excepteur veniam enim quis officia magna anim...',
    read: false
  }
])

const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.opacity-bg {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
