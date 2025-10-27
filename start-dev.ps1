# ===============================================
# Script: start-dev.ps1
# Zweck:  Startet Backend & Frontend im VS Code Terminal
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
