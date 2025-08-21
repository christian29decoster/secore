import React from 'react';
import { useTranslation } from 'react-i18next';

const ClientOverview = () => {
  const { t, i18n } = useTranslation();

  const clients = [
    {
      name: 'SBB',
      activeAlarms: 4,
      drones: 2,
      robots: 1,
      apiCalls: 127,
      evalinkStatus: 'OK',
      lastTransmission: '12:45'
    },
    {
      name: 'FacilityGuard',
      activeAlarms: 1,
      drones: 0,
      robots: 0,
      apiCalls: 58,
      evalinkStatus: 'Watch',
      lastTransmission: '12:47'
    },
    {
      name: 'Müller Security',
      activeAlarms: 0,
      drones: 1,
      robots: 1,
      apiCalls: 22,
      evalinkStatus: 'OK',
      lastTransmission: '12:44'
    },
    {
      name: 'GlobalProtect',
      activeAlarms: 3,
      drones: 1,
      robots: 0,
      apiCalls: 98,
      evalinkStatus: 'Problem',
      lastTransmission: '12:30'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'OK':
        return '#00ff00';
      case 'Watch':
        return '#ffff00';
      case 'Problem':
        return '#ff0000';
      default:
        return '#888';
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        borderBottom: '2px solid #00ffff',
        paddingBottom: '20px'
      }}>
        <h1 style={{ color: '#00ffff', margin: '0 0 10px 0' }}>
          Secore LLC - {t('Client Overview')}
        </h1>
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => changeLanguage('de')}
            style={{ 
              margin: '0 10px', 
              padding: '5px 15px',
              backgroundColor: i18n.language === 'de' ? '#00ffff' : '#333',
              color: i18n.language === 'de' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Deutsch
          </button>
          <button 
            onClick={() => changeLanguage('en')}
            style={{ 
              margin: '0 10px', 
              padding: '5px 15px',
              backgroundColor: i18n.language === 'en' ? '#00ffff' : '#333',
              color: i18n.language === 'en' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            English
          </button>
        </div>
        <h3 style={{ color: '#00ffff', margin: '10px 0' }}>
          {t('Overview of all Clients & Data Streams')} 📊
        </h3>
      </div>

      {/* Clients Table */}
      <div style={{ 
        backgroundColor: '#2a2a2a', 
        padding: '20px', 
        borderRadius: '10px',
        overflowX: 'auto'
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          color: 'white'
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #00ffff' }}>
              <th style={{ padding: '15px', textAlign: 'left', color: '#00ffff' }}>{t('Client')}</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#00ffff' }}>{t('Active Alarms')}</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#00ffff' }}>{t('Drones')}</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#00ffff' }}>{t('Robots')}</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#00ffff' }}>{t('API Calls (today)')}</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#00ffff' }}>{t('Evalink Status')}</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#00ffff' }}>{t('Last Transmission')}</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index} style={{ 
                borderBottom: '1px solid #444',
                '&:hover': { backgroundColor: '#333' }
              }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{client.name}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <span style={{ 
                    backgroundColor: client.activeAlarms > 0 ? '#ff4444' : '#00ff00',
                    color: '#000',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {client.activeAlarms}
                  </span>
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{client.drones}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{client.robots}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{client.apiCalls}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <span style={{ 
                    color: getStatusColor(client.evalinkStatus),
                    fontWeight: 'bold'
                  }}>
                    {client.evalinkStatus}
                  </span>
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{client.lastTransmission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        padding: '20px',
        borderTop: '2px solid #00ffff'
      }}>
        <p style={{ color: '#888', margin: 0 }}>
          Secore LLC - {t('Multi-Tenant Overview & Data Broker')}
        </p>
      </div>
    </div>
  );
};

export default ClientOverview;
