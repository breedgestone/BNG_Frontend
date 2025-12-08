<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Sign In Scans</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Sign In Scans</span>
      </nav>
    </div>

    <!-- Filters Section -->
    <div class="flex items-center gap-4">
      <!-- Status Filter Dropdown -->
      <div class="relative">
        <select 
          v-model="selectedFilter"
          class="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer pr-10 min-w-[100px]"
        >
          <option v-for="option in filterOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <!-- Search -->
      <div class="flex-1 relative">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19 19L14.65 14.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <!-- Table -->
    <Table 
      :columns="columns"
      :data="filteredScans"
    >
      <template #status="{ row }">
        <span 
          class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border"
          :class="{
            'bg-success-50 text-success border-success': row.status === 'Successful',
            'bg-red-50 text-red-600 border-red-600': row.status === 'Failed',
            'bg-yellow-50 text-yellow-600 border-yellow-600': row.status === 'Pending'
          }"
        >
          {{ row.status }}
        </span>
      </template>
    </Table>

    <!-- Pagination -->
    <div class="flex items-center justify-end gap-2">
      <button class="w-8 h-8 flex items-center justify-center bg-primary text-white rounded text-sm font-medium">
        1
      </button>
      <button class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-sm">
        2
      </button>
      <button class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-sm">
        3
      </button>
      <button class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-sm">
        4
      </button>
      <button class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-sm">
        5
      </button>
      <button class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-sm">
        6
      </button>
      <button class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-sm">
        7
      </button>
      <button class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-sm">
        8
      </button>
      <button class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-sm">
        9
      </button>
      <button class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Table from '@/components/Table.vue'

// Search and filters
const searchQuery = ref('')
const selectedFilter = ref('All')

// Filter options
const filterOptions = ['All', 'Successful', 'Failed', 'Pending']

// Table columns
const columns = [
  { key: 'userName', label: 'User Name' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'userType', label: 'User Type' },
  { key: 'pricingFee', label: 'Pricing Fee' },
  { key: 'dateTime', label: 'Date & Time' },
  { key: 'status', label: 'Status' }
]

// Mock sign in scans data
const scans = ref([
  {
    id: 1,
    userName: 'Patrick Lawal',
    email: 'patrickpoint@gmail.com',
    phoneNumber: '08165748911',
    userType: 'User, Trainer',
    pricingFee: 'Monthly',
    dateTime: '19/09/25, 8:30',
    status: 'Successful'
  },
  {
    id: 2,
    userName: 'Patrick Lawal',
    email: 'patrickpoint@gmail.com',
    phoneNumber: '08165748911',
    userType: 'User, Trainer',
    pricingFee: 'Monthly',
    dateTime: '19/09/25, 8:30',
    status: 'Successful'
  },
  {
    id: 3,
    userName: 'Patrick Lawal',
    email: 'patrickpoint@gmail.com',
    phoneNumber: '08165748911',
    userType: 'User, Trainer',
    pricingFee: 'Monthly',
    dateTime: '19/09/25, 8:30',
    status: 'Successful'
  },
  {
    id: 4,
    userName: 'Patrick Lawal',
    email: 'patrickpoint@gmail.com',
    phoneNumber: '08165748911',
    userType: 'User, Trainer',
    pricingFee: 'Monthly',
    dateTime: '19/09/25, 8:30',
    status: 'Successful'
  },
  {
    id: 5,
    userName: 'Patrick Lawal',
    email: 'patrickpoint@gmail.com',
    phoneNumber: '08165748911',
    userType: 'User, Trainer',
    pricingFee: 'Monthly',
    dateTime: '19/09/25, 8:30',
    status: 'Successful'
  },
  {
    id: 6,
    userName: 'Patrick Lawal',
    email: 'patrickpoint@gmail.com',
    phoneNumber: '08165748911',
    userType: 'User, Trainer',
    pricingFee: 'Monthly',
    dateTime: '19/09/25, 8:30',
    status: 'Successful'
  },
  {
    id: 7,
    userName: 'Patrick Lawal',
    email: 'patrickpoint@gmail.com',
    phoneNumber: '08165748911',
    userType: 'User, Trainer',
    pricingFee: 'Monthly',
    dateTime: '19/09/25, 8:30',
    status: 'Successful'
  },
  {
    id: 8,
    userName: 'Patrick Lawal',
    email: 'patrickpoint@gmail.com',
    phoneNumber: '08165748911',
    userType: 'User, Trainer',
    pricingFee: 'Monthly',
    dateTime: '19/09/25, 8:30',
    status: 'Successful'
  },
  {
    id: 9,
    userName: 'Patrick Lawal',
    email: 'patrickpoint@gmail.com',
    phoneNumber: '08165748911',
    userType: 'User, Trainer',
    pricingFee: 'Monthly',
    dateTime: '19/09/25, 8:30',
    status: 'Successful'
  },
  {
    id: 10,
    userName: 'Patrick Lawal',
    email: 'patrickpoint@gmail.com',
    phoneNumber: '08165748911',
    userType: 'User, Trainer',
    pricingFee: 'Monthly',
    dateTime: '19/09/25, 8:30',
    status: 'Successful'
  }
])

// Filtered scans
const filteredScans = computed(() => {
  let result = scans.value

  // Filter by status
  if (selectedFilter.value !== 'All') {
    result = result.filter(scan => scan.status === selectedFilter.value)
  }

  // Filter by search
  if (searchQuery.value) {
    result = result.filter(scan => 
      scan.userName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      scan.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      scan.phoneNumber.includes(searchQuery.value)
    )
  }

  return result
})
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z' fill='%236B7280'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
}
</style>
