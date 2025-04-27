import { Link, useLocation } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
  icon: LucideIcon
}

interface SidebarProps {
  navigation: NavigationItem[]
}

export default function Sidebar({ navigation }: SidebarProps) {
  const location = useLocation()

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">E</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">EduDash</span>
          </Link>
      </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                    ? 'text-indigo-600 bg-indigo-50 shadow-sm'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
                <item.icon className={`h-5 w-5 transition-colors duration-200 ${
                  isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'
                }`} />
              {item.name}
            </Link>
          )
        })}
      </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-2.5 w-full text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
        </div>
      </div>
    </div>
  )
} 