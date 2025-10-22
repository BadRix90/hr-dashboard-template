import os
import django
from datetime import datetime, timedelta
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hr_backend.settings')
django.setup()

from django.contrib.auth.models import User
from timetracking.models import Project, TimeEntry
from vacation.models import VacationRequest
from users.models import UserProfile

def create_test_data():
    print("🚀 Erstelle Test-Daten...")
    
    # 1. Users erstellen
    print("\n👥 Erstelle Users...")
    users_data = [
        {'username': 'admin', 'email': 'admin@firma.de', 'first_name': 'Admin', 'last_name': 'User', 'role': 'Admin'},
        {'username': 'max.mustermann', 'email': 'max@firma.de', 'first_name': 'Max', 'last_name': 'Mustermann', 'role': 'Manager'},
        {'username': 'anna.schmidt', 'email': 'anna@firma.de', 'first_name': 'Anna', 'last_name': 'Schmidt', 'role': 'Manager'},
        {'username': 'tom.meyer', 'email': 'tom@firma.de', 'first_name': 'Tom', 'last_name': 'Meyer', 'role': 'Mitarbeiter'},
        {'username': 'lisa.mueller', 'email': 'lisa@firma.de', 'first_name': 'Lisa', 'last_name': 'Müller', 'role': 'Mitarbeiter'},
        {'username': 'jan.weber', 'email': 'jan@firma.de', 'first_name': 'Jan', 'last_name': 'Weber', 'role': 'Mitarbeiter'},
    ]
    
    created_users = []
    for user_data in users_data:
        role = user_data.pop('role')
        user, created = User.objects.get_or_create(
            username=user_data['username'],
            defaults={
                'email': user_data['email'],
                'first_name': user_data['first_name'],
                'last_name': user_data['last_name'],
            }
        )
        
        if created:
            user.set_password('password123')
            user.save()
            print(f"   ✅ User erstellt: {user.username}")
        
        profile, _ = UserProfile.objects.get_or_create(user=user)
        profile.role = role
        profile.department = random.choice(['IT', 'HR', 'Sales', 'Marketing'])
        profile.vacation_days = 30
        profile.save()
        
        created_users.append(user)
    
    # 2. Projects erstellen
    print("\n📁 Erstelle Projects...")
    projects_data = [
        {'name': 'Website Redesign', 'description': 'Neugestaltung der Firmenwebsite'},
        {'name': 'Mobile App', 'description': 'Entwicklung der iOS/Android App'},
        {'name': 'CRM Integration', 'description': 'Integration des neuen CRM Systems'},
        {'name': 'Marketing Kampagne', 'description': 'Q4 Marketing Kampagne'},
        {'name': 'Kundenservice', 'description': 'Support und Kundenbetreuung'},
    ]
    
    created_projects = []
    for project_data in projects_data:
        project, created = Project.objects.get_or_create(
            name=project_data['name'],
            defaults={'description': project_data['description']}
        )
        if created:
            print(f"   ✅ Project erstellt: {project.name}")
        created_projects.append(project)
    
    # 3. Time Entries erstellen (letzte 30 Tage)
    print("\n⏱️  Erstelle Time Entries...")
    time_entries_count = 0
    
    for user in created_users:
        for day_offset in range(30):
            date = datetime.now() - timedelta(days=day_offset)
            
            if date.weekday() >= 5:
                continue
            
            num_entries = random.randint(1, 3)
            
            for _ in range(num_entries):
                project = random.choice(created_projects)
                start_hour = random.randint(8, 16)
                duration = random.randint(60, 300)
                
                start_time = date.replace(hour=start_hour, minute=0, second=0)
                end_time = start_time + timedelta(minutes=duration)
                
                TimeEntry.objects.create(
                    user=user,
                    project=project,
                    start_time=start_time,
                    end_time=end_time,
                    duration_minutes=duration,
                    description=f"Arbeit an {project.name}"
                )
                time_entries_count += 1
    
    print(f"   ✅ {time_entries_count} Time Entries erstellt")
    
    # 4. Vacation Requests erstellen
    print("\n🏖️  Erstelle Vacation Requests...")
    vacation_count = 0
    
    for user in created_users[2:]:
        num_requests = random.randint(1, 3)
        
        for i in range(num_requests):
            start_date = datetime.now().date() + timedelta(days=random.randint(10, 90))
            days = random.randint(3, 14)
            end_date = start_date + timedelta(days=days)
            
            status = random.choice(['pending', 'approved', 'approved', 'rejected'])
            vacation_type = random.choice(['urlaub', 'urlaub', 'urlaub', 'krank', 'sonderurlaub'])
            
            VacationRequest.objects.create(
                employee=user,
                start_date=start_date,
                end_date=end_date,
                days=days,
                type=vacation_type,
                status=status,
                reason='Urlaub' if vacation_type == 'urlaub' else 'Krankheit' if vacation_type == 'krank' else 'Sonderurlaub'
            )
            vacation_count += 1
    
    print(f"   ✅ {vacation_count} Vacation Requests erstellt")
    
    print("\n✅ Test-Daten erfolgreich erstellt!")
    print("\n📊 Zusammenfassung:")
    print(f"   👥 Users: {len(created_users)}")
    print(f"   📁 Projects: {len(created_projects)}")
    print(f"   ⏱️  Time Entries: {time_entries_count}")
    print(f"   🏖️  Vacation Requests: {vacation_count}")
    print("\n🔐 Login Credentials:")
    print("   Username: admin (oder jeder andere User)")
    print("   Password: password123")

if __name__ == '__main__':
    create_test_data()