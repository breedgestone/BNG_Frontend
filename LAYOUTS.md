# BNG Layouts Documentation

## Overview
The BNG application now features two distinct layouts:
1. **Landing Page Layout** - For public-facing pages
2. **Admin Layout** - For administrative dashboard and management

## Layout Structure

### 1. Landing Page Layout (`src/layouts/LandingPageLayout.vue`)

**Features:**
- Clean, professional header with navigation
- Sticky navigation bar
- Responsive footer with multiple sections
- Mobile-friendly design
- Social links and quick links

**Used for:**
- Home page (`/`)
- About page (`/about`)
- Contact page (`/contact`)

**Navigation Items:**
- Home
- About
- Contact
- Admin (button to access admin area)

---

### 2. Admin Layout (`src/layouts/AdminLayout.vue`)

**Features:**
- Collapsible sidebar navigation
- User profile section
- Quick stats in header
- Notification bell
- Search functionality
- System status indicators
- Responsive design

**Used for:**
- Dashboard (`/admin`)
- Users Management (`/admin/users`)
- Products Management (`/admin/products`)
- Orders (`/admin/orders`)
- Analytics (`/admin/analytics`)
- Settings (`/admin/settings`)

**Sidebar Menu Items:**
- 📊 Dashboard
- 👥 Users
- 📦 Products
- 🛒 Orders
- 📈 Analytics
- ⚙️ Settings

---

## Routes Configuration

### Landing Page Routes
```javascript
/ (LandingPageLayout)
├── / (Home)
├── /about (About)
└── /contact (Contact)
```

### Admin Routes
```javascript
/admin (AdminLayout)
├── /admin (Dashboard)
├── /admin/users (Users Management)
├── /admin/products (Products Management)
├── /admin/orders (Orders)
├── /admin/analytics (Analytics)
├── /admin/settings (Settings)
└── /admin/profile (Profile)
```

---

## Available Admin Views

1. **DashboardView** (`src/views/admin/DashboardView.vue`)
   - Overview statistics cards
   - Recent orders table
   - Quick actions panel
   - System status indicators

2. **UsersView** (`src/views/admin/UsersView.vue`)
   - User list with search and filters
   - Role-based badges
   - User status indicators
   - Pagination

3. **ProductsView** (`src/views/admin/ProductsView.vue`)
   - Product catalog management
   - Category filtering
   - Stock level tracking
   - Price management

---

## Key Features

### Landing Page Layout
- **Responsive Navigation**: Mobile-friendly hamburger menu ready
- **Footer Sections**: Company info, quick links, resources, and social connections
- **Clean Design**: Modern, professional aesthetic
- **SEO Ready**: Semantic HTML structure

### Admin Layout
- **Collapsible Sidebar**: Toggleable for more workspace
- **User Context**: Always visible user profile
- **Real-time Indicators**: System status monitoring
- **Quick Actions**: Fast access to common tasks
- **Breadcrumbs Ready**: Easy navigation tracking

---

## Customization

### Changing Sidebar Width
In `AdminLayout.vue`:
```vue
sidebarOpen ? 'w-64' : 'w-20'
```

### Adding New Menu Items
In `AdminLayout.vue`:
```javascript
const menuItems = [
  { name: 'Your Item', path: '/admin/your-path', icon: '🎯' },
]
```

### Modifying Footer
In `LandingPageLayout.vue`, update the footer grid sections.

---

## Styling

Both layouts use:
- **Tailwind CSS 4** for styling
- **Responsive breakpoints** (sm, md, lg, xl)
- **Consistent color scheme**:
  - Primary: Blue (#2563eb)
  - Success: Green
  - Warning: Yellow
  - Danger: Red
  - Neutral: Gray scale

---

## Navigation Flow

**Public User Journey:**
```
Home → About → Contact → [Login] → Admin Dashboard
```

**Admin User Journey:**
```
Admin Dashboard → Manage Users/Products/Orders → Analytics → Settings
```

---

## Best Practices

1. **Keep layouts clean** - Only put shared UI elements in layouts
2. **Use RouterView** - Let child routes handle their own content
3. **Mobile-first** - Design for mobile, enhance for desktop
4. **Consistent spacing** - Use Tailwind's spacing scale
5. **Accessibility** - Ensure keyboard navigation works

---

## Future Enhancements

- [ ] Add authentication guards
- [ ] Implement real logout functionality
- [ ] Add breadcrumb navigation
- [ ] Mobile menu for landing page
- [ ] Dark mode support
- [ ] Role-based menu filtering
- [ ] Notification system
- [ ] User preferences persistence
