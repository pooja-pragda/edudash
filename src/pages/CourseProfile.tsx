import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Edit2,
  Save,
  X,
  Users,
  Clock,
  DollarSign,
  Star,
  BookOpen,
  BarChart2,
  CheckCircle,
  Calendar,
  Award,
  Book,
  PlayCircle,
  FileText,
  HelpCircle,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import type { Course } from '../types/course'

// Mock enrollment data
const enrollmentTrend = [
  { month: 'Jan', students: 45 },
  { month: 'Feb', students: 52 },
  { month: 'Mar', students: 61 },
  { month: 'Apr', students: 67 },
  { month: 'May', students: 75 },
  { month: 'Jun', students: 89 },
]

// Mock student progress data
const studentProgress = [
  { progress: '0-25%', count: 15 },
  { progress: '26-50%', count: 25 },
  { progress: '51-75%', count: 35 },
  { progress: '76-100%', count: 14 },
]

// Mock engagement data
const engagementData = [
  { name: 'Videos', value: 45 },
  { name: 'Quizzes', value: 25 },
  { name: 'Assignments', value: 30 },
]

const COLORS = ['#6366f1', '#10b981', '#f59e0b']

export default function CourseProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [editedCourse, setEditedCourse] = useState<Course | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'analytics'>('overview')

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses') || '[]')
    setCourses(savedCourses)
    const course = savedCourses.find((c: Course) => c.id === id)
    if (course) {
      setEditedCourse(course)
    }
  }, [id])

  if (!editedCourse) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => navigate('/courses')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Course Not Found</h1>
        </div>
        <p className="text-gray-600">The requested course could not be found.</p>
      </div>
    )
  }

  const handleSave = () => {
    if (editedCourse) {
      const updatedCourses = courses.map((c) =>
        c.id === editedCourse.id ? editedCourse : c
      )
      setCourses(updatedCourses)
      localStorage.setItem('courses', JSON.stringify(updatedCourses))
      setIsEditing(false)
    }
  }

  const calculateCompletionRate = () => {
    if (!editedCourse.totalLessons) return 0
    return Math.round((editedCourse.completedLessons / editedCourse.totalLessons) * 100)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/courses')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{editedCourse.title}</h1>
            <p className="text-sm text-gray-500">Created by {editedCourse.instructor}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <Edit2 className="h-4 w-4" />
              Edit Course
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'curriculum'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Course Information */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Course Information</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600">{editedCourse.description}</p>
                </div>

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Prerequisites</h3>
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      {editedCourse.prerequisites?.map((prerequisite, index) => (
                        <li key={index}>{prerequisite}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Learning Objectives</h3>
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      {editedCourse.learningObjectives?.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Enrollment Trend</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={enrollmentTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="students"
                          stroke="#6366f1"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Content Distribution</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={engagementData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {engagementData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4">
                      {engagementData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="text-sm text-gray-600">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'curriculum' && (
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Course Curriculum</h2>
              <div className="space-y-6">
                {editedCourse.modules?.map((module, moduleIndex) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Module {moduleIndex + 1}: {module.title}
                        </h3>
                        <p className="text-sm text-gray-500">{module.description}</p>
                      </div>
                      <span className="text-sm text-gray-500">{module.duration}</span>
                    </div>
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {lesson.type === 'video' && (
                              <PlayCircle className="h-5 w-5 text-indigo-600" />
                            )}
                            {lesson.type === 'quiz' && (
                              <HelpCircle className="h-5 w-5 text-green-600" />
                            )}
                            {lesson.type === 'assignment' && (
                              <FileText className="h-5 w-5 text-orange-600" />
                            )}
                            <span className="text-sm text-gray-900">
                              {moduleIndex + 1}.{lessonIndex + 1} {lesson.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                            {lesson.completed && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <>
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Student Progress Distribution</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="progress" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Completion Rate</h2>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                          Progress
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-indigo-600">
                          {calculateCompletionRate()}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                      <div
                        style={{ width: `${calculateCompletionRate()}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Average Rating</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900">{editedCourse.rating}</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            index < Math.floor(editedCourse.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrolled Students</p>
                  <p className="text-lg font-medium text-gray-900">
                    {editedCourse.enrolledStudents}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="text-lg font-medium text-gray-900">{editedCourse.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-lg font-medium text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(editedCourse.price)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="text-lg font-medium text-gray-900">{editedCourse.rating}/5.0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Course Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Book className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-base font-medium text-gray-900">{editedCourse.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Award className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Level</p>
                  <p className="text-base font-medium text-gray-900">
                    {editedCourse.level.charAt(0).toUpperCase() + editedCourse.level.slice(1)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Lessons</p>
                  <p className="text-base font-medium text-gray-900">{editedCourse.totalLessons}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-base font-medium text-gray-900">
                    {new Date(editedCourse.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 