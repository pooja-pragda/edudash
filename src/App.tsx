import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import Students from './pages/Students'
import Instructors from './pages/Instructors'
import Payments from './pages/Payments'
import Settings from './pages/Settings'
import Support from './pages/Support'
import AddCourse from './pages/AddCourse'
import CourseProfile from './pages/CourseProfile'
import InstructorProfile from './pages/InstructorProfile'
import StudentProfile from './pages/StudentProfile'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
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
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
