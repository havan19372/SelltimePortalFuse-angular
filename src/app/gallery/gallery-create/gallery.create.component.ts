import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { GalleryService } from './../gallery.service';

@Component({
  selector: 'app-gallery-create',
  templateUrl: './gallery.create.component.html',
  styleUrls: ['./gallery.create.component.scss']
})
export class GalleryCreateComponent implements OnInit
{
  @BlockUI('galleryListBlock') blockUI: NgBlockUI;
  galleryForm: FormGroup;
  title: string;
  stores: any;

  constructor(private galleryService: GalleryService, private formBuilder: FormBuilder, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<GalleryCreateComponent>, @Inject(MAT_DIALOG_DATA) private data: any)
  {
    this.blockUI.start();
    this.galleryService.stores().subscribe(result => {
      this.blockUI.stop();
      this.stores = result;
    });
  }

  galleryFormBuilder(): void
  {
    // this.galleryForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   store: ['', Validators.required]
    // });

    this.galleryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit()
  {
    this.galleryFormBuilder();
   
    if ( this.data.action == 'add' )
    {
      this.title = 'New Gallery';
    }
    else if ( this.data.action == 'edit' )
    {
      this.title = 'Edit Gallery';

      // this.galleryForm.patchValue({name: this.data.gallery.name, store: this.data.gallery.storeName});
      this.galleryForm.patchValue({name: this.data.gallery.name});
    }
  }

  save()
  {
    if ( this.galleryForm.valid )
    {
      this.blockUI.start();

      if ( this.data.action == 'add' )
      {
        this.galleryService.create(this.galleryForm.value).subscribe(gallery => {
          this.blockUI.stop();
          this.snackBar.open('Gallery added', 'OK', {verticalPosition: 'bottom', duration: 1000, panelClass: 'mat-green-bg'});
          this.dialogRef.close(['add', gallery]);
        }, error => {
          this.blockUI.stop();
        });
      }
      else if ( this.data.action == 'edit' )
      {
        let gallery = Object.assign({}, this.data.gallery);
        gallery.name = this.galleryForm.value.name;
        gallery.medais = [];

        this.data.gallery.medais.forEach(element => gallery.medais.push({attachmentId: element.attachmentId}));

        console.log('gallery upload update: ', this.data.gallery, gallery);

        this.galleryService.update(this.data.gallery.id, gallery).subscribe(gallery => {
        // this.galleryService.update(this.data.gallery.id, Object.assign({id: this.data.gallery.id}, this.galleryForm.value)).subscribe(gallery => {
          this.blockUI.stop();
          this.snackBar.open('Gallery Updated', 'OK', {verticalPosition: 'bottom', duration: 1000, panelClass: 'mat-green-bg'});
          this.dialogRef.close(['edit', gallery]);
        }, error => {
          this.blockUI.stop();
        });    
      }
    }
  }
}
