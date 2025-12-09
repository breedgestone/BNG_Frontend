/**
 * src/api/http.js
 * Central axios instance used by all clients.
 */
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const url = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: url || '/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    try {
      const auth = useAuthStore()
      const token = auth.accessToken
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (e) {
      // store not available (SSR/tests) - ignore
    }
    return config
  },
  (err) => Promise.reject(err),
)

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    let auth = null
    try {
      auth = useAuthStore()
    } catch (e) {
      // ignore if store not available
    }

    // Handle 401 errors - logout and redirect to home
    if (error.response && error.response.status === 401) {
      const currentPath = router.currentRoute?.value?.path || router.currentRoute?.path || ''
      const isAuthPage = ['/login', '/signup'].includes(currentPath)
      if (!isAuthPage && auth) {
        auth.logout()
      }
      return Promise.reject(error)
    }

    // Normalize error payload for UI
    const responseData = error.response?.data ?? null
    const payload = {
      status: error.response?.status ?? 0,
      message:
        (responseData && (responseData.message || error.message)) || error.message,
      errors: responseData?.errors ?? null,
      data: responseData,
    }
    return Promise.reject(payload)
  },
)

export default api
