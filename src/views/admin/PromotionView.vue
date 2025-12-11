<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Promotion</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Promotion</span>
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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
          class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option>From</option>
        </select>

        <select 
          class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option>To</option>
        </select>
      </div>

      <!-- Add Button -->
      <button 
        @click="goToAddPromotion"
        class="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
      >
        Add Promotion
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <Table :columns="columns" :data="filteredPromotions">
        <!-- Status Badge -->
        <template #status="{ row }">
          <span 
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="{
              'bg-success-50 text-success border border-success': row.status === 'Active',
              'bg-gray-50 text-gray-600 border border-gray-600': row.status === 'Inactive'
            }"
          >
            {{ row.status }}
          </span>
        </template>

        <!-- Actions -->
        <template #actions="{ row }">
          <div class="flex items-center">
            <button 
              @click="editPromotion(row.sn)"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.166 2.5009C14.3849 2.28203 14.6447 2.10842 14.9307 1.98996C15.2167 1.87151 15.5232 1.81055 15.8327 1.81055C16.1422 1.81055 16.4487 1.87151 16.7347 1.98996C17.0206 2.10842 17.2805 2.28203 17.4993 2.5009C17.7182 2.71977 17.8918 2.97961 18.0103 3.26558C18.1287 3.55154 18.1897 3.85804 18.1897 4.16757C18.1897 4.4771 18.1287 4.7836 18.0103 5.06956C17.8918 5.35553 17.7182 5.61537 17.4993 5.83424L6.24935 17.0842L1.66602 18.3342L2.91602 13.7509L14.166 2.5009Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button 
              @click="deletePromotion(row.sn)"
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
    </div>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      v-if="showDeleteDialog"
      title="Delete Promotion"
      description="Are you sure you want to delete this promotion? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
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

// Delete dialog
const showDeleteDialog = ref(false)
const promotionToDelete = ref(null)

// Table columns
const columns = [
  { key: 'sn', label: 'SN' },
  { key: 'couponName', label: 'Coupon Name' },
  { key: 'subscriptionPlan', label: 'Subscription Plan' },
  { key: 'discountPercentage', label: 'Discount %' },
  { key: 'startDate', label: 'Start date' },
  { key: 'endDate', label: 'End date' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

// Mock data
const promotions = ref([
  {
    sn: 1,
    couponName: 'BOOM10',
    subscriptionPlan: 'Premium',
    discountPercentage: '10%',
    startDate: '2024-10-02',
    endDate: '2024-12-02',
    status: 'Active'
  },
  {
    sn: 2,
    couponName: 'BOOM10',
    subscriptionPlan: 'Basic',
    discountPercentage: '15%',
    startDate: '2024-10-02',
    endDate: '2024-12-02',
    status: 'Active'
  },
  {
    sn: 3,
    couponName: 'BOOM10',
    subscriptionPlan: 'Standard',
    discountPercentage: '20%',
    startDate: '2024-10-02',
    endDate: '2024-12-02',
    status: 'Active'
  },
  {
    sn: 4,
    couponName: 'BOOM10',
    subscriptionPlan: 'Elite',
    discountPercentage: '25%',
    startDate: '2024-10-02',
    endDate: '2024-12-02',
    status: 'Active'
  },
  {
    sn: 5,
    couponName: 'BOOM10',
    subscriptionPlan: 'Premium',
    discountPercentage: '30%',
    startDate: '2024-10-02',
    endDate: '2024-12-02',
    status: 'Active'
  },
  {
    sn: 6,
    couponName: 'BOOM10',
    subscriptionPlan: 'Basic',
    discountPercentage: '10%',
    startDate: '2024-10-02',
    endDate: '2024-12-02',
    status: 'Active'
  },
  {
    sn: 7,
    couponName: 'BOOM10',
    subscriptionPlan: 'Standard',
    discountPercentage: '12%',
    startDate: '2024-10-02',
    endDate: '2024-12-02',
    status: 'Active'
  },
  {
    sn: 8,
    couponName: 'BOOM10',
    subscriptionPlan: 'Elite',
    discountPercentage: '18%',
    startDate: '2024-10-02',
    endDate: '2024-12-02',
    status: 'Active'
  }
])

// Filtered promotions
const filteredPromotions = computed(() => {
  let filtered = promotions.value

  // Filter by status
  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(promotion => 
      promotion.status.toLowerCase() === selectedFilter.value.toLowerCase()
    )
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(promotion =>
      promotion.couponName.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Navigation
const goToAddPromotion = () => {
  router.push({ name: 'admin-add-promotion' })
}

const editPromotion = (id) => {
  router.push({ name: 'admin-edit-promotion', params: { id } })
}

const deletePromotion = (id) => {
  promotionToDelete.value = id
  showDeleteDialog.value = true
}

const confirmDelete = () => {
  // TODO: Implement API call to delete promotion
  console.log('Delete promotion:', promotionToDelete.value)
  
  // Remove from local state
  const index = promotions.value.findIndex(p => p.sn === promotionToDelete.value)
  if (index > -1) {
    promotions.value.splice(index, 1)
  }
  
  // Close dialog
  showDeleteDialog.value = false
  promotionToDelete.value = null
}

const cancelDelete = () => {
  showDeleteDialog.value = false
  promotionToDelete.value = null
}
</script>
