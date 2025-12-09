/**
 * src/composables/useApi.js
 * Composable for handling API calls with loading and error states
 */
import { ref } from 'vue'
import { handleApiError } from '@/utils/errorHandler'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const execute = async (apiCall) => {
    loading.value = true
    error.value = null

    try {
      const result = await apiCall()
      loading.value = false
      return result
    } catch (err) {
      error.value = handleApiError(err)
      loading.value = false
      throw err
    }
  }

  const reset = () => {
    loading.value = false
    error.value = null
  }

  return {
    loading,
    error,
    execute,
    reset,
  }
}
