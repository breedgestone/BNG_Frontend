/**
 * Schema Markup Composable
 * Generates JSON-LD structured data for SEO
 */

export function useSchema() {
  const addSchema = (schemaData) => {
    // Remove existing schema script if present
    const existingScript = document.querySelector('script[data-schema]')
    if (existingScript) {
      existingScript.remove()
    }

    // Create and inject new schema script
    const script = document.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    script.setAttribute('data-schema', 'true')
    script.textContent = JSON.stringify(schemaData)
    document.head.appendChild(script)
  }

  const getLocalBusinessSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': 'https://www.bngfitness.com/#organization',
    name: 'BNG Fitness Hub',
    alternateName: 'BNG Gym',
    url: 'https://www.bngfitness.com',
    logo: 'https://www.bngfitness.com/logo.png',
    description: 'Premier fitness hub with 40+ expert trainers, 33+ fitness programs, and 970+ active members. Transform your fitness journey with personalized training and gamified rewards.',
    image: 'https://www.bngfitness.com/og-image.jpg',
    telephone: '+234-XXX-XXX-XXXX', // Update with actual phone
    email: 'info@bngfitness.com', // Update with actual email
    priceRange: '₦1,000 - ₦10,000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address', // Update with actual address
      addressLocality: 'Your City',
      addressRegion: 'Your State',
      postalCode: 'Your Postal Code',
      addressCountry: 'NG'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 0.0, // Update with actual coordinates
      longitude: 0.0
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:00',
        closes: '22:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '20:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/bngfitness', // Update with actual social media
      'https://www.instagram.com/bngfitness',
      'https://twitter.com/bngfitness'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1'
    }
  })

  const getServiceSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Fitness Training',
    provider: {
      '@type': 'HealthAndBeautyBusiness',
      name: 'BNG Fitness Hub'
    },
    areaServed: {
      '@type': 'City',
      name: 'Your City' // Update with actual city
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Fitness Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '24 Hours Full Subscription',
            description: 'Unlimited gym access with full amenities'
          },
          price: '10000',
          priceCurrency: 'NGN'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '4 Hours Session',
            description: 'Flexible 4-hour gym access per session'
          },
          price: '2000',
          priceCurrency: 'NGN'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Workout Subscription',
            description: 'Virtual training and workout plans'
          },
          price: '1000',
          priceCurrency: 'NGN'
        }
      ]
    }
  })

  const getReviewSchema = (reviews) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'HealthAndBeautyBusiness',
      name: 'BNG Fitness Hub'
    },
    reviewBody: reviews.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5'
    },
    author: {
      '@type': 'Person',
      name: reviews.author
    },
    datePublished: reviews.date || '2025-12-13'
  })

  const getFAQSchema = (faqs) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  })

  const getBreadcrumbSchema = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  })

  return {
    addSchema,
    getLocalBusinessSchema,
    getServiceSchema,
    getReviewSchema,
    getFAQSchema,
    getBreadcrumbSchema
  }
}
