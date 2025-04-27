import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
  AuthContextType,
  User,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
  UpdatePasswordCredentials,
  VerifyEmailCredentials,
} from '../types/auth'
import { rolePermissions } from '../pages/Users' // Import rolePermissions

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock API calls (replace with real API calls in production)
const mockApiCall = async <T,>(data: T): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return data
}

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Error checking auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      // Mock successful login with permissions
      const user: User = await mockApiCall({
        id: '1',
        email: credentials.email,
        name: 'John Doe',
        role: 'admin',
        permissions: rolePermissions['admin'], // Assign permissions dynamically
        createdAt: new Date().toISOString(),
        isEmailVerified: true,
        lastLogin: new Date().toISOString(),
      })

      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/dashboard')
    } catch (error) {
      setError('Invalid credentials')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      // Assign permissions dynamically during registration
      const user: User = await mockApiCall({
        id: '1',
        ...credentials,
        permissions: rolePermissions[credentials.role],
        createdAt: new Date().toISOString(),
        isEmailVerified: false,
      })

      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/verify-email')
    } catch (error) {
      setError('Registration failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Mock logout API call
      await mockApiCall(null)

      setUser(null)
      localStorage.removeItem('user')
      navigate('/login')
    } catch (error) {
      setError('Logout failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (credentials: ResetPasswordCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      // Mock password reset
      await mockApiCall(credentials)
      navigate('/login')
    } catch (error) {
      setError('Password reset failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updatePassword = async (credentials: UpdatePasswordCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      // Mock password update
      await mockApiCall(credentials)
    } catch (error) {
      setError('Password update failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const verifyEmail = async (credentials: VerifyEmailCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      // Mock email verification
      await mockApiCall(credentials)

      if (user) {
        const updatedUser = { ...user, isEmailVerified: true }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }

      navigate('/dashboard')
    } catch (error) {
      setError('Email verification failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    verifyEmail,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}