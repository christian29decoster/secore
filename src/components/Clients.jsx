import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  UsersIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ChartBarIcon,
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Clients = () => {
  const { t } = useTranslation();
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock client data
  const clients = [
    {
      id: 'CLI-001',
      name: 'SBB AG',
      type: 'Transportation',
      status: 'active',
      contact: {
        name: 'Hans Müller',
        email: 'hans.mueller@sbb.ch',
        phone: '+41 58 327 1234',
        position: 'Security Manager'
      },
      locations: 12,
      activeAlarms: 3,
      totalAlarms: 156,
      avgResponseTime: '2.3m',
      monthlyCost: 1950.00,
      contractStart: '2023-01-15',
      contractEnd: '2024-12-31',
      address: 'Hilfikerstrasse 1, 3000 Bern',
      website: 'www.sbb.ch',
      priority: 'high'
    },
    {
      id: 'CLI-002',
      name: 'Migros',
      type: 'Retail',
      status: 'active',
      contact: {
        name: 'Anna Schmidt',
        email: 'anna.schmidt@migros.ch',
        phone: '+41 44 277 5678',
        position: 'Operations Director'
      },
      locations: 8,
      activeAlarms: 1,
      totalAlarms: 89,
      avgResponseTime: '1.8m',
      monthlyCost: 1112.50,
      contractStart: '2023-03-20',
      contractEnd: '2024-12-31',
      address: 'Limmatstrasse 152, 8005 Zürich',
      website: 'www.migros.ch',
      priority: 'medium'
    },
    {
      id: 'CLI-003',
      name: 'Coop',
      type: 'Retail',
      status: 'active',
      contact: {
        name: 'Peter Weber',
        email: 'peter.weber@coop.ch',
        phone: '+41 61 336 9012',
        position: 'Facility Manager'
      },
      locations: 6,
      activeAlarms: 0,
      totalAlarms: 67,
      avgResponseTime: '2.1m',
      monthlyCost: 837.50,
      contractStart: '2023-06-10',
      contractEnd: '2024-12-31',
      address: 'Güterstrasse 9, 4002 Basel',
      website: 'www.coop.ch',
      priority: 'medium'
    },
    {
      id: 'CLI-004',
      name: 'PostFinance',
      type: 'Banking',
      status: 'active',
      contact: {
        name: 'Maria Fischer',
        email: 'maria.fischer@postfinance.ch',
        phone: '+41 58 338 3456',
        position: 'Security Officer'
      },
      locations: 4,
      activeAlarms: 0,
      totalAlarms: 45,
      avgResponseTime: '2.7m',
      monthlyCost: 562.50,
      contractStart: '2023-09-05',
      contractEnd: '2024-12-31',
      address: 'Mingerstrasse 20, 3030 Bern',
      website: 'www.postfinance.ch',
      priority: 'high'
    },
    {
      id: 'CLI-005',
      name: 'Swisscom',
      type: 'Telecommunications',
      status: 'active',
      contact: {
        name: 'Thomas Wagner',
        email: 'thomas.wagner@swisscom.ch',
        phone: '+41 58 221 7890',
        position: 'IT Security Manager'
      },
      locations: 10,
      activeAlarms: 2,
      totalAlarms: 123,
      avgResponseTime: '1.9m',
      monthlyCost: 1537.50,
      contractStart: '2023-02-28',
      contractEnd: '2024-12-31',
      address: 'Alte Tiefenaustrasse 6, 3048 Worblaufen',
      website: 'www.swisscom.ch',
      priority: 'high'
    }
  ];

  const clientTypes = [...new Set(clients.map(client => client.type))];

  // Filter clients based on search and filters
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Analytics data
  const clientAnalytics = [
    { name: 'SBB AG', alarms: 156, revenue: 1950 },
    { name: 'Migros', alarms: 89, revenue: 1112.5 },
    { name: 'Coop', alarms: 67, revenue: 837.5 },
    { name: 'PostFinance', alarms: 45, revenue: 562.5 },
    { name: 'Swisscom', alarms: 123, revenue: 1537.5 }
  ];

  const typeDistribution = [
    { name: 'Transportation', value: 1, color: '#3b82f6' },
    { name: 'Retail', value: 2, color: '#10b981' },
    { name: 'Banking', value: 1, color: '#f59e0b' },
    { name: 'Telecommunications', value: 1, color: '#8b5cf6' }
  ];

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[priority]}`}>
        {priority}
      </span>
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'inactive':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  const ClientCard = ({ client }) => (
    <div 
      className={`bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer ${
        selectedClient?.id === client.id ? 'ring-2 ring-cyan-500' : ''
      }`}
      onClick={() => setSelectedClient(client)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-cyan-500 rounded-lg flex items-center justify-center">
            <BuildingOfficeIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{client.name}</h3>
            <p className="text-sm text-gray-400">{client.type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(client.status)}
          {getPriorityBadge(client.priority)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-400">{t('Locations')}</p>
          <p className="text-lg font-semibold text-white">{client.locations}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">{t('Active Alarms')}</p>
          <p className="text-lg font-semibold text-red-400">{client.activeAlarms}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">{t('Total Alarms')}</p>
          <p className="text-lg font-semibold text-white">{client.totalAlarms}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">{t('Avg Response')}</p>
          <p className="text-lg font-semibold text-green-400">{client.avgResponseTime}</p>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">{t('Monthly Cost')}</span>
          <span className="text-green-400 font-semibold">CHF {client.monthlyCost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  const ClientDetail = ({ client }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">{client.name}</h3>
          <p className="text-gray-400">{client.type} • {client.id}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(client.status)}
          {getPriorityBadge(client.priority)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-4">{t('Contact Information')}</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <UsersIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-white font-medium">{client.contact.name}</p>
                <p className="text-sm text-gray-400">{client.contact.position}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              <a href={`mailto:${client.contact.email}`} className="text-cyan-400 hover:text-cyan-300">
                {client.contact.email}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
              <a href={`tel:${client.contact.phone}`} className="text-cyan-400 hover:text-cyan-300">
                {client.contact.phone}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">{client.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <GlobeAltIcon className="h-5 w-5 text-gray-400" />
              <a href={`https://${client.website}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                {client.website}
              </a>
            </div>
          </div>
        </div>

        {/* Contract Information */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-4">{t('Contract Information')}</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Contract Start')}:</span>
              <span className="text-white">{client.contractStart}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Contract End')}:</span>
              <span className="text-white">{client.contractEnd}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Monthly Cost')}:</span>
              <span className="text-green-400 font-semibold">CHF {client.monthlyCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Total Alarms')}:</span>
              <span className="text-white">{client.totalAlarms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Avg Response Time')}:</span>
              <span className="text-green-400">{client.avgResponseTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h4 className="text-sm font-medium text-gray-300 mb-4">{t('Performance Metrics')}</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-xs text-gray-400">{t('Locations')}</p>
            <p className="text-lg font-semibold text-white">{client.locations}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-xs text-gray-400">{t('Active Alarms')}</p>
            <p className="text-lg font-semibold text-red-400">{client.activeAlarms}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-xs text-gray-400">{t('Response Time')}</p>
            <p className="text-lg font-semibold text-green-400">{client.avgResponseTime}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-xs text-gray-400">{t('Monthly Revenue')}</p>
            <p className="text-lg font-semibold text-green-400">CHF {client.monthlyCost.toFixed(0)}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('Clients')}</h1>
          <p className="text-gray-400 mt-1">{t('Multi-tenant client management and analytics')}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <input
            type="text"
            placeholder={t('Search clients...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
          >
            <option value="all">{t('All Status')}</option>
            <option value="active">{t('Active')}</option>
            <option value="inactive">{t('Inactive')}</option>
          </select>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Revenue Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Revenue by Client')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clientAnalytics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value) => [`CHF ${value}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Client Type Distribution */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Client Type Distribution')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {typeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {typeDistribution.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-300">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {/* Selected Client Detail */}
      {selectedClient && (
        <div className="mt-8">
          <ClientDetail client={selectedClient} />
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('Total Clients')}</p>
              <p className="text-2xl font-bold text-white">{clients.length}</p>
            </div>
            <UsersIcon className="h-8 w-8 text-cyan-500" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('Active Clients')}</p>
              <p className="text-2xl font-bold text-green-400">
                {clients.filter(c => c.status === 'active').length}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('Total Locations')}</p>
              <p className="text-2xl font-bold text-blue-400">
                {clients.reduce((sum, client) => sum + client.locations, 0)}
              </p>
            </div>
            <BuildingOfficeIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('Monthly Revenue')}</p>
              <p className="text-2xl font-bold text-green-400">
                CHF {clients.reduce((sum, client) => sum + client.monthlyCost, 0).toFixed(0)}
              </p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
