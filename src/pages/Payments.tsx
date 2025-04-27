import React, { useState, useEffect } from 'react';
import { Download, Search, Filter, ArrowUpDown } from 'lucide-react';

interface Payment {
  id: string;
  studentName: string;
  courseName: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

const initialPayments: Payment[] = [
  {
    id: 'TRX-001',
    studentName: 'John Doe',
    courseName: 'Web Development Bootcamp',
    amount: 999.99,
    date: '2024-04-20',
    status: 'Paid',
  },
  {
    id: 'TRX-002',
    studentName: 'Jane Smith',
    courseName: 'Data Science Fundamentals',
    amount: 799.99,
    date: '2024-04-19',
    status: 'Pending',
  },
  {
    id: 'TRX-003',
    studentName: 'Mike Johnson',
    courseName: 'Mobile App Development',
    amount: 1299.99,
    date: '2024-04-18',
    status: 'Failed',
  },
  {
    id: 'TRX-004',
    studentName: 'Sarah Williams',
    courseName: 'UI/UX Design Course',
    amount: 699.99,
    date: '2024-04-17',
    status: 'Paid',
  },
  {
    id: 'TRX-005',
    studentName: 'Robert Brown',
    courseName: 'Python Programming',
    amount: 599.99,
    date: '2024-04-16',
    status: 'Pending',
  },
];

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>(initialPayments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Failed'>('All');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Payment;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  }>({
    start: '',
    end: '',
  });

  // Calculate summary statistics
  const stats = {
    totalRevenue: filteredPayments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: filteredPayments
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + p.amount, 0),
    failedAmount: filteredPayments
      .filter(p => p.status === 'Failed')
      .reduce((sum, p) => sum + p.amount, 0),
    pendingCount: filteredPayments.filter(p => p.status === 'Pending').length,
    failedCount: filteredPayments.filter(p => p.status === 'Failed').length,
  };

  // Filter and sort payments
  useEffect(() => {
    let filtered = payments;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        payment =>
          payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(
        payment =>
          payment.date >= dateRange.start && payment.date <= dateRange.end
      );
    }

    // Apply sorting
    if (sortConfig) {
      filtered = [...filtered].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredPayments(filtered);
  }, [payments, searchQuery, statusFilter, dateRange, sortConfig]);

  const handleSort = (key: keyof Payment) => {
    setSortConfig(current => ({
      key,
      direction:
        current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleExport = () => {
    // In a real app, this would generate and download a CSV file
    const csv = [
      ['Transaction ID', 'Student', 'Course', 'Amount', 'Status', 'Date'],
      ...filteredPayments.map(payment => [
        payment.id,
        payment.studentName,
        payment.courseName,
        payment.amount.toString(),
        payment.status,
        payment.date,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleStatusChange = (id: string, newStatus: Payment['status']) => {
    setPayments(prev =>
      prev.map(payment =>
        payment.id === id ? { ...payment, status: newStatus } : payment
      )
    );
  };

  return (
    <main className="p-6">
      <div className="space-y-6">
        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              ${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500 mt-1">From {filteredPayments.length} transactions</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Pending Payments</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              ${stats.pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500 mt-1">{stats.pendingCount} payments pending</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Failed Payments</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              ${stats.failedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500 mt-1">{stats.failedCount} payments failed</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { key: 'id', label: 'Transaction ID' },
                    { key: 'studentName', label: 'Student' },
                    { key: 'courseName', label: 'Course' },
                    { key: 'amount', label: 'Amount' },
                    { key: 'status', label: 'Status' },
                    { key: 'date', label: 'Date' },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort(key as keyof Payment)}
                    >
                      <div className="flex items-center gap-2">
                        {label}
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.courseName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={payment.status}
                        onChange={(e) => handleStatusChange(payment.id, e.target.value as Payment['status'])}
                        className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                          payment.status === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : payment.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payments;