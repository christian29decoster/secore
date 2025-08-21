import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AlarmMonitor from './components/AlarmMonitor';
import VideoStreams from './components/VideoStreams';
import Clients from './components/Clients';
import Analytics from './components/Analytics';
import Billing from './components/Billing';
import LiveMap from './components/LiveMap';
import './i18n';
import './App.css';

function App() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'alarms':
        return <AlarmMonitor />;
      case 'video':
        return <VideoStreams />;
      case 'clients':
        return <Clients />;
      case 'analytics':
        return <Analytics />;
      case 'billing':
        return <Billing />;
      case 'map':
        return <LiveMap />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activePage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
