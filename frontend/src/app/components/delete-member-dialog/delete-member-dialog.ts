import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface DeleteMemberData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-delete-member-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './delete-member-dialog.html',
  styleUrl: './delete-member-dialog.scss',
})
export class DeleteMemberDialog {

  constructor(
    private dialogRef: MatDialogRef<DeleteMemberDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteMemberData
  ) {}

  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
