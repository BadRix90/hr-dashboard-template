# 🏢 HR Dashboard - Production-Ready Template

> **Modernes HR-Management-System** mit Django Backend, Angular Frontend und PostgreSQL Database

[![Django](https://img.shields.io/badge/Django-5.2.7-green.svg)](https://www.djangoproject.com/)
[![Angular](https://img.shields.io/badge/Angular-20-red.svg)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-22.18-brightgreen.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

---

## 📋 Inhaltsverzeichnis

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Schnellstart](#-schnellstart)
- [Entwicklungsumgebung](#-entwicklungsumgebung)
- [Projekt-Struktur](#-projekt-struktur)
- [Code-Standards](#-code-standards)
- [Deployment](#-deployment)
- [API-Dokumentation](#-api-dokumentation)
- [Roadmap](#-roadmap)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### ✅ Implementiert

**Zeiterfassung**
- Timer-basierte Zeitbuchung (Start/Stop)
- Manuelle Zeiteinträge
- Projekt-Zuordnung
- Pausen-Tracking
- Export (CSV/Excel)

**Urlaubsverwaltung**
- Urlaubsanträge stellen
- Genehmigung/Ablehnung (Manager)
- Resturlaub-Anzeige
- Kalender-Übersicht
- Historie

**User Management**
- Rollen: Admin, Manager, Mitarbeiter
- User CRUD (Create, Read, Update, Delete)
- Profil-Verwaltung
- Permission-System

**Dashboard**
- Übersicht Arbeitszeit heute/Woche
- Überstunden-Tracking
- Urlaubs-Statistiken
- Team-Übersicht (Manager)
- Charts & Widgets

### 🚧 In Entwicklung (siehe [Roadmap](#-roadmap))

- JWT Authentication & Role-based Guards
- PostgreSQL Migration
- Docker Deployment
- DSGVO-Compliance
- 2FA (Zwei-Faktor-Authentifizierung)
- Email-Benachrichtigungen
- Dokumenten-Upload

---

## 🛠️ Tech Stack

### Backend
```
Django 5.2.7        # Web Framework
Django REST         # API Framework
PostgreSQL 16       # Production Database
SQLite              # Development Database
Gunicorn            # WSGI Server
WhiteNoise 6.11     # Static Files
python-dotenv       # Environment Variables
bcrypt 5.0          # Password Hashing
```

### Frontend
```
Angular 20          # Framework
Angular CLI 20.1.6  # CLI Tool
Node.js 22.18       # Runtime
npm 10.9.3          # Package Manager
TypeScript 5.x      # Language
RxJS 7.8            # Reactive Programming
SCSS                # Styling mit Variablen & Mixins
Chart.js            # Visualisierungen
```

### DevOps
```
Docker              # Containerization
Docker Compose      # Multi-Container
Nginx               # Reverse Proxy
PostgreSQL          # Database Container
```

---

## 🚀 Schnellstart

### Voraussetzungen

```bash
# Installiert sein müssen:
Python 3.11+
Node.js 22.18+
npm 10.9+
Angular CLI 20.1.6
Git
PowerShell (Windows)
```

### 1. Repository klonen

```bash
git clone https://github.com/BadRix90/hr-dashboard-template.git
cd hr-dashboard-template
```

### 2. Erstmalige Einrichtung (nur einmal)

```powershell
# Virtual Environment erstellen
python -m venv venv

# Aktivieren
.\venv\Scripts\activate

# Backend Dependencies installieren
pip install -r requirements.txt

# Datenbank migrieren
python manage.py migrate

# Superuser erstellen
python manage.py createsuperuser
# Username: admin
# Email: admin@example.com
# Password: (dein Passwort)

# Frontend Dependencies installieren
cd frontend
npm install
cd ..
```

### 3. Development Server starten

#### 🎯 Empfohlen: Automatischer Start mit Script

```powershell
# Startet Backend + Frontend automatisch in 2 Terminals
.\start-dev.ps1
```

Das Script öffnet automatisch:
- **Terminal 1**: Django Backend auf `http://localhost:8000`
- **Terminal 2**: Angular Frontend auf `http://localhost:4200` (öffnet Browser)

#### 🔧 Alternativ: Manueller Start

**Backend Terminal:**
```powershell
.\venv\Scripts\activate
python manage.py runserver
```

**Frontend Terminal (neues Terminal):**
```powershell
cd frontend
ng serve --open
```

### 4. Login & Los geht's!

Öffne Browser: **http://localhost:4200**

```
Username: admin
Password: (dein erstelltes Passwort)
```

### 📝 start-dev.ps1 Script

```powershell
# ===============================================
# Script: start-dev.ps1
# Zweck:  Startet Backend & Frontend automatisch
# ===============================================

Write-Host "🚀 Starte Entwicklungsumgebung..." -ForegroundColor Cyan

# 1️⃣ Erstes Terminal: Backend (Django)
Start-Process powershell -ArgumentList "`
    -NoExit -Command `
    cd `"$PSScriptRoot`"; `
    Write-Host '🌍 Backend wird gestartet...' -ForegroundColor Green; `
    venv\Scripts\activate; `
    python manage.py runserver
"

Start-Sleep -Seconds 2

# 2️⃣ Zweites Terminal: Frontend (Angular)
Start-Process powershell -ArgumentList "`
    -NoExit -Command `
    cd `"$PSScriptRoot\frontend`"; `
    Write-Host '⚡ Frontend wird gestartet...' -ForegroundColor Green; `
    ng serve --open
"

Write-Host "✅ Beide Terminals wurden geöffnet." -ForegroundColor Yellow
```

**Vorteile:**
- ✅ Automatisches Aktivieren der Virtual Environment
- ✅ Beide Server starten parallel
- ✅ Frontend öffnet Browser automatisch
- ✅ Separate Terminals für bessere Übersicht
- ✅ Farbcodierte Ausgaben

---

## 💻 Entwicklungsumgebung

### VS Code Extensions (Empfohlen)

```json
{
  "recommendations": [
    "angular.ng-template",
    "ms-python.python",
    "ms-python.vscode-pylance",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-azuretools.vscode-docker"
  ]
}
```

### Environment Variables

Erstelle `.env` im Root:

```env
# Development
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3

# Production (später)
DEBUG=False
SECRET_KEY=generate-strong-key-in-production
DATABASE_URL=postgresql://user:pass@localhost:5432/hr_dashboard
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

---

## 📁 Projekt-Struktur

```
hr-dashboard-template/
│
├── backend/
│   ├── hr_backend/          # Django Projekt
│   │   ├── settings.py      # Konfiguration
│   │   ├── urls.py          # Root URLs
│   │   └── wsgi.py          # WSGI Entry
│   │
│   ├── users/               # User Management App
│   │   ├── models.py        # User Model (Custom)
│   │   ├── serializers.py   # User API Serializer
│   │   ├── views.py         # User ViewSet
│   │   └── permissions.py   # Custom Permissions
│   │
│   ├── timetracking/        # Zeiterfassung App
│   │   ├── models.py        # TimeEntry, Project
│   │   ├── serializers.py   # API Serializers
│   │   ├── views.py         # CRUD ViewSets
│   │   └── utils.py         # Export-Funktionen
│   │
│   ├── vacation/            # Urlaubsverwaltung App
│   │   ├── models.py        # VacationRequest
│   │   ├── serializers.py   # API Serializers
│   │   └── views.py         # CRUD + Approval
│   │
│   └── manage.py            # Django CLI
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Wiederverwendbare Components
│   │   │   │   ├── sidebar/
│   │   │   │   ├── timer/
│   │   │   │   ├── user-list/
│   │   │   │   ├── vacation-approval/
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── pages/       # Routable Pages
│   │   │   │   ├── dashboard/
│   │   │   │   ├── time-tracking/
│   │   │   │   ├── vacation/
│   │   │   │   └── user-management/
│   │   │   │
│   │   │   ├── services/    # API Services
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── time-tracking.service.ts
│   │   │   │   └── vacation.service.ts
│   │   │   │
│   │   │   ├── models/      # TypeScript Interfaces
│   │   │   │   ├── user.ts
│   │   │   │   ├── time-entry.ts
│   │   │   │   └── vacation.ts
│   │   │   │
│   │   │   ├── guards/      # Route Guards
│   │   │   │   └── auth.guard.ts
│   │   │   │
│   │   │   └── app.routes.ts
│   │   │
│   │   ├── styles/
│   │   │   ├── _variables.scss  # SCSS Variablen
│   │   │   ├── _mixins.scss     # SCSS Mixins
│   │   │   └── styles.scss      # Global Styles
│   │   │
│   │   └── assets/          # Statische Dateien
│   │
│   └── angular.json
│
├── docker/
│   ├── Dockerfile.backend   # Backend Container
│   ├── Dockerfile.frontend  # Frontend Container
│   └── nginx.conf           # Nginx Config
│
├── docker-compose.yml       # Multi-Container Setup
├── requirements.txt         # Python Dependencies
├── package.json             # Node Dependencies
├── start-dev.ps1            # Dev-Script
└── README.md                # Diese Datei
```

---

## 📐 Code-Standards

### Backend (Python/Django)

```python
# ✅ RICHTIG: Max 14 Zeilen pro Funktion
def approve_vacation_request(request_id, manager_id):
    """Genehmigt Urlaubsantrag"""
    vacation_request = VacationRequest.objects.get(id=request_id)
    manager = User.objects.get(id=manager_id)
    
    if manager.role not in ['admin', 'manager']:
        raise PermissionError("Keine Berechtigung")
    
    vacation_request.status = 'approved'
    vacation_request.approved_by = manager
    vacation_request.approved_at = timezone.now()
    vacation_request.save()
    return vacation_request
```

**Standards:**
- Max **14 Zeilen pro Funktion**
- Keine Inline-Comments (nur Docstrings)
- Sprechende Variablennamen
- Type Hints wo möglich
- Modular & testbar

### Frontend (TypeScript/Angular)

```typescript
// ✅ RICHTIG: Smart & Modular
export class TimeTrackingService {
  private apiUrl = `${environment.apiUrl}/timetracking`;

  constructor(private http: HttpClient) {}

  getTimeEntries(userId: number): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(`${this.apiUrl}/entries/`, {
      params: { user: userId.toString() }
    });
  }

  createTimeEntry(entry: TimeEntry): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(`${this.apiUrl}/entries/`, entry);
  }
}
```

**Standards:**
- Max **14 Zeilen pro Funktion**
- Keine Inline-Comments
- Services für API-Calls
- RxJS Observables
- Interfaces für Types (nie `any`)

### SCSS Standards

```scss
// _variables.scss (IMMER nutzen!)
$primary-color: #2563eb;
$secondary-color: #64748b;
$success-color: #10b981;
$danger-color: #ef4444;

$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 2rem;

$border-radius: 0.5rem;
$transition-speed: 0.3s;

// _mixins.scss (IMMER nutzen!)
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin card {
  background: white;
  border-radius: $border-radius;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: $spacing-lg;
}

// component.scss (Variablen & Mixins nutzen!)
.dashboard-card {
  @include card;
  margin-bottom: $spacing-md;
  
  .header {
    @include flex-center;
    color: $primary-color;
  }
}
```

**SCSS Regeln:**
- **IMMER** Variablen statt Hardcoded Values
- **IMMER** Mixins für wiederkehrende Patterns
- **IMMER** `_variables.scss` & `_mixins.scss` nutzen
- Globale Styles in `styles.scss`

### Dateinamen & Angular CLI

```bash
# ✅ IMMER mit ng generate
ng g c components/user-form
ng g s services/auth
ng g guard guards/auth
ng g interface models/user

# ❌ NIEMALS manuell erstellen
# Dateien immer mit Angular CLI generieren!
```

---

## 🔐 Sicherheit & Best Practices

### Django Settings (Production)

```python
# settings.py - Production Config
DEBUG = False
SECRET_KEY = os.getenv('SECRET_KEY')
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']

# Security
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# CORS
CORS_ALLOWED_ORIGINS = [
    'https://yourdomain.com',
]
```

### Environment Variables

```bash
# .env Datei (NIEMALS committen!)
SECRET_KEY=generate-with-django.core.management.utils.get_random_secret_key
DB_PASSWORD=strong-random-password-here
```

Generiere Secret Key:
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## 🐳 Deployment

### Docker Setup

```bash
# Build & Start
docker-compose up -d --build

# Logs anzeigen
docker-compose logs -f

# Stoppen
docker-compose down

# Mit Volume-Reset
docker-compose down -v
```

### Hetzner Cloud Deployment

**1. Server Setup**
```bash
# Server mieten (CX21 oder höher)
# SSH-Keys einrichten

# Auf Server einloggen
ssh root@your-server-ip

# Updates & Docker installieren
apt update && apt upgrade -y
apt install docker.io docker-compose git -y
```

**2. Repository deployen**
```bash
cd /opt
git clone https://github.com/BadRix90/hr-dashboard-template.git
cd hr-dashboard-template

# Environment anpassen
nano .env  # Secrets eintragen!

# Setup ausführen
chmod +x setup.sh
./setup.sh
```

**3. Firewall konfigurieren**
```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw enable
```

**4. SSL-Zertifikat (Let's Encrypt)**
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**5. Auto-Updates deployen**
```bash
cd /opt/hr-dashboard-template
git pull origin main
./setup.sh
```

---

## 📊 API-Dokumentation

### Base URL
```
Development:  http://localhost:8000/api/
Production:   https://yourdomain.com/api/
```

### Authentication
```http
POST /api/auth/login/
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}

Response:
{
  "token": "your-jwt-token",
  "user": { ... }
}
```

### Zeiterfassung
```http
# Alle Einträge abrufen
GET /api/timetracking/entries/

# Neuer Eintrag
POST /api/timetracking/entries/
{
  "project": 1,
  "start_time": "2025-01-27T09:00:00Z",
  "end_time": "2025-01-27T17:00:00Z",
  "break_duration": "00:30:00",
  "description": "Feature development"
}

# Timer starten
POST /api/timetracking/timer/start/
{
  "project": 1
}

# Timer stoppen
POST /api/timetracking/timer/stop/
{
  "entry_id": 123
}

# Export
GET /api/timetracking/export/?format=csv&start_date=2025-01-01&end_date=2025-01-31
```

### Urlaubsverwaltung
```http
# Urlaub beantragen
POST /api/vacation/requests/
{
  "start_date": "2025-06-01",
  "end_date": "2025-06-14",
  "reason": "Sommerurlaub"
}

# Urlaub genehmigen (Manager/Admin)
POST /api/vacation/requests/{id}/approve/

# Urlaub ablehnen
POST /api/vacation/requests/{id}/reject/
{
  "reason": "Personalmangel in dieser Zeit"
}

# Resturlaub abrufen
GET /api/vacation/balance/
```

### User Management
```http
# Alle User (Admin)
GET /api/users/

# User erstellen (Admin)
POST /api/users/
{
  "username": "john.doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "employee",
  "password": "SecurePass123"
}

# User bearbeiten
PATCH /api/users/{id}/
{
  "role": "manager"
}

# User löschen
DELETE /api/users/{id}/
```

---

## 🗺️ Roadmap

### ✅ Phase 0: Basis (Abgeschlossen)
- [x] Django Backend Setup
- [x] Angular Frontend Setup
- [x] Basis-Komponenten
- [x] API-Struktur
- [x] Development Workflow

### 🚧 Phase 1: Production-Ready (In Arbeit)
- [ ] JWT Authentication implementieren
- [ ] Login/Logout Components
- [ ] AuthGuard für Routing
- [ ] Role-based Permissions
- [ ] PostgreSQL Migration
- [ ] Environment Variables Setup
- [ ] Production Settings (DEBUG=False, SSL, etc.)

### 📅 Phase 2: Deployment (Geplant)
- [ ] Dockerfile Backend/Frontend
- [ ] docker-compose.yml
- [ ] Nginx Reverse Proxy
- [ ] Hetzner Cloud Setup
- [ ] Domain & SSL
- [ ] CI/CD Pipeline (GitHub Actions)

### 📅 Phase 3: Features (Geplant)
- [ ] Loading Spinner überall
- [ ] Toast Notifications
- [ ] Confirm Dialogs
- [ ] PDF Export
- [ ] Dokumenten-Upload
- [ ] Email-Benachrichtigungen
- [ ] Kalender-Integration

### 📅 Phase 4: DSGVO & Compliance (Geplant)
- [ ] Datenschutzerklärung
- [ ] Cookie-Banner
- [ ] Consent-Management
- [ ] Daten-Export für User
- [ ] GDPR-Löschfunktion
- [ ] Audit-Trail
- [ ] 2FA (Zwei-Faktor-Auth)

### 📅 Phase 5: Polish (Nice-to-Have)
- [ ] Dark Mode
- [ ] Multi-Language (DE/EN)
- [ ] PWA (Progressive Web App)
- [ ] Mobile App (Ionic)
- [ ] E2E Tests (Cypress)
- [ ] Performance Optimierung

---

## 🐛 Troubleshooting

### Backend startet nicht

```bash
# Virtual Environment aktiviert?
.\venv\Scripts\activate

# Dependencies installiert?
pip install -r requirements.txt

# Migrations ausgeführt?
python manage.py migrate

# Port 8000 belegt?
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Frontend startet nicht

```bash
# Node Modules installiert?
cd frontend
npm install

# Angular CLI installiert?
npm install -g @angular/cli

# Port 4200 belegt?
ng serve --port 4201
```

### CORS Errors

```python
# settings.py - CORS erlauben
CORS_ALLOWED_ORIGINS = [
    'http://localhost:4200',
    'http://127.0.0.1:4200',
]
```

### Database Errors

```bash
# SQLite DB löschen & neu erstellen
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

### Docker Issues

```bash
# Container neu bauen
docker-compose down -v
docker-compose up -d --build

# Logs checken
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# In Container einloggen
docker-compose exec backend bash
docker-compose exec frontend sh
```

---

## 📚 Weitere Dokumentation

- **DEPLOYMENT.md** - Detaillierte Deployment-Anleitung
- **API.md** - Vollständige API-Dokumentation
- **CONTRIBUTING.md** - Contribution Guidelines
- **CHANGELOG.md** - Version History

---

## 📄 Lizenz

MIT License - Siehe LICENSE Datei

---

## 👥 Team & Support

**Entwickelt von:** BadRix90  
**GitHub:** https://github.com/BadRix90/hr-dashboard-template

Bei Fragen oder Problemen:
1. GitHub Issues erstellen
2. Logs checken (`docker-compose logs -f`)
3. Troubleshooting-Sektion prüfen

---

## 🎯 Quick Commands

```bash
# Development
.\start-dev.ps1                    # Start Backend + Frontend

# Backend
python manage.py runserver         # Start Backend
python manage.py migrate           # Migrations ausführen
python manage.py createsuperuser   # Admin erstellen
python manage.py shell             # Django Shell

# Frontend
ng serve --open                    # Start Frontend
ng generate component xyz          # Component erstellen
ng build --configuration production # Production Build

# Docker
docker-compose up -d               # Start Container
docker-compose down                # Stop Container
docker-compose logs -f             # Logs anzeigen
docker-compose exec backend bash   # Backend Shell

# Git
git add .                          # Änderungen stagen
git commit -m "message"            # Committen
git push origin main               # Pushen
```

---

**Happy Coding! 🚀**