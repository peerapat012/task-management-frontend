# Task Management App - Frontend Plan

## Project Overview
- **Project Name**: TaskFlow
- **Type**: Single Page Application (SPA)
- **Core Functionality**: A clean, minimal task management app for organizing tasks with categories, priorities, due dates, and user authentication
- **Target Users**: Individuals and small teams managing daily tasks

---

## Tech Stack
- **Framework**: React 18+ with Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui (Neutral theme)
- **UI Components**: shadcn/ui (Button, Input, Modal, Dropdown, Select, Checkbox, Badge, Avatar, Card, Dialog, Dropdown Menu, etc.)
- **State Management**: React Context + useReducer
- **Routing**: React Router v6
- **Drag & Drop**: @dnd-kit/core (for future Kanban)
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Form Handling**: React Hook Form + Zod (for validation)

---

## UI/UX Specification

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Background | White | `#FFFFFF` |
| Surface | Light Gray | `#F8FAFC` |
| Primary | Indigo | `#6366F1` |
| Primary Hover | Dark Indigo | `#4F46E5` |
| Secondary | Slate | `#64748B` |
| Text Primary | Slate 900 | `#0F172A` |
| Text Secondary | Slate 500 | `#64748B` |
| Border | Slate 200 | `#E2E8F0` |
| Success | Emerald | `#10B981` |
| Warning | Amber | `#F59E0B` |
| Error | Red | `#EF4444` |
| High Priority | Red | `#EF4444` |
| Medium Priority | Amber | `#F59E0B` |
| Low Priority | Blue | `#3B82F6` |

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: 
  - H1: 28px, font-weight 700
  - H2: 22px, font-weight 600
  - H3: 18px, font-weight 600
- **Body**: 14px, font-weight 400
- **Small**: 12px, font-weight 400

### Spacing System
- Base unit: 4px
- Common spacings: 4, 8, 12, 16, 24, 32, 48px

### Layout Structure

#### Main Layout
```
┌─────────────────────────────────────────────────────────┐
│  Header (Logo, Search, User Avatar)                    │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│  Sidebar    │  Main Content Area                        │
│  - Dashboard│  - Task List / Detail View                │
│  - All Tasks│                                           │
│  - Categories│                                          │
│  - Settings │                                           │
│             │                                           │
└─────────────┴───────────────────────────────────────────┘
```

- **Sidebar**: 240px fixed width (collapsible on mobile)
- **Main Content**: Fluid, max-width 1200px centered
- **Header**: 64px height, sticky

### Responsive Breakpoints
| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | < 640px | Sidebar hidden, hamburger menu |
| Tablet | 640px - 1024px | Sidebar collapsible |
| Desktop | > 1024px | Full layout |

---

## Pages & Components

### 1. Authentication Pages

#### Login Page (`/login`)
- Email input field
- Password input field
- "Remember me" checkbox
- Login button (primary)
- "Forgot password?" link
- "Sign up" link
- Social login buttons (Google, GitHub) - UI only

#### Register Page (`/register`)
- Full name input
- Email input
- Password input
- Confirm password input
- Register button (primary)
- "Already have account?" link

### 2. Dashboard Page (`/`)
- Welcome message with user name
- Quick stats cards:
  - Total tasks count
  - Completed tasks count
  - Overdue tasks count
  - Tasks due today count
- Recent tasks list (5 items)
- Upcoming deadlines widget

### 3. All Tasks Page (`/tasks`)
- Search bar (filters by title)
- Filter dropdowns:
  - Status (All, Pending, Completed)
  - Priority (All, High, Medium, Low)
  - Category (All + dynamic categories)
  - Date range picker
- Task list view (default)
- Toggle: List / Grid view
- "Add Task" floating action button (mobile) / top button (desktop)

#### Task Item Component
- Checkbox (toggle complete)
- Task title
- Priority badge (colored dot + label)
- Category tag
- Due date (with overdue styling)
- Actions menu (Edit, Delete)

### 4. Add/Edit Task Modal
- Title input (required)
- Description textarea
- Priority selector (High/Medium/Low buttons)
- Category dropdown (with "Add new" option)
- Due date picker
- Reminder toggle + time picker
- Save button
- Cancel button

### 5. Categories Page (`/categories`)
- List of categories with:
  - Color indicator
  - Category name
  - Task count
  - Edit/Delete actions
- "Add Category" button
- Add/Edit Category modal:
  - Name input
  - Color picker (predefined colors)

### 6. Settings Page (`/settings`)
- Profile section:
  - Avatar upload
  - Name input
  - Email input
  - Save button
- Preferences:
  - Default view (List/Grid)
  - Default priority
  - Theme toggle (Light/Dark) - future
- Account:
  - Change password
  - Logout button
  - Delete account (with confirmation)

---

## Component Hierarchy

```
App
├── AuthProvider
│   ├── LoginPage
│   └── RegisterPage
└── AppLayout
    ├── Header
    │   ├── Logo
    │   ├── SearchBar
    │   └── UserMenu
    ├── Sidebar
    │   ├── NavLink (Dashboard)
    │   ├── NavLink (All Tasks)
    │   ├── NavLink (Categories)
    │   └── NavLink (Settings)
    └── MainContent
        ├── DashboardPage
        │   ├── StatsCards
        │   ├── RecentTasks
        │   └── UpcomingDeadlines
        ├── TasksPage
        │   ├── TaskFilters
        │   ├── TaskList
        │   │   └── TaskItem (repeated)
        │   └── AddTaskModal
        ├── CategoriesPage
        │   ├── CategoryList
        │   │   └── CategoryItem (repeated)
        │   └── CategoryModal
        └── SettingsPage
            ├── ProfileSection
            ├── PreferencesSection
            └── AccountSection

Shared Components (shadcn/ui):
- Button
- Input
- Textarea
- Label
- Modal (Dialog)
- Badge
- Dropdown Menu
- Checkbox
- Select
- Card
- Avatar
- Calendar (DatePicker)
- Popover
- Form (with React Hook Form + Zod)
```

---

## Data Models (Frontend State)

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  categoryId: string | null;
  dueDate: string | null;
  reminder: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}
```

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}
```

---

## State Management Structure

```
AuthContext
├── user: User | null
├── isAuthenticated: boolean
├── login(email, password)
├── register(name, email, password)
└── logout()

TaskContext
├── tasks: Task[]
├── addTask(task)
├── updateTask(id, updates)
├── deleteTask(id)
├── toggleTaskStatus(id)
└── filters: FilterState

CategoryContext
├── categories: Category[]
├── addCategory(category)
├── updateCategory(id, updates)
└── deleteCategory(id)
```

---

## Development Phases

### Phase 1: Project Setup
1. Initialize React + Vite project with TypeScript template
2. Install dependencies (Tailwind, React Router, Lucide, date-fns, react-hook-form, zod)
3. Configure Tailwind CSS
4. Set up TypeScript configuration
5. Initialize shadcn/ui with neutral theme
6. Set up project folder structure
7. Add required shadcn/ui components (button, input, dialog, badge, etc.)

### Phase 2: Authentication
1. Create AuthContext
2. Build Login page
3. Build Register page
4. Add protected route wrapper
5. Create mock authentication (localStorage)

### Phase 3: Layout & Navigation
1. Build AppLayout component
2. Create Header with search
3. Create Sidebar with navigation
4. Set up React Router routes
5. Make responsive

### Phase 4: Task Management
1. Build TaskContext
2. Create Add/Edit Task Modal
3. Build TaskList component
4. Implement filters (status, priority, category)
5. Add search functionality
6. Implement CRUD operations

### Phase 5: Categories
1. Build CategoryContext
2. Create Categories page
3. Add/Edit Category modal
4. Link categories to tasks

### Phase 6: Dashboard
1. Create Dashboard page
2. Build stats cards
3. Add recent tasks widget
4. Add upcoming deadlines widget

### Phase 7: Settings
1. Build Settings page
2. Profile management UI
3. Preferences UI
4. Logout functionality

### Phase 8: Polish & Testing
1. Add loading states
2. Add empty states
3. Add error handling
4. Keyboard navigation
5. Final polish and cleanup

---

## File Structure

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── label.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── select.tsx
│   │   │   ├── card.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── popover.tsx
│   │   │   └── form.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── AppLayout.tsx
│   │   ├── tasks/
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   ├── TaskFilters.tsx
│   │   │   └── TaskModal.tsx
│   │   ├── categories/
│   │   │   ├── CategoryList.tsx
│   │   │   └── CategoryModal.tsx
│   │   └── dashboard/
│   │       ├── StatsCards.tsx
│   │       ├── RecentTasks.tsx
│   │       └── UpcomingDeadlines.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── TaskContext.tsx
│   │   └── CategoryContext.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Tasks.tsx
│   │   ├── Categories.tsx
│   │   └── Settings.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── lib/
│   │   ├── utils.ts              # shadcn/ui utils
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── components.json               # shadcn/ui config
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

---

## Mock Data Strategy

Since there's no backend yet, use localStorage to persist:
- Users (mock single user for demo)
- Tasks (CRUD operations)
- Categories (CRUD operations)

This allows full UI testing without API integration.

---

## Next Steps After Frontend Complete

1. Connect to backend API
2. Add real authentication (JWT)
3. Add real data persistence
4. Add drag-and-drop Kanban board
5. Add team collaboration features
6. Add push notifications
7. Add offline support (PWA)
