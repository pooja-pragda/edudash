import { useState } from 'react'
import { notificationService, NotificationPreferences } from '../../services/notificationService'

export default function NotificationPreferencesPanel() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    categories: {
      system: true,
      course: true,
      student: true,
      payment: true,
    },
    priority: {
      low: true,
      medium: true,
      high: true,
    },
  })

  const handleCategoryChange = (category: keyof NotificationPreferences['categories'], value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: value,
      },
    }))
  }

  const handlePriorityChange = (priority: keyof NotificationPreferences['priority'], value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      priority: {
        ...prev.priority,
        [priority]: value,
      },
    }))
  }

  const handleSave = async () => {
    await notificationService.updatePreferences(preferences)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900">Delivery Methods</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.email}
              onChange={(e) => setPreferences(prev => ({ ...prev, email: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Email</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.push}
              onChange={(e) => setPreferences(prev => ({ ...prev, push: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Push Notifications</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Categories</h3>
        <div className="mt-2 space-y-2">
          {Object.entries(preferences.categories).map(([category, value]) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleCategoryChange(category as keyof NotificationPreferences['categories'], e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Priority Levels</h3>
        <div className="mt-2 space-y-2">
          {Object.entries(preferences.priority).map(([priority, value]) => (
            <label key={priority} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handlePriorityChange(priority as keyof NotificationPreferences['priority'], e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{priority}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Preferences
        </button>
      </div>
    </div>
  )
} 