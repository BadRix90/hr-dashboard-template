# 🚀 HR Dashboard - Deployment Guide

## 📋 Voraussetzungen

- Docker & Docker Compose installiert
- Git installiert
- Server mit mindestens 2GB RAM

## 🏗️ Lokales Setup

### 1. Repository clonen
```bash
git clone https://github.com/BadRix90/hr-dashboard-template.git
cd hr-dashboard-template
```

### 2. Setup Script ausführbar machen
```bash
chmod +x setup.sh
```

### 3. Setup starten
```bash
./setup.sh
```

Das Script macht automatisch:
- ✅ Docker Images bauen
- ✅ Container starten
- ✅ Datenbank initialisieren
- ✅ Migrations ausführen
- ✅ Admin User erstellen

### 4. Login testen
- URL: `http://localhost`
- Username: `admin`
- Password: `admin123`

---

## 🌐 Server Deployment (Hetzner)

### 1. SSH zum Server
```bash
ssh root@YOUR_SERVER_IP
```

### 2. Docker installieren (falls nicht vorhanden)
```bash
# Docker installieren
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Docker Compose installieren
apt-get update
apt-get install docker-compose -y
```

### 3. Repository clonen
```bash
cd /opt
git clone https://github.com/BadRix90/hr-dashboard-template.git
cd hr-dashboard-template
```

### 4. Setup ausführen
```bash
chmod +x setup.sh
./setup.sh
```

### 5. Firewall konfigurieren
```bash
# Port 80 (HTTP) öffnen
ufw allow 80/tcp

# Port 443 (HTTPS) öffnen für später
ufw allow 443/tcp
```

### 6. Login testen
```
http://YOUR_SERVER_IP
Username: admin
Password: admin123
```

---

## 🔄 Updates deployen

### Lokal
```bash
# Code ändern, committen, pushen
git add .
git commit -m "your changes"
git push origin main
```

### Auf dem Server
```bash
cd /opt/hr-dashboard-template
git pull origin main
./setup.sh
```

---

## 🛠️ Nützliche Commands

### Container Status
```bash
docker-compose ps
```

### Logs anzeigen
```bash
# Alle Logs
docker-compose logs -f

# Nur Backend
docker-compose logs -f backend

# Nur Database
docker-compose logs -f db
```

### Container neu starten
```bash
# Alles neu starten
docker-compose restart

# Nur Backend
docker-compose restart backend
```

### In Container Shell gehen
```bash
# Backend Shell
docker-compose exec backend python manage.py shell

# Bash im Backend Container
docker-compose exec backend bash
```

### Alles stoppen & löschen
```bash
docker-compose down -v
```

---

## 🔐 Admin User Management

### Passwort zurücksetzen
```bash
docker-compose exec backend python manage.py shell
```

Im Python Shell:
```python
from users.models import User
admin = User.objects.get(username='admin')
admin.set_password('new_password')
admin.save()
exit()
```

### Neuen User erstellen
```bash
docker-compose exec backend python manage.py shell
```

Im Python Shell:
```python
from users.models import User
User.objects.create_superuser(
    username='newadmin',
    email='newadmin@example.com',
    password='password123',
    role='admin'
)
exit()
```

---

## 🐛 Troubleshooting

### Container laufen nicht
```bash
# Status checken
docker-compose ps

# Logs checken
docker-compose logs db
docker-compose logs backend

# Neu starten
docker-compose down -v
./setup.sh
```

### Database Connection Fehler
```bash
# DB Container Status
docker-compose logs db

# Backend neu starten
docker-compose restart backend
```

### Frontend zeigt 502 Error
```bash
# Backend Status checken
docker-compose logs backend

# Neu starten
docker-compose restart backend frontend
```

---

## 📊 Production Checklist

Vor dem Go-Live:

- [ ] SECRET_KEY in docker-compose.yml ändern
- [ ] POSTGRES_PASSWORD ändern
- [ ] Admin Passwort ändern
- [ ] HTTPS/SSL einrichten (Certbot)
- [ ] Backups einrichten
- [ ] Monitoring einrichten
- [ ] Domain konfigurieren

---

## 🔒 Sicherheit

### SECRET_KEY ändern
In `docker-compose.yml`:
```yaml
environment:
  - SECRET_KEY=CHANGE_THIS_TO_RANDOM_STRING
```

Generiere einen sicheren Key mit:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Database Passwort ändern
In `docker-compose.yml`:
```yaml
POSTGRES_PASSWORD: YOUR_SECURE_PASSWORD
```

Und auch im Backend:
```yaml
environment:
  - DB_PASSWORD=YOUR_SECURE_PASSWORD
```

---

## 📧 Support

Bei Problemen:
1. Logs checken: `docker-compose logs -f`
2. Container Status: `docker-compose ps`
3. GitHub Issues öffnen