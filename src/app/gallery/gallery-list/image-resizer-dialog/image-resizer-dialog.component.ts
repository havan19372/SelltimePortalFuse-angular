import { Component, OnInit, Inject } from '@angular/core';
import { GalleryService } from 'app/gallery/gallery.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GalleryDeleteComponent } from 'app/gallery/gallery-delete/gallery-delete.component';

@Component({
  selector: 'app-image-resizer-dialog',
  templateUrl: './image-resizer-dialog.component.html',
  styleUrls: ['./image-resizer-dialog.component.scss']
})
export class ImageResizerDialogComponent implements OnInit {
  
  imageUrl:any;
  Height:any;
  width:any;
constructor(private galleryService: GalleryService, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ImageResizerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
    
  ngOnInit() {
    console.log("@data",this.data.gallery);
    this.imageUrl=this.data.gallery;
  }
  save(){
    let h= this.Height;
    let width=this.width;
    let imageUrl= this.imageUrl+`?w=${width}`;
    console.log("@height",h);
    console.log("@Width",width);
    console.log("@height",imageUrl);
    //let url = imageUrl+`?${width}`;
    let urlTo=`https://test-api.selltime.com//Uploads/Media_4/8.jpg_fc900a13-6b0e-4470-b84b-fb1c56f43b2e.jpg?w=1000&mode=max&formate=png`;
    this.galleryService.resizeImage(urlTo).subscribe(res=>{
      console.log("@imageSize",res);
    });
  }

}
