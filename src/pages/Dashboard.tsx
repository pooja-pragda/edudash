import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Users, BookOpen, DollarSign, TrendingUp, ChevronRight, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const initialData = [
  { name: 'Jan', students: 400, revenue: 2400 },
  { name: 'Feb', students: 300, revenue: 1398 },
  { name: 'Mar', students: 200, revenue: 9800 },
  { name: 'Apr', students: 278, revenue: 3908 },
  { name: 'May', students: 189, revenue: 4800 },
  { name: 'Jun', students: 239, revenue: 3800 },
  { name: 'Jul', students: 349, revenue: 4300 },
]

const stats = [
  {
    title: 'Total Students',
    value: '2,543',
    change: '+12.5%',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
    href: '/students'
  },
  {
    title: 'Total Courses',
    value: '45',
    change: '+8.2%',
    icon: BookOpen,
    color: 'bg-green-100 text-green-600',
    href: '/courses'
  },
  {
    title: 'Total Revenue',
    value: '$12,345',
    change: '+15.3%',
    icon: DollarSign,
    color: 'bg-purple-100 text-purple-600',
    href: '/payments'
  },
  {
    title: 'Completion Rate',
    value: '78%',
    change: '+5.4%',
    icon: TrendingUp,
    color: 'bg-orange-100 text-orange-600',
    href: '/courses'
  },
]

const recentCourses = [
  { id: 1, name: 'Introduction to React', enrolled: 125, completion: 85, href: '/courses/1' },
  { id: 2, name: 'Advanced JavaScript', enrolled: 98, completion: 72, href: '/courses/2' },
  { id: 3, name: 'Python Fundamentals', enrolled: 156, completion: 65, href: '/courses/3' },
  { id: 4, name: 'Data Science Basics', enrolled: 89, completion: 45, href: '/courses/4' },
]

const recentActivity = [
  { id: 1, user: 'John Doe', userId: '1', action: 'completed Mathematics 101', courseId: '5', time: '2 hours ago' },
  { id: 2, user: 'Jane Smith', userId: '2', action: 'enrolled in Physics 101', courseId: '6', time: '4 hours ago' },
  { id: 3, user: 'Bob Johnson', userId: '3', action: 'submitted assignment', courseId: '7', time: '6 hours ago' },
  { id: 4, user: 'Alice Brown', userId: '4', action: 'completed Chemistry 101', courseId: '8', time: '1 day ago' },
  { id: 5, user: 'Charlie Wilson', userId: '5', action: 'enrolled in Biology 101', courseId: '9', time: '1 day ago' },
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7')
  const [data, setData] = useState(initialData)

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range)
    // In a real app, you would fetch new data based on the time range
    // For now, we'll just simulate different data
    setData(initialData.slice(0, parseInt(range) === 7 ? 7 : 5))
  }

  const handleExportData = (format: 'csv' | 'pdf') => {
    // In a real app, this would trigger an actual export
    console.log(`Exporting data in ${format} format`)
  }

  return (
    <main className="p-6">
    <div className="space-y-6">
      {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Stats */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-md bg-indigo-500 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">42</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                    <dd className="text-lg font-medium text-gray-900">1,234</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-md bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">24</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Courses</dt>
                    <dd className="text-lg font-medium text-gray-900">42</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-md bg-yellow-500 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">12</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Instructors</dt>
                    <dd className="text-lg font-medium text-gray-900">24</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">$</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                    <dd className="text-lg font-medium text-gray-900">$12,345</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
          <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-500">Revenue Overview</h2>
              <div className="flex items-center gap-4">
                <select
                  value={timeRange}
                  onChange={(e) => handleTimeRangeChange(e.target.value)}
                  className="text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 3 months</option>
            </select>
                <button
                  onClick={() => handleExportData('csv')}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Students Chart */}
          <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-500">Student Enrollment</h2>
              <div className="flex items-center gap-4">
                <select
                  value={timeRange}
                  onChange={(e) => handleTimeRangeChange(e.target.value)}
                  className="text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 3 months</option>
            </select>
                <button
                  onClick={() => handleExportData('csv')}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Bar
                    dataKey="students"
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                  />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
          <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-500">Popular Courses</h2>
              <Link
                to="/courses"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
              >
              View all
              </Link>
          </div>
          <div className="space-y-4">
            {recentCourses.map((course) => (
                <Link
                  key={course.id}
                  to={course.href}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                <div>
                  <h3 className="font-medium text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-500">{course.enrolled} students enrolled</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{course.completion}%</p>
                    <p className="text-xs text-gray-500">Completion</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
          <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-500">Recent Activity</h2>
              <Link
                to="/students"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
              >
              View all
              </Link>
          </div>
          <div className="space-y-4">
              {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                <div>
                    <Link
                      to={`/students/${activity.userId}`}
                      className="font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {activity.user}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {activity.action.includes('enrolled') ? (
                        <>
                          enrolled in{' '}
                          <Link
                            to={`/courses/${activity.courseId}`}
                            className="text-indigo-600 hover:text-indigo-700 hover:underline"
                          >
                            {activity.action.split('enrolled in ')[1]}
                          </Link>
                        </>
                      ) : (
                        activity.action
                      )}
                    </p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </main>
  )
} 