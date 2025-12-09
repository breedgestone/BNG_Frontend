/**
 * src/stores/auth.js
 * Pinia auth store (composition-style) with secure storage
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'
import { secureStorage } from '@/utils/storage'
import { authClient } from '@/api/clients/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const guestId = ref(null)
  
  // Access token with secure storage
  const accessToken = computed(() => {
    return secureStorage.getToken('accessToken')
  })
  
  // Refresh token with secure storage
  const refreshToken = computed(() => {
    return secureStorage.getToken('refreshToken')
  })

  function setAccessToken(token) {
    if (token) {
      // Access token expires in 1 hour
      secureStorage.setToken('accessToken', token, 1)
    } else {
      secureStorage.removeToken('accessToken')
    }
  }

  function setRefreshToken(token) {
    if (token) {
      // Refresh token expires in 7 days
      secureStorage.setToken('refreshToken', token, 24 * 7)
    } else {
      secureStorage.removeToken('refreshToken')
    }
  }

  function setUser(userData) {
    user.value = userData
    if (userData) {
      // Store user data in session (expires when browser closes)
      secureStorage.setSessionData('user', userData)
    } else {
      secureStorage.removeSessionData('user')
    }
  }

  // Guest management
  function setGuestId(id) {
    guestId.value = id
    if (id) {
      secureStorage.setSessionData('guestId', id)
    } else {
      secureStorage.removeSessionData('guestId')
    }
  }

  function getGuestId() {
    if (!guestId.value) {
      const storedGuestId = secureStorage.getSessionData('guestId')
      if (storedGuestId) {
        guestId.value = storedGuestId
      }
    }
    return guestId.value
  }

  async function ensureGuestId() {
    const existingGuestId = getGuestId()
    if (existingGuestId) {
      return existingGuestId
    }

    try {
      // Add your guest creation endpoint here when available
      // const response = await authClient.createGuest()
      // const newGuestId = response.data?.guestId
      // setGuestId(newGuestId)
      // return newGuestId
      
      // Temporary fallback
      const tempGuestId = `guest_${Date.now()}`
      setGuestId(tempGuestId)
      return tempGuestId
    } catch (error) {
      console.error('Error creating guest user:', error)
      throw error
    }
  }

  function initializeAuth() {
    // Try to restore user from session storage
    const storedUser = secureStorage.getSessionData('user')
    if (storedUser) {
      user.value = storedUser
    }

    // Try to restore guest ID from session storage
    const storedGuestId = secureStorage.getSessionData('guestId')
    if (storedGuestId) {
      guestId.value = storedGuestId
    }
  }

  function logout() {
    setAccessToken(null)
    setRefreshToken(null)
    setUser(null)
    // Clear guest ID when user logs out
    setGuestId(null)
    try {
      router.push({ name: 'home' })
    } catch (e) {
      // router may not be available in tests
    }
  }

  // Check if user is authenticated
  const isAuthenticated = computed(() => {
    return !!accessToken.value && !!user.value
  })

  return {
    accessToken,
    refreshToken,
    user,
    guestId: computed(() => guestId.value),
    isAuthenticated,
    setAccessToken,
    setRefreshToken,
    setUser,
    setGuestId,
    getGuestId,
    ensureGuestId,
    initializeAuth,
    logout,
  }
})
