import { useState, useEffect } from 'react'
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
  MoreVertical,
  UserPlus,
  Mail,
  Trash2,
  Shield,
  X,
  Key,
  Users as UsersIcon,
  UserCheck,
  UserX
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import Layout from '../components/layout/Layout'
import type { User } from '../types/auth' // Use shared User type

type Role = 'admin' | 'instructor' | 'student'

type Permission = {
  id: string
  name: string
  description: string
}

const permissions: Permission[] = [
  { id: 'manage_users', name: 'Manage Users', description: 'Create, edit, and delete users' },
  { id: 'manage_courses', name: 'Manage Courses', description: 'Create, edit, and delete courses' },
  { id: 'manage_students', name: 'Manage Students', description: 'View and manage student data' },
  { id: 'view_analytics', name: 'View Analytics', description: 'Access analytics and reports' },
  { id: 'manage_payments', name: 'Manage Payments', description: 'Process and view payment information' },
]

const rolePermissions: Record<Role, string[]> = {
  admin: ['manage_users', 'manage_courses', 'manage_students', 'view_analytics', 'manage_payments'],
  instructor: ['manage_courses', 'view_analytics'],
  student: [],
}

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-04-20',
    permissions: rolePermissions['admin'], // Dynamically assign permissions
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'instructor',
    status: 'active',
    lastLogin: '2024-04-19',
    permissions: rolePermissions['instructor'],
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'student',
    status: 'active',
    lastLogin: '2024-04-18',
    permissions: rolePermissions['student'],
  },
]

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function Users() {
  const [data, setData] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users')
    return savedUsers ? JSON.parse(savedUsers) : initialUsers
  })
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isManagePermissionsModalOpen, setIsManagePermissionsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'student',
    status: 'active',
    permissions: [],
  })

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(data))
  }, [data])

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert('All fields are required.')
      return
    }

    if (!validateEmail(newUser.email)) {
      alert('Invalid email format.')
      return
    }

    const sanitizedUser = {
      ...newUser,
      name: newUser.name.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
      email: newUser.email.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    }

    const user: User = {
      id: (data.length + 1).toString(),
      name: sanitizedUser.name,
      email: sanitizedUser.email,
      role: sanitizedUser.role as Role,
      status: sanitizedUser.status as 'active' | 'inactive',
      lastLogin: new Date().toISOString().split('T')[0],
      permissions: rolePermissions[sanitizedUser.role as Role],
    }

    setData([...data, user])
    setIsAddUserModalOpen(false)
    setNewUser({
      name: '',
      email: '',
      role: 'student',
      status: 'active',
      permissions: [],
    })
  }

  const handleDeleteUser = (id: string) => {
    setData(data.filter(user => user.id !== id))
  }

  const handleManagePermissions = (user: User) => {
    setSelectedUser(user)
    setIsManagePermissionsModalOpen(true)
  }

  const handleUpdatePermissions = (updatedPermissions: string[]) => {
    if (selectedUser) {
      setData(data.map(user => 
        user.id === selectedUser.id 
          ? { ...user, permissions: updatedPermissions }
          : user
      ))
      setIsManagePermissionsModalOpen(false)
      setSelectedUser(null)
    }
  }

  const columns: ColumnDef<User>[] = [
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
      accessorKey: 'role',
      header: 'Role',
      cell: (info) => {
        const role = info.getValue() as string
        const roleColors = {
          admin: 'bg-purple-100 text-purple-800',
          instructor: 'bg-blue-100 text-blue-800',
          student: 'bg-green-100 text-green-800',
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[role as keyof typeof roleColors]}`}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        )
      },
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
      accessorKey: 'lastLogin',
      header: 'Last Login',
      cell: (info) => info.getValue(),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[150px]">
              <DropdownMenuItem 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => handleManagePermissions(user)}
              >
                <Shield className="h-4 w-4" />
                Manage Permissions
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => window.location.href = `mailto:${user.email}`}
              >
                <Mail className="h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                onClick={() => handleDeleteUser(user.id)}
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

  const stats = [
    {
      name: 'Total Users',
      value: data.length,
      icon: UsersIcon,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      name: 'Active Users',
      value: data.filter(user => user.status === 'active').length,
      icon: UserCheck,
      color: 'bg-green-50 text-green-600',
    },
    {
      name: 'Inactive Users',
      value: data.filter(user => user.status === 'inactive').length,
      icon: UserX,
      color: 'bg-red-50 text-red-600',
    },
  ]

  return (
    <Layout>
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-600">Manage users and their roles in the system.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button 
              className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-200 transform hover:scale-105"
              onClick={() => setIsAddUserModalOpen(true)}
            >
              <UserPlus className="h-4 w-4" />
              Add User
            </button>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none transition-colors duration-200"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value)
                  if (e.target.value === 'all') {
                    setColumnFilters([])
                  } else {
                    setColumnFilters([{ id: 'role', value: e.target.value }])
                  }
                }}
                className="h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none transition-colors duration-200"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>

          <div className="rounded-lg border bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-b">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="flex items-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <ChevronUp className="h-4 w-4" />,
                              desc: <ChevronDown className="h-4 w-4" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  First
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  Last
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">
                  Page {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value))
                  }}
                  className="h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-indigo-500 focus:outline-none"
                >
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Add User Modal */}
          {isAddUserModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Add New User</h2>
                  <button
                    onClick={() => setIsAddUserModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role *</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value as Role })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    >
                      <option value="admin">Admin</option>
                      <option value="instructor">Instructor</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={newUser.status}
                      onChange={(e) => setNewUser({ ...newUser, status: e.target.value as 'active' | 'inactive' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                    onClick={() => setIsAddUserModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                    onClick={handleAddUser}
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Manage Permissions Modal */}
          {isManagePermissionsModalOpen && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Manage Permissions</h2>
                  <button
                    onClick={() => {
                      setIsManagePermissionsModalOpen(false)
                      setSelectedUser(null)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Key className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Managing permissions for {selectedUser.name}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id={permission.id}
                          checked={selectedUser.permissions.includes(permission.id)}
                          onChange={(e) => {
                            const updatedPermissions = e.target.checked
                              ? [...selectedUser.permissions, permission.id]
                              : selectedUser.permissions.filter(p => p !== permission.id)
                            handleUpdatePermissions(updatedPermissions)
                          }}
                          className="mt-1"
                        />
                        <div>
                          <label htmlFor={permission.id} className="block text-sm font-medium text-gray-700">
                            {permission.name}
                          </label>
                          <p className="text-xs text-gray-500">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                    onClick={() => {
                      setIsManagePermissionsModalOpen(false)
                      setSelectedUser(null)
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}