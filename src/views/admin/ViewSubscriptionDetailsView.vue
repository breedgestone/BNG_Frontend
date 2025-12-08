<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Table from '@/components/Table.vue'

const router = useRouter()
const route = useRoute()

const subscriptionId = ref(null)
const subscriptionName = ref('')

// Filters
const selectedFilter = ref('All')
const searchQuery = ref('')
const fromFilter = ref('')
const toFilter = ref('')

// Filter options
const filterOptions = ['All', 'Paid', 'Pending', 'Failed']

// Table columns
const columns = [
  { key: 'checkbox', label: '' },
  { key: 'userName', label: 'User Name' },
  { key: 'billingId', label: 'Billing ID' },
  { key: 'pricing', label: 'Pricing' },
  { key: 'pricingType', label: 'Pricing Type' },
  { key: 'status', label: 'Status' },
  { key: 'dateSubscribed', label: 'Date Subscribed' },
  { key: 'amount', label: 'Amount' },
  { key: 'action', label: 'Actions' }
]

// Mock subscribers data
const subscribers = ref([
  {
    id: 1,
    userName: 'Patrick Lawal',
    billingId: 'Billing #780-Dec 2022',
    pricing: 'Full Day',
    pricingType: 'Monthly',
    status: 'Paid',
    dateSubscribed: 'Dec 23, 2022',
    amount: '₦25,000.00'
  },
  {
    id: 2,
    userName: 'Patrick Lawal',
    billingId: 'Billing #780-Dec 2022',
    pricing: 'Full Day',
    pricingType: 'Monthly',
    status: 'Paid',
    dateSubscribed: 'Dec 23, 2022',
    amount: '₦25,000.00'
  },
  {
    id: 3,
    userName: 'Patrick Lawal',
    billingId: 'Billing #780-Dec 2022',
    pricing: 'Full Day',
    pricingType: 'Monthly',
    status: 'Paid',
    dateSubscribed: 'Dec 23, 2022',
    amount: '₦25,000.00'
  },
  {
    id: 4,
    userName: 'Patrick Lawal',
    billingId: 'Billing #780-Dec 2022',
    pricing: 'Full Day',
    pricingType: 'Monthly',
    status: 'Paid',
    dateSubscribed: 'Dec 23, 2022',
    amount: '₦25,000.00'
  },
  {
    id: 5,
    userName: 'Patrick Lawal',
    billingId: 'Billing #780-Dec 2022',
    pricing: 'Full Day',
    pricingType: 'Monthly',
    status: 'Paid',
    dateSubscribed: 'Dec 23, 2022',
    amount: '₦25,000.00'
  }
])

// Load subscription details
onMounted(() => {
  subscriptionId.value = route.params.id
  loadSubscriptionDetails()
})

const loadSubscriptionDetails = () => {
  // TODO: Fetch subscription details from API
  console.log('Loading subscription details for ID:', subscriptionId.value)
  
  // Mock data
  if (subscriptionId.value === '1') {
    subscriptionName.value = 'Full Day Subscription'
  } else if (subscriptionId.value === '2') {
    subscriptionName.value = '4 Hours Subscription'
  } else {
    subscriptionName.value = 'Home Workouts'
  }
}

// Filtered subscribers
const filteredSubscribers = computed(() => {
  let result = subscribers.value

  // Filter by status
  if (selectedFilter.value !== 'All') {
    result = result.filter(sub => sub.status === selectedFilter.value)
  }

  // Filter by search
  if (searchQuery.value) {
    result = result.filter(sub => 
      sub.userName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      sub.billingId.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})

// Back to subscriptions
const goBack = () => {
  router.push({ name: 'admin-subscriptions' })
}

// Download invoice
const downloadInvoice = (row) => {
  console.log('Download invoice for:', row)
  // TODO: Implement download logic
}

// More actions
const showMoreActions = (row) => {
  console.log('More actions for:', row)
  // TODO: Implement more actions dropdown
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <button 
        @click="goBack"
        class="flex items-center gap-2 text-sm text-gray-900 hover:text-primary transition-colors mb-4"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to subscription
      </button>

      <h1 class="text-2xl font-semibold text-gray-900">{{ subscriptionName }}</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Subscriptions</span>
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

      <!-- From Filter -->
      <select 
        v-model="fromFilter"
        class="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer min-w-[120px]"
      >
        <option value="">From</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>

      <!-- To Filter -->
      <select 
        v-model="toFilter"
        class="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer min-w-[120px]"
      >
        <option value="">To</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>

    <!-- Table -->
    <Table 
      :columns="columns"
      :data="filteredSubscribers"
    >
      <template #checkbox="{ row }">
        <input 
          type="checkbox"
          class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
        />
      </template>

      <template #status="{ row }">
        <span 
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
          :class="{
            'bg-success-50 text-success': row.status === 'Paid',
            'bg-yellow-50 text-yellow-600': row.status === 'Pending',
            'bg-red-50 text-red-600': row.status === 'Failed'
          }"
        >
          {{ row.status }}
        </span>
      </template>

      <template #action="{ row }">
        <div class="flex items-center gap-2">
          <button 
            @click="downloadInvoice(row)"
            class="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
          >
            Download
          </button>
          <button 
            @click="showMoreActions(row)"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
              <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
              <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
            </svg>
          </button>
        </div>
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

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z' fill='%236B7280'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
}
</style>
