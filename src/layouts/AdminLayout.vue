<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Sidebar from '@/components/Layout/AdminDashboard/Sidebar.vue'
import AdminDashboard from '@/components/Layout/AdminDashboard/AdminDashboardNavbar.vue'
import { useRoute, useRouter } from 'vue-router'
import BaseModal from '@/components/BaseModal.vue'
import BngButton from '@/components/BngButton.vue'

const route = useRoute()
const router = useRouter()

const showBaseModal = ref(false)
const isSidebarOpen = ref(true)

// Mock user data - replace with actual auth store if available
const userName = computed(() => 'Admin User')

const signOut = () => {
  // Add logout logic here
  showBaseModal.value = false
  router.push('/')
}

const handleResize = () => {
  if (window.innerWidth < 900) {
    isSidebarOpen.value = false
  } else {
    isSidebarOpen.value = true
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <Sidebar 
      @showLogoutModal="showBaseModal = true" 
      v-if="isSidebarOpen" 
      @close="toggleSidebar"
      :class="['sidebar', { 'sidebar-open': isSidebarOpen }]" 
    />

    <!-- Main Content -->
    <main class="content">
      <div class="sticky top-0 z-50">
        <AdminDashboard 
          @showLogoutModal="showBaseModal = true" 
          :showLogo="isSidebarOpen ? false : true" 
        />
      </div>
      <div :class="['bg-gray-100', route.name !== 'Admin Messages' ? 'sm:p-8 p-4' : '']">
        <router-view />
      </div>
    </main>

    <!-- Logout Modal -->
    <BaseModal v-model="showBaseModal">
      <template #icon>
        <div class="w-10 h-10 rounded-full bg-error-100 flex items-center justify-center text-error">
          <p class="text-lg font-semibold">?</p>
        </div>
      </template>

      <template #title>Sign Out?</template>

      <template #description>
        Do you want to sign out of your <strong>{{ userName }}</strong> account?
      </template>

      <template #actions>
        <div class="flex w-full justify-center gap-3">
          <BngButton 
            class="flex-1" 
            variant="outline" 
            @click="showBaseModal = false"
          >
            Cancel
          </BngButton>
          <BngButton 
            class="flex-1" 
            @click="signOut" 
            variant="error"
          > 
            Yes, Sign Out 
          </BngButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  transition: transform 0.3s ease;
}

/* By default, hide sidebar on mobile */
@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(-100%);
    z-index: 20;
  }

  .sidebar-open {
    transform: translateX(0);
  }
}

/* Main content */
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

/* Menu button */
.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
