import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit2, Save, X, Calendar, Book, Clock, Award } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type Student = {
  id: string
  name: string
  email: string
  enrolledCourses: number
  progress: number
  lastActive: string
  status: 'active' | 'inactive'
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
}

// Mock attendance data - in a real app, this would come from an API
const attendanceData = [
  { date: '2024-04-14', present: true },
  { date: '2024-04-15', present: true },
  { date: '2024-04-16', present: false },
  { date: '2024-04-17', present: true },
  { date: '2024-04-18', present: true },
  { date: '2024-04-19', present: true },
  { date: '2024-04-20', present: true },
]

// Mock weekly progress data
const weeklyProgress = [
  { week: 'Week 1', progress: 65 },
  { week: 'Week 2', progress: 70 },
  { week: 'Week 3', progress: 75 },
  { week: 'Week 4', progress: 78 },
]

export default function StudentProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [students, setStudents] = useState<Student[]>([])
  const [editedStudent, setEditedStudent] = useState<Student | null>(null)

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]')
    setStudents(savedStudents)
    const student = savedStudents.find((s: Student) => s.id === id)
    if (student) {
      setEditedStudent(student)
    }
  }, [id])

  if (!editedStudent) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => navigate('/students')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Student Not Found</h1>
        </div>
        <p className="text-gray-600">The requested student profile could not be found.</p>
      </div>
    )
  }

  const handleSave = () => {
    if (editedStudent) {
      const updatedStudents = students.map((s) =>
        s.id === editedStudent.id ? editedStudent : s
      )
      setStudents(updatedStudents)
      localStorage.setItem('students', JSON.stringify(updatedStudents))
      setIsEditing(false)
    }
  }

  const calculateAttendanceRate = () => {
    const present = attendanceData.filter((day) => day.present).length
    return ((present / attendanceData.length) * 100).toFixed(1)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/students')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">{editedStudent.name}</h1>
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
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Student Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedStudent.name}
                    onChange={(e) =>
                      setEditedStudent({ ...editedStudent, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{editedStudent.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedStudent.email}
                    onChange={(e) =>
                      setEditedStudent({ ...editedStudent, email: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{editedStudent.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                {isEditing ? (
                  <select
                    value={editedStudent.status}
                    onChange={(e) =>
                      setEditedStudent({
                        ...editedStudent,
                        status: e.target.value as 'active' | 'inactive',
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                ) : (
                  <p className="mt-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        editedStudent.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {editedStudent.status}
                    </span>
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Grade</label>
                {isEditing ? (
                  <select
                    value={editedStudent.grade}
                    onChange={(e) =>
                      setEditedStudent({
                        ...editedStudent,
                        grade: e.target.value as 'A' | 'B' | 'C' | 'D' | 'F',
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                ) : (
                  <p className="mt-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        editedStudent.grade === 'A'
                          ? 'bg-green-100 text-green-800'
                          : editedStudent.grade === 'B'
                          ? 'bg-blue-100 text-blue-800'
                          : editedStudent.grade === 'C'
                          ? 'bg-yellow-100 text-yellow-800'
                          : editedStudent.grade === 'D'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {editedStudent.grade}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Progress</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Enrolled Courses</h2>
            <div className="space-y-4">
              {Array(editedStudent.enrolledCourses)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">Course {index + 1}</h3>
                        <p className="text-sm text-gray-500">In Progress</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {editedStudent.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${editedStudent.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Book className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrolled Courses</p>
                  <p className="text-lg font-medium text-gray-900">
                    {editedStudent.enrolledCourses}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Overall Progress</p>
                  <p className="text-lg font-medium text-gray-900">
                    {editedStudent.progress}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Attendance Rate</p>
                  <p className="text-lg font-medium text-gray-900">
                    {calculateAttendanceRate()}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Active</p>
                  <p className="text-lg font-medium text-gray-900">
                    {new Date(editedStudent.lastActive).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Calendar */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Attendance</h2>
            <div className="grid grid-cols-7 gap-1">
              {attendanceData.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                    day.present
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {new Date(day.date).getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 