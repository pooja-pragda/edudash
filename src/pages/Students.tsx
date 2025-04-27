import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table'
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  MoreVertical,
  Eye,
  Mail,
  Trash2,
  Plus,
  X,
  MoreHorizontal,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog'
import {
  Label,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Button,
} from '../components/ui'

type Student = {
  id: string
  name: string
  email: string
  phone?: string
  dateOfBirth?: string
  studentId?: string
  enrollmentDate?: string
  enrolledCourses: number
  progress: number
  lastActive: string
  status: 'active' | 'inactive'
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  notes?: string
}

// Move the initialData outside the component
const initialData: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    enrolledCourses: 5,
    progress: 75,
    lastActive: '2024-04-20',
    status: 'active',
    grade: 'A',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    enrolledCourses: 3,
    progress: 45,
    lastActive: '2024-04-19',
    status: 'active',
    grade: 'B',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    enrolledCourses: 2,
    progress: 30,
    lastActive: '2024-04-15',
    status: 'inactive',
    grade: 'C',
  },
]

// Event handler type definitions
type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type SelectChangeEvent = string

export default function Students() {
  const navigate = useNavigate()
  const [data, setData] = useState<Student[]>(() => {
    // Try to get saved students from localStorage
    const savedStudents = localStorage.getItem('students')
    return savedStudents ? JSON.parse(savedStudents) : initialData
  })
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [gradeFilter, setGradeFilter] = useState<string>('all')
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    studentId: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    enrolledCourses: 0,
    progress: 0,
    lastActive: new Date().toISOString().split('T')[0],
    status: 'active',
    grade: 'A',
    notes: ''
  })

  // Save students to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(data))
  }, [data])

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email) {
      const student: Student = {
        id: (data.length + 1).toString(),
        name: newStudent.name,
        email: newStudent.email,
        enrolledCourses: Number(newStudent.enrolledCourses) || 0,
        progress: Number(newStudent.progress) || 0,
        lastActive: newStudent.lastActive || new Date().toISOString().split('T')[0],
        status: newStudent.status as 'active' | 'inactive' || 'active',
        grade: newStudent.grade as 'A' | 'B' | 'C' | 'D' | 'F' || 'A',
      }
      setData([...data, student])
      setIsAddStudentModalOpen(false)
      setNewStudent({
        name: '',
        email: '',
        enrolledCourses: 0,
        progress: 0,
        lastActive: new Date().toISOString().split('T')[0],
        status: 'active',
        grade: 'A',
      })
    }
  }

  const handleDeleteStudent = (id: string) => {
    setData(data.filter(student => student.id !== id))
  }

  const handleViewProfile = (id: string) => {
    navigate(`/students/${id}`)
  }

  const handleSendEmail = (email: string) => {
    // In a real app, you would open the email client
    window.location.href = `mailto:${email}`
  }

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'enrolledCourses',
      header: 'Enrolled Courses',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'progress',
      header: 'Progress',
      cell: (info) => {
        const progress = info.getValue() as number
        return (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )
      },
    },
    {
      accessorKey: 'grade',
      header: 'Grade',
      cell: (info) => {
        const grade = info.getValue() as string
        const gradeColors = {
          A: 'bg-green-100 text-green-800',
          B: 'bg-blue-100 text-blue-800',
          C: 'bg-yellow-100 text-yellow-800',
          D: 'bg-orange-100 text-orange-800',
          F: 'bg-red-100 text-red-800',
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${gradeColors[grade as keyof typeof gradeColors]}`}>
            {grade}
          </span>
        )
      },
    },
    {
      accessorKey: 'lastActive',
      header: 'Last Active',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue() as string
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {status}
          </span>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const student = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[150px]">
              <DropdownMenuItem 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => handleViewProfile(student.id)}
              >
                <Eye className="h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => handleSendEmail(student.email)}
              >
                <Mail className="h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                onClick={() => handleDeleteStudent(student.id)}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter: search,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Students</h1>
        <button 
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsAddStudentModalOpen(true)}
        >
          Add Student
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Student List</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <li key={row.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-indigo-600 truncate">
                    {row.original.name}
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      row.original.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {row.original.status}
                    </span>
        </div>
      </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{row.original.email}</span>
                    </div>
                      </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span>Enrolled in {row.original.enrolledCourses} courses</span>
        </div>
          </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <Dialog open={isAddStudentModalOpen} onOpenChange={setIsAddStudentModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter student details below to create a new student profile.</DialogDescription>
            </DialogHeader>
            
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                  value={newStudent.name}
                    onChange={(e: InputChangeEvent) => setNewStudent({ ...newStudent, name: e.target.value })}
                    placeholder="Enter full name"
                />
              </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                  type="email"
                  value={newStudent.email}
                    onChange={(e: InputChangeEvent) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newStudent.phone}
                    onChange={(e: InputChangeEvent) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="Enter phone number"
                />
              </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={newStudent.dateOfBirth}
                    onChange={(e: InputChangeEvent) => setNewStudent({ ...newStudent, dateOfBirth: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">Academic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={newStudent.studentId}
                    onChange={(e: InputChangeEvent) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                    placeholder="Enter student ID"
                />
              </div>
                <div className="space-y-2">
                  <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                  <Input
                    id="enrollmentDate"
                  type="date"
                    value={newStudent.enrollmentDate}
                    onChange={(e: InputChangeEvent) => setNewStudent({ ...newStudent, enrollmentDate: e.target.value })}
                />
              </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select
                    value={newStudent.grade}
                    onValueChange={(value: SelectChangeEvent) => setNewStudent({ ...newStudent, grade: value as 'A' | 'B' | 'C' | 'D' | 'F' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                  value={newStudent.status}
                    onValueChange={(value: SelectChangeEvent) => setNewStudent({ ...newStudent, status: value as 'active' | 'inactive' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              </div>

            {/* Additional Notes Section */}
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">Additional Notes</h3>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newStudent.notes}
                  onChange={(e: InputChangeEvent) => setNewStudent({ ...newStudent, notes: e.target.value })}
                  placeholder="Enter any additional notes about the student"
                  className="h-24"
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsAddStudentModalOpen(false)}>Cancel</Button>
              <Button onClick={handleAddStudent}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 