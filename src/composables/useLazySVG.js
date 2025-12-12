// Composable for lazy-loading SVG images
import { ref, onMounted } from 'vue'

export function useLazySVG(src, options = {}) {
  const imageRef = ref(null)
  const isLoaded = ref(false)
  const hasError = ref(false)
  const { threshold = 0.1, rootMargin = '50px' } = options

  onMounted(() => {
    if (!imageRef.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            const src = img.dataset.src

            if (src) {
              img.src = src
              img.onload = () => {
                isLoaded.value = true
                img.removeAttribute('data-src')
              }
              img.onerror = () => {
                hasError.value = true
              }
            }
            observer.unobserve(img)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    if (imageRef.value) {
      observer.observe(imageRef.value)
    }

    // Cleanup
    return () => {
      if (imageRef.value) {
        observer.unobserve(imageRef.value)
      }
    }
  })

  return {
    imageRef,
    isLoaded,
    hasError
  }
}
