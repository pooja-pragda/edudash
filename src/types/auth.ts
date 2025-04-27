export type UserRole = 'admin' | 'instructor' | 'student'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: string
  lastLogin?: string
  isEmailVerified: boolean
  preferences?: {
    notifications: boolean
    newsletter: boolean
    marketing: boolean
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
  role: UserRole
}

export interface ResetPasswordCredentials {
  email: string
}

export interface UpdatePasswordCredentials {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface VerifyEmailCredentials {
  token: string
}

export type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (credentials: ResetPasswordCredentials) => Promise<void>
  updatePassword: (credentials: UpdatePasswordCredentials) => Promise<void>
  verifyEmail: (credentials: VerifyEmailCredentials) => Promise<void>
  clearError: () => void
} 