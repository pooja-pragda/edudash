import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, X } from 'lucide-react'

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

export default function AddInstructor() {
  const navigate = useNavigate()
  const [instructor, setInstructor] = useState<Omit<Instructor, 'id'>>({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    courses: 0,
    students: 0,
    rating: 0,
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0],
    expertise: [],
    education: [],
    experience: [],
  })
  const [newExpertise, setNewExpertise] = useState('')
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
  })
  const [newExperience, setNewExperience] = useState({
    position: '',
    company: '',
    duration: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newInstructor = {
      ...instructor,
      id: Date.now().toString(),
    }

    const savedInstructors = localStorage.getItem('instructors')
    const instructors = savedInstructors ? JSON.parse(savedInstructors) : []
    instructors.push(newInstructor)
    localStorage.setItem('instructors', JSON.stringify(instructors))
    navigate('/instructors')
  }

  const addExpertise = () => {
    if (newExpertise.trim()) {
      setInstructor({
        ...instructor,
        expertise: [...instructor.expertise, newExpertise.trim()],
      })
      setNewExpertise('')
    }
  }

  const removeExpertise = (index: number) => {
    setInstructor({
      ...instructor,
      expertise: instructor.expertise.filter((_, i) => i !== index),
    })
  }

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.year) {
      setInstructor({
        ...instructor,
        education: [...instructor.education, { ...newEducation }],
      })
      setNewEducation({ degree: '', institution: '', year: '' })
    }
  }

  const removeEducation = (index: number) => {
    setInstructor({
      ...instructor,
      education: instructor.education.filter((_, i) => i !== index),
    })
  }

  const addExperience = () => {
    if (newExperience.position && newExperience.company && newExperience.duration) {
      setInstructor({
        ...instructor,
        experience: [...instructor.experience, { ...newExperience }],
      })
      setNewExperience({ position: '', company: '', duration: '' })
    }
  }

  const removeExperience = (index: number) => {
    setInstructor({
      ...instructor,
      experience: instructor.experience.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Add New Instructor</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={instructor.name}
                onChange={(e) =>
                  setInstructor({ ...instructor, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={instructor.email}
                onChange={(e) =>
                  setInstructor({ ...instructor, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={instructor.phone}
                onChange={(e) =>
                  setInstructor({ ...instructor, phone: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={instructor.location}
                onChange={(e) =>
                  setInstructor({ ...instructor, location: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={instructor.bio}
              onChange={(e) => setInstructor({ ...instructor, bio: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Courses
              </label>
              <input
                type="number"
                value={instructor.courses}
                onChange={(e) =>
                  setInstructor({
                    ...instructor,
                    courses: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Students
              </label>
              <input
                type="number"
                value={instructor.students}
                onChange={(e) =>
                  setInstructor({
                    ...instructor,
                    students: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={instructor.rating}
                onChange={(e) =>
                  setInstructor({
                    ...instructor,
                    rating: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={instructor.status}
              onChange={(e) =>
                setInstructor({
                  ...instructor,
                  status: e.target.value as 'active' | 'inactive',
                })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Join Date
            </label>
            <input
              type="date"
              value={instructor.joinDate}
              onChange={(e) =>
                setInstructor({ ...instructor, joinDate: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expertise
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Add expertise"
              />
              <button
                type="button"
                onClick={addExpertise}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {instructor.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeExpertise(index)}
                    className="hover:text-indigo-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education
            </label>
            <div className="space-y-4">
              {instructor.education.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="p-1 hover:bg-gray-200 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={newEducation.degree}
                  onChange={(e) =>
                    setNewEducation({ ...newEducation, degree: e.target.value })
                  }
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Degree"
                />
                <input
                  type="text"
                  value={newEducation.institution}
                  onChange={(e) =>
                    setNewEducation({
                      ...newEducation,
                      institution: e.target.value,
                    })
                  }
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Institution"
                />
                <input
                  type="text"
                  value={newEducation.year}
                  onChange={(e) =>
                    setNewEducation({ ...newEducation, year: e.target.value })
                  }
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Year"
                />
              </div>
              <button
                type="button"
                onClick={addEducation}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Education
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience
            </label>
            <div className="space-y-4">
              {instructor.experience.map((exp, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{exp.position}</p>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="p-1 hover:bg-gray-200 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={newExperience.position}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      position: e.target.value,
                    })
                  }
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Position"
                />
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      company: e.target.value,
                    })
                  }
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Company"
                />
                <input
                  type="text"
                  value={newExperience.duration}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      duration: e.target.value,
                    })
                  }
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Duration"
                />
              </div>
              <button
                type="button"
                onClick={addExperience}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Experience
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/instructors')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Add Instructor
          </button>
        </div>
      </form>
    </div>
  )
} 