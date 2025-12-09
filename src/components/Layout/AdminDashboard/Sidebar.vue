<template>
    <aside class="lg:w-78 sm:w-68 w-full bg-white border-r border-gray-200 h-screen flex flex-col">
        <!-- Logo + Close (mobile only) -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200 shrink-0">
            <button class="flex items-center space-x-2 cursor-pointer" @click="router.push('/')">
                <img class="w-[118px] h-[19px]" src="@/assets/svg/logo.svg" alt="BNG" />
            </button>
            <router-link to="/" class="text-gray-500 hover:text-gray-700 text-xl">✕</router-link>
        </div>

        <!-- Search -->
        <div class="px-6 py-4 shrink-0">
            <div class="relative">
                <input 
                    type="text" 
                    placeholder="Search..."
                    class="w-full border-gray-300 px-4 py-2 text-sm border rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary"
                    v-model="search" 
                />
                <svg class="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

        <!-- Scrollable Nav -->
        <div class="flex-1 overflow-y-auto px-3">
            <!-- Nav Links -->
            <nav>
                <ul class="space-y-1">
                    <li v-for="item in navItems" :key="item.label">
                        <!-- Regular Item -->
                        <template v-if="!item.children">
                            <router-link 
                                :to="item.to"
                                class="flex items-center justify-between px-3 py-2 rounded-3xl text-gray-600 hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                                :class="route.path === item.to ? 'bg-primary-50 text-primary font-semibold' : ''"
                            >
                                <div class="flex items-center space-x-3">
                                    <span class="text-xl">{{ item.icon }}</span>
                                    <span class="2xl:text-lg text-sm">{{ item.label }}</span>
                                </div>
                                <span class="text-gray-400">›</span>
                            </router-link>
                        </template>

                        <!-- Dropdown Item -->
                        <template v-else>
                            <button 
                                @click="toggleDropdown(item.label)"
                                class="w-full flex items-center justify-between px-3 py-2 rounded-3xl text-gray-600 hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                                :class="expandedItems.includes(item.label) ? 'bg-primary-50 text-primary font-semibold' : ''"
                            >
                                <div class="flex items-center space-x-3">
                                    <span class="text-xl">{{ item.icon }}</span>
                                    <span class="2xl:text-lg text-sm">{{ item.label }}</span>
                                </div>
                                <svg 
                                    :class="expandedItems.includes(item.label) ? 'rotate-180' : ''"
                                    class="w-4 h-4 transition-transform" 
                                    fill="none" 
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </button>

                            <!-- Dropdown Menu -->
                            <ul v-if="expandedItems.includes(item.label)" class="mt-1 space-y-1 pl-8">
                                <li v-for="child in item.children" :key="child.label">
                                    <router-link 
                                        :to="child.to"
                                        class="flex items-center px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                                        :class="route.path === child.to ? 'bg-primary-50 text-primary font-semibold' : ''"
                                    >
                                        ◦ {{ child.label }}
                                    </router-link>
                                </li>
                            </ul>
                        </template>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Profile (fixed bottom) -->
        <div class="flex items-center space-x-3 border-t border-gray-200 px-6 py-4 shrink-0">
            <div 
                class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-white"
            >
                <p>{{ userInitials }}</p>
            </div>
            <div class="flex-1">
                <p class="font-semibold text-sm text-gray-800">{{ userName }}</p>
                <p class="text-xs text-gray-500">Administrator</p>
            </div>
            <button @click="$emit('showLogoutModal')">
                <svg class="w-5 h-5 text-gray-600 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
        </div>
    </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import navItems from './navItem'

const router = useRouter()
const route = useRoute()

const search = ref('')
const expandedItems = ref([])

// Mock user data - replace with actual auth store
const userName = computed(() => 'Admin User')
const userInitials = computed(() => 'AU')

const toggleDropdown = (label) => {
    const index = expandedItems.value.indexOf(label)
    if (index > -1) {
        expandedItems.value.splice(index, 1)
    } else {
        expandedItems.value.push(label)
    }
}
</script>

<style scoped>
/* Add custom scrollbar styling if needed */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
}
</style>
