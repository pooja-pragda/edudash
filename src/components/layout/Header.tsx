import { Bell, Settings, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { useState, useEffect } from 'react'
import { notificationService, Notification, NotificationPreferences } from '../../services/notificationService'
import NotificationPreferencesPanel from '../notifications/NotificationPreferences'

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null)
  const [showPreferences, setShowPreferences] = useState(false)
  const [filter, setFilter] = useState<{
    category?: Notification['category']
    priority?: Notification['priority']
  }>({})
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to connect to backend
        const connected = await notificationService.connectToBackend()
        setIsConnected(connected)

        // Load data
        const [notifications, preferences] = await Promise.all([
          notificationService.getNotifications(),
          notificationService.getPreferences(),
        ])
        setNotifications(notifications)
        setPreferences(preferences)
      } catch (error) {
        console.error('Error loading notification data:', error)
      }
    }
    loadData()

    // Subscribe to real-time notifications
    const unsubscribe = notificationService.subscribeToNotifications((notification) => {
      setNotifications((prev) => [notification, ...prev])
    })

    return () => {
      unsubscribe?.()
    }
  }, [])

  const filteredNotifications = notifications.filter((notification) => {
    if (filter.category && notification.category !== filter.category) return false
    if (filter.priority && notification.priority !== filter.priority) return false
    return true
  })

  const unreadCount = filteredNotifications.filter(n => !n.read).length

  const handleNotificationClick = async (notification: Notification) => {
    await notificationService.markAsRead(notification.id)
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    ))

    // Handle notification action
    if (notification.action) {
      switch (notification.action.type) {
        case 'navigate':
          // Navigate to the specified route
          window.location.href = notification.action.payload
          break
        case 'openModal':
          // Open a modal with the specified ID
          const modal = document.getElementById(notification.action.payload)
          if (modal) modal.style.display = 'block'
          break
        case 'externalLink':
          // Open external link
          window.open(notification.action.payload, '_blank')
          break
      }
    }
  }

  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsRead()
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const handleDeleteNotification = async (id: string) => {
    await notificationService.deleteNotification(id)
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const handleClearAll = async () => {
    await notificationService.clearAllNotifications()
    setNotifications([])
  }

  return (
    <header className="h-16 bg-white border-b relative z-50">
      <div className="h-full px-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
                {!isConnected && (
                  <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-yellow-500" title="Using mock data" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8} align="end" className="w-80 rounded-lg border border-gray-200 bg-white shadow-lg z-[100]">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <DropdownMenuLabel className="text-sm font-semibold text-gray-900">
                    Notifications
                  </DropdownMenuLabel>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-xs text-indigo-600 hover:text-indigo-500 cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                </div>
                {/* Filters */}
                <div className="mt-2 flex gap-2">
                  <select
                    value={filter.category || ''}
                    onChange={(e) => setFilter({ ...filter, category: e.target.value as Notification['category'] || undefined })}
                    className="text-xs rounded border-gray-200"
                  >
                    <option value="">All Categories</option>
                    <option value="system">System</option>
                    <option value="course">Course</option>
                    <option value="student">Student</option>
                    <option value="payment">Payment</option>
                  </select>
                  <select
                    value={filter.priority || ''}
                    onChange={(e) => setFilter({ ...filter, priority: e.target.value as Notification['priority'] || undefined })}
                    className="text-xs rounded border-gray-200"
                  >
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="py-8 text-center text-sm text-gray-500">
                    No notifications
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors relative group ${
                        !notification.read ? 'bg-indigo-50/40' : ''
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteNotification(notification.id)
                        }}
                        className="absolute right-2 top-2 p-1 text-gray-400 hover:text-gray-500 opacity-0 group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="flex justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          {notification.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          notification.priority === 'high' ? 'bg-red-100 text-red-600' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {notification.priority}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {filteredNotifications.length > 0 && (
                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={handleClearAll}
                    className="w-full text-xs text-red-600 hover:text-red-500"
                  >
                    Clear all notifications
                  </button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">A</span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-700">Admin User</p>
              <p className="text-gray-500">admin@edudash.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && preferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Notification Preferences</h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NotificationPreferencesPanel />
          </div>
        </div>
      )}
    </header>
  )
} 