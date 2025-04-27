import { Outlet } from 'react-router-dom'
import { Home, Users, BookOpen, CreditCard, Settings, HelpCircle } from 'lucide-react'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout() {
const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Support', href: '/support', icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar navigation={navigation} />
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header title="Dashboard" />
        <main className="flex-1 pb-8">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 