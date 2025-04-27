import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react'
import type { Course, Module, Lesson } from '../types/course'

export default function AddCourse() {
  const navigate = useNavigate()
  const [course, setCourse] = useState<Partial<Course>>({
    title: '',
    instructor: '',
    duration: '',
    price: 0,
    status: 'draft',
    enrolledStudents: 0,
    rating: 0,
    description: '',
    thumbnail: '',
    category: '',
    level: 'beginner',
    prerequisites: [],
    learningObjectives: [],
    modules: [],
    totalLessons: 0,
    completedLessons: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const [newPrerequisite, setNewPrerequisite] = useState('')
  const [newObjective, setNewObjective] = useState('')
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newCourse: Course = {
      ...course,
      id: crypto.randomUUID(),
      totalLessons: course.modules?.reduce((total, module) => total + module.lessons.length, 0) ?? 0,
    } as Course

    const savedCourses = JSON.parse(localStorage.getItem('courses') || '[]')
    localStorage.setItem('courses', JSON.stringify([...savedCourses, newCourse]))

    navigate('/courses')
  }

  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setCourse({
        ...course,
        prerequisites: [...(course.prerequisites || []), newPrerequisite.trim()],
      })
      setNewPrerequisite('')
    }
  }

  const removePrerequisite = (index: number) => {
    setCourse({
      ...course,
      prerequisites: course.prerequisites?.filter((_, i) => i !== index),
    })
  }

  const addObjective = () => {
    if (newObjective.trim()) {
      setCourse({
        ...course,
        learningObjectives: [...(course.learningObjectives || []), newObjective.trim()],
      })
      setNewObjective('')
    }
  }

  const removeObjective = (index: number) => {
    setCourse({
      ...course,
      learningObjectives: course.learningObjectives?.filter((_, i) => i !== index),
    })
  }

  const addModule = () => {
    const newModule: Module = {
      id: crypto.randomUUID(),
      title: 'New Module',
      description: '',
      duration: '0 hours',
      lessons: [],
    }
    setCourse({
      ...course,
      modules: [...(course.modules || []), newModule],
    })
    setActiveModuleId(newModule.id)
  }

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setCourse({
      ...course,
      modules: course.modules?.map((module) =>
        module.id === moduleId ? { ...module, ...updates } : module
      ),
    })
  }

  const removeModule = (moduleId: string) => {
    setCourse({
      ...course,
      modules: course.modules?.filter((module) => module.id !== moduleId),
    })
  }

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: crypto.randomUUID(),
      title: 'New Lesson',
      type: 'video',
      duration: '0 minutes',
      completed: false,
    }
    setCourse({
      ...course,
      modules: course.modules?.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: [...module.lessons, newLesson] }
          : module
      ),
    })
  }

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
    setCourse({
      ...course,
      modules: course.modules?.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, ...updates } : lesson
              ),
            }
          : module
      ),
    })
  }

  const removeLesson = (moduleId: string, lessonId: string) => {
    setCourse({
      ...course,
      modules: course.modules?.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : module
      ),
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/courses')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Add New Course</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Course Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={course.title}
                onChange={(e) => setCourse({ ...course, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter course title"
              />
            </div>

            <div>
              <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                Instructor
              </label>
              <input
                type="text"
                id="instructor"
                required
                value={course.instructor}
                onChange={(e) => setCourse({ ...course, instructor: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter instructor name"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                required
                value={course.category}
                onChange={(e) => setCourse({ ...course, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., Web Development"
              />
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                Level
              </label>
              <select
                id="level"
                required
                value={course.level}
                onChange={(e) =>
                  setCourse({
                    ...course,
                    level: e.target.value as 'beginner' | 'intermediate' | 'advanced',
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter course description"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                required
                value={course.duration}
                onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., 12 weeks"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (USD)
              </label>
              <input
                type="number"
                id="price"
                required
                min="0"
                step="0.01"
                value={course.price}
                onChange={(e) => setCourse({ ...course, price: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter course price"
              />
            </div>

            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                Thumbnail URL
              </label>
              <input
                type="url"
                id="thumbnail"
                value={course.thumbnail}
                onChange={(e) => setCourse({ ...course, thumbnail: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter thumbnail URL"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                required
                value={course.status}
                onChange={(e) =>
                  setCourse({
                    ...course,
                    status: e.target.value as 'active' | 'draft' | 'archived',
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Prerequisites</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newPrerequisite}
                onChange={(e) => setNewPrerequisite(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Add a prerequisite"
              />
              <button
                type="button"
                onClick={addPrerequisite}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <ul className="space-y-2">
              {course.prerequisites?.map((prerequisite, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span>{prerequisite}</span>
                  <button
                    type="button"
                    onClick={() => removePrerequisite(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Learning Objectives</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Add a learning objective"
              />
              <button
                type="button"
                onClick={addObjective}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <ul className="space-y-2">
              {course.learningObjectives?.map((objective, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span>{objective}</span>
                  <button
                    type="button"
                    onClick={() => removeObjective(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Course Curriculum */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Course Curriculum</h2>
            <button
              type="button"
              onClick={addModule}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Module
            </button>
          </div>
          <div className="space-y-4">
            {course.modules?.map((module) => (
              <div key={module.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={module.title}
                      onChange={(e) => updateModule(module.id, { title: e.target.value })}
                      className="block w-full text-lg font-medium border-none p-0 focus:ring-0"
                      placeholder="Module Title"
                    />
                    <input
                      type="text"
                      value={module.description}
                      onChange={(e) => updateModule(module.id, { description: e.target.value })}
                      className="block w-full text-sm text-gray-500 border-none p-0 focus:ring-0"
                      placeholder="Module Description"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeModule(module.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="pl-7 space-y-2">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                    >
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) =>
                          updateLesson(module.id, lesson.id, { title: e.target.value })
                        }
                        className="flex-1 text-sm border-none bg-transparent p-0 focus:ring-0"
                        placeholder="Lesson Title"
                      />
                      <select
                        value={lesson.type}
                        onChange={(e) =>
                          updateLesson(module.id, lesson.id, {
                            type: e.target.value as 'video' | 'quiz' | 'assignment',
                          })
                        }
                        className="text-sm border-none bg-transparent focus:ring-0"
                      >
                        <option value="video">Video</option>
                        <option value="quiz">Quiz</option>
                        <option value="assignment">Assignment</option>
                      </select>
                      <input
                        type="text"
                        value={lesson.duration}
                        onChange={(e) =>
                          updateLesson(module.id, lesson.id, { duration: e.target.value })
                        }
                        className="w-24 text-sm border-none bg-transparent p-0 focus:ring-0"
                        placeholder="Duration"
                      />
                      <button
                        type="button"
                        onClick={() => removeLesson(module.id, lesson.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addLesson(module.id)}
                    className="ml-7 text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/courses')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  )
} 