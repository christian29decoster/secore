import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
  ArrowDownIcon,
  MapPinIcon,
  UsersIcon
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
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-500'
    },
    {
      name: t('Avg Response Time'),
      value: '2.4m',
      change: '-8%',
      changeType: 'decrease',
      icon: ClockIcon,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-500'
    },
    {
      name: t('Completed Today'),
      value: '156',
      change: '+5%',
      changeType: 'increase',
      icon: CheckCircleIcon,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-500'
    },
    {
      name: t('Critical Alarms'),
      value: '3',
      change: '-2',
      changeType: 'decrease',
      icon: ExclamationTriangleIcon,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-500'
    }
  ];

  const StatCard = ({ metric }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${metric.bgColor}`}>
          <metric.icon className={`h-6 w-6 ${metric.textColor}`} />
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          metric.changeType === 'increase' 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {metric.change}
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-400">{metric.name}</p>
        <p className="text-3xl font-bold text-white">{metric.value}</p>
        <div className="flex items-center text-xs text-gray-500">
          {metric.changeType === 'increase' ? (
            <ArrowUpIcon className="h-3 w-3 text-green-400 mr-1" />
          ) : (
            <ArrowDownIcon className="h-3 w-3 text-red-400 mr-1" />
          )}
          vs last period
        </div>
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center p-3 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 rounded-lg transition-colors group">
          <BellIcon className="h-5 w-5 text-cyan-400 mr-2 group-hover:text-cyan-300" />
          <span className="text-sm text-cyan-400 group-hover:text-cyan-300">New Alarm</span>
        </button>
        <button className="flex items-center justify-center p-3 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg transition-colors group">
          <UsersIcon className="h-5 w-5 text-green-400 mr-2 group-hover:text-green-300" />
          <span className="text-sm text-green-400 group-hover:text-green-300">Add Client</span>
        </button>
        <button className="flex items-center justify-center p-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg transition-colors group">
          <MapPinIcon className="h-5 w-5 text-purple-400 mr-2 group-hover:text-purple-300" />
          <span className="text-sm text-purple-400 group-hover:text-purple-300">View Map</span>
        </button>
        <button className="flex items-center justify-center p-3 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 rounded-lg transition-colors group">
          <ClockIcon className="h-5 w-5 text-orange-400 mr-2 group-hover:text-orange-300" />
          <span className="text-sm text-orange-400 group-hover:text-orange-300">Schedule</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{t('Dashboard')}</h1>
          <p className="text-gray-400 mt-2 text-lg">{t('Real-time security monitoring overview')}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white text-sm rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 block p-3 transition-all"
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

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Response Time Chart */}
        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Response Time Trend')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={responseTimeData}>
              <defs>
                <linearGradient id="responseTimeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#F9FAFB',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                strokeWidth={3}
                fill="url(#responseTimeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alarm Types Pie Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
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
                  borderRadius: '12px',
                  color: '#F9FAFB',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
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

        {/* Weekly Alarms Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">{t('Weekly Alarm Overview')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyAlarms}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#F9FAFB',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
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
    </div>
  );
};

export default Dashboard;
