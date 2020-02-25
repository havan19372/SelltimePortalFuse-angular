import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { ApiService } from '../core/services/api.service';
import { GalleryModel } from './gallery.model';

@Injectable()
export class GalleryService {
  constructor(private ApiSvc: ApiService, private httpClient: HttpClient) {}

  getFiles(pageNumber, pageSize): Observable<any> {
    return this.ApiSvc.get(
      `Attachment?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }

  getList(): any {
    return this.ApiSvc.get(`Gallery?PageNumber=1&PageSize=50`);
  }

  create(gallery: GalleryModel): Observable<GalleryModel> {
    return this.ApiSvc.post(`gallery`, gallery).map(response => response);
  }

  update(id: number, gallery: GalleryModel): Observable<GalleryModel> {
    return this.ApiSvc.put(`gallery/${id}`, gallery).map(response => response);
  }

  delete(id: number): Observable<GalleryModel> {
    return this.ApiSvc.delete(`gallery/${id}/true`).map(response => response);
  }

  stores(): Observable<any> {
    return this.ApiSvc.get(`stores`).map(response => response);
  }

  getMedia(galleryId: number): Observable<any> {
    return this.ApiSvc.get(`gallery/${galleryId}`);
  }

  uploadFiles(attachments: any) {
    return this.ApiSvc.postFile(`Attachment/Upload`, attachments).map(
      response => response
    );
  }

  uploadMedia(galleryId: number, filesForm: any) {
    return this.ApiSvc.post(`gallery/${galleryId}/medai`, filesForm);
  }
  deleteMedia(galleryId: number, mediaId: number) {
    return this.ApiSvc.delete(`gallery/${galleryId}/medai/${mediaId}`);
  }
  DeleteRestoreFiles(id, deleted): Observable<any> {
    return this.ApiSvc.delete(`Attachment/${id}/${deleted}`);
  }
  
  resizeImage(imageurl):Observable<any> {
    console.log("@serviceUrl",imageurl);
    return this.ApiSvc.Imageput(imageurl,{}).map(response => response);
  }
}
