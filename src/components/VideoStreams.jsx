import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  VideoCameraIcon,
  SignalIcon,
  WifiIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  PauseIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const VideoStreams = () => {
  const { t } = useTranslation();
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [streamQuality, setStreamQuality] = useState('hd');

  // Mock camera data
  const cameras = [
    {
      id: 'CAM-001',
      name: 'Main Entrance',
      location: 'Zurich HB - Platform 1',
      customer: 'SBB AG',
      status: 'online',
      quality: 'hd',
      lastContact: '2024-01-15 16:45:23',
      streamUrl: 'https://example.com/stream1',
      coordinates: '47.3782° N, 8.5402° E',
      resolution: '1920x1080',
      fps: 30,
      bitrate: '2.5 Mbps'
    },
    {
      id: 'CAM-002',
      name: 'Security Gate',
      location: 'Basel Center - Level 2',
      customer: 'Migros',
      status: 'online',
      quality: 'sd',
      lastContact: '2024-01-15 16:44:15',
      streamUrl: 'https://example.com/stream2',
      coordinates: '47.5584° N, 7.5733° E',
      resolution: '1280x720',
      fps: 25,
      bitrate: '1.8 Mbps'
    },
    {
      id: 'CAM-003',
      name: 'Parking Lot A',
      location: 'Bern Station - Underground',
      customer: 'Coop',
      status: 'offline',
      quality: 'hd',
      lastContact: '2024-01-15 15:30:45',
      streamUrl: 'https://example.com/stream3',
      coordinates: '46.9481° N, 7.4474° E',
      resolution: '1920x1080',
      fps: 30,
      bitrate: '2.2 Mbps'
    },
    {
      id: 'CAM-004',
      name: 'Loading Dock',
      location: 'Geneva Airport - Terminal 1',
      customer: 'SBB AG',
      status: 'online',
      quality: '4k',
      lastContact: '2024-01-15 16:46:12',
      streamUrl: 'https://example.com/stream4',
      coordinates: '46.2381° N, 6.1089° E',
      resolution: '3840x2160',
      fps: 30,
      bitrate: '8.0 Mbps'
    },
    {
      id: 'CAM-005',
      name: 'Office Building',
      location: 'Lausanne Office - Floor 3',
      customer: 'PostFinance',
      status: 'maintenance',
      quality: 'hd',
      lastContact: '2024-01-15 14:20:33',
      streamUrl: 'https://example.com/stream5',
      coordinates: '46.5197° N, 6.6323° E',
      resolution: '1920x1080',
      fps: 30,
      bitrate: '2.1 Mbps'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-green-400 bg-green-900/20';
      case 'offline':
        return 'text-red-400 bg-red-900/20';
      case 'maintenance':
        return 'text-yellow-400 bg-yellow-900/20';
      default:
        return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getQualityBadge = (quality) => {
    const colors = {
      '4k': 'bg-purple-100 text-purple-800 border-purple-200',
      'hd': 'bg-blue-100 text-blue-800 border-blue-200',
      'sd': 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[quality]}`}>
        {quality.toUpperCase()}
      </span>
    );
  };

  const CameraCard = ({ camera }) => (
    <div 
      className={`bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer ${
        selectedCamera?.id === camera.id ? 'ring-2 ring-cyan-500' : ''
      }`}
      onClick={() => setSelectedCamera(camera)}
    >
      {/* Camera Thumbnail */}
      <div className="relative mb-4">
        <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <VideoCameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">{camera.name}</p>
            <p className="text-xs text-gray-500">{camera.location}</p>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(camera.status)}`}>
          {camera.status}
        </div>
        
        {/* Quality badge */}
        <div className="absolute top-2 left-2">
          {getQualityBadge(camera.quality)}
        </div>
      </div>

      {/* Camera Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">{camera.id}</span>
          <span className="text-sm text-gray-400">{camera.customer}</span>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <div className="flex items-center">
            <SignalIcon className="h-3 w-3 mr-1" />
            {camera.resolution}
          </div>
          <div className="flex items-center">
            <WifiIcon className="h-3 w-3 mr-1" />
            {camera.fps} FPS
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          {t('Last contact')}: {camera.lastContact}
        </div>
      </div>
    </div>
  );

  const CameraDetail = ({ camera }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{camera.name}</h3>
        <div className="flex items-center space-x-2">
          {getQualityBadge(camera.quality)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(camera.status)}`}>
            {camera.status}
          </span>
        </div>
      </div>

      {/* Video Player Placeholder */}
      <div className="aspect-video bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
        <div className="text-center">
          <VideoCameraIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">{t('Video Stream Placeholder')}</p>
          <p className="text-sm text-gray-500">{camera.streamUrl}</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <button className="flex items-center px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded transition-colors">
              <PlayIcon className="h-4 w-4 mr-1" />
              {t('Play')}
            </button>
            <button className="flex items-center px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors">
              <CogIcon className="h-4 w-4 mr-1" />
              {t('Settings')}
            </button>
          </div>
        </div>
      </div>

      {/* Camera Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">{t('Camera Information')}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Camera ID')}:</span>
              <span className="text-white">{camera.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Location')}:</span>
              <span className="text-white">{camera.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Customer')}:</span>
              <span className="text-white">{camera.customer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Coordinates')}:</span>
              <span className="text-white">{camera.coordinates}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">{t('Stream Information')}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Resolution')}:</span>
              <span className="text-white">{camera.resolution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Frame Rate')}:</span>
              <span className="text-white">{camera.fps} FPS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Bitrate')}:</span>
              <span className="text-white">{camera.bitrate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('Last Contact')}:</span>
              <span className="text-white">{camera.lastContact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stream Controls */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h4 className="text-sm font-medium text-gray-300 mb-3">{t('Stream Controls')}</h4>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded-lg transition-colors">
            <PlayIcon className="h-4 w-4 mr-2" />
            {t('Start Stream')}
          </button>
          <button className="flex items-center px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors">
            <PauseIcon className="h-4 w-4 mr-2" />
            {t('Pause Stream')}
          </button>
          <button className="flex items-center px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors">
            <CogIcon className="h-4 w-4 mr-2" />
            {t('Configure')}
          </button>
          <button className="flex items-center px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors">
            <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
            {t('Report Issue')}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('Video Streams')}</h1>
          <p className="text-gray-400 mt-1">{t('Live camera monitoring and management')}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={streamQuality}
            onChange={(e) => setStreamQuality(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
          >
            <option value="4k">4K Quality</option>
            <option value="hd">HD Quality</option>
            <option value="sd">SD Quality</option>
          </select>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cameras.map((camera) => (
          <CameraCard key={camera.id} camera={camera} />
        ))}
      </div>

      {/* Selected Camera Detail */}
      {selectedCamera && (
        <div className="mt-8">
          <CameraDetail camera={selectedCamera} />
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('Total Cameras')}</p>
              <p className="text-2xl font-bold text-white">{cameras.length}</p>
            </div>
            <VideoCameraIcon className="h-8 w-8 text-cyan-500" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('Online')}</p>
              <p className="text-2xl font-bold text-green-400">
                {cameras.filter(c => c.status === 'online').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('Offline')}</p>
              <p className="text-2xl font-bold text-red-400">
                {cameras.filter(c => c.status === 'offline').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('HD Streams')}</p>
              <p className="text-2xl font-bold text-blue-400">
                {cameras.filter(c => c.quality === 'hd').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">HD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoStreams;
