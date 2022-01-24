import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  private description: any;
  countClick = 0;
  dataDialog = undefined;
  loading = false;
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.description = data.description;
  }

  close() {
    this.dialogRef.close({ data: this.dataDialog});
  }

  async getData() {
    if (this.loading === false) {
      const response = await fetch('https://rs-recruiter.github.io/data.json');
      if (response.ok) {
        this.loading = true;
        setTimeout(async () => {
          this.dataDialog = await response.json();
          this.loading = false;
          this.countClick += 1;
        }, 1000);
      }
    }
  }
}
