import DashboardIcon from '@/assets/svg/nav-icons/DashboardIcon.vue'
import UsersIcon from '@/assets/svg/nav-icons/UsersIcon.vue'
import WorkoutsIcon from '@/assets/svg/nav-icons/WorkoutsIcon.vue'
import SubscriptionsIcon from '@/assets/svg/nav-icons/SubscriptionsIcon.vue'
import SignInScansIcon from '@/assets/svg/nav-icons/SignInScansIcon.vue'
import ScheduleIcon from '@/assets/svg/nav-icons/ScheduleIcon.vue'
import ChallengesIcon from '@/assets/svg/nav-icons/ChallengesIcon.vue'
import PromotionIcon from '@/assets/svg/nav-icons/PromotionIcon.vue'
import PayoutIcon from '@/assets/svg/nav-icons/PayoutIcon.vue'
import LeadershipBoardIcon from '@/assets/svg/nav-icons/LeadershipBoardIcon.vue'
import CustomerReviewsIcon from '@/assets/svg/nav-icons/CustomerReviewsIcon.vue'
import AdminsIcon from '@/assets/svg/nav-icons/AdminsIcon.vue'
import ProfileIcon from '@/assets/svg/nav-icons/ProfileIcon.vue'

const navItems = [
  {
    label: 'Dashboard',
    to: '/admin',
    icon: DashboardIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: 'Users',
    to: '/admin/users',
    icon: UsersIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: 'Workouts',
    to: '/admin/workouts',
    icon: WorkoutsIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: 'Subscriptions',
    to: '/admin/subscriptions',
    icon: SubscriptionsIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: 'Sign In Scans',
    to: '/admin/sign-in-scans',
    icon: SignInScansIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: 'Schedule',
    to: '/admin/schedule',
    icon: ScheduleIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: 'Challenges',
    to: '/admin/challenges',
    icon: ChallengesIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: 'Promotion',
    to: '/admin/promotion',
    icon: PromotionIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: 'Payout',
    to: '/admin/payout',
    icon: PayoutIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: 'Leadership Board',
    to: '/admin/leadership-board',
    icon: LeadershipBoardIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: "Customer's Reviews",
    to: '/admin/customer-reviews',
    icon: CustomerReviewsIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: 'Admins',
    to: '/admin/admins',
    icon: AdminsIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
  {
    label: 'Profile',
    to: '/admin/profile',
    icon: ProfileIcon,
    iconColor: '#3E3B3B',
    activeIconColor: '#E12700',
  },
]

export default navItems
