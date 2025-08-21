import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ClockIcon,
  BellIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts';

const Analytics = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('alarms');

  // Mock analytics data
  const dailyData = [
    { date: '2024-01-01', alarms: 12, responseTime: 2.1, revenue: 150, critical: 2 },
    { date: '2024-01-02', alarms: 18, responseTime: 1.8, revenue: 225, critical: 3 },
    { date: '2024-01-03', alarms: 15, responseTime: 2.3, revenue: 187.5, critical: 1 },
    { date: '2024-01-04', alarms: 22, responseTime: 1.9, revenue: 275, critical: 4 },
    { date: '2024-01-05', alarms: 19, responseTime: 2.0, revenue: 237.5, critical: 2 },
    { date: '2024-01-06', alarms: 8, responseTime: 2.5, revenue: 100, critical: 0 },
    { date: '2024-01-07', alarms: 6, responseTime: 2.8, revenue: 75, critical: 1 },
    { date: '2024-01-08', alarms: 16, responseTime: 2.2, revenue: 200, critical: 2 },
    { date: '2024-01-09', alarms: 21, responseTime: 1.7, revenue: 262.5, critical: 3 },
    { date: '2024-01-10', alarms: 14, responseTime: 2.4, revenue: 175, critical: 1 },
    { date: '2024-01-11', alarms: 25, responseTime: 1.6, revenue: 312.5, critical: 5 },
    { date: '2024-01-12', alarms: 17, responseTime: 2.1, revenue: 212.5, critical: 2 },
    { date: '2024-01-13', alarms: 9, responseTime: 2.6, revenue: 112.5, critical: 1 },
    { date: '2024-01-14', alarms: 7, responseTime: 2.9, revenue: 87.5, critical: 0 },
    { date: '2024-01-15', alarms: 23, responseTime: 1.8, revenue: 287.5, critical: 4 }
  ];

  const weeklyData = [
    { week: 'Week 1', alarms: 85, responseTime: 2.1, revenue: 1062.5, efficiency: 92 },
    { week: 'Week 2', alarms: 78, responseTime: 1.9, revenue: 975, efficiency: 95 },
    { week: 'Week 3', alarms: 92, responseTime: 2.3, revenue: 1150, efficiency: 88 },
    { week: 'Week 4', alarms: 67, responseTime: 1.7, revenue: 837.5, efficiency: 96 },
    { week: 'Week 5', alarms: 89, responseTime: 2.0, revenue: 1112.5, efficiency: 91 },
    { week: 'Week 6', alarms: 76, responseTime: 2.2, revenue: 950, efficiency: 89 }
  ];

  const alarmTypeData = [
    { type: 'Burglar', count: 156, percentage: 35, avgResponse: 2.1, cost: 1950 },
    { type: 'Fire', count: 89, percentage: 20, avgResponse: 1.8, cost: 1112.5 },
    { type: 'Medical', count: 67, percentage: 15, avgResponse: 2.3, cost: 837.5 },
    { type: 'Environmental', count: 134, percentage: 30, avgResponse: 2.5, cost: 1675 }
  ];

  const customerPerformance = [
    { customer: 'SBB AG', alarms: 156, responseTime: 2.3, satisfaction: 4.8, revenue: 1950 },
    { customer: 'Migros', alarms: 89, responseTime: 1.8, satisfaction: 4.9, revenue: 1112.5 },
    { customer: 'Coop', alarms: 67, responseTime: 2.1, satisfaction: 4.7, revenue: 837.5 },
    { customer: 'PostFinance', alarms: 45, responseTime: 2.7, satisfaction: 4.6, revenue: 562.5 },
    { customer: 'Swisscom', alarms: 123, responseTime: 1.9, satisfaction: 4.9, revenue: 1537.5 }
  ];

  const efficiencyData = [
    { time: '00:00', efficiency: 85, alarms: 8 },
    { time: '04:00', efficiency: 78, alarms: 5 },
    { time: '08:00', efficiency: 92, alarms: 15 },
    { time: '12:00', efficiency: 88, alarms: 12 },
    { time: '16:00', efficiency: 95, alarms: 18 },
    { time: '20:00', efficiency: 91, alarms: 10 },
    { time: '24:00', efficiency: 87, alarms: 7 }
  ];

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const StatCard = ({ title, value, change, icon: Icon, color = 'bg-blue-500' }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {change} vs last period
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const exportAnalytics = () => {
    const data = {
      dailyData,
      weeklyData,
      alarmTypeData,
      customerPerformance,
      efficiencyData
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('Analytics & BI')}</h1>
          <p className="text-gray-400 mt-1">{t('Business intelligence and performance analytics')}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button
            onClick={exportAnalytics}
            className="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            {t('Export Data')}
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('Total Alarms')}
          value="447"
          change="+12%"
          icon={BellIcon}
          color="bg-red-500"
        />
        <StatCard
          title={t('Avg Response Time')}
          value="2.1m"
          change="-8%"
          icon={ClockIcon}
          color="bg-blue-500"
        />
        <StatCard
          title={t('Revenue')}
          value="CHF 6,137.50"
          change="+15%"
          icon={ChartBarIcon}
          color="bg-green-500"
        />
        <StatCard
          title={t('Critical Alarms')}
          value="23"
          change="-5%"
          icon={ExclamationTriangleIcon}
          color="bg-orange-500"
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trends */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Daily Performance Trends')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis yAxisId="left" stroke="#9CA3AF" />
              <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Bar yAxisId="left" dataKey="alarms" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="responseTime" stroke="#ef4444" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Efficiency */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Weekly Efficiency & Revenue')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#9CA3AF" />
              <YAxis yAxisId="left" stroke="#9CA3AF" />
              <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Bar yAxisId="left" dataKey="alarms" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#f59e0b" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alarm Type Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alarm Types Pie Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Alarm Type Distribution')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={alarmTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
              >
                {alarmTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
          <div className="grid grid-cols-2 gap-4 mt-4">
            {alarmTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="text-sm text-gray-300">{item.type}</span>
                </div>
                <span className="text-sm text-white font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Performance Scatter */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Customer Performance Analysis')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" dataKey="alarms" name="Alarms" stroke="#9CA3AF" />
              <YAxis type="number" dataKey="responseTime" name="Response Time" stroke="#9CA3AF" />
              <ZAxis type="number" dataKey="revenue" range={[60, 400]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value, name) => [
                  name === 'revenue' ? `CHF ${value}` : value,
                  name === 'revenue' ? 'Revenue' : name === 'alarms' ? 'Alarms' : 'Response Time'
                ]}
              />
              <Scatter data={customerPerformance} fill="#06b6d4" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time-based Efficiency */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('24-Hour Efficiency Pattern')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Area
                type="monotone"
                dataKey="efficiency"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Satisfaction vs Performance */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Customer Satisfaction vs Performance')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerPerformance}>
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
              />
              <Bar dataKey="satisfaction" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BI-Ready Data Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">{t('BI-Ready Data Export')}</h3>
          <p className="text-sm text-gray-400 mt-1">{t('Structured data ready for Power BI, Tableau, or custom analytics')}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Metric')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Current Period')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Previous Period')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Change')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('Trend')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t('Total Alarms')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">447</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">399</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">+12%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-600 rounded-full">
                      <div className="w-12 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t('Avg Response Time')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2.1m</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2.3m</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">-8%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-600 rounded-full">
                      <div className="w-10 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t('Revenue')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">CHF 6,137.50</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">CHF 5,337.50</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">+15%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-600 rounded-full">
                      <div className="w-14 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t('Customer Satisfaction')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">4.8/5.0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">4.7/5.0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">+2%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-600 rounded-full">
                      <div className="w-8 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
