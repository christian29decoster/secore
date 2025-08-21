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
  LanguageIcon
} from '@heroicons/react/24/outline';

const Layout = ({ children, activePage }) => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  const navigation = [
    { name: t('Dashboard'), href: '/', icon: HomeIcon, current: activePage === 'dashboard' },
    { name: t('Alarm Monitor'), href: '/alarms', icon: BellIcon, current: activePage === 'alarms' },
    { name: t('Video Streams'), href: '/video', icon: VideoCameraIcon, current: activePage === 'video' },
    { name: t('Clients'), href: '/clients', icon: UsersIcon, current: activePage === 'clients' },
    { name: t('Analytics'), href: '/analytics', icon: ChartBarIcon, current: activePage === 'analytics' },
    { name: t('Billing'), href: '/billing', icon: CreditCardIcon, current: activePage === 'billing' },
  ];

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'de' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800 border-r border-gray-700">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-white text-lg font-semibold">Secore LLC</h1>
                <p className="text-gray-400 text-xs">Security Control Center</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    item.current
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      item.current ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}
                  />
                  {item.name}
                </a>
              ))}
            </nav>
            
            {/* Language Toggle */}
            <div className="flex-shrink-0 p-4 border-t border-gray-700">
              <button
                onClick={toggleLanguage}
                className="group flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200"
              >
                <LanguageIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
                {language === 'en' ? 'Deutsch' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="fixed inset-0 flex z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="h-8 w-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-white text-lg font-semibold">Secore LLC</h1>
                </div>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      item.current
                        ? 'bg-cyan-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-4 flex-shrink-0 h-6 w-6 ${
                        item.current ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      }`}
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-900">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Page content */}
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
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
