<script setup>
import { ref } from 'vue'

const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', avatar: 'JS' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', avatar: 'BJ' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', avatar: 'AB' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active', avatar: 'CW' },
])

const getRoleColor = (role) => {
  const colors = {
    'Admin': 'bg-red-100 text-red-800',
    'Manager': 'bg-blue-100 text-blue-800',
    'User': 'bg-gray-100 text-gray-800',
  }
  return colors[role] || 'bg-gray-100 text-gray-800'
}

const getStatusColor = (status) => {
  return status === 'Active' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-gray-100 text-gray-800'
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Users Management</h1>
        <p class="text-gray-600">Manage all user accounts</p>
      </div>
      <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
        + Add New User
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-md border border-gray-100">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center gap-4">
          <input 
            type="search" 
            placeholder="Search users..." 
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>User</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50">
              <th class="text-left py-4 px-6 text-sm font-semibold text-gray-700">User</th>
              <th class="text-left py-4 px-6 text-sm font-semibold text-gray-700">Email</th>
              <th class="text-left py-4 px-6 text-sm font-semibold text-gray-700">Role</th>
              <th class="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
              <th class="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="user in users" 
              :key="user.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ user.avatar }}
                  </div>
                  <span class="font-medium text-gray-900">{{ user.name }}</span>
                </div>
              </td>
              <td class="py-4 px-6 text-gray-600">{{ user.email }}</td>
              <td class="py-4 px-6">
                <span :class="[getRoleColor(user.role), 'px-3 py-1 rounded-full text-xs font-medium']">
                  {{ user.role }}
                </span>
              </td>
              <td class="py-4 px-6">
                <span :class="[getStatusColor(user.status), 'px-3 py-1 rounded-full text-xs font-medium']">
                  {{ user.status }}
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
          <p class="text-sm text-gray-600">Showing 1 to 5 of 5 users</p>
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
