import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/layout/Layout'
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Courses = lazy(() => import('./pages/Courses'))
const Students = lazy(() => import('./pages/Students'))
const Instructors = lazy(() => import('./pages/Instructors'))
const Payments = lazy(() => import('./pages/Payments'))
const Settings = lazy(() => import('./pages/Settings'))
const Support = lazy(() => import('./pages/Support'))
const AddCourse = lazy(() => import('./pages/AddCourse'))
const CourseProfile = lazy(() => import('./pages/CourseProfile'))
const InstructorProfile = lazy(() => import('./pages/InstructorProfile'))
const StudentProfile = lazy(() => import('./pages/StudentProfile'))

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="dark:bg-gray-900 dark:text-gray-100">
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="courses/add" element={<AddCourse />} />
                  <Route path="courses/:id" element={<CourseProfile />} />
                  <Route path="students" element={<Students />} />
                  <Route path="students/:id" element={<StudentProfile />} />
                  <Route path="instructors" element={<Instructors />} />
                  <Route path="instructors/:id" element={<InstructorProfile />} />
                  <Route path="payments" element={<Payments />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="support" element={<Support />} />
                </Route>
              </Routes>
            </Suspense>
          </AuthProvider>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
