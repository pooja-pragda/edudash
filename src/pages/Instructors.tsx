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
  Star,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

type Instructor = {
  id: string
  name: string
  email: string
  courses: number
  students: number
  rating: number
  status: 'active' | 'inactive'
  joinDate: string
}

const sampleInstructors: Instructor[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    courses: 5,
    students: 245,
    rating: 4.8,
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    courses: 3,
    students: 189,
    rating: 4.9,
    status: 'active',
    joinDate: '2023-03-22',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    courses: 4,
    students: 312,
    rating: 4.7,
    status: 'active',
    joinDate: '2023-02-10',
  },
]

export default function Instructors() {
  const navigate = useNavigate()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [instructors, setInstructors] = useState<Instructor[]>(() => {
    const savedInstructors = localStorage.getItem('instructors')
    return savedInstructors ? JSON.parse(savedInstructors) : sampleInstructors
  })

  const columns = useMemo<ColumnDef<Instructor>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Name
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
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'courses',
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Courses
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
        accessorKey: 'students',
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Students
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
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
          )
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
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {status}
            </span>
          )
        },
      },
      {
        accessorKey: 'joinDate',
        header: 'Join Date',
        cell: ({ row }) => {
          const date = new Date(row.getValue('joinDate'))
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const instructor = row.original

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
                  onClick={() => navigate(`/instructors/${instructor.id}`)}
                >
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg text-sm"
                  onClick={() => navigate(`/instructors/${instructor.id}/edit`)}
                >
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg text-sm text-red-600"
                  onClick={() => {
                    const updatedInstructors = instructors.filter(
                      (i) => i.id !== instructor.id
                    )
                    setInstructors(updatedInstructors)
                    localStorage.setItem(
                      'instructors',
                      JSON.stringify(updatedInstructors)
                    )
                  }}
                >
                  Remove Instructor
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
    data: instructors,
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
        <h1 className="text-2xl font-semibold text-gray-900">Instructors</h1>
        <button
          onClick={() => navigate('/instructors/new')}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Instructor
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Instructor List</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
              <li key={row.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-indigo-600 truncate">
                    {row.getValue('name')}
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {row.getValue('status')}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{row.getValue('email')}</span>
                    </div>
        </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span>Teaching {row.getValue('courses')} courses</span>
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