import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const AlarmMonitor = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customerFilter, setCustomerFilter] = useState('all');
  const [zipFilter, setZipFilter] = useState('');

  // Mock alarm data
  const alarms = [
    {
      id: 'ALM-2024-001',
      type: 'Burglar',
      customer: 'SBB AG',
      location: 'Zurich HB',
      zip: '8001',
      received: '2024-01-15 14:23:45',
      closed: '2024-01-15 14:45:12',
      duration: '21m 27s',
      status: 'resolved',
      priority: 'high'
    },
    {
      id: 'ALM-2024-002',
      type: 'Fire',
      customer: 'Migros',
      location: 'Basel Center',
      zip: '4001',
      received: '2024-01-15 15:10:22',
      closed: null,
      duration: 'ongoing',
      status: 'active',
      priority: 'critical'
    },
    {
      id: 'ALM-2024-003',
      type: 'Medical',
      customer: 'Coop',
      location: 'Bern Station',
      zip: '3000',
      received: '2024-01-15 13:45:10',
      closed: '2024-01-15 14:02:33',
      duration: '17m 23s',
      status: 'resolved',
      priority: 'medium'
    },
    {
      id: 'ALM-2024-004',
      type: 'Environmental',
      customer: 'SBB AG',
      location: 'Geneva Airport',
      zip: '1215',
      received: '2024-01-15 16:30:15',
      closed: null,
      duration: 'ongoing',
      status: 'active',
      priority: 'low'
    },
    {
      id: 'ALM-2024-005',
      type: 'Burglar',
      customer: 'PostFinance',
      location: 'Lausanne Office',
      zip: '1000',
      received: '2024-01-15 12:15:30',
      closed: '2024-01-15 12:35:45',
      duration: '20m 15s',
      status: 'resolved',
      priority: 'high'
    }
  ];

  const customers = [...new Set(alarms.map(alarm => alarm.customer))];
  const statuses = ['all', 'active', 'resolved'];

  // Filter alarms based on search and filters
  const filteredAlarms = useMemo(() => {
    return alarms.filter(alarm => {
      const matchesSearch = alarm.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alarm.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alarm.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alarm.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || alarm.status === statusFilter;
      const matchesCustomer = customerFilter === 'all' || alarm.customer === customerFilter;
      const matchesZip = !zipFilter || alarm.zip.includes(zipFilter);

      return matchesSearch && matchesStatus && matchesCustomer && matchesZip;
    });
  }, [searchTerm, statusFilter, customerFilter, zipFilter]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <BellIcon className="h-5 w-5 text-red-500" />;
      case 'resolved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[priority]}`}>
        {priority}
      </span>
    );
  };

  const exportToCSV = () => {
    const headers = ['Alarm ID', 'Type', 'Customer', 'Location', 'ZIP', 'Received', 'Closed', 'Duration', 'Status', 'Priority'];
    const csvContent = [
      headers.join(','),
      ...filteredAlarms.map(alarm => [
        alarm.id,
        alarm.type,
        alarm.customer,
        alarm.location,
        alarm.zip,
        alarm.received,
        alarm.closed || '',
        alarm.duration,
        alarm.status,
        alarm.priority
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alarms-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('Alarm Monitor')}</h1>
          <p className="text-gray-400 mt-1">{t('Real-time alarm tracking and management')}</p>
        </div>
        <button
          onClick={exportToCSV}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          {t('Export CSV')}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('Search alarms...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
          >
            <option value="all">{t('All Status')}</option>
            <option value="active">{t('Active')}</option>
            <option value="resolved">{t('Resolved')}</option>
          </select>

          {/* Customer Filter */}
          <select
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
          >
            <option value="all">{t('All Customers')}</option>
            {customers.map(customer => (
              <option key={customer} value={customer}>{customer}</option>
            ))}
          </select>

          {/* ZIP Filter */}
          <input
            type="text"
            placeholder={t('ZIP Code')}
            value={zipFilter}
            onChange={(e) => setZipFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
          />
        </div>
      </div>

      {/* Alarms Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Alarm ID')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Type')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Customer')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Location')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('ZIP')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Received')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Closed')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Duration')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Priority')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredAlarms.map((alarm) => (
                <tr key={alarm.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-400">
                    {alarm.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {alarm.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {alarm.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {alarm.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {alarm.zip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {alarm.received}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {alarm.closed || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {alarm.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(alarm.status)}
                      <span className="ml-2 text-sm text-white capitalize">
                        {alarm.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(alarm.priority)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {filteredAlarms.length === 0 && (
          <div className="text-center py-12">
            <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-300">{t('No alarms found')}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('Try adjusting your search or filter criteria')}</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex justify-between items-center text-sm text-gray-300">
          <span>{t('Showing')} {filteredAlarms.length} {t('of')} {alarms.length} {t('alarms')}</span>
          <span>{t('Last updated')}: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AlarmMonitor;
