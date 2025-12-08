<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const route = useRoute()

// Check if we're in edit mode
const isEditMode = ref(false)
const subscriptionId = ref(null)

// Form fields
const pricingName = ref('')
const pricingFee = ref('')
const type = ref('')
const feeDescription = ref('')

// Show success modal
const showSuccessModal = ref(false)
const successTitle = ref('')
const successDescription = ref('')

// Load subscription data if editing
onMounted(() => {
  if (route.params.id) {
    isEditMode.value = true
    subscriptionId.value = route.params.id
    loadSubscriptionData()
  }
})

// Load subscription data for editing
const loadSubscriptionData = () => {
  // TODO: Fetch subscription data from API
  console.log('Loading subscription data for ID:', subscriptionId.value)
  
  // Mock data for now
  pricingName.value = 'Full Day Subscription'
  pricingFee.value = '25000'
  type.value = 'monthly'
  feeDescription.value = 'Access to gym facilities for the entire day, all month long.'
}

// Cancel form
const handleCancel = () => {
  router.push({ name: 'admin-subscriptions' })
}

// Save subscription
const handleSave = () => {
  const subscriptionData = {
    pricingName: pricingName.value,
    pricingFee: pricingFee.value,
    type: type.value,
    feeDescription: feeDescription.value
  }
  
  if (isEditMode.value) {
    console.log('Updating subscription:', subscriptionId.value, subscriptionData)
    successTitle.value = 'Subscription Updated Successfully'
    successDescription.value = 'You have updated this subscription plan'
  } else {
    console.log('Creating new subscription:', subscriptionData)
    successTitle.value = 'New Subscription Added'
    successDescription.value = 'You have added a new subscription'
  }
  
  // Show success modal
  showSuccessModal.value = true
}

// Close success modal and redirect
const closeSuccessModal = () => {
  showSuccessModal.value = false
  router.push({ name: 'admin-subscriptions' })
}
</script>

<template>
  <div class="space-y-6 pb-20">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Add Subscription</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Subscription</span>
      </nav>
    </div>

    <!-- Form Card -->
    <div class="bg-white rounded-xl shadow-sm p-8 space-y-6 max-w-4xl">
      <!-- Pricing name -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Pricing name</label>
        <input 
          v-model="pricingName"
          type="text"
          placeholder="Enter Pricing name"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- Pricing fee -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Pricing fee</label>
        <input 
          v-model="pricingFee"
          type="text"
          placeholder="Enter Pricing fee"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- Type -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Type</label>
        <select 
          v-model="type"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="" disabled>Select type</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <!-- Enter Fee Description -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Enter Fee Description</label>
        <textarea 
          v-model="feeDescription"
          rows="6"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        ></textarea>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center justify-end gap-4 max-w-4xl">
      <button 
        @click="handleCancel"
        class="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button 
        @click="handleSave"
        class="px-8 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
      >
        Save
      </button>
    </div>

    <!-- Success Modal -->
    <ConfirmDialog
      v-model="showSuccessModal"
      type="success"
      :title="successTitle"
      :description="successDescription"
      confirm-text="Okay"
      :show-cancel="false"
      :show-close="true"
      @confirm="closeSuccessModal"
    >
      <template #icon>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 20L17.5 25L27.5 15" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </template>
    </ConfirmDialog>
  </div>
</template>

<style scoped>
/* Remove default select arrow */
select {
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z' fill='%236B7280'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
}
</style>
