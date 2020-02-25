import { Component, OnInit, Input } from '@angular/core';
import { AttachmentModel } from 'app/task/models/attachment.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
  @Input() attachments: AttachmentModel[] = [];
  imageUrl = environment.ImageApiUrl;
  src = "";

  constructor() { }

  ngOnInit() {
  }
  openImage(attachment) {
    window.open(this.imageUrl + attachment.url)
  }
   checkExtensionImage(c: AttachmentModel) {
    let valToLower = c.fileExtension.toLowerCase();
    let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$"); //add or remove required extensions here
     return regex.test(valToLower);
  }


}
