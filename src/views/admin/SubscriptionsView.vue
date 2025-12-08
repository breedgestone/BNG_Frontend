<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Subscriptions</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Subscriptions</span>
      </nav>
    </div>

    <!-- Search and Filters -->
    <div class="flex items-center gap-4">
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

      <select 
        v-model="fromFilter"
        class="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer min-w-[120px]"
      >
        <option value="">From</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>

      <select 
        v-model="toFilter"
        class="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer min-w-[120px]"
      >
        <option value="">To</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>

      <button 
        @click="addNewPlan"
        class="px-6 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors whitespace-nowrap"
      >
        Add New Plan
      </button>
    </div>

    <!-- Table -->
    <Table 
      :columns="columns"
      :data="filteredSubscriptions"
    >
      <template #status="{ row }">
        <span 
          class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
          :class="row.status === 'Active' ? 'bg-success-50 text-success border border-success' : 'bg-gray-100 text-gray-600 border border-gray-300'"
        >
          {{ row.status }}
        </span>
      </template>

      <template #action="{ row }">
        <div class="flex items-center ">
          <button 
            @click="viewSubscription(row)"
            class="p-2 hover:bg-gray-100 text-gray-400 rounded-lg transition-colors"
            title="View"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
          <button 
            @click="editSubscription(row)"
            class="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.166 2.5a2.121 2.121 0 0 1 3 3L6.5 16.167l-4.167.833.834-4.167L14.166 2.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button 
            @click="deleteSubscription(row)"
            class="p-2  hover:bg-red-50 rounded-lg transition-colors text-primary"
            title="Delete"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 5h15M6.667 5V3.333a1.667 1.667 0 0 1 1.666-1.666h3.334a1.667 1.667 0 0 1 1.666 1.666V5m2.5 0v11.667a1.667 1.667 0 0 1-1.666 1.666H5.833a1.667 1.667 0 0 1-1.666-1.666V5h11.666z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Table from '@/components/Table.vue'

const router = useRouter()

// Search and filters
const searchQuery = ref('')
const fromFilter = ref('')
const toFilter = ref('')

// Table columns
const columns = [
  { key: 'pricingName', label: 'Pricing Name' },
  { key: 'subscribers', label: 'No. of Subcribers' },
  { key: 'createdOn', label: 'Created on' },
  { key: 'revenue', label: 'Revenue Made' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Actions' }
]

// Mock subscriptions data
const subscriptions = ref([
  {
    id: 1,
    pricingName: 'Full day',
    subscribers: '456 subcribers',
    createdOn: 'Dec 23, 2022',
    revenue: '₦250,000.00',
    status: 'Active'
  },
  {
    id: 2,
    pricingName: '4 Hours Daily',
    subscribers: '456 Subcribers',
    createdOn: 'Dec 23, 2022',
    revenue: '₦250,000.00',
    status: 'Active'
  },
  {
    id: 3,
    pricingName: 'Home Workout',
    subscribers: '456 Subcribers',
    createdOn: 'Dec 23, 2022',
    revenue: '₦250,000.00',
    status: 'Active'
  }
])

// Filtered subscriptions
const filteredSubscriptions = computed(() => {
  let result = subscriptions.value

  if (searchQuery.value) {
    result = result.filter(sub => 
      sub.pricingName.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})

// Add new plan
const addNewPlan = () => {
  router.push({ name: 'admin-add-subscription' })
}

// View subscription details
const viewSubscription = (row) => {
  router.push({ name: 'admin-view-subscription', params: { id: row.id } })
}

// Edit subscription
const editSubscription = (row) => {
  router.push({ name: 'admin-edit-subscription', params: { id: row.id } })
}

// Delete subscription
const deleteSubscription = (row) => {
  console.log('Delete subscription:', row)
  // TODO: Implement delete confirmation dialog
}
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z' fill='%236B7280'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
}
</style>
