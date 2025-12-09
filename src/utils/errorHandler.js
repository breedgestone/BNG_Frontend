/**
 * src/utils/errorHandler.js
 * Centralized error handling utilities
 */

export const handleApiError = (error) => {
  const defaultMessage = 'An unexpected error occurred. Please try again.'

  if (error.response) {
    // Server responded with error status
    const status = error.response.status
    const data = error.response.data

    switch (status) {
      case 400:
        return data.message || 'Bad request. Please check your input.'
      case 401:
        return 'Unauthorized. Please log in again.'
      case 403:
        return 'You do not have permission to perform this action.'
      case 404:
        return 'The requested resource was not found.'
      case 422:
        return data.message || 'Validation error. Please check your input.'
      case 500:
        return 'Server error. Please try again later.'
      default:
        return data.message || defaultMessage
    }
  } else if (error.request) {
    // Request made but no response received
    return 'Network error. Please check your connection.'
  } else {
    // Error setting up request
    return error.message || defaultMessage
  }
}

export const formatValidationErrors = (errors) => {
  if (!errors || typeof errors !== 'object') return null

  const formatted = {}
  Object.keys(errors).forEach((key) => {
    formatted[key] = Array.isArray(errors[key]) ? errors[key][0] : errors[key]
  })
  return formatted
}
