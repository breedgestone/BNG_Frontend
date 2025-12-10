<template>
    <nav class="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto flex justify-between items-center h-16">
            <!-- Left: Mobile Menu + Page Title -->
            <div class="flex items-center gap-4">
                <!-- Mobile Hamburger -->
                <div class="md:hidden">
                    <button 
                        aria-label="Open menu" 
                        @click="isMobileMenuOpen = true"
                        class="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                <!-- Page Title (Mobile) -->
                <p class="md:hidden capitalize text-sm text-gray-600">
                    {{ router.currentRoute.value.name || 'Dashboard' }}
                </p>

                <!-- Logo (when sidebar is hidden) -->
                <div v-if="showLogo" class="hidden md:block">
                    <img class="w-[118px] h-[19px]" src="@/assets/svg/logo.svg" alt="BNG" />
                </div>
            </div>

            <!-- Right: Icons + Profile -->
            <div class="flex justify-end items-center lg:gap-6 gap-4">
  

                <!-- Notifications Icon -->
                <button 
                    aria-label="Notifications" 
                    @click="toggleNotifications"
                    class="relative hover:bg-gray-100 p-2 rounded-lg"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="#333333" />
                    </svg>
                    <span 
                        v-if="unreadNotificationCount > 0"
                        class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                    >
                        {{ unreadNotificationCount > 9 ? '9+' : unreadNotificationCount }}
                    </span>
                </button>

                <!-- User Profile -->
                <div class="sm:flex hidden items-center space-x-3 shrink-0">
                    <div 
                        class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-white"
                    >
                        <p>{{ userInitials }}</p>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-800 font-medium">{{ userName }}</p>
                    </div>
                    <button @click="$emit('showLogoutModal')" class="hover:bg-gray-100 p-2 rounded-lg">
                        <svg class="w-5 h-5 text-gray-600 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Notification Panel -->
        <NotificationPanel :show="showNotifications" @close="showNotifications = false" />

        <!-- Mobile Sidebar -->
        <transition name="fade">
            <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 bg-white p-6 overflow-y-auto">
                <!-- Close Btn -->
                <button 
                    class="absolute top-6 right-6 text-red-500 hover:text-red-700 text-2xl"
                    @click="isMobileMenuOpen = false"
                >
                    ✕
                </button>

                <!-- Logo -->
                <div class="mb-8">
                    <img class="w-[118px] h-[19px]" src="@/assets/svg/logo.svg" alt="BNG" />
                </div>

                <!-- Links -->
                <div class="space-y-2">
                    <div v-for="item in navItems" :key="item.label">
                        <router-link 
                            :to="item.to" 
                            @click="isMobileMenuOpen = false"
                            class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 text-gray-600 hover:text-primary transition-colors duration-200"
                            :class="route.path === item.to ? 'bg-primary-50 font-semibold text-primary' : ''"
                        >
                            <div class="flex items-center space-x-3">
                                <component 
                                    :is="item.icon" 
                                    :color="route.path === item.to ? item.activeIconColor : item.iconColor"
                                    class="w-5 h-5"
                                />
                                <span class="text-sm">{{ item.label }}</span>
                            </div>
                            <span class="text-gray-400">›</span>
                        </router-link>
                    </div>
                </div>

                <!-- Mobile Profile -->
                <div class="mt-8 pt-6 border-t border-gray-200">
                    <div class="flex items-center space-x-3">
                        <div 
                            class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-white"
                        >
                            <p>{{ userInitials }}</p>
                        </div>
                        <div class="flex-1">
                            <p class="font-semibold text-sm text-gray-800">{{ userName }}</p>
                            <p class="text-xs text-gray-500">Administrator</p>
                        </div>
                        <button @click="$emit('showLogoutModal'); isMobileMenuOpen = false">
                            <svg class="w-5 h-5 text-gray-600 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import navItems from './navItem'
import NotificationPanel from '@/components/NotificationPanel.vue'

defineProps({
    showLogo: {
        type: Boolean,
        required: true
    },
})

const router = useRouter()
const route = useRoute()

const isMobileMenuOpen = ref(false)
const showNotifications = ref(false)
const unreadNotificationCount = ref(3) // Mock notification count

// Mock user data - replace with actual auth store
const userName = computed(() => 'Admin User')
const userInitials = computed(() => 'AU')

const messages = ref(true)

const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value
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

@media (width >= 900px) {
    .md\:hidden {
        display: none;
    }
}

@media (width < 900px) {
    .md\:hidden {
        display: block;
    }
}
</style>
