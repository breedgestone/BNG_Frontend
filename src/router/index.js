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
          path: 'users/:id',
          name: 'admin-view-user',
          component: () => import('../views/admin/ViewUserView.vue'),
        },
        {
          path: 'workouts',
          name: 'admin-workouts',
          component: () => import('../views/admin/WorkoutsView.vue'),
        },
        {
          path: 'subscriptions',
          name: 'admin-subscriptions',
          component: () => import('../views/admin/SubscriptionsView.vue'),
        },
        {
          path: 'sign-in-scans',
          name: 'admin-sign-in-scans',
          component: () => import('../views/admin/SignInScansView.vue'),
        },
        {
          path: 'schedule',
          name: 'admin-schedule',
          component: () => import('../views/admin/ScheduleView.vue'),
        },
        {
          path: 'challenges',
          name: 'admin-challenges',
          component: () => import('../views/admin/ChallengesView.vue'),
        },
        {
          path: 'promotion',
          name: 'admin-promotion',
          component: () => import('../views/admin/PromotionView.vue'),
        },
        {
          path: 'payout',
          name: 'admin-payout',
          component: () => import('../views/admin/PayoutView.vue'),
        },
        {
          path: 'leadership-board',
          name: 'admin-leadership-board',
          component: () => import('../views/admin/LeadershipBoardView.vue'),
        },
        {
          path: 'messages',
          name: 'admin-messages',
          component: () => import('../views/admin/MessagesView.vue'),
        },
        {
          path: 'customer-reviews',
          name: 'admin-customer-reviews',
          component: () => import('../views/admin/CustomerReviewsView.vue'),
        },
        {
          path: 'reports',
          name: 'admin-reports',
          component: () => import('../views/admin/ReportsView.vue'),
        },
        {
          path: 'support-ticket',
          name: 'admin-support-ticket',
          component: () => import('../views/admin/SupportTicketView.vue'),
        },
        {
          path: 'admins',
          name: 'admin-admins',
          component: () => import('../views/admin/AdminsView.vue'),
        },
        {
          path: 'profile',
          name: 'admin-profile',
          component: () => import('../views/admin/ProfileView.vue'),
        },
      ],
    },
  ],
})

export default router
