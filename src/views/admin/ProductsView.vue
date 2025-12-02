<script setup>
import { ref } from 'vue'

const products = ref([
  { id: 1, name: 'Product A', category: 'Electronics', price: '$299.99', stock: 45, status: 'Active' },
  { id: 2, name: 'Product B', category: 'Clothing', price: '$49.99', stock: 120, status: 'Active' },
  { id: 3, name: 'Product C', category: 'Books', price: '$19.99', stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'Product D', category: 'Electronics', price: '$599.99', stock: 23, status: 'Active' },
  { id: 5, name: 'Product E', category: 'Home', price: '$89.99', stock: 67, status: 'Active' },
])

const getStatusColor = (status) => {
  return status === 'Active' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800'
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Products Management</h1>
        <p class="text-gray-600">Manage your product catalog</p>
      </div>
      <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
        + Add New Product
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-md border border-gray-100">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center gap-4">
          <input 
            type="search" 
            placeholder="Search products..." 
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
            <option>Home</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50">
              <th class="text-left py-4 px-6 text-sm font-semibold text-gray-700">Product</th>
              <th class="text-left py-4 px-6 text-sm font-semibold text-gray-700">Category</th>
              <th class="text-left py-4 px-6 text-sm font-semibold text-gray-700">Price</th>
              <th class="text-left py-4 px-6 text-sm font-semibold text-gray-700">Stock</th>
              <th class="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
              <th class="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="product in products" 
              :key="product.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td class="py-4 px-6 font-medium text-gray-900">{{ product.name }}</td>
              <td class="py-4 px-6 text-gray-600">{{ product.category }}</td>
              <td class="py-4 px-6 font-semibold text-gray-900">{{ product.price }}</td>
              <td class="py-4 px-6 text-gray-600">{{ product.stock }}</td>
              <td class="py-4 px-6">
                <span :class="[getStatusColor(product.status), 'px-3 py-1 rounded-full text-xs font-medium']">
                  {{ product.status }}
                </span>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</button>
                  <button class="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-6 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-600">Showing 1 to 5 of 5 products</p>
          <div class="flex gap-2">
            <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
              Previous
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              1
            </button>
            <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
