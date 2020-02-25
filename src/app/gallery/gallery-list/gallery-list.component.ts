import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MatDialogConfig } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { fuseAnimations } from '@fuse/animations';
import { environment } from '../../../environments/environment';

import { GalleryService } from './../gallery.service';
import { GalleryModel } from './../gallery.model';

import { GalleryCreateComponent } from './../gallery-create/gallery.create.component';
import { GalleryDeleteComponent } from './../gallery-delete/gallery-delete.component';
import { NgxMasonryOptions } from 'ngx-masonry';
import { ImageResizerDialogComponent } from './image-resizer-dialog/image-resizer-dialog.component';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss'],
  animations: fuseAnimations
})
export class GalleryListComponent implements OnInit {
  @BlockUI('galleryListBlock') blockUI: NgBlockUI; 
  imageUrl = environment.ImageApiUrl;
  selectedGallery: GalleryModel;
  selectedImage:any;
  pdfIcon:boolean=false;
  imageIcon:boolean=false;
  medias: any[];
  videoMedias:any[];
  pdfFiles:any[];
  imageMedias:any[];
  deleted: any;
  updated: any;
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.2s',
    gutter: 30,
    resize: true,
    initLayout: true,
    fitWidth: true
  };
  constructor(
    private galleryService: GalleryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.medias = [];
    this.pdfFiles=[];
    this.videoMedias=[];
    this.imageMedias=[];
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ImageResizerDialogComponent, dialogConfig);
}

gallerySelectEvent(gallery:GalleryModel) {
  console.log("@gallerySelecting",gallery);
  //this.imageMedias=[];
    this.blockUI.start();
    this.selectedGallery = gallery;
    this.galleryService.getMedia(gallery.id).subscribe(
      gallelry => {
        this.medias = [];
        gallery.medais.forEach(elem => {
          const img = new Image();
          img.src = elem.url;
          elem.height = img.height;
          this.medias.push(elem);
          console.log("state before filter",this.medias); 
        });
        this.imageMedias=this.medias.filter(img=>img.fileExtension===".jpeg" ||img.fileExtension===".jpg" || img.fileExtension==="png" || img.fileExtension==="gif");
        this.pdfFiles=this.medias.filter(pdf=>pdf.fileExtension==".pdf");
        this.videoMedias=this.medias.filter(mp=>mp.fileExtension==".mp4");
        this.blockUI.stop();
        console.log("state after filter",this.imageMedias);
      },
      error => {
        this.blockUI.stop();
      }
    );
  }
  onChange(event: any) {
    //this.imageMedias=[];
    const form = new FormData();
    Array.from(event.target.files).forEach((file: File) =>
      form.append('file[]', file, file.name)
    );
    this.galleryService.uploadFiles(form).subscribe(files => {
      const attachments = [];
       if (files && Array.isArray(files) && files.length > 0) {
        // this.medias = files.concat(this.medias);
        files.forEach(element =>
          attachments.unshift({ attachmentId:element.id })
        );
      }
      console.log("does it contains attachment",attachments);
      this.galleryService
        .uploadMedia(this.selectedGallery.id, attachments)
        .subscribe(files => {
          // attachment id is different in medias...
          console.log("does it upload",files);
          this.galleryService
            .getMedia(this.selectedGallery.id)
            //.subscribe(gallelry => (this.imageMedias = gallelry.medais));
            .subscribe(gallelry => (
              this.imageMedias = gallelry.medais.filter(img=>img.fileExtension===".jpeg" ||img.fileExtension===".png" ||img.fileExtension===".jpg" || img.fileExtension==="gif"),
              this.pdfFiles=gallelry.medais.filter(pdf=>pdf.fileExtension==".pdf"),
              this.videoMedias=gallelry.medais.filter(mp=>mp.fileExtension==".mp4")
              ));
          console.log('files: ', files);
        });
    });
  }
deleteMedia(galleryId, mediaId) {
    //debugger;
    //problem statement 
    //1:I uploaded the pic and without reload the I can delete the pic its worked
    //2:If I upload the pic and navigate to other gallery,the pic gone and I reload the app,
    //the pic will come but delete method does not work.
    console.log("Ids",galleryId,mediaId);
    this.blockUI.start();
    this.galleryService.deleteMedia(galleryId, mediaId).subscribe(
      () => {
        this.blockUI.stop();
          console.log("array",this.imageMedias);    
        //this.medias = this.medias.filter(media => media.id !== mediaId);
        this.pdfFiles=this.pdfFiles.filter(pdf=>pdf.id!==mediaId);
        this.videoMedias=this.videoMedias.filter(video=>video.id!==mediaId);
        this.imageMedias=this.imageMedias.filter(img=>img.id!==mediaId);
        console.log("array2",this.imageMedias);    

      },
      error => {
        this.blockUI.stop();
      }
    );
  }
  editGallery() {
    const modal = this.dialog.open(GalleryCreateComponent, {
      panelClass: 'mail-compose-dialog',
      width: '600px',
      data: { action: 'edit', gallery: this.selectedGallery }
    });

  modal.afterClosed().subscribe(response => {
      // console.log('update dialogRef: ', response);
      if (response && Array.isArray(response) && response[0] === 'edit') {
        this.updated = response[1];
      }
    });
  }
  openGallery(file:any){
    console.log("@file",this.imageUrl+file.url);
    this.selectedImage=this.imageUrl+file.url;
    const modal = this.dialog.open(ImageResizerDialogComponent, {
      panelClass: 'mail-compose-dialog',
      width: '700px',
      data: {action:'edit',gallery:this.selectedImage }
    });
  }

  deleteGallery() {
    const modal = this.dialog.open(GalleryDeleteComponent, {
      panelClass: 'mail-compose-dialog',
      width: '600px',
      data: { action: 'delete', gallery: this.selectedGallery }
    });

    modal.afterClosed().subscribe(response => {
      // console.log('delete dialogRef: ', response);
      if (response && Array.isArray(response) && response[0] === 'delete') {
        this.deleted = response[1];
      }
    });
  }
  copyText(val1:string,val2:string){
    let fileUrl = val1 + val2;
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = fileUrl;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }
}
