import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPinIcon,
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LiveMap = () => {
  const { t } = useTranslation();
  const [guards, setGuards] = useState([]);
  const [alarms, setAlarms] = useState([]);

  // Custom icons
  const guardIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
             <div class="w-2 h-2 bg-white rounded-full"></div>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const alarmIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
             <div class="w-2 h-2 bg-white rounded-full"></div>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const criticalIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
             <div class="w-3 h-3 bg-white rounded-full"></div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  // Mock data for guards and alarms
  useEffect(() => {
    const initialGuards = [
      {
        id: 1,
        name: 'Guard Alpha',
        position: [47.3769, 8.5417], // Zurich
        status: 'active',
        lastUpdate: '2 min ago',
        battery: 85
      },
      {
        id: 2,
        name: 'Guard Beta',
        position: [47.5584, 7.5733], // Basel
        status: 'active',
        lastUpdate: '1 min ago',
        battery: 92
      },
      {
        id: 3,
        name: 'Guard Gamma',
        position: [46.9481, 7.4474], // Bern
        status: 'break',
        lastUpdate: '5 min ago',
        battery: 67
      },
      {
        id: 4,
        name: 'Guard Delta',
        position: [46.2381, 6.1089], // Geneva
        status: 'active',
        lastUpdate: '30 sec ago',
        battery: 78
      }
    ];

    const initialAlarms = [
      {
        id: 1,
        type: 'Burglar',
        position: [47.3769, 8.5417],
        severity: 'high',
        status: 'active',
        time: '2 min ago',
        location: 'Zurich HB - Platform 1'
      },
      {
        id: 2,
        type: 'Fire',
        position: [47.5584, 7.5733],
        severity: 'critical',
        status: 'active',
        time: '1 min ago',
        location: 'Basel Center - Level 2'
      },
      {
        id: 3,
        type: 'Medical',
        position: [46.9481, 7.4474],
        severity: 'medium',
        status: 'resolved',
        time: '15 min ago',
        location: 'Bern Station - Underground'
      }
    ];

    setGuards(initialGuards);
    setAlarms(initialAlarms);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setGuards(prevGuards => 
        prevGuards.map(guard => ({
          ...guard,
          position: [
            guard.position[0] + (Math.random() - 0.5) * 0.001,
            guard.position[1] + (Math.random() - 0.5) * 0.001
          ],
          lastUpdate: 'Just now',
          battery: Math.max(0, guard.battery - Math.random() * 2)
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'break': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-orange-400';
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const MapStats = () => (
    <div className="absolute top-4 left-4 z-10 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
      <h3 className="text-white font-semibold mb-3">Live Status</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Active Guards:</span>
          <span className="text-green-400 font-semibold">
            {guards.filter(g => g.status === 'active').length}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Active Alarms:</span>
          <span className="text-red-400 font-semibold">
            {alarms.filter(a => a.status === 'active').length}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Critical:</span>
          <span className="text-orange-400 font-semibold">
            {alarms.filter(a => a.severity === 'critical').length}
          </span>
        </div>
      </div>
    </div>
  );

  const Legend = () => (
    <div className="absolute bottom-4 right-4 z-10 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
      <h3 className="text-white font-semibold mb-3">Legend</h3>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-gray-300 text-sm">Security Guards</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span className="text-gray-300 text-sm">Active Alarms</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-gray-300 text-sm">Critical Alarms</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Live Security Map</h1>
          <p className="text-gray-400 mt-2 text-lg">Real-time monitoring of security personnel and alarm locations</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Live Updates</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="h-[600px] relative">
          <MapContainer
            center={[47.3769, 8.5417]}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Guard Markers */}
            {guards.map(guard => (
              <Marker
                key={`guard-${guard.id}`}
                position={guard.position}
                icon={guardIcon}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900">{guard.name}</h3>
                    <p className={`text-sm ${getStatusColor(guard.status)}`}>
                      Status: {guard.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      Battery: {guard.battery.toFixed(0)}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Last Update: {guard.lastUpdate}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Alarm Markers */}
            {alarms.map(alarm => (
              <Marker
                key={`alarm-${alarm.id}`}
                position={alarm.position}
                icon={alarm.severity === 'critical' ? criticalIcon : alarmIcon}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900">{alarm.type} Alarm</h3>
                    <p className={`text-sm ${getSeverityColor(alarm.severity)}`}>
                      Severity: {alarm.severity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {alarm.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      Location: {alarm.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      Time: {alarm.time}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Coverage Areas */}
            {guards.map(guard => (
              <Circle
                key={`coverage-${guard.id}`}
                center={guard.position}
                radius={500}
                pathOptions={{
                  color: guard.status === 'active' ? '#3b82f6' : '#6b7280',
                  fillColor: guard.status === 'active' ? '#3b82f6' : '#6b7280',
                  fillOpacity: 0.1,
                  weight: 1
                }}
              />
            ))}
          </MapContainer>

          <MapStats />
          <Legend />
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Active Guards</p>
              <p className="text-2xl font-bold text-green-400">
                {guards.filter(g => g.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <CheckCircleIcon className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Active Alarms</p>
              <p className="text-2xl font-bold text-red-400">
                {alarms.filter(a => a.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-xl">
              <BellIcon className="h-6 w-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Critical Alarms</p>
              <p className="text-2xl font-bold text-orange-400">
                {alarms.filter(a => a.severity === 'critical').length}
              </p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
