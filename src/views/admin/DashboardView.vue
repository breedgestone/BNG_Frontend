<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// Top Stats Data
const topStats = ref([
  {
    title: 'ALL USERS',
    percentage: '81.94%',
    trend: 'increase',
    trendValue: '3.5% Increase',
    color: '#E74C3C'
  },
  {
    title: 'TOTAL TRAINEES',
    percentage: '81.94%',
    trend: 'increase',
    trendValue: '1.1% Increase',
    color: '#84CC16'
  },
  {
    title: 'TOTAL TRAINERS',
    percentage: '81.94%',
    trend: 'increase',
    trendValue: '3.5% Increase',
    color: '#8B5CF6'
  },
  {
    title: 'TOTAL SUBSCRIBERS',
    percentage: '81.94%',
    trend: 'increase',
    trendValue: '3.5% Increase',
    color: '#3B82F6'
  }
])

// Bottom Stats Data
const bottomStats = ref([
  {
    title: 'Total Earnings',
    value: '₦6,000,000.00',
    subtitle: 'Wed, Jul 20',
    trend: 'increase',
    trendValue: '3.5% Increase'
  },
  {
    title: 'Today Revenue',
    value: '₦200,500.00',
    subtitle: '143 Subscribers',
    trend: 'increase',
    trendValue: '3.5% Increase'
  },
  {
    title: 'Today Sessions',
    value: '46',
    subtitle: '50 Users',
    trend: 'increase',
    trendValue: '3.5% Increase'
  },
  {
    title: 'Today Subscribers',
    value: '3,422',
    subtitle: '50 Users',
    trend: 'increase',
    trendValue: '3.5% Increase'
  }
])

// Mini Charts for Top Stats
const miniChartOptions = (color) => ({
  chart: {
    type: 'area',
    height: 120,
    sparkline: {
      enabled: true
    },
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2,
    colors: [color]
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.3,
      opacityTo: 0.05,
      stops: [0, 90, 100]
    },
    colors: [color]
  },
  markers: {
    size: 0
  },
  tooltip: {
    enabled: false
  }
})

const miniChartSeries = ref([
  {
    name: 'Stats',
    data: [30, 50, 45, 60, 40, 55, 50, 65, 45, 50]
  }
])

// User Overview Chart
const userOverviewOptions = ref({
  chart: {
    type: 'area',
    height: 350,
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 3,
    colors: ['#3B82F6']
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100]
    },
    colors: ['#3B82F6']
  },
  xaxis: {
    categories: ['November 01', 'November 10', 'November 20', 'November 30'],
    labels: {
      style: {
        colors: '#9CA3AF',
        fontSize: '12px'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#9CA3AF',
        fontSize: '12px'
      },
      formatter: (value) => {
        if (value >= 1000) {
          return (value / 1000).toFixed(0) + 'K'
        }
        return value
      }
    }
  },
  grid: {
    borderColor: '#F3F4F6',
    strokeDashArray: 5
  },
  tooltip: {
    theme: 'light',
    x: {
      show: true
    }
  }
})

const userOverviewSeries = ref([
  {
    name: 'Users',
    data: [40000, 15000, 25000, 30000, 20000, 45000, 35000, 50000, 40000, 45000, 35000, 25000]
  }
])

// Pricing Plan Donut Chart
const pricingPlanOptions = ref({
  chart: {
    type: 'donut',
    height: 250
  },
  labels: ['Monthly', 'Per Session', 'Free'],
  colors: ['#3B82F6', '#F59E0B', '#EF4444'],
  stroke: {
    width: 0
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: false
        }
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  tooltip: {
    theme: 'light'
  }
})

const pricingPlanSeries = ref([51.94, 47.42, 3.55])

const pricingPlanData = ref([
  { name: 'Monthly', users: '547,914', percentage: '51.94%', color: '#3B82F6' },
  { name: 'Per Session', users: '547,914', percentage: '47.42%', color: '#F59E0B' },
  { name: 'Free', users: '547,914', percentage: '3.55%', color: '#EF4444' }
])

const selectedPeriod = ref('This Month')
</script>

<template>
  <div class=" space-y-6  min-h-screen">
    <div>

      <h1 class="text-[24px] font-semibold text-gray-900">👋 Hey, Kevin.</h1>
      <p class="text-[13px] font-normal text-gray-700">Welcome to BNG Fitness Hub</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="(stat, index) in topStats" 
        :key="index"
        class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-[11px] font-medium text-gray-500 uppercase tracking-wider">{{ stat.title }}</span>
          <span 
            class="flex items-center gap-1 text-[11px] font-normal"
            :class="stat.trend === 'increase' ? 'text-success' : 'text-error'"
          >
            <span>{{ stat.trend === 'increase' ? '↑' : '↓' }}</span>
            {{ stat.trendValue }}
          </span>
        </div>
        <div class="mb-4">
          <h3 class="text-2xl font-semibold text-gray-900">{{ stat.percentage }}</h3>
        </div>
        <div class="h-24 -mx-6 -mb-6">
          <VueApexCharts
            type="area"
            :height="120"
            :options="miniChartOptions(stat.color)"
            :series="miniChartSeries"
          />
        </div>
      </div>
    </div>

    <!-- Bottom Stats Grid -->
    <div class="bg-white rounded-xl p-6 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(stat, index) in bottomStats" 
          :key="index"
          class="border-r border-gray-200 last:border-r-0 pr-6 last:pr-0"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="text-[13px] font-normal text-gray-600">{{ stat.title }}</span>
            <span 
              class="flex items-center gap-1 text-[11px] font-normal"
              :class="stat.trend === 'increase' ? 'text-success' : 'text-error'"
            >
              <span>{{ stat.trend === 'increase' ? '↑' : '↓' }}</span>
              {{ stat.trendValue }}
            </span>
          </div>
          <div class="mb-2">
            <h3 class="text-xl font-semibold text-gray-900">{{ stat.value }}</h3>
          </div>
          <p class="text-[13px] text-gray-500">{{ stat.subtitle }}</p>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- User Overview Chart -->
      <div class="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-[17px] font-medium text-gray-900">User Overview</h3>
          <select 
            v-model="selectedPeriod"
            class="px-4 py-2 text-[13px] font-normal border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>
        <VueApexCharts
          type="area"
          :height="350"
          :options="userOverviewOptions"
          :series="userOverviewSeries"
        />
      </div>

      <!-- Pricing Plan Chart -->
      <div class="bg-white rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-[17px] font-medium text-gray-900">Pricing Plan</h3>
          <select 
            v-model="selectedPeriod"
            class="px-4 py-2 text-[13px] font-normal border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>
        
        <div class="flex justify-center mb-6">
          <VueApexCharts
            type="donut"
            :height="250"
            :options="pricingPlanOptions"
            :series="pricingPlanSeries"
          />
        </div>

        <!-- Legend -->
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-2 text-[11px] font-normal text-gray-500 uppercase pb-2 border-b border-gray-200">
            <div>PRICE NAME</div>
            <div class="text-right">TOTAL USERS</div>
            <div class="text-right">USER %</div>
          </div>
          <div 
            v-for="(plan, index) in pricingPlanData" 
            :key="index"
            class="grid grid-cols-3 gap-2 items-center"
          >
            <div class="flex items-center gap-2">
              <div 
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: plan.color }"
              ></div>
              <span class="text-[13px] font-normal text-gray-900">{{ plan.name }}</span>
            </div>
            <div class="text-[13px] text-gray-600 text-right">{{ plan.users }}</div>
            <div class="text-[13px] font-medium text-success text-right">{{ plan.percentage }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for select dropdowns */
select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.5rem;
}
</style>
