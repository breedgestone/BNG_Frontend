<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Schedules</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Schedules</span>
      </nav>
    </div>

    <!-- View Toggle and Main Content -->
    <div class="flex flex-col xl:flex-row gap-6">
      <!-- Calendar Section (Left Side) -->
      <div class="flex-1 min-w-0">
        <!-- View Toggle Buttons -->
        <div class="inline-flex bg-gray-900 rounded-full p-1 mb-6">
          <button 
            @click="activeView = 'year'"
            class="px-6 xl:px-8 py-2 rounded-full text-sm font-medium transition-colors"
            :class="activeView === 'year' ? 'bg-primary text-white' : 'text-white hover:text-gray-300'"
          >
            Year
          </button>
          <button 
            @click="activeView = 'month'"
            class="px-6 xl:px-8 py-2 rounded-full text-sm font-medium transition-colors"
            :class="activeView === 'month' ? 'bg-primary text-white' : 'text-white hover:text-gray-300'"
          >
            Month
          </button>
          <button 
            @click="activeView = 'week'"
            class="px-6 xl:px-8 py-2 rounded-full text-sm font-medium transition-colors"
            :class="activeView === 'week' ? 'bg-primary text-white' : 'text-white hover:text-gray-300'"
          >
            Week
          </button>
          <button 
            @click="activeView = 'today'"
            class="px-6 xl:px-8 py-2 rounded-full text-sm font-medium transition-colors"
            :class="activeView === 'today' ? 'bg-primary text-white' : 'text-white hover:text-gray-300'"
          >
            Today
          </button>
        </div>

        <!-- Year View -->
        <div v-if="activeView === 'year'" class="bg-white rounded-xl shadow-sm">
          <!-- Year Navigation -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center gap-4">
              <button @click="previousYear" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button @click="nextYear" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">{{ currentYear }}</h2>
            <select 
              v-model="yearViewFilter"
              class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            >
              <option value="year">Year</option>
              <option value="month">Month</option>
            </select>
          </div>

          <!-- Year Calendar Grid -->
          <div class="p-4 xl:p-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
            <div v-for="month in months" :key="month.name" class="space-y-2">
              <h3 class="text-sm font-semibold text-gray-800 mb-3">{{ month.name }}</h3>
              <div class="grid grid-cols-7 gap-1">
                <div v-for="day in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']" :key="day" class="text-xs text-gray-500 text-center">
                  {{ day }}
                </div>
                <div 
                  v-for="date in month.dates" 
                  :key="date.key"
                  class="aspect-square flex items-center justify-center text-xs rounded cursor-pointer transition-colors"
                  :class="{
                    'text-gray-300': date.isOtherMonth,
                    'bg-primary text-white': date.isToday,
                    'bg-blue-100 text-blue-600': date.hasEvent,
                    'hover:bg-gray-100': !date.isToday && !date.isOtherMonth
                  }"
                >
                  {{ date.day }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Month View -->
        <div v-if="activeView === 'month'" class="bg-white rounded-xl shadow-sm">
          <!-- Month Navigation -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center gap-4">
              <button @click="previousMonth" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">{{ currentMonthName }}, {{ currentYear }}</h2>
            <select 
              v-model="monthViewFilter"
              class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
            </select>
          </div>

          <!-- Month Calendar Grid -->
          <div class="p-4 xl:p-6">
            <div class="grid grid-cols-7 gap-px bg-gray-200 border-t border-gray-300 overflow-x-auto">
              <!-- Day Headers -->
              <div v-for="day in ['SUN', 'MON', 'TUE', 'WED', 'THI', 'FRI', 'SAT']" :key="day" class="bg-gray-50 p-2 xl:p-3 text-center text-xs font-semibold text-gray-400">
                {{ day }}
              </div>
              
              <!-- Calendar Days -->
              <div 
                v-for="date in monthDates" 
                :key="date.key"
                class="bg-white min-h-[80px] xl:min-h-[100px] p-1 xl:p-2 relative"
                :class="{ 'bg-gray-50': date.isOtherMonth }"
              >
                <div 
                  class="text-xs xl:text-sm font-medium mb-1 xl:mb-2"
                  :class="{
                    'text-gray-300': date.isOtherMonth,
                    'text-gray-400': !date.isOtherMonth
                  }"
                >
                  {{ date.day }}
                </div>
                
                <!-- Event badges -->
                <div class="space-y-1">
                  <div 
                    v-for="(event, idx) in date.events" 
                    :key="idx"
                    class="px-2 py-1 rounded text-xs text-white font-medium truncate cursor-pointer"
                    :class="getEventClass(event.type)"
                    @click="showEventDetails(event)"
                  >
                    {{ event.title }}
                  </div>
                  <div 
                    v-if="date.moreCount > 0"
                    class="px-2 py-1 text-xs text-gray-600 font-medium cursor-pointer hover:text-primary"
                  >
                    {{ date.moreCount }}+ More
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Week View -->
        <div v-if="activeView === 'week'" class="bg-white rounded-xl shadow-sm">
          <!-- Week Navigation -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center gap-4">
              <button @click="previousWeek" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button @click="nextWeek" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">{{ currentMonthName }}, {{ currentYear }}</h2>
            <select 
              v-model="weekViewFilter"
              class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            >
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </div>

          <!-- Week Calendar Grid -->
          <div class="flex overflow-x-auto">
            <!-- Time Column -->
            <div class="w-16 xl:w-20 border-r border-gray-200 flex-shrink-0">
              <div class="h-12 xl:h-16 border-b border-gray-200 border-t border-gray-300"></div>
              <div v-for="hour in timeSlots" :key="hour" class="h-12 xl:h-16 border-b border-gray-200 px-1 xl:px-2 py-1 text-xs text-gray-400">
                {{ hour }}
              </div>
            </div>

            <!-- Days Columns -->
            <div class="flex-1 grid grid-cols-7 min-w-[600px]">
              <div v-for="day in weekDays" :key="day.date" class="border-r border-gray-200 last:border-r-0">
                <!-- Day Header -->
                <div class="h-12 xl:h-16 border-b border-t border-gray-300 p-2 text-center">
                  <div class="text-xs text-gray-400">{{ day.day }}</div>
                  <div 
                    class="text-sm font-semibold mt-1 w-6 h-6 xl:w-8 xl:h-8 mx-auto flex items-center justify-center rounded-full"
                    :class="day.isToday ? 'bg-primary text-white' : 'text-gray-400'"
                  >
                    {{ day.date }}
                  </div>
                </div>

                <!-- Time Slots -->
                <div class="relative">
                  <div v-for="hour in timeSlots" :key="hour" class="h-12 xl:h-16 border-b border-gray-200"></div>
                  
                  <!-- Events -->
                  <div 
                    v-for="event in day.events" 
                    :key="event.id"
                    class="absolute px-1 xl:px-2 py-1 rounded text-xs text-white font-medium overflow-hidden"
                    :class="getEventClass(event.type)"
                    :style="getEventStyle(event)"
                  >
                    {{ event.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Today View -->
        <div v-if="activeView === 'today'" class="bg-white rounded-xl shadow-sm">
          <!-- Today Navigation -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center gap-4">
              <button @click="previousDay" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button @click="nextDay" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">{{ currentMonthName }}, {{ currentYear }}</h2>
            <select 
              v-model="todayViewFilter"
              class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            >
              <option value="today">Today</option>
            </select>
          </div>

          <!-- Today Calendar -->
          <div class="flex overflow-x-auto">
            <!-- Time Column -->
            <div class="w-16 xl:w-20 border-r border-gray-200 flex-shrink-0">
              <div class="h-12 xl:h-16 border-b border-t border-gray-300 p-2 text-center">
                <div 
                  class="text-sm font-semibold w-8 h-8 xl:w-10 xl:h-10 mx-auto flex items-center justify-center rounded-full bg-primary text-white"
                >
                  {{ todayDate }}
                </div>
                <div class="text-xs text-gray-400 mt-1">{{ todayDay }}</div>
              </div>
              <div v-for="hour in timeSlots" :key="hour" class="h-12 xl:h-16 border-b border-gray-200 px-1 xl:px-2 py-1 text-xs text-gray-400">
                {{ hour }}
              </div>
            </div>

            <!-- Day Column -->
            <div class="flex-1 min-w-[400px]">
              <div class="h-12 xl:h-16 border-b border-t border-gray-300"></div>
              
              <!-- Time Slots -->
              <div class="relative">
                <div v-for="hour in timeSlots" :key="hour" class="h-12 xl:h-16 border-b border-gray-200"></div>
                
                <!-- Today's Events -->
                <div 
                  v-for="event in todayEvents" 
                  :key="event.id"
                  class="absolute left-0 right-0 mx-2 px-3 py-2 rounded text-sm text-white font-medium"
                  :class="getEventClass(event.type)"
                  :style="getEventStyle(event)"
                >
                  {{ event.title }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Event Details Modal (shown in month view when clicking an event) -->
        <div 
          v-if="showEventModal"
          class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          @click="showEventModal = false"
        >
          <div 
            class="bg-white rounded-xl shadow-lg p-6 max-w-sm relative"
            @click.stop
          >
            <button 
              @click="showEventModal = false"
              class="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <div class="space-y-4">
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                :class="selectedEvent?.type === 'upcoming' ? 'bg-blue-500' : 'bg-red-500'"
              >
                {{ selectedEvent?.number }}
              </div>

              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ selectedEvent?.status }}</h3>
                <p class="text-sm text-gray-600">
                  Trainer - <span class="font-semibold text-gray-800">{{ selectedEvent?.trainer }}</span>
                </p>
                <p class="text-sm text-gray-600">
                  Trainee - <span class="font-semibold text-gray-800">{{ selectedEvent?.trainee }}</span>
                </p>
              </div>

              <div class="flex items-center gap-2 text-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-primary">
                  <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" stroke="currentColor" stroke-width="2"/>
                  <path d="M8 4v4l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span class="font-medium text-gray-800">{{ selectedEvent?.price }}</span>
              </div>

              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" stroke="currentColor" stroke-width="2"/>
                  <path d="M8 4v4l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>{{ selectedEvent?.time }}</span>
              </div>

              <button class="w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                Printing Card
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="w-full xl:w-80 space-y-6">
        <!-- Mini Calendar -->
        <div class="bg-white rounded-xl shadow-sm p-4">
          <div class="flex items-center justify-between mb-4">
            <button class="p-1 hover:bg-gray-100 rounded transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <h3 class="text-sm font-semibold text-gray-800">{{ miniCalendarMonth }}</h3>
            <button class="p-1 hover:bg-gray-100 rounded transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-7 gap-1 text-center">
            <div v-for="day in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']" :key="day" class="text-xs text-gray-500 font-medium py-1">
              {{ day }}
            </div>
            <div 
              v-for="date in miniCalendarDates" 
              :key="date.key"
              class="aspect-square flex items-center justify-center text-xs rounded cursor-pointer transition-colors"
              :class="{
                'text-gray-300': date.isOtherMonth,
                'bg-primary text-white': date.isToday,
                'hover:bg-gray-100': !date.isToday && !date.isOtherMonth
              }"
            >
              {{ date.day }}
            </div>
          </div>
        </div>

        <!-- Label -->
        <div class="bg-white rounded-xl shadow-sm p-4">
          <h3 class="text-sm font-semibold text-gray-800 mb-4">Label</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-blue-500"></div>
              <span class="text-sm text-gray-800">Upcoming Session</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-success"></div>
              <span class="text-sm text-gray-800">Completed Session</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <span class="text-sm text-gray-800">Declined Session</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-orange-500"></div>
              <span class="text-sm text-gray-800">Pending Session</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-purple-500"></div>
              <span class="text-sm text-gray-800">Ongoing Session</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * SCHEDULE VIEW - Training Session Calendar
 * 
 * This component displays training schedules between trainers and clients.
 * It supports Year, Month, Week, and Today views.
 * 
 * ===========================================
 * EXPECTED API ENDPOINTS:
 * ===========================================
 * 
 * 1. GET /api/schedules
 *    - Fetch all schedules (can add query params for filtering)
 *    - Query params: ?startDate=2021-11-01&endDate=2021-11-30&trainerId=xxx&status=upcoming
 * 
 * 2. POST /api/schedules
 *    - Create new schedule
 * 
 * 3. PUT /api/schedules/:id
 *    - Update existing schedule
 * 
 * 4. DELETE /api/schedules/:id
 *    - Delete schedule
 * 
 * ===========================================
 * EXPECTED API RESPONSE STRUCTURE:
 * ===========================================
 * 
 * GET /api/schedules Response:
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "id": "uuid-123",
 *       "title": "Personal Training Session",
 *       "trainer": {
 *         "id": "trainer-1",
 *         "name": "David Lawal",
 *         "email": "david@gym.com",
 *         "avatar": "https://..."
 *       },
 *       "client": {
 *         "id": "client-1",
 *         "name": "Patrick Umeh",
 *         "email": "patrick@email.com",
 *         "avatar": "https://..."
 *       },
 *       "sessionType": "personal-training", // "personal-training", "group-class", "consultation"
 *       "status": "upcoming", // "upcoming", "completed", "declined", "pending", "ongoing"
 *       "price": 1000000, // Price in kobo (₦10,000 = 1,000,000 kobo)
 *       "currency": "NGN",
 *       "startTime": "2021-11-14T09:30:00Z", // ISO 8601 format (UTC)
 *       "endTime": "2021-11-14T11:00:00Z",
 *       "recurringDays": ["tue", "thu", "sat"], // Empty array if not recurring
 *       "location": "Gym Floor 2",
 *       "notes": "Focus on upper body strength",
 *       "createdAt": "2021-11-01T10:00:00Z",
 *       "updatedAt": "2021-11-10T15:30:00Z"
 *     }
 *   ],
 *   "meta": {
 *     "total": 100,
 *     "page": 1,
 *     "perPage": 50
 *   }
 * }
 * 
 * ===========================================
 * POST /api/schedules Request Body:
 * ===========================================
 * {
 *   "trainerId": "trainer-1",
 *   "clientId": "client-1",
 *   "sessionType": "personal-training",
 *   "price": 1000000,
 *   "currency": "NGN",
 *   "startTime": "2021-11-14T09:30:00Z",
 *   "endTime": "2021-11-14T11:00:00Z",
 *   "recurringDays": ["tue", "thu", "sat"],
 *   "location": "Gym Floor 2",
 *   "notes": "Focus on upper body strength"
 * }
 * 
 * ===========================================
 * HOW TO INTEGRATE:
 * ===========================================
 * 
 * 1. Replace the mock data in fetchSchedules() with actual API call
 * 2. Uncomment the fetch() calls in createSchedule(), updateSchedule(), deleteSchedule()
 * 3. Add authentication headers (Bearer token) to all API calls
 * 4. Create a ScheduleFormModal component for create/edit operations
 * 5. Add proper error handling and loading states
 * 
 * Example with axios:
 * 
 * import axios from 'axios'
 * 
 * const api = axios.create({
 *   baseURL: '/api',
 *   headers: { 
 *     'Authorization': `Bearer ${token}`,
 *     'Content-Type': 'application/json'
 *   }
 * })
 * 
 * const fetchSchedules = async () => {
 *   const { data } = await api.get('/schedules', {
 *     params: { 
 *       startDate: '2021-11-01',
 *       endDate: '2021-11-30'
 *     }
 *   })
 *   schedules.value = data.data
 * }
 */

import { ref, computed, onMounted } from 'vue'

// Active view state
const activeView = ref('year')

// Date states
const currentYear = ref(2021)
const currentMonth = ref(10) // November (0-indexed)
const currentDay = ref(10)

// Filter states
const yearViewFilter = ref('year')
const monthViewFilter = ref('month')
const weekViewFilter = ref('week')
const todayViewFilter = ref('today')

// Event modal
const showEventModal = ref(false)
const selectedEvent = ref(null)

// Loading and error states
const loading = ref(false)
const error = ref(null)

// Schedules data from API
const schedules = ref([])

// Month names
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const currentMonthName = computed(() => monthNames[currentMonth.value])
const miniCalendarMonth = computed(() => `Nov ${currentYear.value}`)

// Time slots for week/today view
const timeSlots = [
  '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
  '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
]

// Fetch schedules - Using mock data structured as API response
// When backend is ready, replace this with actual API call to GET /api/schedules
// Expected response format: { success: true, data: [...schedules] }
const fetchSchedules = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Simulate API response structure
    const mockApiResponse = {
      success: true,
      data: [
        {
          id: '1',
          title: 'Personal Training Session',
          trainer: { 
            id: 't1', 
            name: 'David Lawal', 
            email: 'david@gym.com' 
          },
          client: { 
            id: 'c1', 
            name: 'Patrick Umeh', 
            email: 'patrick@email.com' 
          },
          sessionType: 'personal-training',
          status: 'upcoming',
          price: 1000000, // in kobo (₦10,000)
          currency: 'NGN',
          startTime: '2021-11-14T09:30:00Z',
          endTime: '2021-11-14T11:00:00Z',
          recurringDays: ['tue', 'thu', 'sat'],
          location: 'Gym Floor 2',
          notes: 'Focus on upper body strength'
        },
        {
          id: '2',
          title: 'Group Training',
          trainer: { 
            id: 't1', 
            name: 'David Lawal', 
            email: 'david@gym.com' 
          },
          client: { 
            id: 'c2', 
            name: 'John Doe', 
            email: 'john@email.com' 
          },
          sessionType: 'group-class',
          status: 'completed',
          price: 500000,
          currency: 'NGN',
          startTime: '2021-11-01T14:00:00Z',
          endTime: '2021-11-01T15:00:00Z',
          recurringDays: [],
          location: 'Studio A',
          notes: 'Cardio and HIIT'
        }
      ]
    }
    
    // Extract data from response
    schedules.value = mockApiResponse.data
  } catch (err) {
    error.value = 'Failed to load schedules. Please try again.'
    console.error('Error fetching schedules:', err)
  } finally {
    loading.value = false
  }
}

// Create new schedule - Placeholder for API integration
// When backend is ready: POST /api/schedules with scheduleData
const createSchedule = async (scheduleData) => {
  try {
    console.log('Creating schedule:', scheduleData)
    // TODO: Replace with actual API call
    // await fetch('/api/schedules', { method: 'POST', body: JSON.stringify(scheduleData) })
    
    // Refresh schedules after creation
    await fetchSchedules()
  } catch (err) {
    console.error('Error creating schedule:', err)
    throw err
  }
}

// Update existing schedule - Placeholder for API integration
// When backend is ready: PUT /api/schedules/:id with scheduleData
const updateSchedule = async (scheduleId, scheduleData) => {
  try {
    console.log('Updating schedule:', scheduleId, scheduleData)
    // TODO: Replace with actual API call
    // await fetch(`/api/schedules/${scheduleId}`, { method: 'PUT', body: JSON.stringify(scheduleData) })
    
    // Refresh schedules after update
    await fetchSchedules()
  } catch (err) {
    console.error('Error updating schedule:', err)
    throw err
  }
}

// Delete schedule - Placeholder for API integration
// When backend is ready: DELETE /api/schedules/:id
const deleteSchedule = async (scheduleId) => {
  try {
    console.log('Deleting schedule:', scheduleId)
    // TODO: Replace with actual API call
    // await fetch(`/api/schedules/${scheduleId}`, { method: 'DELETE' })
    
    // Refresh schedules after deletion
    await fetchSchedules()
  } catch (err) {
    console.error('Error deleting schedule:', err)
    throw err
  }
}

// Format price from kobo to naira
const formatPrice = (priceInKobo, currency = 'NGN') => {
  const price = priceInKobo / 100
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(price)
}

// Format date/time
const formatDateTime = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Calculate event position for time-based views
const calculateEventPosition = (startTime, endTime) => {
  const start = new Date(startTime)
  const end = new Date(endTime)
  
  const startHour = start.getHours() + start.getMinutes() / 60
  const duration = (end - start) / (1000 * 60 * 60) // duration in hours
  
  return {
    top: startHour * 48, // 48px per hour (h-12)
    height: duration * 48
  }
}

// Get schedules for a specific date
const getSchedulesForDate = (date) => {
  return schedules.value.filter(schedule => {
    const scheduleDate = new Date(schedule.startTime)
    return scheduleDate.toDateString() === date.toDateString()
  })
}

// Transform schedules to calendar events
const transformSchedulesToEvents = (dateSchedules) => {
  return dateSchedules.map(schedule => {
    const position = calculateEventPosition(schedule.startTime, schedule.endTime)
    return {
      id: schedule.id,
      title: schedule.trainer.name,
      type: schedule.status,
      trainer: schedule.trainer.name,
      trainee: schedule.client.name,
      price: formatPrice(schedule.price, schedule.currency),
      time: `${formatDateTime(schedule.startTime)} to ${formatDateTime(schedule.endTime)}`,
      recurringDays: schedule.recurringDays.join(', '),
      ...position,
      rawData: schedule
    }
  })
}

// Load schedules on mount
onMounted(() => {
  fetchSchedules()
})

// Mock data for year view (you would filter schedules.value by month/year)
const months = computed(() => {
  const monthsData = []
  for (let i = 0; i < 12; i++) {
    monthsData.push({
      name: monthNames[i],
      dates: generateMonthDates(i, currentYear.value)
    })
  }
  return monthsData
})

// Mock data for month view (you would filter schedules.value by current month)
const monthDates = computed(() => {
  return generateMonthViewDates(currentMonth.value, currentYear.value)
})

// Mock data for week view (you would filter schedules.value by current week)
const weekDays = computed(() => {
  // In real implementation, filter schedules.value for current week
  const today = new Date()
  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - today.getDay()) // Start of week (Sunday)
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)
    
    const daySchedules = getSchedulesForDate(date)
    const events = transformSchedulesToEvents(daySchedules)
    
    return {
      day: ['SUN', 'MON', 'TUE', 'WED', 'THI', 'FRI', 'SAT'][i],
      date: date.getDate(),
      isToday: date.toDateString() === today.toDateString(),
      events
    }
  })
})

// Mock data for today view (you would filter schedules.value for today)
const todayDate = computed(() => {
  const today = new Date()
  return today.getDate()
})

const todayDay = computed(() => {
  const today = new Date()
  return ['SUN', 'MON', 'TUE', 'WED', 'THI', 'FRI', 'SAT'][today.getDay()]
})

const todayEvents = computed(() => {
  const today = new Date()
  const daySchedules = getSchedulesForDate(today)
  return transformSchedulesToEvents(daySchedules)
})

// Mini calendar dates
const miniCalendarDates = computed(() => {
  return generateMonthDates(currentMonth.value, currentYear.value)
})

// Helper functions
function generateMonthDates(month, year) {
  const dates = []
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()
  
  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({
      day: prevMonthDays - i,
      isOtherMonth: true,
      isToday: false,
      hasEvent: false,
      key: `prev-${i}`
    })
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === 10 && month === currentMonth.value
    const hasEvent = [3, 19].includes(i)
    dates.push({
      day: i,
      isOtherMonth: false,
      isToday,
      hasEvent,
      key: `curr-${i}`
    })
  }
  
  // Next month days
  const remaining = 42 - dates.length
  for (let i = 1; i <= remaining; i++) {
    dates.push({
      day: i,
      isOtherMonth: true,
      isToday: false,
      hasEvent: false,
      key: `next-${i}`
    })
  }
  
  return dates
}

function generateMonthViewDates(month, year) {
  const dates = []
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()
  
  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({
      day: prevMonthDays - i,
      isOtherMonth: true,
      events: [],
      moreCount: 0,
      key: `prev-${i}`
    })
  }
  
  // Current month days with events
  for (let i = 1; i <= daysInMonth; i++) {
    const events = []
    let moreCount = 0
    
    if (i === 1) {
      events.push({ title: 'David Lawal', type: 'upcoming' })
    }
    if (i === 11) {
      events.push({ title: 'David Lawal', type: 'upcoming' })
      moreCount = 2
    }
    if (i === 12) {
      events.push({ title: 'David Lawal', type: 'upcoming' })
    }
    if (i === 17) {
      events.push({ title: 'David Lawal', type: 'upcoming' })
    }
    if (i === 19) {
      events.push({ title: 'David Lawal', type: 'upcoming' })
    }
    if (i === 20) {
      events.push({ title: 'David Lawal', type: 'upcoming' })
    }
    
    dates.push({
      day: i,
      isOtherMonth: false,
      events,
      moreCount,
      key: `curr-${i}`
    })
  }
  
  // Next month days
  const remaining = 42 - dates.length
  for (let i = 1; i <= remaining; i++) {
    dates.push({
      day: i,
      isOtherMonth: true,
      events: [],
      moreCount: 0,
      key: `next-${i}`
    })
  }
  
  return dates
}

function getEventClass(type) {
  const classes = {
    upcoming: 'bg-blue-500',
    completed: 'bg-success',
    declined: 'bg-red-500',
    pending: 'bg-orange-500',
    ongoing: 'bg-purple-500'
  }
  return classes[type] || 'bg-blue-500'
}

function getEventStyle(event) {
  return {
    top: `${event.top}px`,
    height: `${event.height}px`
  }
}

function showEventDetails(event) {
  // If event has rawData, use it, otherwise use the event itself
  const scheduleData = event.rawData || event
  
  selectedEvent.value = {
    number: '17',
    status: scheduleData.status || 'Upcoming',
    trainer: scheduleData.trainer?.name || event.trainer,
    trainee: scheduleData.client?.name || event.trainee,
    price: scheduleData.price ? formatPrice(scheduleData.price, scheduleData.currency) : event.price,
    time: event.time || `${formatDateTime(scheduleData.startTime)} to ${formatDateTime(scheduleData.endTime)}`,
    type: scheduleData.status || event.type,
    rawData: scheduleData
  }
  showEventModal.value = true
}

// Edit schedule (open edit form)
function editSchedule() {
  if (selectedEvent.value?.rawData) {
    console.log('Edit schedule:', selectedEvent.value.rawData)
    // TODO: Open edit modal/form with schedule data
    // You can create an EditScheduleModal component similar to ConfirmDialog
  }
}

// Delete schedule with confirmation
function confirmDeleteSchedule() {
  if (selectedEvent.value?.rawData?.id) {
    // TODO: Show confirmation dialog
    if (confirm('Are you sure you want to delete this schedule?')) {
      deleteSchedule(selectedEvent.value.rawData.id)
      showEventModal.value = false
    }
  }
}

// Navigation functions
function previousYear() {
  currentYear.value--
}

function nextYear() {
  currentYear.value++
}

function previousMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function previousWeek() {
  // Implementation for previous week
}

function nextWeek() {
  // Implementation for next week
}

function previousDay() {
  // Implementation for previous day
}

function nextDay() {
  // Implementation for next day
}
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z' fill='%236B7280'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
}
</style>
