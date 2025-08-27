## 📦 Projektstruktur

/weather-dashboard
├── backend/                  # Node.js + Express API
│   ├── app.js                # Express-Konfiguration
│   ├── server.js             # Startpunkt
│   ├── routes/
│   │   └── widgetRoutes.js   # API-Endpunkte (CRUD, Wetter)
│   ├── controllers/
│   │   └── widgetController.js # Widget-CRUD-Logik
│   │   └── weatherController.js # Wetter-Logik mit Caching
│   ├── models/
│   │   └── Widget.js         # MongoDB Widget Schema
│   ├── services/
│   │   └── weatherService.js # Aufruf der Open-Meteo API
│   ├── cache/
│   │   └── weatherCache.js   # Einfaches Cache-System
│   ├── .env                  # MongoDB URI, Port, evtl. API Keys
│   ├── package.json
│   └── node_modules/
│
├── frontend/                 # React (Vite) App
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx           # Hauptkomponente (Liste Widgets)
│   │   ├── main.jsx          # Einstieg React
│   │   ├── components/
│   │   │   ├── Widget.jsx    # Widget mit Wetteranzeige + 7 Tage
│   │   │   └── WidgetForm.jsx# Formular zum Hinzufügen
│   │   ├── utils/
│   │   │   ├── api.js        # Fetch-Funktionen (Widgets, Wetter)
│   │   │   └── weatherIcons.js # Wetter-Symbole
│   │   └── styles/           # (optional: Tailwind, CSS)
│   ├── package.json
│   └── node_modules/
│
├── README.md                 # Projektbeschreibung & Setup
└── .gitignore

---

# 🌦 Weather Dashboard

Ein Fullstack-Projekt mit **React (Vite)** im Frontend und **Express + MongoDB** im Backend.  
Das Dashboard erlaubt das Hinzufügen von Städten als Widgets. Jedes Widget zeigt das aktuelle Wetter und eine 7-Tage-Vorhersage an.

---

## 🚀 Setup

### Voraussetzungen
- [Node.js](https://nodejs.org/) (>= 18)
- [MongoDB](https://www.mongodb.com/try/download/community) lokal oder in der Cloud (z. B. MongoDB Atlas)

### Backend starten
```bash
cd backend
npm install
npm run dev
.env Datei im Ordner backend/ erstellen:
MONGODB_URI=mongodb://localhost:27017/widgets
PORT=5000
Das Backend läuft dann auf:
👉 http://localhost:5000
Frontend starten
cd frontend
npm install
npm run dev
Das Frontend läuft dann auf:
👉 http://localhost:5173
📡 API
Widget CRUD
GET /widgets → Liste aller Widgets
POST /widgets → Neues Widget erstellen
{ "location": "Berlin" }
DELETE /widgets/:id → Widget löschen
Wetter
GET /widgets/weather/:city
Liefert aktuelles Wetter + 7-Tage-Vorhersage:
{
  "city": "Berlin",
  "current": {
    "temperature": 12.3,
    "windspeed": 7.2,
    "weathercode": 3
  },
  "today": {
    "min": 9.5,
    "max": 15.2
  },
  "forecast": [
    {
      "date": "2025-08-28",
      "min": 10.1,
      "max": 17.8,
      "code": 2
    },
    ...
  ]
}
🏗 Architektur
               ┌─────────────────────┐
               │      Frontend       │
               │   React + Vite      │
               │ (Tailwind, Widgets) │
               └─────────┬───────────┘
                         │ HTTP (fetch)
                         ▼
               ┌─────────────────────┐
               │      Backend        │
               │ Express + Node.js   │
               │   ┌─────────────┐   │
               │   │  Routes     │   │
               │   │ Controllers │   │
               │   │ Services    │   │
               │   └─────────────┘   │
               └─────────┬───────────┘
                         │
                         ▼
               ┌─────────────────────┐
               │     MongoDB         │
               │  Widgets speichern  │
               └─────────────────────┘

   + Wetterdaten über Open-Meteo API
   + In-Memory Cache für Performance
✨ Features
Widgets für beliebige Städte hinzufügen
Aktuelles Wetter + Min/Max für heute
7-Tage-Vorhersage
Wetter-Icons nach Wettercode
Daten werden gecached, um API-Requests zu sparen
