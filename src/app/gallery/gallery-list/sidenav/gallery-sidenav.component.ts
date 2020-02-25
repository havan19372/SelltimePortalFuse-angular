import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { BlockUI, NgBlockUI } from 'ng-block-ui';



import { GalleryModel } from './../../gallery.model';
import { GalleryService } from './../../gallery.service';

import { GalleryCreateComponent } from './../../gallery-create/gallery.create.component';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-gallery-sidenav',
  templateUrl: './gallery-sidenav.component.html',
  styleUrls: ['./gallery-sidenav.component.scss'],
  animations: fuseAnimations
})
export class GallerySidenavComponent implements OnInit, OnDestroy
{
  galleries: GalleryModel[];
  dialogRef: MatDialogRef<GalleryCreateComponent, any>;
  @Output() gallerySelectEvent = new EventEmitter<GalleryModel>();
  @BlockUI('galleryListBlock') blockUI: NgBlockUI;
  selectedGallery: GalleryModel;

  constructor(private galleryService: GalleryService, public dialog: MatDialog, private snackBar: MatSnackBar)
  {

  }

  @Input()
  set updated(gallery: GalleryModel)
  {
    console.log('updated: ', gallery);

    if ( this.galleries )
    {
      this.galleries = this.galleries.map((modal, index) => modal.id == gallery.id ? gallery : modal);
      this.gallerySelectEvent.emit(gallery);
      this.selectedGallery = gallery;
    }
  }

  @Input()
  set deleted(gallery)
  {
    console.log('deleted: ', gallery);

    if ( this.galleries )
    {
      this.galleries = this.galleries.filter(element => element.id != gallery.id);

      if ( this.galleries.length >= 1 )
      {
        this.gallerySelectEvent.emit(this.galleries[0]);
        this.selectedGallery = this.galleries[0];
      }
    }
  }

  ngOnInit()
  {
    this.galleries = [];

    this.blockUI.start();

    this.galleryService.getList().subscribe(response => {

      this.blockUI.stop();

      if ( response && Array.isArray(response) && response.length >= 1 )
      {
        this.gallerySelectEvent.emit(response[0]);
        this.galleries = response;
        this.selectedGallery = response[0];
      }

    }, error => {
      this.blockUI.stop();
    });
  }

  newGallery(): void
  {
    this.dialogRef = this.dialog.open(GalleryCreateComponent, {
      panelClass: 'mail-compose-dialog',
      width: '600px',
      data: { action: 'add' }
    });

    this.dialogRef.afterClosed().subscribe(response => {
      if ( response && response[0] == 'add' )
      {
        this.galleries.unshift(response[1]);
        this.gallerySelectEvent.emit(response[1]);
        this.selectedGallery = response[1];
      }
    });
  }

  getImages(gallery: GalleryModel)
  {
    this.gallerySelectEvent.emit(gallery);
      this.selectedGallery = gallery;
    this.galleryService.getMedia(gallery.id).subscribe(medias => {
      console.log('gallery GalleryModel: ', medias);
    
     });
    //console.log('gallery GalleryModel: ', gallery)
  }

  ngOnDestroy() { }
}
