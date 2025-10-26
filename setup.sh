#!/bin/bash

echo "🚀 HR Dashboard - Setup Script"
echo "================================"
echo ""

# Farben für Output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funktion für Success Messages
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Funktion für Error Messages
error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Funktion für Info Messages
info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# 1. Check ob Docker installiert ist
info "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    error "Docker is not installed. Please install Docker first."
fi
if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose is not installed. Please install Docker Compose first."
fi
success "Docker and Docker Compose are installed"

# 2. Stop und remove alte Container
info "Stopping old containers..."
docker-compose down -v
success "Old containers stopped"

# 3. Build neue Images
info "Building Docker images (this may take a few minutes)..."
docker-compose build --no-cache
if [ $? -ne 0 ]; then
    error "Docker build failed"
fi
success "Docker images built successfully"

# 4. Start Container
info "Starting containers..."
docker-compose up -d
if [ $? -ne 0 ]; then
    error "Failed to start containers"
fi
success "Containers started"

# 5. Wait for DB to be ready
info "Waiting for database to be ready..."
sleep 10
success "Database is ready"

# 6. Run Migrations
info "Running database migrations..."
docker-compose exec -T backend python manage.py migrate
if [ $? -ne 0 ]; then
    error "Migrations failed"
fi
success "Migrations completed"

# 7. Create Admin User
info "Creating admin user..."
docker-compose exec -T backend python manage.py shell <<EOF
from users.models import User

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@example.com',
        password='admin123',
        role='admin'
    )
    print('Admin user created!')
else:
    admin = User.objects.get(username='admin')
    admin.set_password('admin123')
    admin.save()
    print('Admin password reset!')
EOF

if [ $? -eq 0 ]; then
    success "Admin user ready"
else
    error "Failed to create admin user"
fi

# 8. Status Check
echo ""
echo "================================"
info "Checking container status..."
docker-compose ps
echo ""

# 9. Final Message
echo "================================"
echo ""
success "🎉 Setup completed successfully!"
echo ""
echo "📋 Login Credentials:"
echo "   URL: http://localhost (or http://YOUR_SERVER_IP)"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "🔧 Useful commands:"
echo "   View logs:     docker-compose logs -f"
echo "   Stop:          docker-compose down"
echo "   Restart:       docker-compose restart"
echo ""