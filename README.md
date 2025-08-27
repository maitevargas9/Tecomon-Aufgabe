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
