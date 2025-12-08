<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Admins</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span>Admin</span>
        <span>→</span>
        <span class="text-primary">{{ isEditMode ? 'Edit Admin' : 'Add a New Admin' }}</span>
      </nav>
    </div>

    <!-- Back to Settings -->
    <button 
      @click="goBack"
      class="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="font-medium">Back to Settings</span>
    </button>

    <!-- Form Title -->
    <h2 class="text-xl font-semibold text-gray-900">
      {{ isEditMode ? 'Edit an Admin' : 'Add a New Admin' }}
    </h2>

    <!-- Form -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <div class="space-y-6">
        <!-- Avatar Upload -->
        <div class="flex flex-col items-center gap-4">
          <div class="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
            <img 
              v-if="formData.photoPreview" 
              :src="formData.photoPreview" 
              alt="Admin photo"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-medium">
              {{ formData.fullName ? formData.fullName.charAt(0) : 'A' }}
            </div>
          </div>
          
          <div class="text-center">
            <p class="text-xs text-gray-500 mb-2">Format: JPEG or PNG format is recommended.</p>
            <p class="text-xs text-gray-500 mb-2">Dimension: Optimal dimension is 800 pixels by 1200 pixels in width and 1000 pixels to 1200 pixels in height.</p>
            <p class="text-xs text-gray-500 mb-3">File Size: Please ensure that image file is less than 1 MB in size. Smaller file size optimise website loading speed without compromising image quality</p>
            <button 
              @click="triggerFileInput"
              class="px-6 py-2 border-2 border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors"
            >
              Choose file
            </button>
            <input 
              ref="fileInput"
              type="file" 
              accept="image/jpeg,image/png"
              @change="handleFileChange"
              class="hidden"
            />
          </div>
        </div>

        <!-- Full Name -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Full Name</label>
          <input 
            type="text"
            v-model="formData.fullName"
            placeholder="e.g John Makenzie"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Email Address -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Email Address</label>
          <input 
            type="email"
            v-model="formData.email"
            placeholder="info@zahakofasystems.com"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Role -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Role</label>
          <select 
            v-model="formData.role"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="">Select option</option>
            <option value="administrator">Administrator</option>
            <option value="consultation-admin">Consultation-Admin</option>
            <option value="user-admin">User-Admin</option>
            <option value="interior-admin">Interior-Admin</option>
          </select>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Status</label>
          <select 
            v-model="formData.status"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="">Select option</option>
            <option value="active">Active</option>
            <option value="deactivated">Deactivated</option>
          </select>
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
          {{ isEditMode ? 'Update Admin' : 'Saved Admin' }}
        </button>
      </div>
    </div>

    <!-- Success Dialog -->
    <ConfirmDialog
      v-if="showSuccessModal"
      :title="isEditMode ? 'Admin Updated' : 'Admin Added'"
      :description="isEditMode ? 'You have successfully updated the Admin details' : 'You have successfully added an Admin'"
      confirm-text="Okay"
      :show-cancel="false"
      @confirm="closeSuccessModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const route = useRoute()

const isEditMode = ref(false)
const fileInput = ref(null)

const formData = ref({
  fullName: '',
  email: '',
  role: '',
  status: '',
  photoPreview: null
})

const showSuccessModal = ref(false)

// Check if in edit mode
onMounted(() => {
  if (route.params.id) {
    isEditMode.value = true
    // TODO: Fetch admin data by ID
    // For now, populate with sample data
    formData.value = {
      fullName: 'John Makenzie',
      email: 'info@zahakofasystems.com',
      role: 'administrator',
      status: 'active',
      photoPreview: null
    }
  }
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.photoPreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const save = () => {
  // TODO: Validate and save admin
  console.log('Save admin:', formData.value)
  showSuccessModal.value = true
}

const cancel = () => {
  router.push({ name: 'admin-admins' })
}

const goBack = () => {
  router.push({ name: 'admin-admins' })
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  router.push({ name: 'admin-admins' })
}
</script>
