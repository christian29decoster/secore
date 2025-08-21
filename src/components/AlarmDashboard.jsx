import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AlarmDashboard = () => {
  const { t, i18n } = useTranslation();
  const [alarms, setAlarms] = useState([]);
  const [responseTimes, setResponseTimes] = useState([]);

  // Mock data for processing time chart
  const processingTimeData = {
    labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
    datasets: [
      {
        label: t('Average Processing Time (Min)'),
        data: [12.5, 8, 15, 9, 11],
        borderColor: 'rgb(0, 255, 255)',
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Mock data for alarms by type
  const alarmsByTypeData = {
    labels: ['Intrusion', 'Fire', 'Medical', 'Tech'],
    datasets: [
      {
        label: t('Number of Alarms'),
        data: [5, 2, 1, 3],
        backgroundColor: [
          'rgb(0, 255, 255)',
          'rgb(255, 0, 255)',
          'rgb(255, 255, 0)',
          'rgb(0, 255, 0)',
        ],
      },
    ],
  };

  // Mock data for alarms by status
  const alarmsByStatusData = {
    labels: ['Dispatched', 'New', 'On Hold', 'In Progress', 'Other'],
    datasets: [
      {
        label: t('Alarms by Status'),
        data: [28, 15, 12, 10, 5],
        backgroundColor: 'rgb(0, 255, 255)',
      },
    ],
  };

  // Mock data for alarms by priority
  const alarmsByPriorityData = {
    labels: ['Low', 'Medium', 'High', 'Critical'],
    datasets: [
      {
        data: [15, 60, 20, 5],
        backgroundColor: [
          'rgb(0, 255, 0)',
          'rgb(0, 255, 255)',
          'rgb(255, 255, 0)',
          'rgb(255, 0, 0)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        color: 'white',
      },
    },
  };

  const triggerDemoAlarm = () => {
    const newAlarm = {
      id: `ALM-${Date.now()}`,
      type: 'Demo',
      receivedAt: new Date().toLocaleTimeString(),
      status: 'New',
    };
    setAlarms([...alarms, newAlarm]);
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
          Secore LLC - Alarm Dashboard
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
        <button 
          onClick={triggerDemoAlarm}
          style={{
            backgroundColor: '#00ffff',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {t('Trigger Demo Alarm')}
        </button>
      </div>

      {/* Charts Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Processing Time Chart */}
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          padding: '20px', 
          borderRadius: '10px',
          height: '300px'
        }}>
          <h3 style={{ color: '#00ffff', marginTop: 0 }}>{t('Average Processing Time')}</h3>
          <Line data={processingTimeData} options={chartOptions} />
        </div>

        {/* Alarms by Type */}
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          padding: '20px', 
          borderRadius: '10px',
          height: '300px'
        }}>
          <h3 style={{ color: '#00ffff', marginTop: 0 }}>{t('Alarms by Type')}</h3>
          <Bar data={alarmsByTypeData} options={chartOptions} />
        </div>

        {/* Alarms by Status */}
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          padding: '20px', 
          borderRadius: '10px',
          height: '300px'
        }}>
          <h3 style={{ color: '#00ffff', marginTop: 0 }}>{t('Alarms by Status')}</h3>
          <Bar 
            data={alarmsByStatusData} 
            options={{
              ...chartOptions,
              indexAxis: 'y',
            }} 
          />
        </div>

        {/* Alarms by Priority */}
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          padding: '20px', 
          borderRadius: '10px',
          height: '300px'
        }}>
          <h3 style={{ color: '#00ffff', marginTop: 0 }}>{t('Alarms by Priority')}</h3>
          <Doughnut data={alarmsByPriorityData} options={doughnutOptions} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        padding: '20px',
        borderTop: '2px solid #00ffff'
      }}>
        <p style={{ color: '#888', margin: 0 }}>
          Secore LLC - Modern SaaS Dashboard
        </p>
      </div>
    </div>
  );
};

export default AlarmDashboard;
