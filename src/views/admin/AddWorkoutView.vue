<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const route = useRoute()

// Check if we're in edit mode
const isEditMode = ref(false)
const workoutId = ref(null)

// Form fields
const workoutName = ref('')
const workoutType = ref('')
const level = ref('')
const targetedBodyParts = ref('')
const duration = ref('')
const expectedCalories = ref('')
const imagePreview = ref(null)

// Exercises array
const exercises = ref([
  {
    id: 1,
    name: '',
    overview: '',
    focusAreas: '',
    commonMistakes: '',
    breathingTips: '',
    video: null
  }
])

// Show success modal
const showSuccessModal = ref(false)
const successTitle = ref('')
const successDescription = ref('')

// Load workout data if editing
onMounted(() => {
  if (route.params.id) {
    isEditMode.value = true
    workoutId.value = route.params.id
    loadWorkoutData()
  }
})

// Load workout data for editing
const loadWorkoutData = () => {
  // TODO: Fetch workout data from API
  console.log('Loading workout data for ID:', workoutId.value)
  
  // Mock data for now
  workoutName.value = 'Cardio Breath Training'
  workoutType.value = 'paid'
  level.value = 'intermediate'
  targetedBodyParts.value = 'chest'
  duration.value = '30'
  expectedCalories.value = '2000'
  
  exercises.value = [
    {
      id: 1,
      name: 'Burpees',
      overview: 'Full body exercise combining squat, push-up, and jump',
      focusAreas: 'chest',
      commonMistakes: 'Not going low enough in squat position',
      breathingTips: 'Exhale on the jump, inhale on the squat',
      video: null
    }
  ]
}

// Add another exercise
const addExercise = () => {
  exercises.value.push({
    id: exercises.value.length + 1,
    name: '',
    overview: '',
    focusAreas: '',
    commonMistakes: '',
    breathingTips: '',
    video: null
  })
}

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Handle image upload logic
    console.log('Image uploaded:', file)
  }
}

// Handle video upload
const handleVideoUpload = (exerciseId, event) => {
  const file = event.target.files[0]
  if (file) {
    const exercise = exercises.value.find(ex => ex.id === exerciseId)
    if (exercise) {
      exercise.video = file
      console.log('Video uploaded for exercise:', exerciseId, file)
    }
  }
}

// Trigger file input
const triggerImageUpload = () => {
  document.getElementById('image-upload').click()
}

const triggerVideoUpload = (exerciseId) => {
  document.getElementById(`video-upload-${exerciseId}`).click()
}

// Cancel form
const handleCancel = () => {
  router.push({ name: 'admin-workouts' })
}

// Save workout
const handleSave = () => {
  const workoutData = {
    workoutName: workoutName.value,
    workoutType: workoutType.value,
    level: level.value,
    targetedBodyParts: targetedBodyParts.value,
    duration: duration.value,
    expectedCalories: expectedCalories.value,
    exercises: exercises.value
  }
  
  if (isEditMode.value) {
    console.log('Updating workout:', workoutId.value, workoutData)
    successTitle.value = 'Workout Updated Successfully'
    successDescription.value = 'You have updated this workout for users'
  } else {
    console.log('Creating new workout:', workoutData)
    successTitle.value = 'Workout Created Successfully'
    successDescription.value = 'You have created this workouts for users'
  }
  
  // Show success modal
  showSuccessModal.value = true
}

// Close success modal and redirect
const closeSuccessModal = () => {
  showSuccessModal.value = false
  router.push({ name: 'admin-workouts' })
}
</script>

<template>
  <div class="space-y-6 pb-20">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ isEditMode ? 'Edit Workout' : 'Add Workout' }}
      </h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <button class="cursor-pointer" @click="router.push('/admin/workouts')">Workouts</button>
        <span>→</span>
        <span class="text-primary">{{ isEditMode ? 'Edit Workout' : 'Add Workout' }}</span>
      </nav>
    </div>

    <!-- Main Form Card -->
    <div class="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <!-- Workout Name -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Workout name</label>
        <input 
          v-model="workoutName"
          type="text"
          placeholder="Enter Class name"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- Type (Free/Paid) -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Type(Free/Paid)</label>
        <select 
          v-model="workoutType"
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

      <!-- Targeted Body parts -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Targeted Body parts</label>
        <select 
          v-model="targetedBodyParts"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="" disabled>Type and click enter to save</option>
          <option value="chest">Chest</option>
          <option value="back">Back</option>
          <option value="shoulders">Shoulders</option>
          <option value="arms">Arms</option>
          <option value="legs">Legs</option>
          <option value="core">Core</option>
        </select>
      </div>

      <!-- Duration -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Duration (Minutes)</label>
        <select 
          v-model="duration"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="" disabled>Enter Duration</option>
          <option value="15">15 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="45">45 Minutes</option>
          <option value="60">60 Minutes</option>
        </select>
      </div>

      <!-- Expected Calories to Burn -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Expected Calories to Burn</label>
        <select 
          v-model="expectedCalories"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="" disabled>Enter Calories</option>
          <option value="1000">1,000</option>
          <option value="2000">2,000</option>
          <option value="3000">3,000</option>
          <option value="4000">4,000</option>
          <option value="5000">5,000</option>
        </select>
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
    </div>

    <!-- Exercises Section -->
    <div 
      v-for="(exercise, index) in exercises" 
      :key="exercise.id"
      class="bg-white rounded-xl shadow-sm p-6 space-y-6"
    >
      <!-- Exercise Header with Blue Line -->
      <div class="border-l-4 border-primary pl-4">
        <h3 class="text-lg font-semibold text-gray-900">Exercise {{ index + 1 }}</h3>
      </div>

      <!-- Exercise Name -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Exercise Name</label>
        <input 
          v-model="exercise.name"
          type="text"
          placeholder="Enter Exercise name"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- Overview -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Overview</label>
        <textarea 
          v-model="exercise.overview"
          rows="4"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        ></textarea>
      </div>

      <!-- Focus Areas -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Focus Areas</label>
        <select 
          v-model="exercise.focusAreas"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="" disabled>Type and click enter to save</option>
          <option value="chest">Chest</option>
          <option value="back">Back</option>
          <option value="shoulders">Shoulders</option>
        </select>
      </div>

      <!-- Common Mistakes -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Common Mistakes</label>
        <textarea 
          v-model="exercise.commonMistakes"
          rows="4"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        ></textarea>
      </div>

      <!-- Breathing Tips -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Breathing Tips</label>
        <textarea 
          v-model="exercise.breathingTips"
          rows="4"
          class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        ></textarea>
      </div>

      <!-- Exercise Video -->
      <div>
        <label class="block text-sm font-medium text-gray-900 mb-2">Exercise Video</label>
        
        <div 
          @click="triggerVideoUpload(exercise.id)"
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
          :id="`video-upload-${exercise.id}`"
          type="file"
          accept="video/*"
          @change="handleVideoUpload(exercise.id, $event)"
          class="hidden"
        />
      </div>
    </div>

    <!-- Add Another Exercise Button -->
    <button 
      @click="addExercise"
      class="flex items-center gap-2 text-primary text-sm font-medium hover:text-primary-600 transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3.33333V12.6667M3.33333 8H12.6667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Add Another Exercise
    </button>

    <!-- Action Buttons -->
    <div class="flex items-center justify-end gap-4 pt-6">
      <button 
        @click="handleCancel"
        class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
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
