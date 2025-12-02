<script setup>
import { ref } from 'vue'

const stats = ref([
  { label: 'Total Users', value: '2,543', change: '+12%', icon: '👥', color: 'bg-blue-500' },
  { label: 'Total Orders', value: '1,234', change: '+8%', icon: '🛒', color: 'bg-green-500' },
  { label: 'Revenue', value: '$45,678', change: '+23%', icon: '💰', color: 'bg-purple-500' },
  { label: 'Active Products', value: '156', change: '+5%', icon: '📦', color: 'bg-orange-500' },
])

const recentOrders = ref([
  { id: '#12345', customer: 'John Doe', amount: '$125.00', status: 'Completed', date: '2025-12-01' },
  { id: '#12346', customer: 'Jane Smith', amount: '$89.50', status: 'Processing', date: '2025-12-01' },
  { id: '#12347', customer: 'Bob Johnson', amount: '$234.00', status: 'Pending', date: '2025-12-02' },
  { id: '#12348', customer: 'Alice Brown', amount: '$156.75', status: 'Completed', date: '2025-12-02' },
])

const getStatusClass = (status) => {
  const classes = {
    'Completed': 'bg-green-100 text-green-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>

<template>
  <div>
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div 
        v-for="stat in stats" 
        :key="stat.label"
        class="bg-white rounded-xl shadow-md p-6 border border-gray-100"
      >
        <div class="flex items-center justify-between mb-4">
          <div :class="[stat.color, 'w-12 h-12 rounded-lg flex items-center justify-center text-2xl']">
            {{ stat.icon }}
          </div>
          <span class="text-green-600 text-sm font-semibold">{{ stat.change }}</span>
        </div>
        <h3 class="text-gray-600 text-sm font-medium mb-1">{{ stat.label }}</h3>
        <p class="text-3xl font-bold text-gray-900">{{ stat.value }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Orders -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900">Recent Orders</h2>
          <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All →
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Order ID</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="order in recentOrders" 
                :key="order.id"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td class="py-3 px-4 text-sm font-medium text-blue-600">{{ order.id }}</td>
                <td class="py-3 px-4 text-sm text-gray-900">{{ order.customer }}</td>
                <td class="py-3 px-4 text-sm font-semibold text-gray-900">{{ order.amount }}</td>
                <td class="py-3 px-4">
                  <span :class="[getStatusClass(order.status), 'px-3 py-1 rounded-full text-xs font-medium']">
                    {{ order.status }}
                  </span>
                </td>
                <td class="py-3 px-4 text-sm text-gray-600">{{ order.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        
        <div class="space-y-3">
          <button class="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
            <span>➕</span>
            <span>Add New Product</span>
          </button>
          <button class="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
            <span>📝</span>
            <span>Create Order</span>
          </button>
          <button class="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2">
            <span>👤</span>
            <span>Add User</span>
          </button>
          <button class="w-full bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center gap-2">
            <span>📊</span>
            <span>Generate Report</span>
          </button>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-200">
          <h3 class="font-semibold text-gray-900 mb-3">System Status</h3>
          <div class="space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Server</span>
              <span class="text-green-600 font-medium">● Online</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Database</span>
              <span class="text-green-600 font-medium">● Connected</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">API</span>
              <span class="text-green-600 font-medium">● Running</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
