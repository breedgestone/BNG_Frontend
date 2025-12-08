<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Payout</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Payout</span>
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
          <option value="successful">Successful</option>
          <option value="pending">Pending</option>
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

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <Table :columns="columns" :data="filteredPayouts">
        <!-- Status Badge -->
        <template #status="{ row }">
          <span 
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="{
              'bg-success-50 text-success border border-success': row.status === 'Successful',
              'bg-orange-50 text-orange-600 border border-orange-600': row.status === 'Pending'
            }"
          >
            {{ row.status }}
          </span>
        </template>

        <!-- Actions Menu -->
        <template #actions="{ row }">
          <div class="relative">
            <button 
              @click="toggleActionMenu(row.sn)"
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
              v-if="activeActionMenu === row.sn"
              class="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]"
            >
              <button 
                @click="handlePay(row.sn)"
                class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-lg"
              >
                Pay
              </button>
              <button 
                @click="handleDeclinePayment(row.sn)"
                class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors last:rounded-b-lg"
              >
                Decline Payment
              </button>
            </div>
          </div>
        </template>
      </Table>
    </div>

    <!-- Decline Payment Dialog -->
    <ConfirmDialog
      v-if="showDeclineDialog"
      title="Decline Payment"
      :description="`Are you sure you want to decline payment for ${selectedPayout?.trainerName}?`"
      confirm-text="Decline"
      cancel-text="Cancel"
      @confirm="confirmDeclinePayment"
      @cancel="cancelDeclinePayment"
    />

    <!-- Success Dialog -->
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
import Table from '@/components/Table.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

// Filter and search
const selectedFilter = ref('all')
const searchQuery = ref('')
const fromDate = ref('')
const toDate = ref('')

// Action menu
const activeActionMenu = ref(null)

// Dialogs
const showDeclineDialog = ref(false)
const showSuccessDialog = ref(false)
const successDialogTitle = ref('')
const successDialogDescription = ref('')
const selectedPayout = ref(null)

// Table columns
const columns = [
  { key: 'sn', label: 'SN' },
  { key: 'trainerName', label: 'Trainer Name' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'email', label: 'Email' },
  { key: 'priAccount', label: 'Pri Account' },
  { key: 'bank', label: 'Bank' },
  { key: 'price', label: 'Price' },
  { key: 'fee', label: 'Fee' },
  { key: 'sessionEnded', label: 'Session Ended' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' }
]

// Mock data
const payouts = ref([
  {
    sn: 1,
    trainerName: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    priAccount: '8167578190',
    bank: 'GT Bank',
    price: '₦20,000',
    fee: '₦2,000',
    sessionEnded: '2024-12-02',
    status: 'Successful'
  },
  {
    sn: 2,
    trainerName: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    priAccount: '8167578190',
    bank: 'GT Bank',
    price: '₦20,000',
    fee: '₦2,000',
    sessionEnded: '2024-12-02',
    status: 'Pending'
  },
  {
    sn: 3,
    trainerName: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    priAccount: '8167578190',
    bank: 'GT Bank',
    price: '₦20,000',
    fee: '₦2,000',
    sessionEnded: '2024-12-02',
    status: 'Successful'
  },
  {
    sn: 4,
    trainerName: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    priAccount: '8167578190',
    bank: 'GT Bank',
    price: '₦20,000',
    fee: '₦2,000',
    sessionEnded: '2024-12-02',
    status: 'Successful'
  },
  {
    sn: 5,
    trainerName: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    priAccount: '8167578190',
    bank: 'GT Bank',
    price: '₦20,000',
    fee: '₦2,000',
    sessionEnded: '2024-12-02',
    status: 'Successful'
  },
  {
    sn: 6,
    trainerName: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    priAccount: '8167578190',
    bank: 'GT Bank',
    price: '₦20,000',
    fee: '₦2,000',
    sessionEnded: '2024-12-02',
    status: 'Successful'
  },
  {
    sn: 7,
    trainerName: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    priAccount: '8167578190',
    bank: 'GT Bank',
    price: '₦20,000',
    fee: '₦2,000',
    sessionEnded: '2024-12-02',
    status: 'Successful'
  },
  {
    sn: 8,
    trainerName: 'David Lawal',
    phoneNumber: '08167578190',
    email: 'davidf55@gmail.com',
    priAccount: '8167578190',
    bank: 'GT Bank',
    price: '₦20,000',
    fee: '₦2,000',
    sessionEnded: '2024-12-02',
    status: 'Successful'
  }
])

// Filtered payouts
const filteredPayouts = computed(() => {
  let filtered = payouts.value

  // Filter by status
  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(payout => 
      payout.status.toLowerCase() === selectedFilter.value.toLowerCase()
    )
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(payout =>
      payout.trainerName.toLowerCase().includes(query) ||
      payout.email.toLowerCase().includes(query) ||
      payout.phoneNumber.includes(query)
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

// Handle Pay
const handlePay = (id) => {
  activeActionMenu.value = null
  const payout = payouts.value.find(p => p.sn === id)
  
  // TODO: Implement API call for payment
  console.log('Process payment for:', id)
  
  // Update status to Successful
  if (payout) {
    payout.status = 'Successful'
    successDialogTitle.value = 'Payment Successful'
    successDialogDescription.value = `Payment to ${payout.trainerName} has been processed successfully.`
    showSuccessDialog.value = true
  }
}

// Handle Decline Payment
const handleDeclinePayment = (id) => {
  activeActionMenu.value = null
  selectedPayout.value = payouts.value.find(p => p.sn === id)
  showDeclineDialog.value = true
}

// Confirm Decline Payment
const confirmDeclinePayment = () => {
  // TODO: Implement API call to decline payment
  console.log('Decline payment for:', selectedPayout.value?.sn)
  
  showDeclineDialog.value = false
  successDialogTitle.value = 'Payment Declined'
  successDialogDescription.value = `Payment to ${selectedPayout.value?.trainerName} has been declined.`
  showSuccessDialog.value = true
}

// Cancel Decline Payment
const cancelDeclinePayment = () => {
  showDeclineDialog.value = false
  selectedPayout.value = null
}

// Close Success Dialog
const closeSuccessDialog = () => {
  showSuccessDialog.value = false
  successDialogTitle.value = ''
  successDialogDescription.value = ''
  selectedPayout.value = null
}
</script>
