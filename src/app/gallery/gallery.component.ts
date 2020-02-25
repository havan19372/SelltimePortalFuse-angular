import { Component, OnInit } from '@angular/core';
import { GalleryService } from './gallery.service';
import { environment } from '../../environments/environment';
import { UploadService } from '../core/services/upload.service';
import { MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: fuseAnimations
})
export class GalleryComponent implements OnInit {
  public fileUrl = environment.ImageApiUrl;
  pageNumber = 1;
  pageSize = 10;
  modalImageUrl = '';
  files: any;
  deletedFile: any;
  constructor(
    private gallerSrv: GalleryService,
    private UploadSrv: UploadService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getFiles();
  }

  getFiles() {
    this.gallerSrv.getFiles(this.pageNumber, this.pageSize).subscribe(data => {
      if (data.length === this.pageSize) {
        this.pageNumber = this.pageNumber + 1;
        this.getFiles();
      }
      if (this.files === undefined) {
        this.files = [];
      }
      data.forEach(element => {
        this.files.push(element);
      });
    });
  }
  onChange(event: any){
    debugger;
    const files = [].slice.call(event.target.files);
    if (files && files[0]) {
      const fileToUpload = files;
      this.UploadSrv.uploadMultiFiles(fileToUpload).subscribe(res => {
        res.forEach(element => {
         this.files.unshift(element);
          //this.files.push(element);
          this.snackBar.open('Image saved', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
      });
    }
  }

  DeleteFile(file) {
    this.files = this.files.filter(obj => obj !== file);
    this.deletedFile = file;
    this.gallerSrv
      .DeleteRestoreFiles(file.id, true)
      .subscribe(data => {}, error => {});
    const snackBarRef = this.snackBar.open('Image Delete', 'Undo', {
      verticalPosition: 'top',
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.Undo();
    });
  }
  Ok() {}
  Undo() {
    this.files.unshift(this.deletedFile);
    this.gallerSrv
      .DeleteRestoreFiles(this.deletedFile.id, false)
      .subscribe(data => {}, error => {});
    this.deletedFile = null;
    this.snackBar.open('Image Resotred', 'Ok', {
      verticalPosition: 'top',
      duration: 2000
    });
  }

  showImage(src) {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    this.modalImageUrl = src;
  }
  CloseModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
}
