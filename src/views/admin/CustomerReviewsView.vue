<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Customer's Review</h1>
      <nav class="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>Dashboard</span>
        <span>→</span>
        <span class="text-primary">Customer's Review</span>
      </nav>
    </div>

    <!-- Filters -->
    <div class="flex items-center gap-4">
      <!-- Filter Dropdown -->
      <select 
        v-model="selectedFilter"
        class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
      >
        <option value="all">All</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Star</option>
      </select>

      <!-- Search -->
      <div class="flex-1 max-w-md relative">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search"
          class="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <!-- Date Filters -->
      <select 
        v-model="fromDate"
        class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
      >
        <option value="">From</option>
        <option value="2024-01-01">January 2024</option>
        <option value="2024-02-01">February 2024</option>
        <option value="2024-03-01">March 2024</option>
      </select>

      <select 
        v-model="toDate"
        class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
      >
        <option value="">To</option>
        <option value="2024-12-31">December 2024</option>
        <option value="2024-11-30">November 2024</option>
        <option value="2024-10-31">October 2024</option>
      </select>
    </div>

    <!-- Reviews Count -->
    <div class="text-gray-900 font-semibold">
      {{ filteredReviews.length }} Reviews
    </div>

    <!-- Reviews List -->
    <div class="space-y-4">
      <div 
        v-for="review in filteredReviews" 
        :key="review.id"
        class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
      >
        <!-- Review Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <!-- Avatar -->
            <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              <img 
                v-if="review.avatar" 
                :src="review.avatar" 
                :alt="review.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                {{ review.name.charAt(0) }}
              </div>
            </div>
            
            <!-- Name and Time -->
            <div>
              <h3 class="text-gray-900 font-semibold">{{ review.name }}</h3>
              <p class="text-xs text-gray-400">{{ review.time }}</p>
            </div>
          </div>

          <!-- Star Rating -->
          <div class="flex items-center gap-1">
            <svg 
              v-for="star in 5" 
              :key="star"
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              class="flex-shrink-0"
            >
              <path 
                d="M8 1.33334L10.06 5.50668L14.6667 6.18001L11.3333 9.42668L12.12 14.0133L8 11.8467L3.88 14.0133L4.66667 9.42668L1.33333 6.18001L5.94 5.50668L8 1.33334Z" 
                :fill="star <= review.rating ? '#FBBF24' : '#E5E7EB'" 
                :stroke="star <= review.rating ? '#FBBF24' : '#E5E7EB'" 
                stroke-width="1.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-900">{{ review.rating }}</span>
          </div>
        </div>

        <!-- Review Content -->
        <p class="text-gray-700 text-sm leading-relaxed mb-3">
          {{ review.comment }}
        </p>

        <!-- Trainer Info -->
        <div class="text-sm text-gray-600">
          <span class="font-medium">{{ review.trainer }}</span>
          <span class="text-gray-400"> (User, {{ review.category }})</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredReviews.length === 0" class="bg-white rounded-xl shadow-sm p-12">
      <EmptyState 
        title="No Reviews Found"
        description="There are no customer reviews matching your filters."
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import EmptyState from '@/components/EmptyState.vue'

// Filter and search
const selectedFilter = ref('all')
const searchQuery = ref('')
const fromDate = ref('')
const toDate = ref('')

// Mock data
const reviews = ref([
  {
    id: 1,
    name: 'Stephen Emmanuel',
    avatar: null,
    time: '1 day ago',
    rating: 4.5,
    comment: 'Lorem ipsum dolor sit amet, consectetur. Convallis aenean sem facilisis ullamcorper ullamcorper tellus id ultricies quis. Eget augue arcu vestibulum suscipit facilisis turna commodo. Ac elit nunc turtor tempus porta nec proin vel aliquam ipsum.',
    trainer: 'Kenneth Okpara',
    category: 'Trainer'
  },
  {
    id: 2,
    name: 'Stephen Emmanuel',
    avatar: null,
    time: '1 day ago',
    rating: 4.5,
    comment: 'Lorem ipsum dolor sit amet, consectetur. Convallis aenean sem facilisis ullamcorper ullamcorper tellus id ultricies quis. Eget augue arcu vestibulum suscipit facilisis turna commodo. Ac elit nunc turtor tempus porta nec proin vel aliquam ipsum.',
    trainer: 'Kenneth Okpara',
    category: 'Interior Design'
  },
  {
    id: 3,
    name: 'Stephen Emmanuel',
    avatar: null,
    time: '1 day ago',
    rating: 4.5,
    comment: 'Lorem ipsum dolor sit amet, consectetur. Convallis aenean sem facilisis ullamcorper ullamcorper tellus id ultricies quis. Eget augue arcu vestibulum suscipit facilisis turna commodo. Ac elit nunc turtor tempus porta nec proin vel aliquam ipsum.',
    trainer: 'Kenneth Okpara',
    category: 'Trainer'
  },
  {
    id: 4,
    name: 'Stephen Emmanuel',
    avatar: null,
    time: '1 day ago',
    rating: 4.5,
    comment: 'Lorem ipsum dolor sit amet, consectetur. Convallis aenean sem facilisis ullamcorper ullamcorper tellus id ultricies quis. Eget augue arcu vestibulum suscipit facilisis turna commodo. Ac elit nunc turtor tempus porta nec proin vel aliquam ipsum.',
    trainer: 'Kenneth Okpara',
    category: 'Trainer'
  },
  {
    id: 5,
    name: 'Stephen Emmanuel',
    avatar: null,
    time: '1 day ago',
    rating: 4.5,
    comment: 'Lorem ipsum dolor sit amet, consectetur. Convallis aenean sem facilisis ullamcorper ullamcorper tellus id ultricies quis. Eget augue arcu vestibulum suscipit facilisis turna commodo. Ac elit nunc turtor tempus porta nec proin vel aliquam ipsum.',
    trainer: 'Kenneth Okpara',
    category: 'Trainer'
  },
  {
    id: 6,
    name: 'Stephen Emmanuel',
    avatar: null,
    time: '1 day ago',
    rating: 4.5,
    comment: 'Lorem ipsum dolor sit amet, consectetur. Convallis aenean sem facilisis ullamcorper ullamcorper tellus id ultricies quis. Eget augue arcu vestibulum suscipit facilisis turna commodo. Ac elit nunc turtor tempus porta nec proin vel aliquam ipsum.',
    trainer: 'Kenneth Okpara',
    category: 'Trainer'
  },
  {
    id: 7,
    name: 'Stephen Emmanuel',
    avatar: null,
    time: '1 day ago',
    rating: 4.5,
    comment: 'Lorem ipsum dolor sit amet, consectetur. Convallis aenean sem facilisis ullamcorper ullamcorper tellus id ultricies quis. Eget augue arcu vestibulum suscipit facilisis turna commodo. Ac elit nunc turtor tempus porta nec proin vel aliquam ipsum.',
    trainer: 'Kenneth Okpara',
    category: 'Trainer'
  },
  {
    id: 8,
    name: 'Stephen Emmanuel',
    avatar: null,
    time: '1 day ago',
    rating: 4.5,
    comment: 'Lorem ipsum dolor sit amet, consectetur. Convallis aenean sem facilisis ullamcorper ullamcorper tellus id ultricies quis. Eget augue arcu vestibulum suscipit facilisis turna commodo. Ac elit nunc turtor tempus porta nec proin vel aliquam ipsum.',
    trainer: 'Kenneth Okpara',
    category: 'Trainer'
  },
  {
    id: 9,
    name: 'Stephen Emmanuel',
    avatar: null,
    time: '1 day ago',
    rating: 4.5,
    comment: 'Lorem ipsum dolor sit amet, consectetur. Convallis aenean sem facilisis ullamcorper ullamcorper tellus id ultricies quis. Eget augue arcu vestibulum suscipit facilisis turna commodo. Ac elit nunc turtor tempus porta nec proin vel aliquam ipsum.',
    trainer: 'Kenneth Okpara',
    category: 'Trainer'
  }
])

// Filtered reviews
const filteredReviews = computed(() => {
  let filtered = reviews.value

  // Filter by rating
  if (selectedFilter.value !== 'all') {
    const rating = parseInt(selectedFilter.value)
    filtered = filtered.filter(review => Math.floor(review.rating) === rating)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(review =>
      review.name.toLowerCase().includes(query) ||
      review.comment.toLowerCase().includes(query) ||
      review.trainer.toLowerCase().includes(query) ||
      review.category.toLowerCase().includes(query)
    )
  }

  return filtered
})
</script>
