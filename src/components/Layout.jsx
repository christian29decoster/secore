import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HomeIcon,
  BellIcon,
  VideoCameraIcon,
  UsersIcon,
  ChartBarIcon,
  CreditCardIcon,
  Bars3Icon,
  XMarkIcon,
  LanguageIcon,
  Cog6ToothIcon,
  MapIcon
} from '@heroicons/react/24/outline';

const Layout = ({ children, activePage, onPageChange }) => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  const navigation = [
    { name: t('Dashboard'), id: 'dashboard', icon: HomeIcon, current: activePage === 'dashboard' },
    { name: t('Alarm Monitor'), id: 'alarms', icon: BellIcon, current: activePage === 'alarms' },
    { name: t('Live Map'), id: 'map', icon: MapIcon, current: activePage === 'map' },
    { name: t('Video Streams'), id: 'video', icon: VideoCameraIcon, current: activePage === 'video' },
    { name: t('Clients'), id: 'clients', icon: UsersIcon, current: activePage === 'clients' },
    { name: t('Analytics'), id: 'analytics', icon: ChartBarIcon, current: activePage === 'analytics' },
    { name: t('Billing'), id: 'billing', icon: CreditCardIcon, current: activePage === 'billing' },
  ];

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'de' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleNavigation = (pageId) => {
    onPageChange(pageId);
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800/80 backdrop-blur-xl border-r border-gray-700/50">
          {/* Logo Section */}
          <div className="flex items-center h-20 flex-shrink-0 px-6 bg-gray-800/90 border-b border-gray-700/50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-white text-xl font-bold tracking-tight">Secore LLC</h1>
                <p className="text-gray-400 text-sm font-medium">Security Control Center</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`group flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    item.current
                      ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white border border-transparent hover:border-gray-600/30'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200 ${
                      item.current ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'
                    }`}
                  />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
            
            {/* Footer Actions */}
            <div className="flex-shrink-0 p-4 border-t border-gray-700/50 space-y-2">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="group flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white rounded-xl transition-all duration-200 border border-transparent hover:border-gray-600/30"
              >
                <LanguageIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                <span className="font-medium">{language === 'en' ? 'Deutsch' : 'English'}</span>
              </button>
              
              {/* Settings */}
              <button className="group flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white rounded-xl transition-all duration-200 border border-transparent hover:border-gray-600/30">
                <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {sidebarOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 flex z-50">
            <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800/95 backdrop-blur-xl">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-gray-800/80 backdrop-blur-sm"
                  onClick={() => setSidebarOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-6">
                  <div className="h-10 w-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <div className="ml-4">
                    <h1 className="text-white text-xl font-bold tracking-tight">Secore LLC</h1>
                  </div>
                </div>
                <nav className="mt-8 px-4 space-y-2">
                  {navigation.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`group flex items-center w-full px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                        item.current
                          ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white border border-transparent hover:border-gray-600/30'
                      }`}
                    >
                      <item.icon
                        className={`mr-4 flex-shrink-0 h-6 w-6 transition-colors duration-200 ${
                          item.current ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'
                        }`}
                      />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:pl-72 flex flex-col flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-900/80 backdrop-blur-sm">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-xl text-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 bg-gray-800/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Page content */}
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
