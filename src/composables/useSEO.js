import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Composable for managing SEO meta tags dynamically
 * @param {Object} options - SEO configuration options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.keywords - Page keywords
 * @param {string} options.image - OG image URL
 * @param {string} options.url - Canonical URL
 * @param {string} options.type - OG type (default: 'website')
 */
export function useSEO(options = {}) {
  const route = useRoute()
  const baseUrl = 'https://www.bngfitness.com'

  const defaultOptions = {
    title: 'BNG Fitness Hub - Transform Your Fitness Journey',
    description: 'Join BNG Fitness Hub with 40+ expert trainers, 33+ fitness programs, and a community of 970+ members.',
    keywords: 'fitness gym, workout programs, personal trainers, fitness hub',
    image: `${baseUrl}/og-image.jpg`,
    url: baseUrl,
    type: 'website',
  }

  const updateMetaTags = (seoOptions) => {
    const mergedOptions = { ...defaultOptions, ...seoOptions }
    const fullUrl = mergedOptions.url.startsWith('http')
      ? mergedOptions.url
      : `${baseUrl}${mergedOptions.url}`

    // Update title
    document.title = mergedOptions.title

    // Helper function to update or create meta tags
    const setMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector)
      if (element) {
        element.setAttribute(attribute, value)
      } else {
        element = document.createElement('meta')
        const [attrName, attrValue] = selector.match(/\[(.+)="(.+)"\]/)
          ? selector.match(/\[(.+)="(.+)"\]/).slice(1)
          : ['name', selector]
        element.setAttribute(attrName, attrValue)
        element.setAttribute(attribute, value)
        document.head.appendChild(element)
      }
    }

    // Update standard meta tags
    setMetaTag('meta[name="description"]', 'content', mergedOptions.description)
    setMetaTag('meta[name="keywords"]', 'content', mergedOptions.keywords)

    // Update Open Graph tags
    setMetaTag('meta[property="og:title"]', 'content', mergedOptions.title)
    setMetaTag('meta[property="og:description"]', 'content', mergedOptions.description)
    setMetaTag('meta[property="og:image"]', 'content', mergedOptions.image)
    setMetaTag('meta[property="og:url"]', 'content', fullUrl)
    setMetaTag('meta[property="og:type"]', 'content', mergedOptions.type)

    // Update Twitter Card tags
    setMetaTag('meta[property="twitter:title"]', 'content', mergedOptions.title)
    setMetaTag('meta[property="twitter:description"]', 'content', mergedOptions.description)
    setMetaTag('meta[property="twitter:image"]', 'content', mergedOptions.image)
    setMetaTag('meta[property="twitter:url"]', 'content', fullUrl)

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', fullUrl)
    } else {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('href', fullUrl)
      document.head.appendChild(canonical)
    }
  }

  // Update meta tags on mount
  onMounted(() => {
    updateMetaTags(options)
  })

  // Watch for route changes and update meta tags
  watch(
    () => route.path,
    () => {
      if (options.url && !options.url.startsWith('http')) {
        updateMetaTags({ ...options, url: route.path })
      }
    }
  )

  return {
    updateMetaTags,
  }
}
