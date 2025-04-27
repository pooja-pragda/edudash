export type Module = {
  id: string
  title: string
  description: string
  duration: string
  lessons: Lesson[]
}

export type Lesson = {
  id: string
  title: string
  type: 'video' | 'quiz' | 'assignment'
  duration: string
  completed: boolean
}

export type Course = {
  id: string
  title: string
  instructor: string
  enrolledStudents: number
  duration: string
  price: number
  status: 'active' | 'draft' | 'archived'
  rating: number
  description: string
  thumbnail: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  prerequisites: string[]
  learningObjectives: string[]
  modules: Module[]
  totalLessons: number
  completedLessons: number
  createdAt: string
  updatedAt: string
} 