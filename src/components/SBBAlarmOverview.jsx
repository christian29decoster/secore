import React from 'react';
import { useTranslation } from 'react-i18next';

const SBBAlarmOverview = () => {
  const { t, i18n } = useTranslation();

  const alarms = [
    {
      id: 'ALM-1001',
      type: 'Intrusion',
      receivedAt: '12:03',
      completedAt: '12:15',
      duration: '12 min',
      status: 'Closed'
    },
    {
      id: 'ALM-1002',
      type: 'Fire',
      receivedAt: '12:20',
      completedAt: '12:28',
      duration: '8 min',
      status: 'Closed'
    },
    {
      id: 'ALM-1003',
      type: 'Intrusion',
      receivedAt: '12:45',
      completedAt: '-',
      duration: '-',
      status: 'Open'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Closed':
        return '#00ff00';
      case 'Open':
        return '#ffff00';
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
          {t('SBB Alarm Overview')}
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
        <h3 style={{ color: '#00ffff', margin: '10px 0', textAlign: 'left' }}>
          {t('Current Alarms & Processing Times')} 📊
        </h3>
      </div>

      {/* Alarms Table */}
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
              <th style={{ padding: '15px', textAlign: 'left', color: '#00ffff' }}>{t('Alarm ID')}</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#00ffff' }}>{t('Alarm Type')}</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#00ffff' }}>{t('Received at')}</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#00ffff' }}>{t('Completed at')}</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#00ffff' }}>{t('Duration')}</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#00ffff' }}>{t('Status')}</th>
            </tr>
          </thead>
          <tbody>
            {alarms.map((alarm, index) => (
              <tr key={index} style={{ 
                borderBottom: '1px solid #444',
                '&:hover': { backgroundColor: '#333' }
              }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{alarm.id}</td>
                <td style={{ padding: '15px' }}>{alarm.type}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{alarm.receivedAt}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{alarm.completedAt}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{alarm.duration}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <span style={{ 
                    color: getStatusColor(alarm.status),
                    fontWeight: 'bold'
                  }}>
                    {t(alarm.status)}
                  </span>
                </td>
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
          Secore LLC - {t('SBB Client Overview')}
        </p>
      </div>
    </div>
  );
};

export default SBBAlarmOverview;
