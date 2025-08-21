import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  Cell
} from 'recharts';
import {
  BellIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data for charts
  const responseTimeData = [
    { time: '00:00', value: 45 },
    { time: '04:00', value: 38 },
    { time: '08:00', value: 52 },
    { time: '12:00', value: 41 },
    { time: '16:00', value: 35 },
    { time: '20:00', value: 48 },
    { time: '24:00', value: 42 }
  ];

  const alarmTypeData = [
    { name: 'Burglar', value: 35, color: '#ef4444' },
    { name: 'Fire', value: 20, color: '#f97316' },
    { name: 'Medical', value: 15, color: '#eab308' },
    { name: 'Environmental', value: 30, color: '#10b981' }
  ];

  const weeklyAlarms = [
    { day: 'Mon', alarms: 12, resolved: 10 },
    { day: 'Tue', alarms: 18, resolved: 16 },
    { day: 'Wed', alarms: 15, resolved: 14 },
    { day: 'Thu', alarms: 22, resolved: 20 },
    { day: 'Fri', alarms: 19, resolved: 17 },
    { day: 'Sat', alarms: 8, resolved: 7 },
    { day: 'Sun', alarms: 6, resolved: 5 }
  ];

  const metrics = [
    {
      name: t('Active Alarms'),
      value: '23',
      change: '+12%',
      changeType: 'increase',
      icon: BellIcon,
      color: 'bg-red-500'
    },
    {
      name: t('Avg Response Time'),
      value: '2.4m',
      change: '-8%',
      changeType: 'decrease',
      icon: ClockIcon,
      color: 'bg-blue-500'
    },
    {
      name: t('Completed Today'),
      value: '156',
      change: '+5%',
      changeType: 'increase',
      icon: CheckCircleIcon,
      color: 'bg-green-500'
    },
    {
      name: t('Critical Alarms'),
      value: '3',
      change: '-2',
      changeType: 'decrease',
      icon: ExclamationTriangleIcon,
      color: 'bg-orange-500'
    }
  ];

  const StatCard = ({ metric }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{metric.name}</p>
          <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
        </div>
        <div className={`p-3 rounded-lg ${metric.color}`}>
          <metric.icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {metric.changeType === 'increase' ? (
          <ArrowUpIcon className="h-4 w-4 text-green-400" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 text-red-400" />
        )}
        <span className={`text-sm font-medium ml-1 ${
          metric.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
        }`}>
          {metric.change}
        </span>
        <span className="text-sm text-gray-400 ml-2">vs last period</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('Dashboard')}</h1>
          <p className="text-gray-400 mt-1">{t('Real-time security monitoring overview')}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <StatCard key={index} metric={metric} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Response Time Trend')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={responseTimeData}>
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
                dataKey="value"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Alarm Types Pie Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Alarms by Type')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={alarmTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {alarmTypeData.map((entry, index) => (
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
            {alarmTypeData.map((item, index) => (
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

      {/* Weekly Alarms Chart */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">{t('Weekly Alarm Overview')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyAlarms}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Bar dataKey="alarms" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2" />
            <span className="text-sm text-gray-300">{t('Total Alarms')}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2" />
            <span className="text-sm text-gray-300">{t('Resolved')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
