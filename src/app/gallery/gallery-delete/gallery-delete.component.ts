import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { GalleryService } from './../gallery.service';

@Component({
  selector: 'app-gallery-delete',
  templateUrl: './gallery-delete.component.html',
  styleUrls: ['./gallery-delete.component.scss']
})
export class GalleryDeleteComponent implements OnInit {
  title: string;

  constructor(private galleryService: GalleryService, public snackBar: MatSnackBar,
     public dialogRef: MatDialogRef<GalleryDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) 
  {

  }

  ngOnInit() {
    this.title = 'Delete Gallery';
  }

  delete() {
    this.galleryService.delete(this.data.gallery.id).subscribe(result => {
      this.snackBar.open('Gallery Deleted', 'OK', { verticalPosition: 'bottom', duration: 1000, panelClass: 'mat-green-bg' });
      this.dialogRef.close(['delete', this.data.gallery]);
    });
  }
}
