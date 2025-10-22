import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Clock, Palmtree, TrendingUp, Download } from 'lucide-angular';

interface ExportOption {
  id: string;
  label: string;
  icon: any;
}

@Component({
  selector: 'app-export-csv',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './export-csv.html',
  styleUrl: './export-csv.scss'
})
export class ExportCsvComponent {
  readonly Clock = Clock;
  readonly Palmtree = Palmtree;
  readonly TrendingUp = TrendingUp;
  readonly Download = Download;

  exportOptions: ExportOption[] = [
    { id: 'time-entries', label: 'Zeiterfassung', icon: Clock },
    { id: 'vacation', label: 'Urlaubsanträge', icon: Palmtree },
    { id: 'overtime', label: 'Überstunden', icon: TrendingUp }
  ];

  selectedType = 'time-entries';
  startDate = '';
  endDate = '';
  useDatevFormat = false;

  exportCSV(): void {
    const data = this.generateMockData();
    const csv = this.useDatevFormat ? this.convertToDatev(data) : this.convertToCSV(data);
    this.downloadFile(csv, `export_${this.selectedType}_${Date.now()}.csv`);
  }

  private generateMockData(): any[] {
    return [
      { date: '2025-10-15', employee: 'Max Mustermann', hours: 8, project: 'Projekt A' },
      { date: '2025-10-16', employee: 'Lisa Schmidt', hours: 6.5, project: 'Projekt B' }
    ];
  }

  private convertToCSV(data: any[]): string {
    const headers = Object.keys(data[0]).join(';');
    const rows = data.map(row => Object.values(row).join(';'));
    return [headers, ...rows].join('\n');
  }

  private convertToDatev(data: any[]): string {
    return `DATEV;${data.length};${new Date().toISOString()}\n` + this.convertToCSV(data);
  }

  private downloadFile(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}