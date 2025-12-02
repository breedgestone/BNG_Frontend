import { createRouter, createWebHistory } from 'vue-router'
import LandingPageLayout from '../layouts/LandingPageLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved position (browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }
    // If navigating to a hash/anchor, scroll to it
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    // Default: scroll to top of page
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    // Landing Page Routes
    {
      path: '/',
      component: LandingPageLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('../views/ContactView.vue'),
        },
      ],
    },
    // Admin Routes
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/admin/DashboardView.vue'),
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/UsersView.vue'),
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/admin/ProductsView.vue'),
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/admin/DashboardView.vue'), // Reusing for now
        },
        {
          path: 'analytics',
          name: 'admin-analytics',
          component: () => import('../views/admin/DashboardView.vue'), // Reusing for now
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../views/admin/DashboardView.vue'), // Reusing for now
        },
        {
          path: 'profile',
          name: 'admin-profile',
          component: () => import('../views/admin/DashboardView.vue'), // Reusing for now
        },
      ],
    },
  ],
})

export default router
