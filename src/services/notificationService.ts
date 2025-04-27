import { io, Socket } from 'socket.io-client'

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  category: 'system' | 'course' | 'student' | 'payment'
  priority: 'low' | 'medium' | 'high'
  action?: {
    type: 'navigate' | 'openModal' | 'externalLink'
    payload: string
  }
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  categories: {
    system: boolean
    course: boolean
    student: boolean
    payment: boolean
  }
  priority: {
    low: boolean
    medium: boolean
    high: boolean
  }
}

// Mock data for development
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Course Added',
    message: 'A new course "React Fundamentals" has been added',
    time: '5m ago',
    read: false,
    category: 'course',
    priority: 'medium',
  },
  {
    id: '2',
    title: 'Student Enrollment',
    message: 'John Doe has enrolled in "Advanced JavaScript"',
    time: '10m ago',
    read: false,
    category: 'student',
    priority: 'low',
  },
  {
    id: '3',
    title: 'System Update',
    message: 'System maintenance scheduled for tonight',
    time: '1h ago',
    read: true,
    category: 'system',
    priority: 'high',
  },
]

const mockPreferences: NotificationPreferences = {
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
}

class NotificationService {
  private socket: Socket | null = null
  private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
  private isMockMode = true // Start in mock mode
  private mockUpdateInterval: NodeJS.Timeout | null = null
  private connectionAttempts = 0
  private maxConnectionAttempts = 3

  constructor() {
    // Start in mock mode by default
    this.initializeMockUpdates()
  }

  private async checkBackendAvailability(): Promise<boolean> {
    if (this.isMockMode) return false

    try {
      const response = await fetch(`${this.baseUrl}/health`, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(2000) // 2 second timeout
      })
      return response.ok
    } catch (error) {
      console.warn('Backend not available, staying in mock mode')
      return false
    }
  }

  private initializeMockUpdates() {
    if (this.mockUpdateInterval) {
      clearInterval(this.mockUpdateInterval)
    }

    this.mockUpdateInterval = setInterval(() => {
      const randomNotification = {
        ...mockNotifications[Math.floor(Math.random() * mockNotifications.length)],
        id: Date.now().toString(),
        time: 'Just now',
      }
      // Simulate real-time update
      if (this.socket) {
        this.socket.emit('new-notification', randomNotification)
      }
    }, 30000) // Every 30 seconds
  }

  public async connectToBackend(): Promise<boolean> {
    if (this.connectionAttempts >= this.maxConnectionAttempts) {
      console.warn('Max connection attempts reached, staying in mock mode')
      return false
    }

    this.connectionAttempts++

    const isAvailable = await this.checkBackendAvailability()
    if (!isAvailable) {
      console.warn('Backend not available, staying in mock mode')
      return false
    }

    try {
      this.socket = io(`${this.baseUrl}/notifications`, {
        withCredentials: true,
        reconnection: false, // We'll handle reconnection manually
        timeout: 2000,
      })

      this.socket.on('connect', () => {
        console.log('Connected to notification server')
        this.isMockMode = false
        this.connectionAttempts = 0
        if (this.mockUpdateInterval) {
          clearInterval(this.mockUpdateInterval)
          this.mockUpdateInterval = null
        }
      })

      this.socket.on('disconnect', () => {
        console.log('Disconnected from notification server')
        this.isMockMode = true
        this.initializeMockUpdates()
      })

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error)
        this.isMockMode = true
        this.initializeMockUpdates()
      })

      return true
    } catch (error) {
      console.error('Failed to initialize socket:', error)
      this.isMockMode = true
      this.initializeMockUpdates()
      return false
    }
  }

  // Real-time notification handling
  public subscribeToNotifications(callback: (notification: Notification) => void) {
    if (this.isMockMode) {
      // Simulate real-time updates in mock mode
      const interval = setInterval(() => {
        const randomNotification = {
          ...mockNotifications[Math.floor(Math.random() * mockNotifications.length)],
          id: Date.now().toString(),
          time: 'Just now',
        }
        callback(randomNotification)
      }, 30000) // Every 30 seconds

      return () => clearInterval(interval)
    }

    if (!this.socket) return () => {}

    this.socket.on('new-notification', (notification: Notification) => {
      callback(notification)
    })

    return () => {
      this.socket?.off('new-notification')
    }
  }

  public unsubscribeFromNotifications() {
    if (!this.socket) return
    this.socket.off('new-notification')
  }

  // API Methods
  public async getNotifications(): Promise<Notification[]> {
    if (this.isMockMode) return mockNotifications

    try {
      const response = await fetch(`${this.baseUrl}/api/notifications`, {
        credentials: 'include',
        signal: AbortSignal.timeout(2000)
      })
      if (!response.ok) throw new Error('Failed to fetch notifications')
      return response.json()
    } catch (error) {
      console.error('Error fetching notifications:', error)
      this.isMockMode = true
      return mockNotifications
    }
  }

  public async markAsRead(id: string): Promise<void> {
    if (this.isMockMode) {
      const index = mockNotifications.findIndex(n => n.id === id)
      if (index !== -1) {
        mockNotifications[index] = { ...mockNotifications[index], read: true }
      }
      return
    }

    try {
      await fetch(`${this.baseUrl}/api/notifications/${id}/read`, {
        method: 'POST',
        credentials: 'include',
        signal: AbortSignal.timeout(2000)
      })
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  public async markAllAsRead(): Promise<void> {
    if (this.isMockMode) {
      mockNotifications.forEach(n => n.read = true)
      return
    }

    try {
      await fetch(`${this.baseUrl}/api/notifications/read-all`, {
        method: 'POST',
        credentials: 'include',
        signal: AbortSignal.timeout(2000)
      })
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }

  public async getPreferences(): Promise<NotificationPreferences> {
    if (this.isMockMode) return mockPreferences

    try {
      const response = await fetch(`${this.baseUrl}/api/notifications/preferences`, {
        credentials: 'include',
        signal: AbortSignal.timeout(2000)
      })
      if (!response.ok) throw new Error('Failed to fetch preferences')
      return response.json()
    } catch (error) {
      console.error('Error fetching preferences:', error)
      this.isMockMode = true
      return mockPreferences
    }
  }

  public async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<void> {
    if (this.isMockMode) {
      Object.assign(mockPreferences, preferences)
      return
    }

    try {
      await fetch(`${this.baseUrl}/api/notifications/preferences`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
        signal: AbortSignal.timeout(2000)
      })
    } catch (error) {
      console.error('Error updating preferences:', error)
    }
  }

  public async deleteNotification(id: string): Promise<void> {
    if (this.isMockMode) {
      const index = mockNotifications.findIndex(n => n.id === id)
      if (index !== -1) {
        mockNotifications.splice(index, 1)
      }
      return
    }

    try {
      await fetch(`${this.baseUrl}/api/notifications/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        signal: AbortSignal.timeout(2000)
      })
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  public async clearAllNotifications(): Promise<void> {
    if (this.isMockMode) {
      mockNotifications.length = 0
      return
    }

    try {
      await fetch(`${this.baseUrl}/api/notifications/clear-all`, {
        method: 'DELETE',
        credentials: 'include',
        signal: AbortSignal.timeout(2000)
      })
    } catch (error) {
      console.error('Error clearing all notifications:', error)
    }
  }
}

export const notificationService = new NotificationService() 