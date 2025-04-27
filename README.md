# EduDash - Modern Education Management System

A modern, responsive, and feature-rich education management system built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Multiple theme options with dark mode support
- 📱 Fully responsive design
- 🔒 Role-based access control
- 📊 Interactive dashboards
- 👥 User management
- 📚 Course management
- 👨‍🏫 Instructor management
- 💳 Payment processing
- 🎯 Progress tracking
- 📨 Notification system

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Router
- Tanstack Table
- Lucide Icons
- Radix UI

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/edudash.git
cd edudash
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

## Project Structure

\`\`\`
edudash/
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/         # React contexts
│   ├── config/           # Configuration files
│   ├── pages/           # Page components
│   ├── styles/          # Global styles
│   └── types/           # TypeScript type definitions
├── public/             # Static assets
└── package.json       # Project dependencies
\`\`\`

## Theming

### Available Themes

- Indigo (Default)
- Purple
- Emerald

### Using Themes

Themes can be changed through the Settings page or programmatically:

\`\`\`typescript
import { useTheme } from '../contexts/ThemeContext'

function MyComponent() {
  const { setCurrentTheme } = useTheme()
  
  // Change theme
  setCurrentTheme('purple')
}
\`\`\`

### Dark Mode

Toggle dark mode through the Settings page or programmatically:

\`\`\`typescript
import { useTheme } from '../contexts/ThemeContext'

function MyComponent() {
  const { toggleDarkMode } = useTheme()
  
  // Toggle dark mode
  toggleDarkMode()
}
\`\`\`

## Components

### Layout

The main layout component that provides the application structure:

\`\`\`typescript
import Layout from '../components/layout/Layout'

function MyPage() {
  return (
    <Layout>
      <div>Page content</div>
    </Layout>
  )
}
\`\`\`

### Common Components

- Button variants
- Input fields
- Select dropdowns
- Cards
- Badges
- Tables
- Modals

## Role-Based Access Control

### Available Roles

- Admin: Full access to all features
- Instructor: Manage courses and students
- Student: Limited access to learning features

### Permissions

- manage_users
- manage_courses
- manage_students
- view_analytics
- manage_payments

## API Integration

### Authentication

Authentication is handled through JWT tokens:

\`\`\`typescript
// Example authentication call
async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  return response.json()
}
\`\`\`

### Data Fetching

Example of fetching data with authentication:

\`\`\`typescript
async function fetchUsers() {
  const response = await fetch('/api/users', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.json()
}
\`\`\`

## Styling

### Utility Classes

Common utility classes for consistent styling:

- `.btn`: Base button styles
- `.btn-primary`: Primary button variant
- `.btn-secondary`: Secondary button variant
- `.input`: Form input styles
- `.card`: Card container styles
- `.badge`: Badge/tag styles

### Dark Mode Classes

Add dark mode variants using the `dark:` prefix:

\`\`\`html
<div class="bg-white dark:bg-gray-800">
  <p class="text-gray-900 dark:text-white">Content</p>
</div>
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch: \`git checkout -b feature/my-feature\`
3. Commit your changes: \`git commit -m 'Add some feature'\`
4. Push to the branch: \`git push origin feature/my-feature\`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@edudash.com or create an issue in the repository.
