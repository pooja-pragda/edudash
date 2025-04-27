import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
} from '@tanstack/react-table'
import { useNavigate, Outlet } from 'react-router-dom'
import {
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

type Course = {
  id: string
  title: string
  instructor: string
  enrolledStudents: number
  duration: string
  price: number
  status: 'active' | 'draft' | 'archived'
  rating: number
}

const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    instructor: 'John Smith',
    enrolledStudents: 156,
    duration: '12 weeks',
    price: 99.99,
    status: 'active',
    rating: 4.5,
  },
  {
    id: '2',
    title: 'Advanced JavaScript Programming',
    instructor: 'Sarah Johnson',
    enrolledStudents: 89,
    duration: '8 weeks',
    price: 149.99,
    status: 'active',
    rating: 4.8,
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Michael Chen',
    enrolledStudents: 234,
    duration: '10 weeks',
    price: 129.99,
    status: 'active',
    rating: 4.6,
  },
]

export default function Courses() {
  const navigate = useNavigate()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [courses, setCourses] = useState<Course[]>(() => {
    const savedCourses = localStorage.getItem('courses')
    return savedCourses ? JSON.parse(savedCourses) : sampleCourses
  })

  const columns = useMemo<ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Title
              {column.getIsSorted() === 'asc' ? (
                <ChevronUp className="h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ChevronDown className="h-4 w-4" />
              ) : null}
            </button>
          )
        },
      },
      {
        accessorKey: 'instructor',
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Instructor
              {column.getIsSorted() === 'asc' ? (
                <ChevronUp className="h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ChevronDown className="h-4 w-4" />
              ) : null}
            </button>
          )
        },
      },
      {
        accessorKey: 'enrolledStudents',
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Enrolled
              {column.getIsSorted() === 'asc' ? (
                <ChevronUp className="h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ChevronDown className="h-4 w-4" />
              ) : null}
            </button>
          )
        },
      },
      {
        accessorKey: 'duration',
        header: 'Duration',
      },
      {
        accessorKey: 'price',
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Price
              {column.getIsSorted() === 'asc' ? (
                <ChevronUp className="h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ChevronDown className="h-4 w-4" />
              ) : null}
            </button>
          )
        },
        cell: ({ row }) => {
          const price = parseFloat(row.getValue('price'))
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price)
          return formatted
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : status === 'draft'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {status}
            </span>
          )
        },
      },
      {
        accessorKey: 'rating',
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Rating
              {column.getIsSorted() === 'asc' ? (
                <ChevronUp className="h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ChevronDown className="h-4 w-4" />
              ) : null}
            </button>
          )
        },
        cell: ({ row }) => {
          const rating = parseFloat(row.getValue('rating'))
          return (
            <div className="flex items-center gap-1">
              <span>{rating}</span>
              <span className="text-yellow-400">★</span>
            </div>
          )
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const course = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-lg shadow-lg border p-2 space-y-1">
                <DropdownMenuItem
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg text-sm"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg text-sm"
                  onClick={() => navigate(`/courses/${course.id}/edit`)}
                >
                  Edit Course
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg text-sm text-red-600"
                  onClick={() => {
                    const updatedCourses = courses.filter((s) => s.id !== course.id)
                    setCourses(updatedCourses)
                    localStorage.setItem('courses', JSON.stringify(updatedCourses))
                  }}
                >
                  Delete Course
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data: courses,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
        <button
          onClick={() => navigate('/courses/new')}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Course
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Course List</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <li key={row.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-indigo-600 truncate">
                    {row.getValue('title')}
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        row.getValue('status') === 'active'
                          ? 'bg-green-100 text-green-800'
                          : row.getValue('status') === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {row.getValue('status')}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{row.getValue('enrolledStudents')} students enrolled</span>
                    </div>
        </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span>Last updated {new Date().toLocaleDateString()}</span>
          </div>
          </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 