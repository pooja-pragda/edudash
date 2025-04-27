import { Search, User } from 'lucide-react'

export default function Navbar() {
  return (
    <div className="flex h-16 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-64 rounded-lg border border-gray-200 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-indigo-100">
            <User className="h-8 w-8 p-1.5 text-indigo-600" />
          </div>
          <div className="text-sm">
            <div className="font-medium">Admin User</div>
            <div className="text-gray-500">admin@edudash.com</div>
          </div>
        </div>
      </div>
    </div>
  )
} 