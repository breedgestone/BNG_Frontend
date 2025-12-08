<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Table from '@/components/Table.vue'
import BngButton from '@/components/BngButton.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const route = useRoute()

// Dialog states
const showDeactivateDialog = ref(false)
const showSetTrainerDialog = ref(false)
const showSuccessDialog = ref(false)
const successMessage = ref('')
const successTitle = ref('')

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

// Billing table columns
const billingColumns = [
  { key: 'checkbox', label: '' },
  { key: 'billingId', label: 'Billing Date' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'plan', label: 'Plan' },
  { key: 'action', label: '' }
]

// Status styles for billing
const billingStatusStyles = {
  'Paid': 'px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm inline-block'
}

// Workout table columns
const workoutColumns = [
  { key: 'name', label: 'Name' },
  { key: 'dateEntered', label: 'Date Entered' },
  { key: 'session', label: 'Session' },
  { key: 'status', label: 'Status' }
]

// Trainers table columns
const trainersColumns = [
  { key: 'name', label: 'Trainer/Trainee Name' },
  { key: 'dateEnrolled', label: 'Date Enrolled' },
  { key: 'session', label: 'Session' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' }
]

// Status styles for workout and trainers
const statusStyles = {
  'Completed': 'px-4 py-1.5 bg-green-50 text-green-600 border-green-200 rounded-full text-sm font-medium border inline-block',
  'Ongoing': 'px-4 py-1.5 bg-orange-50 text-orange-600 border-orange-200 rounded-full text-sm font-medium border inline-block',
  'Cancelled': 'px-4 py-1.5 bg-red-50 text-red-600 border-red-200 rounded-full text-sm font-medium border inline-block'
}

const goBack = () => {
  router.push({ name: 'admin-users' })
}

const setAsTrainer = () => {
  showSetTrainerDialog.value = true
}

const confirmSetAsTrainer = () => {
  // Implement set as trainer logic here
  console.log('Set as Trainer confirmed:', userData.value)
  
  // Show success dialog
  successTitle.value = 'User Is now Set to Trainer'
  successMessage.value = 'An email has been sent to this user to complete their trainer profile'
  showSuccessDialog.value = true
  
  // In real app, make API call here
}

const deactivateProfile = () => {
  showDeactivateDialog.value = true
}

const confirmDeactivate = () => {
  // Implement deactivation logic here
  console.log('Deactivate Profile confirmed:', userData.value)
  
  // Show success dialog
  successTitle.value = 'Deactivated Successfully'
  successMessage.value = 'You have deactivated this user successfully'
  showSuccessDialog.value = true
  
  // In real app, make API call here
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
      <div class="flex flex-col lg:flex-row items-start justify-between gap-4">
        <!-- User Profile -->
        <div class="flex items-center gap-4">
          <!-- Avatar -->
          <div class="w-16 h-16 lg:w-20 lg:h-20 rounded-lg bg-gray-200 overflow-hidden shrink-0">
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
            <h2 class="text-lg lg:text-xl font-semibold text-gray-900 mb-2">{{ userData.firstName }} {{ userData.lastName }}</h2>
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
                <span class="truncate">{{ userData.email }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <BngButton 
            variant="outline-blue"
            size="md"
            :responsive="true"
            :fullWidth="true"
            @click="setAsTrainer"
          >
            <template #icon>
         <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1226 11.944L13.8926 7.14866C13.5906 6.80541 13.2219 6.52711 12.809 6.33066C12.3962 6.13421 11.9477 6.0237 11.4908 6.00585C12.0354 5.56817 12.4308 4.97224 12.6224 4.30028C12.814 3.62833 12.7922 2.91348 12.5602 2.2544C12.3282 1.59531 11.8974 1.02447 11.3272 0.62067C10.7569 0.216866 10.0754 0 9.3767 0C8.67798 0 7.99647 0.216866 7.42624 0.62067C6.85601 1.02447 6.42517 1.59531 6.19317 2.2544C5.96117 2.91348 5.93946 3.62833 6.13102 4.30028C6.32258 4.97224 6.71798 5.56817 7.26264 6.00585C6.80575 6.0237 6.35726 6.13421 5.94437 6.33066C5.53149 6.52711 5.16283 6.80541 4.86077 7.14866L0.630767 11.944C0.223115 12.3665 -0.00323368 12.9316 3.49136e-05 13.5187C0.0033035 14.1058 0.235931 14.6684 0.648262 15.0864C1.06059 15.5043 1.61996 15.7446 2.20697 15.7558C2.79398 15.767 3.36213 15.5484 3.79014 15.1465L4.42108 14.6412L3.16483 19.4121C2.94545 19.9516 2.94382 20.5552 3.16029 21.0959C3.37675 21.6366 3.79444 22.0722 4.32552 22.3113C4.8566 22.5504 5.45969 22.5742 6.00797 22.3778C6.55626 22.1813 7.00701 21.78 7.26545 21.258L9.3767 17.6215L11.488 21.258C11.7436 21.7751 12.1894 22.1732 12.732 22.369C13.1408 22.5179 13.584 22.5452 14.0079 22.4475C14.4318 22.3497 14.8183 22.1312 15.1206 21.8183C15.4229 21.5054 15.628 21.1116 15.711 20.6845C15.7941 20.2575 15.7516 19.8155 15.5886 19.4121L14.3323 14.6412L14.9633 15.1465C15.3913 15.5484 15.9594 15.767 16.5464 15.7558C17.1334 15.7446 17.6928 15.5043 18.1051 15.0864C18.5175 14.6684 18.7501 14.1058 18.7534 13.5187C18.7566 12.9316 18.5303 12.3665 18.1226 11.944ZM9.3767 2.25585C9.59921 2.25585 9.81671 2.32183 10.0017 2.44545C10.1867 2.56906 10.3309 2.74476 10.4161 2.95033C10.5012 3.1559 10.5235 3.3821 10.4801 3.60033C10.4367 3.81855 10.3295 4.01901 10.1722 4.17634C10.0149 4.33368 9.81441 4.44082 9.59618 4.48423C9.37795 4.52764 9.15175 4.50536 8.94618 4.42021C8.74062 4.33506 8.56492 4.19087 8.4413 4.00587C8.31768 3.82086 8.2517 3.60335 8.2517 3.38085C8.2517 3.08248 8.37023 2.79633 8.58121 2.58535C8.79219 2.37438 9.07833 2.25585 9.3767 2.25585ZM16.408 13.4233L13.078 10.7524C12.8933 10.6044 12.6666 10.5183 12.4302 10.5066C12.1938 10.4948 11.9597 10.5579 11.7612 10.6869C11.5627 10.8159 11.41 11.0042 11.3248 11.225C11.2395 11.4458 11.2261 11.6879 11.2864 11.9168L13.4333 20.0683C13.4505 20.1328 13.4734 20.1955 13.5017 20.2558C13.4877 20.2238 13.472 20.1925 13.4548 20.1621L10.3498 14.8183C10.2509 14.6479 10.109 14.5064 9.93821 14.408C9.76742 14.3096 9.57379 14.2578 9.3767 14.2578C9.17961 14.2578 8.98598 14.3096 8.8152 14.408C8.64442 14.5064 8.50247 14.6479 8.40358 14.8183L5.29858 20.1621C5.28138 20.1925 5.26573 20.2238 5.2517 20.2558C5.2796 20.1953 5.30249 20.1326 5.32014 20.0683L7.4642 11.9196C7.52451 11.6907 7.51108 11.4486 7.42583 11.2278C7.34059 11.007 7.18786 10.8187 6.98939 10.6897C6.79092 10.5607 6.55682 10.4976 6.32041 10.5094C6.084 10.5211 5.85732 10.6072 5.67264 10.7552L2.34545 13.4233C2.31273 13.4488 2.28143 13.476 2.2517 13.5049C2.26858 13.489 2.28452 13.4712 2.30045 13.4543L6.54827 8.63647C6.65386 8.51681 6.78371 8.42099 6.92918 8.35536C7.07465 8.28974 7.23243 8.25582 7.39202 8.25585H11.3614C11.521 8.25582 11.6788 8.28974 11.8242 8.35536C11.9697 8.42099 12.0995 8.51681 12.2051 8.63647L16.4539 13.4543C16.4698 13.4712 16.4858 13.489 16.5026 13.5049C16.4726 13.476 16.441 13.4488 16.408 13.4233Z" fill="#146CFF"/>
</svg>

            </template>
            <span class="hidden sm:inline">Set as Trainer</span>
            <span class="sm:hidden">Trainer</span>
          </BngButton>
          
          <BngButton 
            variant="outline-red"
            size="md"
            :responsive="true"
            :fullWidth="true"
            @click="deactivateProfile"
          >
            <template #icon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2.5C14.3439 2.5 16.25 4.40614 16.25 6.75C16.24 9.05196 14.4419 10.9097 12.1523 10.9902H12.124C12.0448 10.9818 11.9635 10.9833 11.8867 10.9893C9.53765 10.9032 7.75 9.04362 7.75 6.75C7.75 4.40614 9.65614 2.5 12 2.5Z" fill="#E12700" stroke="#E12700"/>
<path opacity="0.4" d="M17.0809 14.1499C14.2909 12.2899 9.74094 12.2899 6.93094 14.1499C5.66094 14.9999 4.96094 16.1499 4.96094 17.3799C4.96094 18.6099 5.66094 19.7499 6.92094 20.5899C8.32094 21.5299 10.1609 21.9999 12.0009 21.9999C13.8409 21.9999 15.6809 21.5299 17.0809 20.5899C18.3409 19.7399 19.0409 18.5999 19.0409 17.3599C19.0309 16.1299 18.3409 14.9899 17.0809 14.1499Z" fill="#E12700"/>
<path d="M13.0593 17.3799L13.9393 16.4999C14.2293 16.2099 14.2293 15.7299 13.9393 15.4399C13.6493 15.1499 13.1693 15.1499 12.8793 15.4399L11.9993 16.3199L11.1193 15.4399C10.8293 15.1499 10.3493 15.1499 10.0593 15.4399C9.7693 15.7299 9.7693 16.2099 10.0593 16.4999L10.9393 17.3799L10.0593 18.2599C9.7693 18.5499 9.7693 19.0299 10.0593 19.3199C10.2093 19.4699 10.3993 19.5399 10.5893 19.5399C10.7793 19.5399 10.9693 19.4699 11.1193 19.3199L11.9993 18.4399L12.8793 19.3199C13.0293 19.4699 13.2193 19.5399 13.4093 19.5399C13.5993 19.5399 13.7893 19.4699 13.9393 19.3199C14.2293 19.0299 14.2293 18.5499 13.9393 18.2599L13.0593 17.3799Z" fill="#E12700"/>
</svg>

            </template>
            <span class="hidden sm:inline">Deactivate Profile</span>
            <span class="sm:hidden">Deactivate</span>
          </BngButton>
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
              <div class="flex flex-col lg:flex-row items-start justify-between gap-4 mb-4">
                <div>
                  <h3 class="text-base lg:text-lg font-semibold text-gray-900 mb-2">{{ subscriptionData.planName }}</h3>
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
                <div class="text-left lg:text-right">
                  <div class="text-2xl lg:text-3xl font-bold text-gray-900">{{ subscriptionData.amount }}</div>
                  <div class="text-sm text-gray-500">{{ subscriptionData.perMonth }}</div>
                </div>
              </div>
            </div>

            <!-- Billing History -->
            <div>
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 class="text-base lg:text-lg font-semibold text-gray-900">Billing history</h3>
                  <p class="text-sm text-gray-600">Download your previous plan receipts and usage details.</p>
                </div>
                <button 
                  @click="downloadAllBilling"
                  class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors whitespace-nowrap"
                >
                  Download all
                </button>
              </div>

              <!-- Billing Table -->
              <Table 
                :data="billingHistory" 
                :columns="billingColumns"
                :statusStyles="billingStatusStyles"
              >
                <template #checkbox="{ row }">
                  <input type="checkbox" class="rounded border-gray-300" />
                </template>

                <template #billingId="{ row }">
                  <div class="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3333 2H2.66667C1.93333 2 1.33333 2.6 1.33333 3.33333V13.3333C1.33333 14.0667 1.93333 14.6667 2.66667 14.6667H13.3333C14.0667 14.6667 14.6667 14.0667 14.6667 13.3333V3.33333C14.6667 2.6 14.0667 2 13.3333 2Z" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                    {{ row.billingId }}
                  </div>
                </template>

                <template #action="{ row }">
                  <div class="flex items-center gap-2">
                    <button 
                      @click="downloadReceipt(row)"
                      class="px-4 py-1.5 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
                    >
                      Download
                    </button>
                    <div class="relative">
                      <button 
                        @click="toggleDropdown(row.id)"
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
                        v-if="showDropdown === row.id"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                      >
                        <button 
                          @click="viewReceipt(row)"
                          class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                          View Receipt
                        </button>
                        <button 
                          @click="sendReceiptToUser(row)"
                          class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Send Receipt to User
                        </button>
                      </div>
                    </div>
                  </div>
                </template>
              </Table>
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
            <div class="max-h-96 overflow-y-auto space-y-4">
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
          </div>

          <!-- Workout Tab Content -->
          <div v-else-if="activeTab === 'workout'" class="space-y-4">
            <Table 
              :data="workoutData" 
              :columns="workoutColumns"
              :statusStyles="statusStyles"
            />
          </div>

          <!-- Trainers Tab Content -->
          <div v-else-if="activeTab === 'trainers'" class="space-y-4">
            <Table 
              :data="trainersData" 
              :columns="trainersColumns"
              :statusStyles="statusStyles"
            />
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

    <!-- Deactivate User Confirmation Dialog -->
    <ConfirmDialog
      v-model="showDeactivateDialog"
      type="danger"
      title="Deactivate User?"
      description="Do you want to deactivate this user? This action can't be undone"
      confirm-text="Deactivate"
      cancel-text="Cancel"
      @confirm="confirmDeactivate"
    >
      <template #icon>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.33333 4H22.6667V6.66667H26.6667V9.33333H5.33333V6.66667H9.33333V4Z" fill="currentColor"/>
          <path d="M8 12H10.6667V25.3333H8V12Z" fill="currentColor"/>
          <path d="M14.6667 12H17.3333V25.3333H14.6667V12Z" fill="currentColor"/>
          <path d="M21.3333 12H24V25.3333H21.3333V12Z" fill="currentColor"/>
          <path d="M6.66667 10.6667H25.3333V28H6.66667V10.6667Z" stroke="currentColor" stroke-width="2"/>
        </svg>
      </template>
    </ConfirmDialog>

    <!-- Set as Trainer Confirmation Dialog -->
    <ConfirmDialog
      v-model="showSetTrainerDialog"
      type="info"
      title="Set as Trainer?"
      description="Do you want to set this user as a trainer? They will receive an email to complete their trainer profile."
      confirm-text="Yes, Set as Trainer"
      cancel-text="Cancel"
      @confirm="confirmSetAsTrainer"
    >
      <template #icon>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" stroke-width="2"/>
          <path d="M16 10V22M10 16H22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </template>
    </ConfirmDialog>

    <!-- Success Dialog -->
    <ConfirmDialog
      v-model="showSuccessDialog"
      type="success"
      :title="successTitle"
      :description="successMessage"
      confirm-text="Okay"
      :show-cancel="false"
      :show-close="true"
    >
      <template #icon>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" stroke-width="2"/>
          <path d="M10 16L14 20L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </template>
    </ConfirmDialog>
  </div>
</template>

<style scoped>
/* Custom styling if needed */
</style>
