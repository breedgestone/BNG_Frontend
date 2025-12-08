<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Profile</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Profile</span>
      </nav>
    </div>

    <!-- Account Settings Card -->
    <div class="bg-white rounded-xl shadow-sm p-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column - Form Fields -->
        <div class="space-y-6">
          <!-- First name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">First name</label>
            <input 
              type="text"
              v-model="formData.firstName"
              placeholder="Dianne"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input 
              type="text"
              v-model="formData.lastName"
              placeholder="Russell"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email"
              v-model="formData.email"
              placeholder="dianne.russell@gmail.com"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input 
              type="tel"
              v-model="formData.phoneNumber"
              placeholder="(603) 555-0123"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <!-- Right Column - Profile Image -->
        <div class="flex flex-col items-center justify-start pt-8">
          <div class="w-48 h-48 rounded-full bg-gray-200 overflow-hidden mb-6">
            <img 
              v-if="formData.photoPreview" 
              :src="formData.photoPreview" 
              alt="Profile photo"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-6xl font-medium">
              {{ formData.firstName ? formData.firstName.charAt(0) : 'D' }}
            </div>
          </div>
          
          <button 
            @click="triggerFileInput"
            class="px-6 py-2.5 border-2 border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors"
          >
            Chose Image
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
    </div>

    <!-- Change Password Card -->
    <div class="bg-white rounded-xl shadow-sm p-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
      
      <div class="max-w-2xl space-y-6">
        <!-- Current Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <div class="relative">
            <input 
              :type="showCurrentPassword ? 'text' : 'password'"
              v-model="passwordData.currentPassword"
              placeholder="Password"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary pr-12"
            />
            <button 
              @click="showCurrentPassword = !showCurrentPassword"
              type="button"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.66602 10C1.66602 10 4.16602 4.16666 9.99935 4.16666C15.8327 4.16666 18.3327 10 18.3327 10C18.3327 10 15.8327 15.8333 9.99935 15.8333C4.16602 15.8333 1.66602 10 1.66602 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- New Password and Confirm Password -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- New Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">New Password Password</label>
            <div class="relative">
              <input 
                :type="showNewPassword ? 'text' : 'password'"
                v-model="passwordData.newPassword"
                placeholder="Password"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary pr-12"
              />
              <button 
                @click="showNewPassword = !showNewPassword"
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.66602 10C1.66602 10 4.16602 4.16666 9.99935 4.16666C15.8327 4.16666 18.3327 10 18.3327 10C18.3327 10 15.8327 15.8333 9.99935 15.8333C4.16602 15.8333 1.66602 10 1.66602 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div class="relative">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="passwordData.confirmPassword"
                placeholder="Password"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary pr-12"
              />
              <button 
                @click="showConfirmPassword = !showConfirmPassword"
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.66602 10C1.66602 10 4.16602 4.16666 9.99935 4.16666C15.8327 4.16666 18.3327 10 18.3327 10C18.3327 10 15.8327 15.8333 9.99935 15.8333C4.16602 15.8333 1.66602 10 1.66602 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Change Password Button -->
        <div>
          <button 
            @click="changePassword"
            class="px-8 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>

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
import { ref } from 'vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const fileInput = ref(null)

// Form data
const formData = ref({
  firstName: 'Dianne',
  lastName: 'Russell',
  email: 'dianne.russell@gmail.com',
  phoneNumber: '(603) 555-0123',
  photoPreview: null
})

// Password data
const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Password visibility toggles
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Success dialog
const showSuccessDialog = ref(false)
const successDialogTitle = ref('')
const successDialogDescription = ref('')

// File upload
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.photoPreview = e.target.result
      // TODO: Upload to server
      successDialogTitle.value = 'Profile Updated'
      successDialogDescription.value = 'Your profile photo has been updated successfully'
      showSuccessDialog.value = true
    }
    reader.readAsDataURL(file)
  }
}

// Change password
const changePassword = () => {
  // Validate passwords
  if (!passwordData.value.currentPassword || !passwordData.value.newPassword || !passwordData.value.confirmPassword) {
    alert('Please fill in all password fields')
    return
  }

  if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
    alert('New password and confirm password do not match')
    return
  }

  // TODO: API call to change password
  console.log('Change password:', passwordData.value)
  
  // Clear password fields
  passwordData.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  // Show success dialog
  successDialogTitle.value = 'Password Changed'
  successDialogDescription.value = 'Your password has been changed successfully'
  showSuccessDialog.value = true
}

// Close success dialog
const closeSuccessDialog = () => {
  showSuccessDialog.value = false
  successDialogTitle.value = ''
  successDialogDescription.value = ''
}
</script>
