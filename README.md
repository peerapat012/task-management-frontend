# TaskFlow - Task Management Frontend

A React-based task management application with a modern UI.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── layout/       # Layout components (Header, Sidebar)
│   │   ├── tasks/        # Task-related components
│   │   └── ui/           # Base UI components
│   ├── contexts/         # React contexts
│   ├── lib/              # Utilities and API client
│   ├── pages/            # Page components
│   └── types/            # TypeScript type definitions
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app runs on `http://localhost:5173`

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Features

- User authentication (login/register)
- Task CRUD operations
- Dashboard with stats and recent tasks
- Task filtering and search
- Category management
- Responsive design
