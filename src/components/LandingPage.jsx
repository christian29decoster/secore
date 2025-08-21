import React from 'react';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
  const { t, i18n } = useTranslation();

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
        marginBottom: '50px',
        borderBottom: '2px solid #00ffff',
        paddingBottom: '30px'
      }}>
        <h1 style={{ color: '#00ffff', margin: '0 0 20px 0', fontSize: '2.5em' }}>
          Secore LLC - {t('Digital Control Center & SaaS Security')}
        </h1>
        <div style={{ marginBottom: '30px' }}>
          <button 
            onClick={() => changeLanguage('de')}
            style={{ 
              margin: '0 10px', 
              padding: '8px 20px',
              backgroundColor: i18n.language === 'de' ? '#00ffff' : '#333',
              color: i18n.language === 'de' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Deutsch
          </button>
          <button 
            onClick={() => changeLanguage('en')}
            style={{ 
              margin: '0 10px', 
              padding: '8px 20px',
              backgroundColor: i18n.language === 'en' ? '#00ffff' : '#333',
              color: i18n.language === 'en' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            English
          </button>
          <button 
            onClick={() => changeLanguage('es')}
            style={{ 
              margin: '0 10px', 
              padding: '8px 20px',
              backgroundColor: i18n.language === 'es' ? '#00ffff' : '#333',
              color: i18n.language === 'es' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Español
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Security Section */}
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          padding: '30px', 
          borderRadius: '15px',
          marginBottom: '30px'
        }}>
          <h2 style={{ color: '#00ffff', marginTop: 0, fontSize: '2em' }}>
            {t('Security that thinks ahead')}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              backgroundColor: '#00ffff', 
              borderRadius: '50%',
              marginRight: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              🚁
            </div>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {t('Drone monitoring')}
            </span>
          </div>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
            {t('Your control center for alarm management, drone monitoring and autonomous security robotics – powered by EvaLink & international Dispatch-Teams.')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#00ff00', marginRight: '10px', fontSize: '20px' }}>✔</span>
              <span>{t('Alarm reception & disposition')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#00ff00', marginRight: '10px', fontSize: '20px' }}>✔</span>
              <span>{t('Drone live monitoring')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#00ff00', marginRight: '10px', fontSize: '20px' }}>✔</span>
              <span>{t('Control of autonomous robots')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#00ff00', marginRight: '10px', fontSize: '20px' }}>✔</span>
              <span>{t('Real-time reporting & compliance')}</span>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          padding: '30px', 
          borderRadius: '15px'
        }}>
          <h2 style={{ color: '#00ffff', marginTop: 0, fontSize: '2em' }}>
            {t('Technology & Partners')}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              backgroundColor: '#00ffff', 
              borderRadius: '50%',
              marginRight: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              🔌
            </div>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {t('API and Integration')}
            </span>
          </div>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            {t('We rely on modern platforms like EvaLink, Twilio & Cloud AI to map your security processes completely digitally, scalably and auditable.')}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        padding: '30px',
        borderTop: '2px solid #00ffff'
      }}>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Secore LLC - {t('Digital Control Center & SaaS Security')}
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
