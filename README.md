# TaskFlow Frontend

A modern, responsive task management application with a premium dark-themed UI, built with React 19 and featuring a Kanban board for intuitive task organization.

## 🚀 Tech Stack

- **React 19** - Latest React with modern features
- **Vite** - Lightning-fast build tool
- **TailwindCSS 4** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Axios** - HTTP client
- **ESLint** - Code linting

## ✨ Features

### 🎨 Modern UI/UX
- **Dark Theme** - Stunning glassmorphism design
- **Responsive** - Works seamlessly on mobile, tablet, and desktop
- **Animations** - Smooth transitions and micro-interactions
- **Loading States** - Skeleton loaders for better UX

### 📊 Task Management
- **Kanban Board** - Visual task organization with Open/In Progress/Done columns
- **Task Priorities** - HIGH, MEDIUM, LOW priority levels
- **Search & Filter** - Quickly find tasks
- **Real-time Updates** - Instant status changes
- **Task Statistics** - Dashboard with visual analytics

### 🔐 Authentication
- **JWT-based Auth** - Secure token-based authentication
- **User Profile** - Display username with avatar
- **Protected Routes** - Secure pages requiring login

### 📱 Responsive Design
- **Mobile Menu** - Hamburger navigation for small screens
- **Adaptive Layout** - Optimized for all screen sizes
- **Touch-friendly** - Mobile-first design approach

## 📋 Prerequisites

- **Node.js** 18+ or 20+
- **npm** or **yarn**
- TaskFlow Backend running on `http://localhost:8080`

## ⚙️ Installation

1. **Navigate to project directory:**
```bash
cd task-flow-frontend
```

2. **Install dependencies:**
```bash
npm install
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## 🔧 Configuration

The frontend is configured to connect to the backend at `http://localhost:8080`. If your backend runs on a different port, update the base URL in `src/api/axios.js`:

```javascript
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Change this if needed
});
```

## 📂 Project Structure

```
src/
├── api/                # API integration
│   ├── axios.js        # Axios configuration
│   ├── authApi.js      # Authentication APIs
│   └── taskApi.js      # Task APIs
├── components/         # Reusable components
│   ├── Header.jsx      # Page header
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── StatsCard.jsx   # Statistics card
│   ├── TaskCard.jsx    # Task display card
│   ├── TaskForm.jsx    # Task creation/edit form
│   ├── Modal.jsx       # Modal component
│   └── Skeleton.jsx    # Loading skeletons
├── context/            # React Context
│   └── AuthContext.jsx # Authentication state
├── layout/             # Layout components
│   ├── MainLayout.jsx  # Main app layout
│   └── AuthLayout.jsx  # Auth pages layout
├── pages/              # Page components
│   ├── Dashboard.jsx   # Dashboard with stats
│   ├── Tasks.jsx       # Kanban board view
│   ├── Login.jsx       # Login page
│   └── Register.jsx    # Registration page
├── App.jsx             # Main app component
├── index.css           # Global styles & design system
└── main.jsx            # App entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Indigo gradient (`#6366f1` → `#8b5cf6`)
- **Success**: Emerald (`#10b981`)
- **Warning**: Amber (`#f59e0b`)
- **Danger**: Rose (`#ef4444`)
- **Dark Background**: `#0f172a`

### Key Components

#### Dashboard
- Statistics cards showing task counts
- Recent tasks table
- Empty state handling

#### Tasks (Kanban Board)
- Three columns: Open, In Progress, Done
- Drag-and-drop-like visual organization
- Search and filter capabilities
- Task creation modal

#### Task Card
- Priority badges (HIGH/MEDIUM/LOW)
- Status badges
- Quick action buttons
- Description truncation

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token received and stored in localStorage
3. Token automatically attached to API requests
4. User redirected to dashboard
5. Protected routes check authentication
6. Logout clears token and redirects to login

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎯 Key Features Guide

### Creating a Task
1. Click "+ Add Task" button
2. Fill in title, description, priority, and status
3. Submit to create

### Updating Task Status
1. Click on a task card
2. Use the status dropdown or direct buttons
3. Changes save automatically

### Searching Tasks
1. Use the search bar on Tasks page
2. Type to filter by title or description
3. Results update in real-time

### Filtering Tasks
1. Use filter buttons (All/Open/In Progress/Done)
2. View tasks by specific status
3. Combine with search for precise results

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ⚡ Performance

- Code splitting with React lazy loading
- Optimized bundle size
- Fast refresh in development
- Production build optimizations

## 🐛 Known Issues

- None currently reported

## 📝 Future Enhancements

- [ ] Drag-and-drop task reordering
- [ ] Task due date notifications
- [ ] Task assignment to multiple users
- [ ] Dark/Light theme toggle
- [ ] Export tasks to CSV/PDF
- [ ] Task comments and attachments

## 📄 License

This project is created for educational purposes.

## 👤 Author

**Shivam Kumar Yadav**

---

For backend setup, see [Task_Flow_Backend README](../Task_Flow_Backend/README.md)
