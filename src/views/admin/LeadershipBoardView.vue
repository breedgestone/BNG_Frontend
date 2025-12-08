<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Leadership Board</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Leadership Board</span>
      </nav>
    </div>

    <!-- Filters and Actions -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-4 flex-1">
        <!-- Filter Dropdown -->
        <select 
          v-model="selectedFilter"
          class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="all">All</option>
          <option value="weight-lifting">Weight Lifting</option>
          <option value="bench-press">Bench Press</option>
          <option value="rope-pulling">Rope Pulling</option>
          <option value="tread-mill">Tread Mill</option>
          <option value="leg-building">Leg Building</option>
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

        <!-- Date Filters -->
        <select 
          v-model="fromDate"
          class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="">From</option>
          <option value="2024-01-01">January 2024</option>
          <option value="2024-02-01">February 2024</option>
          <option value="2024-03-01">March 2024</option>
        </select>

        <select 
          v-model="toDate"
          class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="">To</option>
          <option value="2024-12-31">December 2024</option>
          <option value="2024-11-30">November 2024</option>
          <option value="2024-10-31">October 2024</option>
        </select>
      </div>
    </div>

    <!-- Category Pills -->
    <div class="flex items-center gap-3 flex-wrap">
      <button
        v-for="category in categories"
        :key="category.value"
        @click="selectedCategory = category.value"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all"
        :class="selectedCategory === category.value 
          ? 'bg-primary text-white' 
          : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'"
      >
        {{ category.label }}
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <Table :columns="columns" :data="filteredLeaderboard">
      </Table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Table from '@/components/Table.vue'

// Filter and search
const selectedFilter = ref('all')
const searchQuery = ref('')
const fromDate = ref('')
const toDate = ref('')
const selectedCategory = ref('weight-lifting')

// Categories
const categories = [
  { label: 'Weight Lifting', value: 'weight-lifting' },
  { label: 'Bench Press', value: 'bench-press' },
  { label: 'Rope Pulling', value: 'rope-pulling' },
  { label: 'Tread Mill', value: 'tread-mill' },
  { label: 'Leg Building', value: 'leg-building' }
]

// Table columns
const columns = [
  { key: 'sn', label: 'SN' },
  { key: 'user', label: 'User' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'email', label: 'Email' },
  { key: 'bngPoint', label: 'BNG Point' },
  { key: 'durationStayed', label: 'Duration stayed' },
  { key: 'dateEntered', label: 'Date Entered' }
]

// Mock data
const leaderboardData = ref([
  {
    sn: 1,
    user: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    bngPoint: '5,000',
    durationStayed: '8 days',
    dateEntered: '2024-12-02',
    category: 'weight-lifting'
  },
  {
    sn: 2,
    user: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    bngPoint: '5,000',
    durationStayed: '8 days',
    dateEntered: '2024-12-02',
    category: 'weight-lifting'
  },
  {
    sn: 3,
    user: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    bngPoint: '5,000',
    durationStayed: '8 days',
    dateEntered: '2024-12-02',
    category: 'weight-lifting'
  },
  {
    sn: 4,
    user: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    bngPoint: '5,000',
    durationStayed: '8 days',
    dateEntered: '2024-12-02',
    category: 'weight-lifting'
  },
  {
    sn: 5,
    user: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    bngPoint: '5,000',
    durationStayed: '8 days',
    dateEntered: '2024-12-02',
    category: 'bench-press'
  },
  {
    sn: 6,
    user: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    bngPoint: '5,000',
    durationStayed: '8 days',
    dateEntered: '2024-12-02',
    category: 'bench-press'
  },
  {
    sn: 7,
    user: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    bngPoint: '5,000',
    durationStayed: '8 days',
    dateEntered: '2024-12-02',
    category: 'rope-pulling'
  },
  {
    sn: 8,
    user: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    bngPoint: '5,000',
    durationStayed: '8 days',
    dateEntered: '2024-12-02',
    category: 'tread-mill'
  }
])

// Filtered leaderboard
const filteredLeaderboard = computed(() => {
  let filtered = leaderboardData.value

  // Filter by category
  filtered = filtered.filter(item => item.category === selectedCategory.value)

  // Filter by dropdown filter
  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(item => item.category === selectedFilter.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.user.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.phoneNumber.includes(query)
    )
  }

  return filtered
})
</script>
