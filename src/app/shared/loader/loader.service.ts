import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from './loader.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoaderComponent> 
  ) { }

  public open(): Observable<boolean> {
    this.dialogRef = this.dialog.open(LoaderComponent, {
      disableClose: true,
    });
    return this.dialogRef.afterClosed();
  }

  public close() {
    this.dialogRef.close();
  }
}
