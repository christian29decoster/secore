import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowDownTrayIcon,
  CurrencyDollarIcon,
  CalculatorIcon,
  DocumentTextIcon,
  PlusIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Billing = () => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedCustomer, setSelectedCustomer] = useState('all');
  const [ratePerAlarm, setRatePerAlarm] = useState(12.50);

  // Mock billing data
  const billingData = [
    {
      customer: 'SBB AG',
      alarms: 156,
      cost: 1950.00,
      period: 'current',
      locations: 12,
      avgResponseTime: '2.3m'
    },
    {
      customer: 'Migros',
      alarms: 89,
      cost: 1112.50,
      period: 'current',
      locations: 8,
      avgResponseTime: '1.8m'
    },
    {
      customer: 'Coop',
      alarms: 67,
      cost: 837.50,
      period: 'current',
      locations: 6,
      avgResponseTime: '2.1m'
    },
    {
      customer: 'PostFinance',
      alarms: 45,
      cost: 562.50,
      period: 'current',
      locations: 4,
      avgResponseTime: '2.7m'
    },
    {
      customer: 'Swisscom',
      alarms: 123,
      cost: 1537.50,
      period: 'current',
      locations: 10,
      avgResponseTime: '1.9m'
    }
  ];

  const monthlyTrends = [
    { month: 'Jan', alarms: 120, revenue: 1500 },
    { month: 'Feb', alarms: 135, revenue: 1687.5 },
    { month: 'Mar', alarms: 142, revenue: 1775 },
    { month: 'Apr', alarms: 128, revenue: 1600 },
    { month: 'May', alarms: 156, revenue: 1950 },
    { month: 'Jun', alarms: 148, revenue: 1850 }
  ];

  const customers = [...new Set(billingData.map(item => item.customer))];

  // Filter data based on selections
  const filteredData = useMemo(() => {
    return billingData.filter(item => {
      const matchesPeriod = selectedPeriod === 'all' || item.period === selectedPeriod;
      const matchesCustomer = selectedCustomer === 'all' || item.customer === selectedCustomer;
      return matchesPeriod && matchesCustomer;
    });
  }, [selectedPeriod, selectedCustomer]);

  // Calculate totals
  const totals = useMemo(() => {
    return filteredData.reduce((acc, item) => {
      acc.alarms += item.alarms;
      acc.cost += item.cost;
      acc.locations += item.locations;
      return acc;
    }, { alarms: 0, cost: 0, locations: 0 });
  }, [filteredData]);

  const exportBillingReport = () => {
    const headers = ['Customer', 'Alarms', 'Cost (CHF)', 'Locations', 'Avg Response Time'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(item => [
        item.customer,
        item.alarms,
        item.cost.toFixed(2),
        item.locations,
        item.avgResponseTime
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `billing-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'bg-blue-500' }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('Billing & Analytics')}</h1>
          <p className="text-gray-400 mt-1">{t('Cost tracking and revenue management')}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={exportBillingReport}
            className="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            {t('Export Report')}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
          >
            <option value="current">{t('Current Month')}</option>
            <option value="previous">{t('Previous Month')}</option>
            <option value="all">{t('All Time')}</option>
          </select>

          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
          >
            <option value="all">{t('All Customers')}</option>
            {customers.map(customer => (
              <option key={customer} value={customer}>{customer}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">{t('Rate per alarm:')}</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">CHF</span>
              <input
                type="number"
                value={ratePerAlarm}
                onChange={(e) => setRatePerAlarm(parseFloat(e.target.value) || 0)}
                className="pl-12 pr-4 py-2 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 w-24"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('Total Alarms')}
          value={totals.alarms}
          subtitle={`${t('across')} ${totals.locations} ${t('locations')}`}
          icon={CalculatorIcon}
          color="bg-blue-500"
        />
        <StatCard
          title={t('Total Revenue')}
          value={`CHF ${totals.cost.toFixed(2)}`}
          subtitle={`${t('at')} CHF ${ratePerAlarm} ${t('per alarm')}`}
          icon={CurrencyDollarIcon}
          color="bg-green-500"
        />
        <StatCard
          title={t('Active Locations')}
          value={totals.locations}
          subtitle={t('monitored sites')}
          icon={DocumentTextIcon}
          color="bg-purple-500"
        />
        <StatCard
          title={t('Avg Cost per Location')}
          value={`CHF ${(totals.cost / totals.locations).toFixed(2)}`}
          subtitle={t('monthly average')}
          icon={CalculatorIcon}
          color="bg-orange-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Monthly Revenue Trend')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value, name) => [
                  name === 'revenue' ? `CHF ${value}` : value,
                  name === 'revenue' ? 'Revenue' : 'Alarms'
                ]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Revenue */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Revenue by Customer')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="customer" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
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
              <Bar dataKey="cost" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Billing Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">{t('Detailed Billing')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Customer')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Alarms')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Cost (CHF)')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Locations')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Avg Response')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Cost per Location')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {item.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.alarms}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400">
                    CHF {item.cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.locations}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.avgResponseTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    CHF {(item.cost / item.locations).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rate Management */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">{t('Rate Management')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('Standard Rate per Alarm')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">CHF</span>
              <input
                type="number"
                value={ratePerAlarm}
                onChange={(e) => setRatePerAlarm(parseFloat(e.target.value) || 0)}
                className="pl-12 pr-4 py-2 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 w-full"
                step="0.01"
                min="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('Premium Rate (Critical)')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">CHF</span>
              <input
                type="number"
                value={(ratePerAlarm * 1.5).toFixed(2)}
                disabled
                className="pl-12 pr-4 py-2 bg-gray-600 border border-gray-500 text-gray-400 text-sm rounded-lg w-full cursor-not-allowed"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('Bulk Discount (100+ alarms)')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">CHF</span>
              <input
                type="number"
                value={(ratePerAlarm * 0.9).toFixed(2)}
                disabled
                className="pl-12 pr-4 py-2 bg-gray-600 border border-gray-500 text-gray-400 text-sm rounded-lg w-full cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
