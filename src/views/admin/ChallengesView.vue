<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Challenges</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Challenges</span>
      </nav>
    </div>

    <!-- Filters and Actions -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-4 flex-1">
        <!-- From Date -->
        <select 
          class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option>From</option>
        </select>

        <!-- To Date -->
        <select 
          class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option>To</option>
        </select>
      </div>

      <!-- Add Button -->
      <button 
        @click="goToAddChallenge"
        class="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
      >
        Add New Challenge
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <Table :columns="columns" :data="challenges">
        <!-- Status Badge -->
        <template #status="{ row }">
          <span 
            class="px-3 py-1 rounded-sm text-xs font-medium"
            :class="{
              'bg-success-50 text-success border border-success': row.status === 'Active',
              'bg-red-50 text-red-600 border border-red-600': row.status === 'Closed'
            }"
          >
            {{ row.status }}
          </span>
        </template>

        <!-- Actions -->
        <template #actions="{ row }">
          <div class="flex items-center">
            <button 
              @click="viewChallenge(row.id)"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="View"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6.25C7.5 6.25 5.25 7.875 4.375 10C5.25 12.125 7.5 13.75 10 13.75C12.5 13.75 14.75 12.125 15.625 10C14.75 7.875 12.5 6.25 10 6.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button 
              @click="deleteChallenge(row.id)"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Delete"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7.5H15M8.75 10V13.75M11.25 10V13.75M6.25 7.5L7.5 15C7.5 15.1658 7.56585 15.3247 7.68306 15.4419C7.80027 15.5592 7.95924 15.625 8.125 15.625H11.875C12.0408 15.625 12.1997 15.5592 12.3169 15.4419C12.4342 15.3247 12.5 15.1658 12.5 15L13.75 7.5M9.375 7.5V5.625C9.375 5.45924 9.44085 5.30027 9.55806 5.18306C9.67527 5.06585 9.83424 5 10 5C10.1658 5 10.3247 5.06585 10.4419 5.18306C10.5592 5.30027 10.625 5.45924 10.625 5.625V7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </template>
      </Table>

      <!-- Pagination -->
      <div class="flex items-center justify-center gap-2 p-4 border-t border-gray-200">
        <button 
          v-for="page in 9" 
          :key="page"
          class="w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors"
          :class="page === 1 ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'"
        >
          {{ page }}
        </button>
        <button class="w-8 h-8 flex items-center justify-center rounded text-sm font-medium text-gray-600 hover:bg-gray-100">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Table from '@/components/Table.vue'

const router = useRouter()

// Table columns
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'userLevel', label: 'User Level' },
  { key: 'goal', label: 'Goal' },
  { key: 'caloriesGoal', label: 'Calories Goal' },
  { key: 'submission', label: 'Submission' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'closeDate', label: 'Close Date' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

// Mock data
const challenges = ref([
  {
    id: 1,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Active'
  },
  {
    id: 2,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Closed'
  },
  {
    id: 1,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Active'
  },
  {
    id: 2,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Closed'
  },
  {
    id: 1,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Active'
  },
  {
    id: 2,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Closed'
  },
  {
    id: 1,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Active'
  },
  {
    id: 2,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Closed'
  },
  {
    id: 1,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Active'
  },
  {
    id: 2,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Closed'
  },
  {
    id: 1,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Active'
  },
  {
    id: 2,
    userLevel: 'Beginners',
    goal: 'Lose Weight',
    caloriesGoal: '<3,0000 cal',
    submission: '45 Submission',
    startDate: '19/09/25',
    closeDate: '19/09/25',
    status: 'Closed'
  }
])

// Navigation
const goToAddChallenge = () => {
  router.push({ name: 'admin-add-challenge' })
}

const viewChallenge = (id) => {
  router.push({ name: 'admin-view-challenge', params: { id } })
}

const deleteChallenge = (id) => {
  // TODO: Implement delete confirmation and API call
  console.log('Delete challenge:', id)
}
</script>
