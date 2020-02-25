import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { Product } from '../single.model';
import { UploadService } from '../../../core/services/upload.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { environment } from '../../../../environments/environment';
import { Product } from '../../../products/single/single.model';
@Component({
  selector: 'app-property-images-tab',
  templateUrl: './property-images-tab.component.html',
  styleUrls: ['./property-images-tab.component.scss']
})
export class PropertyImagesTabComponent implements OnInit {
  public ImageUrl = environment.ImageApiUrl;
  @Input() product: Product;
  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  productImagesForm: FormGroup;

  @ViewChild('fileInput') fileInput;
  @ViewChild('mainImageInput') mainImageInput;
  @ViewChild('altImageInput') altImageInput;
  @ViewChild('thumbImageInput') thumbImageInput;

  @BlockUI('productCreate') blockUIList: NgBlockUI;

  constructor(private fb: FormBuilder, private uploadService: UploadService) {}

  clearImage(image): void {
    _.remove(
      this.product.attachments,
      att => att.attachmentId === image.attachmentId
    );
  }

  onChange(event: any, imageType: number) {
    this.blockUIList.start();

    const files = [].slice.call(event.target.files);
    if (files && files[0]) {
      const fileToUpload = files;

      this.uploadService.uploadMultiFiles(fileToUpload).subscribe(res => {
        debugger;
        res.forEach(element => {
          const attachment = {
            attachmentId: element.id,
            url: element.url
          };
          if (imageType === 0) {
            this.product.attachments.unshift(attachment);
          } else if (imageType === 1) {
            this.product.mainImageId = attachment.attachmentId;
            this.product.mainImage = attachment.url;
          } else if (imageType === 2) {
            this.product.thumbImageId = attachment.attachmentId;
            this.product.thumbImage = attachment.url;
          } else {
            this.product.altImageId = attachment.attachmentId;
            this.product.altImage = attachment.url;
          }
          this.blockUIList.stop();
        });
      });
    }
  }

  ngOnInit() {
    this.productImagesForm = this.fb.group({
      attachments: [this.product.attachments],
      mainImageId: [this.product.mainImageId],
      altImageId: [this.product.altImageId],
      thumbImageId: [this.product.thumbImageId]
    });

    this.formReady.emit(this.productImagesForm);
  }
}
