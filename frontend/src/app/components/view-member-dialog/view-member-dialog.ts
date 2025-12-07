import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TextService } from '../../services/text';

export interface MemberData {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  avatar: string;
  vacationDays: number;
  hoursThisWeek: number;
}

@Component({
  selector: 'app-view-member-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './view-member-dialog.html',
  styleUrl: './view-member-dialog.scss',
})
export class ViewMemberDialog {
  text: TextService;

  constructor(
    textService: TextService,
    private dialogRef: MatDialogRef<ViewMemberDialog>,
    @Inject(MAT_DIALOG_DATA) public member: MemberData
  ) {
    this.text = textService;
  }

  onClose() {
    this.dialogRef.close();
  }

  onEdit() {
    this.dialogRef.close('edit');
  }
}
