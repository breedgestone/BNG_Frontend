<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Active tab
const activeTab = ref('profile')

// Tabs for sidebar navigation
const tabs = [
  { id: 'profile', label: 'Profile', icon: 'user' },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'subscription' },
  { id: 'assessment', label: 'Assessment', icon: 'assessment' },
  { id: 'scans-history', label: 'Scans History', icon: 'scan' },
  { id: 'workout', label: 'Workout', icon: 'workout' },
  { id: 'trainers', label: 'Trainers', icon: 'trainers' },
  { id: 'reviews', label: 'Reviews', icon: 'reviews' }
]

// User data (in real app, fetch based on route.params.id)
const userData = ref({
  id: route.params.id,
  firstName: 'Brooklyn',
  lastName: 'Simmons',
  email: 'brooklyn.s@example.com',
  phone: '(816) 574-0122',
  country: 'Nigeria',
  state: 'Abuja',
  address: 'No. 11 Gambia Street, Landtech Estate, Kado',
  role: 'User',
  avatar: null // You can add avatar URL here
})

// Subscription data
const subscriptionData = ref({
  planName: 'Monthly Session plan',
  nextBillingDate: '4/12/25',
  amount: '₦20,00',
  perMonth: 'per month',
  subscribers: 50
})

// Billing history
const billingHistory = ref([
  { id: 1, billingId: '#780-Dec 2022', status: 'Paid', date: 'Dec 23, 2022', amount: '₦25,000.00', plan: 'Monthly plan' },
  { id: 2, billingId: '#780-Dec 2022', status: 'Paid', date: 'Dec 23, 2025', amount: '₦25,000.00', plan: 'Monthly plan' },
  { id: 3, billingId: '#780-Dec 2022', status: 'Paid', date: 'Dec 23, 2025', amount: '₦25,000.00', plan: 'Monthly plan' },
  { id: 4, billingId: '#780-Dec 2022', status: 'Paid', date: 'Dec 23, 2025', amount: '₦25,000.00', plan: 'Monthly plan' },
  { id: 5, billingId: '#780-Dec 2022', status: 'Paid', date: 'Dec 23, 2025', amount: '₦25,000.00', plan: 'Monthly plan' },
  { id: 6, billingId: '#780-Dec 2022', status: 'Paid', date: 'Dec 23, 2025', amount: '₦25,000.00', plan: 'Monthly plan' }
])

// Assessment data
const assessmentData = ref({
  gender: 'Male',
  weight: '112kg',
  experience: 'Beginner',
  physicalLimitations: 'Back Pain',
  commitedDays: 'Sun, Mon, Wed, Sat',
  supplements: 'No',
  sleepQuality: 'Great',
  level: '4',
  age: '39',
  fitnessLevel: '4',
  diet: 'Carbs',
  exercisePreference: 'Weight Lift',
  calorieGoal: '15,000'
})

// Scans history data
const scansHistory = ref([
  { id: 1, time: '19/09/25 . 8:30 - 9:00', status: 'Successful' },
  { id: 2, time: '19/09/25 . 8:30 - 9:00', status: 'Successful' },
  { id: 3, time: '19/09/25 . 8:30 - 9:00', status: 'Successful' },
  { id: 4, time: '19/09/25 . 8:30 - 9:00', status: 'Successful' },
  { id: 5, time: '19/09/25 . 8:30 - 9:00', status: 'Successful' },
  { id: 6, time: '19/09/25 . 8:30 - 9:00', status: 'Successful' },
  { id: 7, time: '19/09/25 . 8:30 - 9:00', status: 'Successful' },
  { id: 8, time: '19/09/25 . 8:30 - 9:00', status: 'Successful' }
])

// Workout data
const workoutData = ref([
  { id: 1, name: 'Cardio Breath Trainin', dateEntered: '19/09/25', session: 'Free Plan', status: 'Completed' },
  { id: 2, name: 'Cardio Breath Trainin', dateEntered: '19/09/25', session: 'Trainer', status: 'Ongoing' },
  { id: 3, name: 'Cardio Breath Trainin', dateEntered: '19/09/25', session: 'Monthly Plan', status: 'Completed' },
  { id: 4, name: 'Cardio Breath Trainin', dateEntered: '19/09/25', session: 'Session Plan', status: 'Cancelled' }
])

// Trainers data
const trainersData = ref([
  { id: 1, name: 'David Lawal', dateEnrolled: '19/09/25', session: '₦10,000.00', type: 'Trained By me', status: 'Completed' },
  { id: 2, name: 'David Lawal', dateEnrolled: '19/09/25', session: '₦10,000.00', type: 'Trained me', status: 'Ongoing' },
  { id: 3, name: 'David Lawal', dateEnrolled: '19/09/25', session: '₦10,000.00', type: 'Trained me', status: 'Completed' },
  { id: 4, name: 'David Lawal', dateEnrolled: '19/09/25', session: '₦10,000.00', type: 'Trained By me', status: 'Cancelled' }
])

// Reviews data
const reviewsData = ref([
  {
    id: 1,
    user: 'Esther Howard',
    date: '15/09/25',
    rating: 5,
    review: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    avatar: null
  },
  {
    id: 2,
    user: 'Esther Howard',
    date: '15/09/25',
    rating: 5,
    review: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    avatar: null
  },
  {
    id: 3,
    user: 'Esther Howard',
    date: '15/09/25',
    rating: 5,
    review: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    avatar: null
  }
])

const showDropdown = ref(null)

const goBack = () => {
  router.push({ name: 'admin-users' })
}

const setAsTrainer = () => {
  console.log('Set as Trainer:', userData.value)
  // Implement set as trainer logic
}

const deactivateProfile = () => {
  console.log('Deactivate Profile:', userData.value)
  // Implement deactivation logic
}

const downloadReceipt = (item) => {
  console.log('Download receipt:', item)
  // Implement download logic
}

const viewReceipt = (item) => {
  console.log('View receipt:', item)
  // Implement view receipt logic
}

const sendReceiptToUser = (item) => {
  console.log('Send receipt to user:', item)
  showDropdown.value = null
  // Implement send receipt logic
}

const toggleDropdown = (id) => {
  showDropdown.value = showDropdown.value === id ? null : id
}

const downloadAllBilling = () => {
  console.log('Download all billing history')
  // Implement download all logic
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">View User</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span>User</span>
        <span>→</span>
        <span class="text-primary">View User</span>
      </nav>
    </div>

    <!-- Back Button -->
    <button 
      @click="goBack"
      class="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="font-medium">Back to User</span>
    </button>

    <!-- User Info Card -->
    <div class="bg-white rounded-xl p-6 shadow-sm">
      <div class="flex items-start justify-between">
        <!-- User Profile -->
        <div class="flex items-center gap-4">
          <!-- Avatar -->
          <div class="w-20 h-20 rounded-lg bg-gray-200 overflow-hidden shrink-0">
            <img 
              v-if="userData.avatar" 
              :src="userData.avatar" 
              :alt="userData.firstName"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20C24.4183 20 28 16.4183 28 12C28 7.58172 24.4183 4 20 4C15.5817 4 12 7.58172 12 12C12 16.4183 15.5817 20 20 20Z" fill="currentColor"/>
                <path d="M20 24C11.7157 24 5 28.4772 5 34V36H35V34C35 28.4772 28.2843 24 20 24Z" fill="currentColor"/>
              </svg>
            </div>
          </div>

          <!-- User Details -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ userData.firstName }} {{ userData.lastName }}</h2>
            <div class="space-y-1">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M13 14C13 11.7909 10.7614 10 8 10C5.23858 10 3 11.7909 3 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span>{{ userData.role }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.66667 2.66667H13.3333C14.0667 2.66667 14.6667 3.26667 14.6667 4V12C14.6667 12.7333 14.0667 13.3333 13.3333 13.3333H2.66667C1.93333 13.3333 1.33333 12.7333 1.33333 12V4C1.33333 3.26667 1.93333 2.66667 2.66667 2.66667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14.6667 4L8 8.66667L1.33333 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ userData.email }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3">
          <button 
            @click="setAsTrainer"
            class="px-6 py-2.5 border-2 border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M10 6.66667V13.3333M6.66667 10H13.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Set as Trainer
          </button>
          <button 
            @click="deactivateProfile"
            class="px-6 py-2.5 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M6.66667 10H13.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Deactivate Profile
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'w-full px-6 py-4 text-left flex items-center gap-3 transition-colors border-l-4',
              activeTab === tab.id 
                ? 'bg-primary text-white border-primary font-medium' 
                : 'bg-white text-gray-700 border-transparent hover:bg-gray-50'
            ]"
          >
            <!-- Icon placeholders -->
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
              <path d="M10 12.5C5 12.5 0 15 0 18.3333V20H20V18.3333C20 15 15 12.5 10 12.5Z" fill="currentColor"/>
            </svg>
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <!-- Profile Tab Content -->
          <div v-if="activeTab === 'profile'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- First Name -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                <div class="text-base text-gray-900">{{ userData.firstName }}</div>
              </div>

              <!-- Last Name -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                <div class="text-base text-gray-900">{{ userData.lastName }}</div>
              </div>

              <!-- Mobile Number -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Mobile Number</label>
                <div class="text-base text-gray-900">{{ userData.phone }}</div>
              </div>

              <!-- Email Address -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                <div class="text-base text-gray-900">{{ userData.email }}</div>
              </div>

              <!-- Country -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Country</label>
                <div class="text-base text-gray-900">{{ userData.country }}</div>
              </div>

              <!-- State -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">State</label>
                <div class="text-base text-gray-900">{{ userData.state }}</div>
              </div>

              <!-- Address -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-600 mb-2">Address</label>
                <div class="text-base text-gray-900">{{ userData.address }}</div>
              </div>

              <!-- Role -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Role</label>
                <div class="text-base text-gray-900">{{ userData.role }}</div>
              </div>
            </div>
          </div>

          <!-- Subscriptions Tab Content -->
          <div v-else-if="activeTab === 'subscriptions'" class="space-y-6">
            <!-- Subscription Plan Card -->
            <div class="bg-gray-50 rounded-xl p-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ subscriptionData.planName }}</h3>
                  <p class="text-sm text-gray-600">Next Billing Date: {{ subscriptionData.nextBillingDate }}</p>
                  <div class="flex items-center gap-2 mt-3">
                    <!-- Avatar Group -->
                    <div class="flex -space-x-2">
                      <div class="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                      <div class="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                      <div class="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                      <div class="w-8 h-8 rounded-full bg-orange-500 border-2 border-white"></div>
                      <div class="w-8 h-8 rounded-full bg-pink-500 border-2 border-white"></div>
                    </div>
                    <span class="text-sm text-gray-600">+{{ subscriptionData.subscribers }} people</span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold text-gray-900">{{ subscriptionData.amount }}</div>
                  <div class="text-sm text-gray-500">{{ subscriptionData.perMonth }}</div>
                </div>
              </div>
            </div>

            <!-- Billing History -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Billing history</h3>
                  <p class="text-sm text-gray-600">Download your previous plan receipts and usage details.</p>
                </div>
                <button 
                  @click="downloadAllBilling"
                  class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  Download all
                </button>
              </div>

              <!-- Billing Table -->
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        <input type="checkbox" class="rounded border-gray-300" />
                      </th>
                      <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Billing Date</th>
                      <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                      <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                      <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                      <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Plan</th>
                      <th class="px-4 py-3 text-left text-sm font-medium text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="item in billingHistory" :key="item.id" class="hover:bg-gray-50">
                      <td class="px-4 py-4">
                        <input type="checkbox" class="rounded border-gray-300" />
                      </td>
                      <td class="px-4 py-4 text-sm text-gray-900 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3333 2H2.66667C1.93333 2 1.33333 2.6 1.33333 3.33333V13.3333C1.33333 14.0667 1.93333 14.6667 2.66667 14.6667H13.3333C14.0667 14.6667 14.6667 14.0667 14.6667 13.3333V3.33333C14.6667 2.6 14.0667 2 13.3333 2Z" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                        {{ item.billingId }}
                      </td>
                      <td class="px-4 py-4">
                        <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{{ item.status }}</span>
                      </td>
                      <td class="px-4 py-4 text-sm text-gray-900">{{ item.date }}</td>
                      <td class="px-4 py-4 text-sm text-gray-900">{{ item.amount }}</td>
                      <td class="px-4 py-4 text-sm text-gray-900">{{ item.plan }}</td>
                      <td class="px-4 py-4">
                        <div class="flex items-center gap-2">
                          <button 
                            @click="downloadReceipt(item)"
                            class="px-4 py-1.5 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
                          >
                            Download
                          </button>
                          <div class="relative">
                            <button 
                              @click="toggleDropdown(item.id)"
                              class="p-1 hover:bg-gray-100 rounded"
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53976 10.4602 9.16667 10 9.16667C9.53976 9.16667 9.16667 9.53976 9.16667 10C9.16667 10.4602 9.53976 10.8333 10 10.8333Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 5C10.4602 5 10.8333 4.62691 10.8333 4.16667C10.8333 3.70643 10.4602 3.33333 10 3.33333C9.53976 3.33333 9.16667 3.70643 9.16667 4.16667C9.16667 4.62691 9.53976 5 10 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8333C10.8333 15.3731 10.4602 15 10 15C9.53976 15 9.16667 15.3731 9.16667 15.8333C9.16667 16.2936 9.53976 16.6667 10 16.6667Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </button>
                            <!-- Dropdown Menu -->
                            <div 
                              v-if="showDropdown === item.id"
                              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                            >
                              <button 
                                @click="viewReceipt(item)"
                                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                              >
                                View Receipt
                              </button>
                              <button 
                                @click="sendReceiptToUser(item)"
                                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                              >
                                Send Receipt to User
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Assessment Tab Content -->
          <div v-else-if="activeTab === 'assessment'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Gender</label>
                <div class="text-base text-gray-900">{{ assessmentData.gender }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Level</label>
                <div class="text-base text-gray-900">{{ assessmentData.level }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Weight</label>
                <div class="text-base text-gray-900">{{ assessmentData.weight }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Age</label>
                <div class="text-base text-gray-900">{{ assessmentData.age }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Experience</label>
                <div class="text-base text-gray-900">{{ assessmentData.experience }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Fitness Level</label>
                <div class="text-base text-gray-900">{{ assessmentData.fitnessLevel }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Physical Limitations</label>
                <div class="text-base text-gray-900">{{ assessmentData.physicalLimitations }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Diet</label>
                <div class="text-base text-gray-900">{{ assessmentData.diet }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Commited Days</label>
                <div class="text-base text-gray-900">{{ assessmentData.commitedDays }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Exercise Preference</label>
                <div class="text-base text-gray-900">{{ assessmentData.exercisePreference }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Supplements</label>
                <div class="text-base text-gray-900">{{ assessmentData.supplements }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">Calorie Goal</label>
                <div class="text-base text-gray-900">{{ assessmentData.calorieGoal }}</div>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-600 mb-2">Sleep Quality</label>
                <div class="text-base text-gray-900">{{ assessmentData.sleepQuality }}</div>
              </div>
            </div>
          </div>

          <!-- Scans History Tab Content -->
          <div v-else-if="activeTab === 'scans-history'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="font-medium text-gray-900">Time</div>
              <div class="font-medium text-gray-900">Status</div>
            </div>
            <div 
              v-for="scan in scansHistory" 
              :key="scan.id"
              class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="text-sm text-gray-900">{{ scan.time }}</div>
              <div>
                <span class="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-sm font-medium border border-green-200 inline-block">
                  {{ scan.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Workout Tab Content -->
          <div v-else-if="activeTab === 'workout'" class="space-y-4">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Date Entered</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Session</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="workout in workoutData" :key="workout.id" class="hover:bg-gray-50">
                    <td class="px-4 py-4 text-sm text-gray-900">{{ workout.name }}</td>
                    <td class="px-4 py-4 text-sm text-gray-900">{{ workout.dateEntered }}</td>
                    <td class="px-4 py-4 text-sm text-gray-900">{{ workout.session }}</td>
                    <td class="px-4 py-4">
                      <span 
                        :class="{
                          'bg-green-50 text-green-600 border-green-200': workout.status === 'Completed',
                          'bg-orange-50 text-orange-600 border-orange-200': workout.status === 'Ongoing',
                          'bg-red-50 text-red-600 border-red-200': workout.status === 'Cancelled'
                        }"
                        class="px-4 py-1.5 rounded-full text-sm font-medium border inline-block"
                      >
                        {{ workout.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Trainers Tab Content -->
          <div v-else-if="activeTab === 'trainers'" class="space-y-4">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Trainer/Trainee Name</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Date Enrolled</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Session</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="trainer in trainersData" :key="trainer.id" class="hover:bg-gray-50">
                    <td class="px-4 py-4 text-sm text-gray-900">{{ trainer.name }}</td>
                    <td class="px-4 py-4 text-sm text-gray-900">{{ trainer.dateEnrolled }}</td>
                    <td class="px-4 py-4 text-sm text-gray-900">{{ trainer.session }}</td>
                    <td class="px-4 py-4 text-sm text-gray-900">{{ trainer.type }}</td>
                    <td class="px-4 py-4">
                      <span 
                        :class="{
                          'bg-green-50 text-green-600 border-green-200': trainer.status === 'Completed',
                          'bg-orange-50 text-orange-600 border-orange-200': trainer.status === 'Ongoing',
                          'bg-red-50 text-red-600 border-red-200': trainer.status === 'Cancelled'
                        }"
                        class="px-4 py-1.5 rounded-full text-sm font-medium border inline-block"
                      >
                        {{ trainer.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Reviews Tab Content -->
          <div v-else-if="activeTab === 'reviews'" class="space-y-4">
            <div 
              v-for="review in reviewsData" 
              :key="review.id"
              class="bg-gray-50 rounded-xl p-6"
            >
              <div class="flex items-start gap-4">
                <!-- Avatar -->
                <div class="w-12 h-12 bg-gray-300 rounded-full shrink-0"></div>
                
                <!-- Review Content -->
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-gray-900">{{ review.user }}</h4>
                    <span class="text-sm text-gray-500">{{ review.date }}</span>
                  </div>
                  
                  <!-- Star Rating -->
                  <div class="flex items-center gap-1 mb-3">
                    <svg 
                      v-for="star in 5" 
                      :key="star"
                      :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                      class="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  
                  <!-- Review Text -->
                  <p class="text-sm text-gray-600 leading-relaxed">{{ review.review }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Other Tabs (Placeholder) -->
          <div v-else class="text-center py-12">
            <p class="text-gray-500">{{ tabs.find(t => t.id === activeTab)?.label }} content coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styling if needed */
</style>
