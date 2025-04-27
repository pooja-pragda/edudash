import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Search, Plus } from 'lucide-react';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
}

const initialTickets: SupportTicket[] = [
  {
    id: '1',
    title: 'Login Issues',
    description: 'Unable to log in to the platform',
    status: 'Open',
    priority: 'High',
    createdAt: '2024-04-20',
    updatedAt: '2024-04-20',
  },
  {
    id: '2',
    title: 'Course Access Problem',
    description: 'Cannot access purchased course materials',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: '2024-04-19',
    updatedAt: '2024-04-20',
  },
  {
    id: '3',
    title: 'Payment Failed',
    description: 'Payment transaction failed multiple times',
    status: 'Open',
    priority: 'High',
    createdAt: '2024-04-18',
    updatedAt: '2024-04-18',
  },
  {
    id: '4',
    title: 'Video Playback Issue',
    description: 'Course videos not playing properly',
    status: 'Resolved',
    priority: 'Medium',
    createdAt: '2024-04-17',
    updatedAt: '2024-04-19',
  },
  {
    id: '5',
    title: 'Certificate Download',
    description: 'Unable to download course completion certificate',
    status: 'In Progress',
    priority: 'Low',
    createdAt: '2024-04-16',
    updatedAt: '2024-04-18',
  },
];

const Support: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>(initialTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTicket, setNewTicket] = useState<Partial<SupportTicket>>({
    title: '',
    description: '',
    priority: 'Medium',
  });

  // Filter tickets based on search query and status
  useEffect(() => {
    let filtered = tickets;
    
    if (searchQuery) {
      filtered = filtered.filter(ticket => 
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    setFilteredTickets(filtered);
  }, [searchQuery, statusFilter, tickets]);

  const handleCreateTicket = () => {
    if (!newTicket.title || !newTicket.description) return;

    const ticket: SupportTicket = {
      id: (tickets.length + 1).toString(),
      title: newTicket.title,
      description: newTicket.description,
      status: 'Open',
      priority: newTicket.priority as 'Low' | 'Medium' | 'High',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setTickets(prev => [ticket, ...prev]);
    setShowCreateModal(false);
    setNewTicket({ title: '', description: '', priority: 'Medium' });
  };

  const handleDeleteTicket = (id: string) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: 'Open' | 'In Progress' | 'Resolved') => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === id 
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : ticket
    ));
  };

  return (
    <Layout>
      <main className="p-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Create Ticket
                </button>
                <div className="flex space-x-2">
                  {(['All', 'Open', 'In Progress', 'Resolved'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 border rounded-md transition-colors duration-200 ${
                        statusFilter === status
                          ? 'bg-blue-50 border-blue-600 text-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {ticket.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {ticket.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={ticket.status}
                          onChange={(e) => handleStatusChange(ticket.id, e.target.value as 'Open' | 'In Progress' | 'Resolved')}
                          className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                            ticket.status === 'Open'
                              ? 'bg-red-100 text-red-800'
                              : ticket.status === 'In Progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ticket.priority === 'High'
                              ? 'bg-red-100 text-red-800'
                              : ticket.priority === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ticket.createdAt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {/* TODO: Implement view functionality */}}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteTicket(ticket.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Create New Ticket</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={newTicket.priority || 'Low'}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value as SupportTicket['priority'] }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTicket}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Support;