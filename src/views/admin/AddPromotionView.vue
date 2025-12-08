<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Add Promotion</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Add Promotion</span>
      </nav>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <div class="space-y-6">
        <!-- Promotion name -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Promotion name</label>
          <input 
            type="text"
            v-model="formData.promotionName"
            placeholder="Enter Promotion name"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Type -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Type</label>
          <select 
            v-model="formData.type"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="">Select type</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>

        <!-- Start date and End date -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">Start date</label>
            <div class="relative">
              <input 
                type="date"
                v-model="formData.startDate"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">End date</label>
            <div class="relative">
              <input 
                type="date"
                v-model="formData.endDate"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <!-- Minimum Order Amount (Changed from Minimum usage Amount) -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Minimum Order Amount</label>
          <input 
            type="text"
            v-model="formData.minimumAmount"
            placeholder="Enter minimum order amount"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Images -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Images</label>
          <p class="text-xs text-gray-500 mb-3">Provide promotion images</p>
          <div class="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
            <div class="flex flex-col items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="text-sm text-gray-600">Upload</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-end gap-4 mt-8">
        <button 
          @click="cancel"
          class="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button 
          @click="save"
          class="px-8 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {{ isEditMode ? 'Update' : 'Save' }}
        </button>
      </div>
    </div>

    <!-- Success Dialog -->
    <ConfirmDialog
      v-if="showSuccessModal"
      title="Promotion Added"
      description="You have added this promotion successfully"
      confirm-text="Okay"
      :show-cancel="false"
      @confirm="closeSuccessModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const route = useRoute()

const isEditMode = ref(false)

const formData = ref({
  promotionName: '',
  type: '',
  startDate: '',
  endDate: '',
  minimumAmount: ''
})

const showSuccessModal = ref(false)

// Check if in edit mode
if (route.params.id) {
  isEditMode.value = true
  // TODO: Fetch promotion data by ID
  // formData.value = fetchedData
}

const save = () => {
  // TODO: Validate and save promotion
  console.log('Save promotion:', formData.value)
  showSuccessModal.value = true
}

const cancel = () => {
  router.push({ name: 'admin-promotion' })
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  router.push({ name: 'admin-promotion' })
}
</script>
