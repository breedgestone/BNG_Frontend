<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">View Challenge</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">View Challenge</span>
      </nav>
    </div>

    <!-- Filters -->
    <div class="flex items-center gap-4">
      <!-- Filter Dropdown -->
      <select 
        v-model="selectedFilter"
        class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
      >
        <option value="all">All</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
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

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-800">Name</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-800">Photo</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-800">Email</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-800">Date Submitted</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-800">Status</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-800">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(submission, index) in filteredSubmissions" 
              :key="index"
              class="border-b border-gray-200 last:border-b-0"
              :class="{ 'bg-gray-50': index % 2 === 1 }"
            >
              <td class="px-4 py-3 text-sm text-gray-800">{{ submission.name }}</td>
              <td class="px-4 py-3">
                <img :src="submission.photo" :alt="submission.name" class="w-10 h-10 rounded-full object-cover" />
              </td>
              <td class="px-4 py-3 text-sm text-gray-800">{{ submission.email }}</td>
              <td class="px-4 py-3 text-sm text-gray-800">{{ submission.dateSubmitted }}</td>
              <td class="px-4 py-3">
                <span 
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-success-50 text-success border border-success': submission.status === 'Accepted',
                    'bg-red-50 text-red-600 border border-red-600': submission.status === 'Rejected',
                    'bg-orange-50 text-orange-600 border border-orange-600': submission.status === 'Pending'
                  }"
                >
                  {{ submission.status }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="relative">
                  <button 
                    @click="toggleActionMenu(index)"
                    class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10.625C10.3452 10.625 10.625 10.3452 10.625 10C10.625 9.65482 10.3452 9.375 10 9.375C9.65482 9.375 9.375 9.65482 9.375 10C9.375 10.3452 9.65482 10.625 10 10.625Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10 5.625C10.3452 5.625 10.625 5.34518 10.625 5C10.625 4.65482 10.3452 4.375 10 4.375C9.65482 4.375 9.375 4.65482 9.375 5C9.375 5.34518 9.65482 5.625 10 5.625Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10 15.625C10.3452 15.625 10.625 15.3452 10.625 15C10.625 14.6548 10.3452 14.375 10 14.375C9.65482 14.375 9.375 14.6548 9.375 15C9.375 15.3452 9.65482 15.625 10 15.625Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>

                  <!-- Action Menu -->
                  <div 
                    v-if="activeMenuIndex === index"
                    class="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-[120px]"
                  >
                    <button 
                      @click="viewSubmission(submission)"
                      class="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      View
                    </button>
                    <button 
                      @click="acceptSubmission(submission)"
                      class="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      Accept
                    </button>
                    <button 
                      @click="rejectSubmission(submission)"
                      class="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      Rejected
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Watch Challenge Modal -->
    <BaseModal 
      v-model="showWatchModal" 
      max-width="800px"
      :no-padding="true"
      :center-content="false"
    >
      <template #default>
        <div class="relative">
          <button 
            @click="closeWatchModal"
            class="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-lg transition-colors z-10"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <h3 class="text-xl font-semibold text-gray-900 p-6 pb-4">Watch Challenge</h3>

          <!-- Video/Image Placeholder -->
          <div class="relative bg-gray-100 aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop"
              alt="Challenge submission"
              class="w-full h-full object-cover"
            />
            <!-- Play Button -->
            <button class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5.14v13.72L19 12L8 5.14z" fill="#EF4444"/>
                </svg>
              </div>
            </button>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-4 p-6">
            <button 
              @click="confirmReject"
              class="px-6 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Rejected
            </button>
            <button 
              @click="confirmApprove"
              class="px-6 py-3 bg-success text-white rounded-lg text-sm font-medium hover:bg-success/90 transition-colors"
            >
              Approve
            </button>
          </div>
        </div>
      </template>
    </BaseModal>

    <!-- Reject Reason Dialog -->
    <ConfirmDialog
      v-if="showRejectModal"
      title="Are you sure you want to Rejected"
      :show-input="true"
      input-label="Enter Reason for Rejection"
      input-placeholder=""
      v-model="rejectReason"
      @confirm="submitRejection"
      @cancel="closeRejectModal"
    />

    <!-- Success Dialog (Rejected) -->
    <ConfirmDialog
      v-if="showRejectedSuccessModal"
      title="Challenge Rejected"
      description="You have rejected this challenge successfully"
      confirm-text="Okay"
      :show-cancel="false"
      @confirm="closeRejectedSuccessModal"
    />

    <!-- Success Dialog (Accepted) -->
    <ConfirmDialog
      v-if="showAcceptedSuccessModal"
      title="Challenge Accepted"
      description="You have accepted this challenge successfully"
      confirm-text="Okay"
      :show-cancel="false"
      @confirm="closeAcceptedSuccessModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import BaseModal from '@/components/BaseModal.vue'

const selectedFilter = ref('all')
const searchQuery = ref('')
const activeMenuIndex = ref(null)

// Modals
const showWatchModal = ref(false)
const showRejectModal = ref(false)
const showRejectedSuccessModal = ref(false)
const showAcceptedSuccessModal = ref(false)
const rejectReason = ref('')
const selectedSubmission = ref(null)

// Mock data
const submissions = ref([
  {
    name: 'Odu Mekaduh',
    photo: 'https://i.pravatar.cc/150?img=1',
    email: 'adekeleghah@gmail.com',
    dateSubmitted: '19/09/25',
    status: 'Accepted'
  },
  {
    name: 'Odu Mekaduh',
    photo: 'https://i.pravatar.cc/150?img=2',
    email: 'adekeleghah@gmail.com',
    dateSubmitted: '19/09/25',
    status: 'Rejected'
  },
  {
    name: 'Odu Mekaduh',
    photo: 'https://i.pravatar.cc/150?img=3',
    email: 'adekeleghah@gmail.com',
    dateSubmitted: '19/09/25',
    status: 'Pending'
  },
  {
    name: 'Odu Mekaduh',
    photo: 'https://i.pravatar.cc/150?img=4',
    email: 'adekeleghah@gmail.com',
    dateSubmitted: '19/09/2519/09/25',
    status: 'Pending'
  }
])

const filteredSubmissions = computed(() => {
  let filtered = submissions.value

  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(sub => 
      sub.status.toLowerCase() === selectedFilter.value.toLowerCase()
    )
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(sub =>
      sub.name.toLowerCase().includes(query) ||
      sub.email.toLowerCase().includes(query)
    )
  }

  return filtered
})

const toggleActionMenu = (index) => {
  activeMenuIndex.value = activeMenuIndex.value === index ? null : index
}

const viewSubmission = (submission) => {
  selectedSubmission.value = submission
  activeMenuIndex.value = null
  showWatchModal.value = true
}

const acceptSubmission = (submission) => {
  selectedSubmission.value = submission
  activeMenuIndex.value = null
  showAcceptedSuccessModal.value = true
}

const rejectSubmission = (submission) => {
  selectedSubmission.value = submission
  activeMenuIndex.value = null
  showRejectModal.value = true
}

const confirmApprove = () => {
  showWatchModal.value = false
  showAcceptedSuccessModal.value = true
}

const confirmReject = () => {
  showWatchModal.value = false
  showRejectModal.value = true
}

const submitRejection = () => {
  showRejectModal.value = false
  showRejectedSuccessModal.value = true
  rejectReason.value = ''
}

const closeWatchModal = () => {
  showWatchModal.value = false
  selectedSubmission.value = null
}

const closeRejectModal = () => {
  showRejectModal.value = false
  rejectReason.value = ''
}

const closeRejectedSuccessModal = () => {
  showRejectedSuccessModal.value = false
  selectedSubmission.value = null
}

const closeAcceptedSuccessModal = () => {
  showAcceptedSuccessModal.value = false
  selectedSubmission.value = null
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('button')) {
    activeMenuIndex.value = null
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('click', handleClickOutside)
}
</script>
