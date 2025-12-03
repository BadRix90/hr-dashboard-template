import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TextService } from '../../services/text';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar: string;
  status: 'online' | 'offline';
  hoursThisWeek: number;
  vacationDays: number;
  email: string;
}

interface Department {
  name: string;
  count: number;
}

@Component({
  selector: 'app-team',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  text: TextService;
  searchTerm = '';
  totalMembers = 24;
  activeToday = 20;
  onVacation = 3;

  members: TeamMember[] = [
    {
      id: 1,
      name: 'Max Mustermann',
      role: 'Senior Developer',
      department: 'Engineering',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
      status: 'online',
      hoursThisWeek: 38.5,
      vacationDays: 12,
      email: 'max.mustermann@company.com'
    },
    {
      id: 2,
      name: 'Anna Schmidt',
      role: 'Product Manager',
      department: 'Product',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      status: 'online',
      hoursThisWeek: 40,
      vacationDays: 15,
      email: 'anna.schmidt@company.com'
    },
    {
      id: 3,
      name: 'Tom Weber',
      role: 'UX Designer',
      department: 'Design',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
      status: 'offline',
      hoursThisWeek: 35,
      vacationDays: 8,
      email: 'tom.weber@company.com'
    },
    {
      id: 4,
      name: 'Lisa Müller',
      role: 'HR Manager',
      department: 'HR',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      status: 'online',
      hoursThisWeek: 37,
      vacationDays: 10,
      email: 'lisa.mueller@company.com'
    },
    {
      id: 5,
      name: 'David Klein',
      role: 'Backend Developer',
      department: 'Engineering',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      status: 'online',
      hoursThisWeek: 42,
      vacationDays: 5,
      email: 'david.klein@company.com'
    },
    {
      id: 6,
      name: 'Sarah Wagner',
      role: 'Marketing Lead',
      department: 'Marketing',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      status: 'online',
      hoursThisWeek: 39,
      vacationDays: 18,
      email: 'sarah.wagner@company.com'
    }
  ];

  departments: Department[] = [
    { name: 'Engineering', count: 10 },
    { name: 'Product', count: 4 },
    { name: 'Design', count: 3 },
    { name: 'HR', count: 2 },
    { name: 'Marketing', count: 3 },
    { name: 'Sales', count: 2 }
  ];

  constructor(textService: TextService) {
    this.text = textService;
  }

  get filteredMembers(): TeamMember[] {
    if (!this.searchTerm) {
      return this.members;
    }

    const term = this.searchTerm.toLowerCase();
    return this.members.filter(member =>
      member.name.toLowerCase().includes(term) ||
      member.role.toLowerCase().includes(term) ||
      member.department.toLowerCase().includes(term)
    );
  }

  addMember() {
    console.log('Add member');
  }

  viewMember(id: number) {
    console.log('View member', id);
  }

  editMember(id: number) {
    console.log('Edit member', id);
  }

  deleteMember(id: number) {
    console.log('Delete member', id);
  }
}
