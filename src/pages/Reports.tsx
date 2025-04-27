import { Outlet } from 'react-router-dom'

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Report */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Revenue Overview</h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500">Total Revenue</div>
                <div className="text-2xl font-semibold text-gray-900">$24,567</div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-indigo-600 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Monthly Average</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">$8,189</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Growth</div>
                  <div className="mt-1 text-lg font-semibold text-green-600">+12.5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Progress Report */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Student Progress</h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500">Completion Rate</div>
                <div className="text-2xl font-semibold text-gray-900">85%</div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-600 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Active Students</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">1,234</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Average Score</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">92%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 