# Secore LLC - Alarm Broker SaaS System

Ein modernes Multi-Tenant Alarm-Broker System für Secore LLC mit Evalink Integration, Drohnenüberwachung und autonomer Security Robotics.

## 🚀 Features

- **Multi-Tenant Dashboard** - Übersicht aller Mandanten & Datenstreams
- **Alarm Management** - Echtzeit-Alarmverfolgung und -bearbeitung
- **Evalink Integration** - Status-Monitoring für alle Clients
- **Drohnen & Roboter** - Überwachung autonomer Security-Systeme
- **API Monitoring** - Tracking der API-Calls pro Client
- **Mehrsprachig** - Deutsch, Englisch, Spanisch
- **Dark Theme** - Moderne Benutzeroberfläche
- **Interaktive Charts** - Live-Datenvisualisierung

## 📊 Dashboard-Komponenten

### 1. Alarm Dashboard
- Ø Bearbeitungszeit (Linien-Chart)
- Alarme nach Typ (Balken-Chart)
- Alarme nach Status (Horizontal-Balken)
- Alarme nach Priorität (Donut-Chart)
- Demo-Alarm auslösen Button

### 2. Client Overview
- Multi-Tenant Übersicht
- Aktive Alarme pro Client
- Drohnen & Roboter Status
- Evalink Status (OK/Watch/Problem)
- API-Calls Tracking

### 3. SBB Alarm Overview
- Spezifische SBB Alarmübersicht
- Aktuelle Alarme & Bearbeitungszeiten
- Alarm-ID, Typ, Empfangszeit
- Abschlusszeit & Dauer
- Status-Tracking

### 4. Landing Page
- Secore LLC Branding
- Digitale Leitstelle & SaaS Security
- Drohnenüberwachung Features
- Technologie & Partner (EvaLink, Twilio, Cloud AI)

## 🛠️ Technologie-Stack

- **React 18** - Frontend Framework
- **Chart.js** - Datenvisualisierung
- **i18next** - Internationalisierung
- **CSS3** - Styling & Dark Theme
- **EvaLink** - Alarm-Broker Integration
- **Twilio** - Kommunikation
- **Cloud AI** - Künstliche Intelligenz

## 🚀 Quick Start

### Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm start

# Build für Production
npm run build
```

### Navigation

Die Webseite verfügt über eine Navigation in der oberen linken Ecke:
- **🏠 Landing Page** - Hauptseite mit Secore LLC Branding
- **📊 Alarm Dashboard** - Charts und Statistiken
- **👥 Client Overview** - Multi-Tenant Übersicht
- **🚂 SBB Alarms** - SBB-spezifische Alarmübersicht

## 🌐 Sprachen

- **Deutsch** - Standardsprache
- **English** - Englische Übersetzung
- **Español** - Spanische Übersetzung (Landing Page)

## 📱 Responsive Design

Die Webseite ist vollständig responsive und funktioniert auf:
- Desktop (1920x1080+)
- Tablet (768px+)
- Mobile (320px+)

## 🔧 Konfiguration

### Environment Variables

```bash
REACT_APP_EVALINK_API_KEY=your_evalink_key
REACT_APP_TWILIO_ACCOUNT_SID=your_twilio_sid
REACT_APP_TWILIO_AUTH_TOKEN=your_twilio_token
```

### API Integration

Das System ist vorbereitet für:
- EvaLink API Integration
- Twilio SMS/WhatsApp
- Cloud AI Services
- Multi-Tenant Datenbank

## 📊 Mock-Daten

Die Webseite verwendet realistische Mock-Daten für:
- **SBB**: 4 aktive Alarme, 2 Drohnen, 1 Roboter
- **FacilityGuard**: 1 aktiver Alarm, 0 Drohnen/Roboter
- **Müller Security**: 0 aktive Alarme, 1 Drohne, 1 Roboter
- **GlobalProtect**: 3 aktive Alarme, 1 Drohne, 0 Roboter

## 🚀 Deployment

### Vercel (Empfohlen)

1. **Repository verbinden**
   ```bash
   git remote add origin https://github.com/christian29decoster/secore.git
   git push -u origin main
   ```

2. **Vercel Import**
   - Gehen Sie zu vercel.com
   - Importieren Sie das Repository
   - Framework: React
   - Build Command: `npm run build`
   - Output Directory: `build`

### GitHub Pages

```bash
npm run build
npm run deploy
```

## 📞 Support

Für Fragen oder Support kontaktieren Sie das Secore LLC Development Team.

---

**Secore LLC** - Cybersecurity in your pocket 🛡️
