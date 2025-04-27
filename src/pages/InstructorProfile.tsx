import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Star,
  BookOpen,
  Users,
  BarChart2,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Edit,
  ArrowLeft,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Instructor = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  bio: string
  courses: number
  students: number
  rating: number
  status: 'active' | 'inactive'
  joinDate: string
  expertise: string[]
  education: {
    degree: string
    institution: string
    year: string
  }[]
  experience: {
    position: string
    company: string
    duration: string
  }[]
}

const mockPerformanceData = [
  { month: 'Jan', students: 45, rating: 4.5 },
  { month: 'Feb', students: 52, rating: 4.6 },
  { month: 'Mar', students: 48, rating: 4.7 },
  { month: 'Apr', students: 60, rating: 4.8 },
  { month: 'May', students: 55, rating: 4.7 },
  { month: 'Jun', students: 65, rating: 4.9 },
]

export default function InstructorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [instructor, setInstructor] = useState<Instructor | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedInstructor, setEditedInstructor] = useState<Instructor | null>(null)

  useEffect(() => {
    const savedInstructors = localStorage.getItem('instructors')
    if (savedInstructors) {
      const instructors = JSON.parse(savedInstructors)
      const foundInstructor = instructors.find((i: Instructor) => i.id === id)
      if (foundInstructor) {
        setInstructor(foundInstructor)
        setEditedInstructor(foundInstructor)
      }
    }
  }, [id])

  if (!instructor) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold text-gray-700">Instructor Not Found</h2>
        <button
          onClick={() => navigate('/instructors')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Back to Instructors
        </button>
      </div>
    )
  }

  const handleSave = () => {
    if (editedInstructor) {
      const savedInstructors = localStorage.getItem('instructors')
      if (savedInstructors) {
        const instructors = JSON.parse(savedInstructors)
        const updatedInstructors = instructors.map((i: Instructor) =>
          i.id === id ? editedInstructor : i
        )
        localStorage.setItem('instructors', JSON.stringify(updatedInstructors))
        setInstructor(editedInstructor)
      }
    }
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/instructors')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Instructors
        </button>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-start gap-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-400">
            {instructor.name.charAt(0)}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedInstructor?.name}
                  onChange={(e) =>
                    setEditedInstructor({
                      ...editedInstructor!,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  value={editedInstructor?.email}
                  onChange={(e) =>
                    setEditedInstructor({
                      ...editedInstructor!,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={editedInstructor?.phone}
                  onChange={(e) =>
                    setEditedInstructor({
                      ...editedInstructor!,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={editedInstructor?.location}
                  onChange={(e) =>
                    setEditedInstructor({
                      ...editedInstructor!,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  value={editedInstructor?.bio}
                  onChange={(e) =>
                    setEditedInstructor({
                      ...editedInstructor!,
                      bio: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                />
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {instructor.name}
                </h1>
                <div className="mt-2 flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{instructor.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{instructor.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{instructor.location}</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{instructor.bio}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-semibold">{instructor.rating}</span>
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                instructor.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {instructor.status}
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Courses</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">{instructor.courses}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-5 w-5" />
              <span className="font-medium">Students</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">{instructor.students}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Join Date</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">
              {new Date(instructor.joinDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Performance Overview
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="students"
                  stroke="#4F46E5"
                  name="Students"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="rating"
                  stroke="#10B981"
                  name="Rating"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {instructor.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
            <div className="space-y-4">
              {instructor.education.map((edu, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
          <div className="space-y-4">
            {instructor.experience.map((exp, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">{exp.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 