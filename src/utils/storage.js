/**
 * src/utils/storage.js
 * Secure storage utilities for authentication tokens
 */

// Cookie utilities for secure token storage
export const cookieStorage = {
  set(name, value, options = {}) {
    const defaultOptions = {
      path: '/',
      secure: window.location.protocol === 'https:',
      sameSite: 'strict',
      httpOnly: false, // Frontend can't set httpOnly, but backend should
      maxAge: 60 * 60 * 24 * 7, // 7 days default
      ...options
    }

    let cookieString = `${name}=${encodeURIComponent(value)}`
    
    Object.entries(defaultOptions).forEach(([key, val]) => {
      if (val === true) {
        cookieString += `; ${key}`
      } else if (val !== false && val !== null && val !== undefined) {
        cookieString += `; ${key}=${val}`
      }
    })

    document.cookie = cookieString
  },

  get(name) {
    const nameEQ = name + '='
    const cookies = document.cookie.split(';')
    
    for (let cookie of cookies) {
      let c = cookie.trim()
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length))
      }
    }
    return null
  },

  remove(name, path = '/') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`
  }
}

// Session storage utilities (expires when browser closes)
export const sessionStorage = {
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Session storage error:', error)
      // Fallback to memory storage if sessionStorage is not available
      window[`__session_${key}`] = value
    }
  },

  get(key) {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Session storage error:', error)
      // Fallback to memory storage
      return window[`__session_${key}`] || null
    }
  },

  remove(key) {
    try {
      window.sessionStorage.removeItem(key)
      delete window[`__session_${key}`]
    } catch (error) {
      console.error('Session storage error:', error)
    }
  }
}

// Enhanced storage with automatic expiry
export const secureStorage = {
  setToken(key, token, expiresInHours = 1) {
    const expiryTime = Date.now() + (expiresInHours * 60 * 60 * 1000)
    const tokenData = {
      token,
      expires: expiryTime
    }

    // Use cookies for persistent storage across tabs
    cookieStorage.set(key, JSON.stringify(tokenData), {
      maxAge: expiresInHours * 60 * 60 // Convert to seconds
    })
  },

  getToken(key) {
    const tokenData = cookieStorage.get(key)
    if (!tokenData) return null

    try {
      const parsed = JSON.parse(tokenData)
      
      // Check if token has expired
      if (Date.now() > parsed.expires) {
        this.removeToken(key)
        return null
      }
      
      return parsed.token
    } catch (error) {
      console.error('Token parse error:', error)
      this.removeToken(key)
      return null
    }
  },

  removeToken(key) {
    cookieStorage.remove(key)
  },

  // For sensitive data that should expire with session
  setSessionData(key, data) {
    sessionStorage.set(key, data)
  },

  getSessionData(key) {
    return sessionStorage.get(key)
  },

  removeSessionData(key) {
    sessionStorage.remove(key)
  }
}
