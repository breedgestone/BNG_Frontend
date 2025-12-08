<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const route = useRoute()

// Check if we're in edit mode
const isEditMode = ref(false)
const classId = ref(null)

// Form fields
const className = ref('')
const classType = ref('')
const level = ref('')
const goal = ref('')
const amenities = ref('')
const classDescription = ref('')
const imagePreview = ref(null)
const tutorialVideos = ref([])

// Schedule data for each day
const schedule = ref({
  monday: { enabled: false, slots: [] },
  tuesday: { enabled: false, slots: [] },
  wednesday: { enabled: false, slots: [] },
  thursday: { enabled: false, slots: [] },
  friday: { enabled: false, slots: [] },
  saturday: { enabled: false, slots: [] },
  sunday: { enabled: false, slots: [] }
})

// Show success modal
const showSuccessModal = ref(false)
const successTitle = ref('')
const successDescription = ref('')

// Load class data if editing
onMounted(() => {
  if (route.params.id) {
    isEditMode.value = true
    classId.value = route.params.id
    loadClassData()
  }
})

// Load class data for editing
const loadClassData = () => {
  // TODO: Fetch class data from API
  console.log('Loading class data for ID:', classId.value)
  
  // Mock data for now
  className.value = 'Power Burn Conditioning'
  classType.value = 'paid'
  level.value = 'intermediate'
  goal.value = 'Weight Loss'
  amenities.value = 'Yoga Mat, Dumbbells'
  classDescription.value = 'High-intensity conditioning class for weight loss'
  
  // Mock schedule
  schedule.value.monday.enabled = true
  schedule.value.monday.slots = [{ from: '08:00 AM', to: '02:00 PM' }]
  
  schedule.value.wednesday.enabled = true
  schedule.value.wednesday.slots = [{ from: '08:00 AM', to: '02:00 PM' }]
  
  schedule.value.sunday.enabled = true
  schedule.value.sunday.slots = [{ from: '08:00 AM', to: '02:00 PM' }]
}

// Toggle day
const toggleDay = (day) => {
  schedule.value[day].enabled = !schedule.value[day].enabled
  if (schedule.value[day].enabled && schedule.value[day].slots.length === 0) {
    addTimeSlot(day)
  }
}

// Add time slot to a day
const addTimeSlot = (day) => {
  schedule.value[day].slots.push({ from: '08:00 AM', to: '02:00 PM' })
}

// Remove time slot
const removeTimeSlot = (day, index) => {
  schedule.value[day].slots.splice(index, 1)
}

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    console.log('Image uploaded:', file)
    // TODO: Handle image upload logic
  }
}

// Handle video upload
const handleVideoUpload = (event) => {
  const files = Array.from(event.target.files)
  if (files.length > 0) {
    tutorialVideos.value = [...tutorialVideos.value, ...files]
    console.log('Videos uploaded:', files)
    // TODO: Handle video upload logic
  }
}

// Trigger file input
const triggerImageUpload = () => {
  document.getElementById('image-upload').click()
}

const triggerVideoUpload = () => {
  document.getElementById('video-upload').click()
}

// Cancel form
const handleCancel = () => {
  router.push({ name: 'admin-workouts' })
}

// Save class
const handleSave = () => {
  const classData = {
    className: className.value,
    classType: classType.value,
    level: level.value,
    goal: goal.value,
    amenities: amenities.value,
    classDescription: classDescription.value,
    schedule: schedule.value
  }
  
  if (isEditMode.value) {
    console.log('Updating class:', classId.value, classData)
    successTitle.value = 'Class Updated Successfully'
    successDescription.value = 'You have updated this class for users'
  } else {
    console.log('Creating new class:', classData)
    successTitle.value = 'Class Created Successfully'
    successDescription.value = 'You have created this class for users'
  }
  
  // Show success modal
  showSuccessModal.value = true
}

// Close success modal and redirect
const closeSuccessModal = () => {
  showSuccessModal.value = false
  router.push({ name: 'admin-workouts' })
}

// Day names mapping
const dayNames = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday'
}
</script>

<template>
  <div class="space-y-6 pb-20">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ isEditMode ? 'Edit Class' : 'Add Classes' }}
      </h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">{{ isEditMode ? 'Edit Class' : 'Add Classes' }}</span>
      </nav>
    </div>

    <!-- Main Form Card -->
    <div class="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <!-- Class Name -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Class name</label>
        <input 
          v-model="className"
          type="text"
          placeholder="Enter Class name"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- Type (Free/Paid) -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Type(Free/Paid)</label>
        <select 
          v-model="classType"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="" disabled>Select type</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <!-- Level -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Level</label>
        <select 
          v-model="level"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="" disabled>Select level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <!-- Goal -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Goal</label>
        <select 
          v-model="goal"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="" disabled>Select Goal</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Endurance">Endurance</option>
          <option value="Flexibility">Flexibility</option>
        </select>
      </div>

      <!-- Enter Amenities/Features -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Enter Amenities/Features</label>
        <input 
          v-model="amenities"
          type="text"
          placeholder="Type and click enter to save"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- Enter Class Description -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Enter Class Description</label>
        <textarea 
          v-model="classDescription"
          rows="4"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        ></textarea>
      </div>

      <!-- Image Preview -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Image Preview</label>
        <p class="text-sm text-gray-500 mb-3">Provide preview/cover image</p>
        
        <div 
          @click="triggerImageUpload"
          class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <div class="flex flex-col items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400 mb-2">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-sm text-gray-500">Upload</span>
          </div>
        </div>
        <input 
          id="image-upload"
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="hidden"
        />
      </div>

      <!-- Video -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Video</label>
        <p class="text-sm text-gray-500 mb-3">Provide Tutorial Videos</p>
        
        <div 
          @click="triggerVideoUpload"
          class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <div class="flex flex-col items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400 mb-2">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-sm text-gray-500">Upload</span>
          </div>
        </div>
        <input 
          id="video-upload"
          type="file"
          accept="video/*"
          multiple
          @change="handleVideoUpload"
          class="hidden"
        />
      </div>
    </div>

    <!-- Add the Hours for Classes -->
    <div class="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Add the Hours for Classes</h3>
        <p class="text-sm text-gray-500">Provide timeframe for this class</p>
      </div>

      <!-- Days Schedule -->
      <div class="space-y-4">
        <div 
          v-for="(day, dayKey) in schedule" 
          :key="dayKey"
          class="space-y-3"
        >
          <!-- Day Header with Toggle -->
          <div class="flex items-center justify-between py-2">
            <span class="text-sm font-medium text-gray-900">{{ dayNames[dayKey] }}</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                :checked="day.enabled"
                @change="toggleDay(dayKey)"
                class="sr-only peer"
              >
              <div class="w-11 h-6 border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:rounded-full after:h-[16px] after:w-[16px] after:transition-all toggle-unchecked peer-checked:toggle-checked"></div>
            </label>
          </div>

          <!-- Time Slots -->
          <div v-if="day.enabled" class="space-y-3">
            <div 
              v-for="(slot, slotIndex) in day.slots" 
              :key="slotIndex"
              class="flex items-center gap-4"
            >
              <input 
                v-model="slot.from"
                type="text"
                placeholder="08:00 AM"
                class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <span class="text-sm text-gray-600">To</span>
              <input 
                v-model="slot.to"
                type="text"
                placeholder="02:00 PM"
                class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button 
                v-if="day.slots.length > 1"
                @click="removeTimeSlot(dayKey, slotIndex)"
                class="p-2 text-primary hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>

            <!-- Add More Hours Button -->
            <button 
              @click="addTimeSlot(dayKey)"
              class="text-primary text-sm font-medium hover:text-primary-600 transition-colors"
            >
              + Add more hour
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center justify-end gap-4 pt-6">
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
        Update
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

/* Toggle switch styling - UNCHECKED state */
.toggle-unchecked {
  background-color: white;
  border-color: var(--color-primary);
}

.toggle-unchecked::after {
  background-color: var(--color-primary);
}

/* Toggle switch styling - CHECKED state */
.peer:checked + div {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.peer:checked + div::after {
  background-color: white;
}
</style>
