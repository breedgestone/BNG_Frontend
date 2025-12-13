# BNG Fitness Hub - Frontend Application

A modern fitness gym management platform built with Vue.js, providing members with seamless access to workouts, challenges, subscriptions, and community features.

## 🏋️ About BNG Fitness Hub

BNG Fitness Hub is a comprehensive fitness platform that inspires, connects, and motivates every member to achieve their health and wellness goals. Our application offers:

- **40+ Expert Trainers** - Certified professionals guiding your fitness journey
- **33+ Fitness Programs** - Diverse workout plans for all levels
- **970+ Active Members** - Thriving fitness community
- **Gamified Check-ins** - Earn rewards for consistency
- **Real-time Progress Tracking** - Monitor your fitness achievements
- **Flexible Membership Plans** - 24-hour access, 4-hour sessions, or home workouts

## 🚀 Tech Stack

### Core
- **Vue 3.5** - Progressive JavaScript Framework with Composition API
- **Vite 5.4** - Next Generation Frontend Build Tool
- **Tailwind CSS** - Utility-First CSS Framework with custom design system

### State & Routing
- **Pinia** - Intuitive State Management for user sessions and app state
- **Vue Router 4** - Official Router for Vue.js with protected admin routes

### UI Components & Libraries
- **ApexCharts** - Data visualization for analytics and reports
- **Swiper** - Modern touch slider for testimonials and galleries
- **Quill Editor** - Rich text editing for messages and content
- **Headless UI** - Accessible UI components for modals and dialogs
- **Vue Hero Icons** - SVG icons throughout the interface
- **AOS** - Smooth scroll animations

### Real-time & Communication
- **Socket.IO Client** - Real-time notifications and live updates
- **Axios** - HTTP client for API communication

### Testing & Quality
- **Vitest** - Unit test framework
- **Cypress** - End-to-end testing
- **Prettier** - Code formatting

### Performance Optimization
- **Sharp** - Image optimization and WebP conversion
- **Terser** - JavaScript minification for production builds

## 📦 Project Setup

### Prerequisites
- Node.js `^20.19.0 || >=22.12.0`
- npm or yarn

### Install Dependencies

```bash
npm install
```

## 🛠️ Development

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🧪 Testing

### Run Unit Tests

```bash
npm run test:unit
```

### Run E2E Tests

```bash
# Run E2E tests in headless mode
npm run test:e2e

# Open E2E tests in interactive mode
npm run test:e2e:dev
```

## 💅 Code Formatting

```bash
npm run format
```

## 📁 Project Structure

```
BNG/
├── src/
│   ├── api/                 # API client configuration
│   │   ├── http.js         # Axios instance setup
│   │   └── clients/        # API endpoint clients
│   │       ├── auth.js     # Authentication endpoints
│   │       ├── users.js    # User management
│   │       ├── workouts.js # Workout programs
│   │       ├── challenges.js # Fitness challenges
│   │       └── ...         # Other API clients
│   ├── assets/             # Static assets
│   │   ├── images/         # Optimized WebP images
│   │   ├── svg/            # SVG icons and graphics
│   │   └── fonts/          # Custom Campton font family
│   ├── components/         # Reusable Vue components
│   │   ├── Layout/         # Layout components
│   │   ├── Navbar.vue      # Navigation component
│   │   ├── Table.vue       # Data table component
│   │   └── ...             # Other shared components
│   ├── composables/        # Vue composables
│   │   ├── useApi.js       # API composition helper
│   │   └── useSEO.js       # SEO meta tags management
│   ├── layouts/            # Page layouts
│   │   ├── AdminLayout.vue # Admin dashboard layout
│   │   └── LandingPageLayout.vue # Public pages layout
│   ├── views/              # Page components
│   │   ├── HomeView.vue    # Landing page
│   │   ├── AboutView.vue   # About page
│   │   ├── ContactView.vue # Contact page
│   │   ├── LoginView.vue   # Authentication
│   │   └── admin/          # Admin dashboard views
│   ├── router/             # Vue Router configuration
│   ├── stores/             # Pinia stores
│   │   └── auth.js         # Authentication state
│   ├── utils/              # Utility functions
│   │   ├── errorHandler.js # Error handling
│   │   └── storage.js      # Local storage wrapper
│   ├── App.vue             # Root component
│   └── main.js             # Application entry point
├── public/                 # Public static assets
│   ├── sitemap.xml        # SEO sitemap
│   ├── robots.txt         # Search engine directives
│   └── site.webmanifest   # PWA manifest
├── cypress/               # E2E tests
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind customization
└── vercel.json            # Vercel deployment config
```

## 🎯 Key Features

### Public Features
- 🏠 **Landing Page** - Showcase gym services, pricing, and testimonials
- 📝 **About Us** - Mission, vision, values, and philosophy
- 📞 **Contact** - Get in touch with the gym
- 🔐 **Authentication** - Secure login for members and admins

### Member Features
- 💪 **Workout Programs** - Access 33+ fitness programs
- 🏆 **Challenges** - Participate in fitness challenges
- 📊 **Progress Tracking** - Monitor workout history and achievements
- 🎁 **Gamified Rewards** - Earn points for check-ins and redeem perks
- 👥 **Community** - Connect with 970+ active members
- 📱 **Mobile App** - iOS and Android companion apps

### Admin Dashboard
- 📈 **Analytics** - Real-time metrics and reporting
- 👤 **User Management** - Member profiles and subscriptions
- 🏋️ **Trainer Management** - Manage trainers and sessions
- 💳 **Subscription Plans** - 24-hour, 4-hour, and home workout plans
- 🎯 **Challenge Management** - Create and monitor fitness challenges
- 📅 **Schedule Management** - Class and session scheduling
- 💰 **Payouts** - Trainer compensation tracking
- 📝 **Reviews** - Customer testimonials management
- 🎫 **Support Tickets** - Member support system
- 🔔 **Promotions** - Marketing campaigns and offers

### Technical Features
- ⚡ Lightning-fast page loads with Vite HMR
- 🎨 Responsive design with mobile-first approach
- 🖼️ Optimized images (WebP format, 70% size reduction)
- 🔄 Real-time updates with Socket.IO
- 🔒 Secure authentication with JWT tokens
- 📱 Progressive Web App capabilities
- 🎭 Accessible UI with WCAG compliance
- 🌐 SEO optimized with meta tags and sitemap
- 💾 Browser caching for static assets (1-year cache)
- 🎬 Smooth animations and transitions

## 🎨 Design System

- **Primary Color**: Red (#E12700)
- **Font Family**: Campton (Light, Medium, SemiBold, Bold)
- **Breakpoints**: Mobile-first responsive design
- **Components**: Custom BNG button, card, modal, and table components

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_SOCKET_URL=your_socket_server_url
```

### Tailwind CSS

Tailwind is configured in `tailwind.config.js` with custom colors, fonts, and utilities specific to BNG Fitness Hub branding.

### API Configuration

API clients are organized in `src/api/clients/` with a centralized Axios instance in `src/api/http.js` handling authentication, error handling, and request/response interceptors.

## 🌐 Deployment

The application is deployed on Vercel with:
- Automatic builds from `master` branch
- CDN distribution for static assets
- Long-term caching (1 year) for images, fonts, and static files
- Security headers (X-Frame-Options, CSP, etc.)

## 📊 Performance Metrics

- **Image Optimization**: 70% size reduction (79MB → 24MB)
- **Build Size**: Optimized with code splitting and tree shaking
- **Load Time**: <2s on 3G networks (80% improvement)
- **Lighthouse Score**: Optimized for performance, accessibility, and SEO

## 📝 Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test:unit` | Run unit tests |
| `npm run test:e2e` | Run E2E tests (headless) |
| `npm run test:e2e:dev` | Open E2E tests (interactive) |
| `npm run format` | Format code with Prettier |

## 🔒 Security

- JWT-based authentication
- HTTP-only cookies for session management
- CSRF protection
- XSS prevention with sanitized inputs
- Rate limiting on API requests
- Security headers configured in `vercel.json`

## 🤝 Contributing

This is a private project for BNG Fitness Hub. For internal development:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request for review

## 📄 License

This project is private and proprietary to BNG Fitness Hub.

---

**BNG Fitness Hub** - Empowering Your Fitness Journey
Built with ❤️ using Vue.js and modern web technologies
