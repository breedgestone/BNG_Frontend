<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Add Challenge</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Add Challenge</span>
      </nav>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- User Level -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">User Level</label>
          <select 
            v-model="formData.userLevel"
            class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="">Select type</option>
            <option value="Beginners">Beginners</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <!-- Goal -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Goal</label>
          <select 
            v-model="formData.goal"
            class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="">Select type</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Gain Muscle">Gain Muscle</option>
            <option value="Stay Fit">Stay Fit</option>
          </select>
        </div>

        <!-- Calories Goal -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Calories Goal</label>
          <select 
            v-model="formData.caloriesGoal"
            class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="">Select type</option>
            <option value="<3,0000 cal"><3,0000 cal</option>
            <option value="3,0000 - 5,0000 cal">3,0000 - 5,0000 cal</option>
            <option value=">5,0000 cal">>5,0000 cal</option>
          </select>
        </div>

        <!-- Benefits -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Benefits</label>
          <input 
            type="text"
            v-model="formData.benefits"
            placeholder="Type and Click enter to add"
            class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Start date -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Start date</label>
          <div class="relative">
            <input 
              type="date"
              v-model="formData.startDate"
              class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <!-- End date -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">End date</label>
          <div class="relative">
            <input 
              type="date"
              v-model="formData.endDate"
              class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <!-- Enter Challenge Description -->
      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-800 mb-2">Enter Challenge Description</label>
        <textarea 
          v-model="formData.description"
          rows="6"
          class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        ></textarea>
      </div>

      <!-- Image and Video Upload -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <!-- Image Preview -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Image Preview</label>
          <p class="text-xs text-gray-500 mb-3">Provide preview/cover image</p>
          <div class="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <div class="flex flex-col items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="text-sm text-gray-600">Upload</span>
            </div>
          </div>
        </div>

        <!-- Tutorial Video -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Tutorial Video</label>
          <p class="text-xs text-gray-500 mb-3">Provide Tutorial Videos</p>
          <div class="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
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
          class="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button 
          @click="save"
          class="px-8 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Save
        </button>
      </div>
    </div>

    <!-- Success Dialog -->
    <ConfirmDialog
      v-if="showSuccessModal"
      title="Challenge Created"
      description="You have added this challenge successfully"
      confirm-text="Okay"
      :show-cancel="false"
      @confirm="closeSuccessModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()

const formData = ref({
  userLevel: '',
  goal: '',
  caloriesGoal: '',
  benefits: '',
  startDate: '',
  endDate: '',
  description: ''
})

const showSuccessModal = ref(false)

const save = () => {
  // TODO: Validate and save challenge
  console.log('Save challenge:', formData.value)
  showSuccessModal.value = true
}

const cancel = () => {
  router.push({ name: 'admin-challenges' })
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  router.push({ name: 'admin-challenges' })
}
</script>
