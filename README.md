# BNG - Vue.js Application

A professional Vue.js application built with Vite, Tailwind CSS v4, and a comprehensive modern tech stack.

## 🚀 Tech Stack

### Core
- **Vue 3.5** - Progressive JavaScript Framework with Composition API
- **Vite 7** - Next Generation Frontend Build Tool
- **Tailwind CSS 4** - Utility-First CSS Framework

### State & Routing
- **Pinia** - Intuitive State Management
- **Vue Router 4** - Official Router for Vue.js

### UI Components & Libraries
- **ApexCharts** - Modern charting library
- **Swiper** - Modern mobile touch slider
- **Quill Editor** - Powerful rich text editor
- **Headless UI** - Unstyled, accessible UI components
- **Vue Hero Icons** - Beautiful hand-crafted SVG icons
- **AOS** - Animate On Scroll library

### Real-time & Communication
- **Socket.IO Client** - Real-time bidirectional communication

### Testing
- **Vitest** - Blazing fast unit test framework
- **Cypress** - End-to-end testing framework
- **@vue/test-utils** - Official unit testing utility library

### Code Quality
- **Prettier** - Opinionated code formatter

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
│   ├── assets/          # Static assets (CSS, images, etc.)
│   ├── components/      # Reusable Vue components
│   ├── views/           # Page components
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia stores
│   ├── App.vue          # Root component
│   └── main.js          # Application entry point
├── public/              # Public static assets
├── cypress/             # E2E tests
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## 🎯 Features

- ⚡ Lightning-fast HMR with Vite
- 🎨 Beautiful, responsive UI with Tailwind CSS v4
- 📊 Rich data visualization with ApexCharts
- ✏️ Advanced text editing with Quill
- 🔄 Real-time communication with Socket.IO
- 🧪 Comprehensive testing setup
- 🎭 Accessible UI components with Headless UI
- 📱 Mobile-first responsive design
- 🔧 Type-safe state management with Pinia
- 🎬 Smooth animations with AOS and Swiper

## 🔧 Configuration

### Tailwind CSS

Tailwind CSS v4 is configured via the `@tailwindcss/vite` plugin in `vite.config.js`. Custom styles can be added in `src/assets/main.css`.

### Vue Router

Routes are configured in `src/router/index.js`. Add new routes here for additional pages.

### Pinia Stores

Create new stores in the `src/stores/` directory for state management.

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Vue.js and modern web technologies
