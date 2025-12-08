<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Admins</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Admins</span>
      </nav>
    </div>

    <!-- Filters and Actions -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <!-- Filter Dropdown -->
        <select 
          v-model="selectedFilter"
          class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="deactivated">Deactivated</option>
        </select>

        <!-- Search -->
        <div class="flex-1 max-w-md relative">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search"
            class="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Add Admin Button -->
      <button 
        @click="goToAddAdmin"
        class="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap flex items-center gap-2"
      >
        <span class="text-lg">+</span>
        Add a New Admin
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <Table :columns="columns" :data="filteredAdmins">
        <!-- Photo Column -->
        <template #photo="{ row }">
          <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img 
              v-if="row.photo" 
              :src="row.photo" 
              :alt="row.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-500 font-medium text-sm">
              {{ row.name.split(' ')[0].charAt(0) }}{{ row.name.split(' ')[1]?.charAt(0) }}
            </div>
          </div>
        </template>

        <!-- Status Badge -->
        <template #status="{ row }">
          <span 
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="{
              'bg-success-50 text-success border border-success': row.status === 'Active',
              'bg-red-50 text-red-600 border border-red-600': row.status === 'Deactivated'
            }"
          >
            {{ row.status }}
          </span>
        </template>

        <!-- Actions Menu -->
        <template #actions="{ row }">
          <div class="relative">
            <button 
              @click="toggleActionMenu(row.id)"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="More actions"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53976 10.4602 9.16667 10 9.16667C9.53976 9.16667 9.16667 9.53976 9.16667 10C9.16667 10.4602 9.53976 10.8333 10 10.8333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 5.00001C10.4602 5.00001 10.8333 4.62691 10.8333 4.16667C10.8333 3.70644 10.4602 3.33334 10 3.33334C9.53976 3.33334 9.16667 3.70644 9.16667 4.16667C9.16667 4.62691 9.53976 5.00001 10 5.00001Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8333C10.8333 15.3731 10.4602 15 10 15C9.53976 15 9.16667 15.3731 9.16667 15.8333C9.16667 16.2936 9.53976 16.6667 10 16.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <!-- Action Menu Dropdown -->
            <div 
              v-if="activeActionMenu === row.id"
              class="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]"
            >
              <button 
                @click="editAdmin(row.id)"
                class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-lg"
              >
                Edit
              </button>
              <button 
                v-if="row.status === 'Active'"
                @click="deactivateAdmin(row.id)"
                class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors last:rounded-b-lg"
              >
                De-activate
              </button>
              <button 
                v-else
                @click="reactivateAdmin(row.id)"
                class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors last:rounded-b-lg"
              >
                Re-activate
              </button>
            </div>
          </div>
        </template>
      </Table>
    </div>

    <!-- Success Modals -->
    <ConfirmDialog
      v-if="showSuccessDialog"
      :title="successDialogTitle"
      :description="successDialogDescription"
      confirm-text="Okay"
      :show-cancel="false"
      @confirm="closeSuccessDialog"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Table from '@/components/Table.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()

// Filter and search
const selectedFilter = ref('all')
const searchQuery = ref('')

// Action menu
const activeActionMenu = ref(null)

// Success dialog
const showSuccessDialog = ref(false)
const successDialogTitle = ref('')
const successDialogDescription = ref('')

// Table columns
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'photo', label: 'Photo' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Action' }
]

// Mock data
const admins = ref([
  {
    id: 1,
    name: 'Odu Mekaduh (You)',
    photo: null,
    email: 'odekeleghah@gmail.com',
    role: 'Administrator',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Odu Mekaduh (You)',
    photo: null,
    email: 'odekeleghah@gmail.com',
    role: 'Consultation-Admin',
    status: 'Deactivated'
  },
  {
    id: 3,
    name: 'Odu Mekaduh (You)',
    photo: null,
    email: 'odekeleghah@gmail.com',
    role: 'User-Admin',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Odu Mekaduh (You)',
    photo: null,
    email: 'odekeleghah@gmail.com',
    role: 'Interior-Admin',
    status: 'Active'
  }
])

// Filtered admins
const filteredAdmins = computed(() => {
  let filtered = admins.value

  // Filter by status
  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(admin => 
      admin.status.toLowerCase() === selectedFilter.value.toLowerCase()
    )
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(admin =>
      admin.name.toLowerCase().includes(query) ||
      admin.email.toLowerCase().includes(query) ||
      admin.role.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Toggle action menu
const toggleActionMenu = (id) => {
  if (activeActionMenu.value === id) {
    activeActionMenu.value = null
  } else {
    activeActionMenu.value = id
  }
}

// Close action menu when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
      activeActionMenu.value = null
    }
  })
}

// Navigation
const goToAddAdmin = () => {
  router.push({ name: 'admin-add-admin' })
}

const editAdmin = (id) => {
  activeActionMenu.value = null
  router.push({ name: 'admin-edit-admin', params: { id } })
}

// Deactivate Admin
const deactivateAdmin = (id) => {
  activeActionMenu.value = null
  const admin = admins.value.find(a => a.id === id)
  
  if (admin) {
    admin.status = 'Deactivated'
    successDialogTitle.value = 'Admin De-activated'
    successDialogDescription.value = 'You have successfully de-activated this Admin'
    showSuccessDialog.value = true
  }
}

// Reactivate Admin
const reactivateAdmin = (id) => {
  activeActionMenu.value = null
  const admin = admins.value.find(a => a.id === id)
  
  if (admin) {
    admin.status = 'Active'
    successDialogTitle.value = 'Admin Re-activated'
    successDialogDescription.value = 'You have successfully re-activated this Admin'
    showSuccessDialog.value = true
  }
}

// Close Success Dialog
const closeSuccessDialog = () => {
  showSuccessDialog.value = false
  successDialogTitle.value = ''
  successDialogDescription.value = ''
}
</script>
