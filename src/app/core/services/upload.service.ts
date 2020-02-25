import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class UploadService {
  constructor(private apiSvc: ApiService) {}

  uploadMultiFiles(files: File[]): Observable<any> {
    // 
    const input = new FormData();
    for (let j = 0; j < files.length; j++) {
      input.append('file[]', files[j], files[j].name);
    }
    return this.apiSvc
      .postFile(`Attachment/Upload`, input)
      .map(response => response);
  }

  deleteAttachmentById(attachmentId:any):Observable<any>{
    return this.apiSvc
      .post(`Attachment/`,attachmentId)
      .map(response => response);
  }
  deleteMedia(galleryId:number) {
    return this.apiSvc.delete(`Attachment/${galleryId}/true`);
  }

}
