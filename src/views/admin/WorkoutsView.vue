<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TabNavigation from '@/components/TabNavigation.vue'
import Table from '@/components/Table.vue'

const router = useRouter()

// Active tab state
const activeTab = ref('home-workouts')

// Tabs configuration
const tabs = [
  { name: 'Home Workouts', value: 'home-workouts' },
  { name: 'Physical Classes', value: 'physical-classes' }
]

// Search query
const searchQuery = ref('')

// Filter dropdown
const selectedFilter = ref('All')
const filterOptions = ['All', 'Beginner', 'Intermediate', 'Advanced']

// Date filters
const fromDate = ref('')
const toDate = ref('')

// Sample Home Workouts Data
const homeWorkoutsData = ref([
  { id: 1, workoutName: 'Back Workouts', level: 'Beginner, Intermediate', focusArea: 'Back, Shoulder', duration: '30 Minutes', caloriesBurnt: '3,000', exercises: 10 },
  { id: 1, workoutName: 'Back Workouts', level: 'Beginner, Intermediate', focusArea: 'Back, Shoulder', duration: '30 Minutes', caloriesBurnt: '3,000', exercises: 10 },
  { id: 1, workoutName: 'Back Workouts', level: 'Beginner, Intermediate', focusArea: 'Back, Shoulder', duration: '30 Minutes', caloriesBurnt: '3,000', exercises: 10 },
  { id: 1, workoutName: 'Back Workouts', level: 'Beginner, Intermediate', focusArea: 'Back, Shoulder', duration: '30 Minutes', caloriesBurnt: '3,000', exercises: 10 },
  { id: 1, workoutName: 'Back Workouts', level: 'Beginner, Intermediate', focusArea: 'Back, Shoulder', duration: '30 Minutes', caloriesBurnt: '3,000', exercises: 10 },
  { id: 1, workoutName: 'Back Workouts', level: 'Beginner, Intermediate', focusArea: 'Back, Shoulder', duration: '30 Minutes', caloriesBurnt: '3,000', exercises: 10 }
])

// Sample Physical Classes Data
const physicalClassesData = ref([
  { id: 1, workoutName: 'Yoga Session', level: 'Beginner', focusArea: 'Full Body', duration: '45 Minutes', caloriesBurnt: '2,500', exercises: 8 },
  { id: 2, workoutName: 'Boxing Class', level: 'Advanced', focusArea: 'Upper Body', duration: '60 Minutes', caloriesBurnt: '4,500', exercises: 12 }
])

// Table columns
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'workoutName', label: 'Workout Name' },
  { key: 'level', label: 'Level' },
  { key: 'focusArea', label: 'Focus Area' },
  { key: 'duration', label: 'Duration' },
  { key: 'caloriesBurnt', label: 'Calories Burnt' },
  { key: 'exercises', label: 'Exercises' },
  { key: 'action', label: 'Actions' }
]

// Computed: Get current data based on active tab
const currentData = computed(() => {
  return activeTab.value === 'home-workouts' ? homeWorkoutsData.value : physicalClassesData.value
})

// Computed: Filtered data based on search and filter
const filteredData = computed(() => {
  let data = currentData.value

  // Apply level filter
  if (selectedFilter.value !== 'All') {
    data = data.filter(item => item.level.includes(selectedFilter.value))
  }

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    data = data.filter(item => 
      item.workoutName.toLowerCase().includes(query) ||
      item.focusArea.toLowerCase().includes(query)
    )
  }

  return data
})

// Methods
const handleView = (row) => {
  console.log('View workout:', row)
  // Implement view logic - could navigate to workout detail page
}

const handleDelete = (row) => {
  console.log('Delete workout:', row)
  // Implement delete logic with confirmation
}

const addWorkout = () => {
  router.push({ name: 'admin-add-workout' })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Workouts</h1>
        <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
          <span>Dashboard</span>
          <span>→</span>
          <span class="text-gray-900">Workouts</span>
        </nav>
      </div>
    </div>

    <!-- Tab Navigation -->
    <TabNavigation v-model="activeTab" :tabs="tabs" />

    <!-- Search and Filter Section -->
    <div class="flex items-center gap-4">
      <!-- Filter Dropdown -->
      <div class="relative">
        <select 
          v-model="selectedFilter"
          class="px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm font-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white cursor-pointer appearance-none min-w-[120px]"
        >
          <option v-for="option in filterOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z" fill="#6B7280"/>
          </svg>
        </div>
      </div>

      <!-- Search Input -->
      <div class="relative flex-1 max-w-md">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search"
          class="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 16.5L13.5 13.5M15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- From Date -->
      <div class="relative">
        <input 
          v-model="fromDate"
          type="text"
          placeholder="From"
          class="px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white min-w-[120px]"
        />
        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.293 5.293L8 7.586 5.707 5.293A1 1 0 004.293 6.707l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414z" fill="#6B7280"/>
          </svg>
        </div>
      </div>

      <!-- To Date -->
      <div class="relative">
        <input 
          v-model="toDate"
          type="text"
          placeholder="To"
          class="px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white min-w-[120px]"
        />
        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.293 5.293L8 7.586 5.707 5.293A1 1 0 004.293 6.707l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414z" fill="#6B7280"/>
          </svg>
        </div>
      </div>

      <!-- Add Workout Button -->
      <button 
        @click="addWorkout"
        class="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors whitespace-nowrap ml-auto"
      >
        Add Workout
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <Table 
        :data="filteredData" 
        :columns="columns"
      >
        <template #action="{ row }">
          <div class="flex items-center gap-3">
            <!-- View Button -->
            <button 
              @click="handleView(row)"
              class="text-gray-600 hover:text-primary transition-colors"
              title="View"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5C5.83333 5 2.5 10 2.5 10C2.5 10 5.83333 15 10 15C14.1667 15 17.5 10 17.5 10C17.5 10 14.1667 5 10 5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <!-- Delete Button -->
            <button 
              @click="handleDelete(row)"
              class="text-gray-600 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 5H17.5M8.33333 8.33333V13.3333M11.6667 8.33333V13.3333M3.33333 5L4.16667 16.6667C4.16667 17.1087 4.34226 17.5326 4.65482 17.8452C4.96738 18.1577 5.39131 18.3333 5.83333 18.3333H14.1667C14.6087 18.3333 15.0326 18.1577 15.3452 17.8452C15.6577 17.5326 15.8333 17.1087 15.8333 16.6667L16.6667 5M7.5 5V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </template>
      </Table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-end gap-2">
      <button class="w-9 h-9 flex items-center justify-center rounded-md bg-primary text-white text-sm font-medium">
        1
      </button>
      <button class="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50">
        2
      </button>
      <button class="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50">
        3
      </button>
      <button class="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50">
        4
      </button>
      <button class="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50">
        5
      </button>
      <button class="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50">
        6
      </button>
      <button class="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50">
        7
      </button>
      <button class="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50">
        8
      </button>
      <button class="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50">
        9
      </button>
      <button class="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50">
        →
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Custom select dropdown styling */
select {
  background-image: none;
}
</style>
