import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs/Observable';
import { IContentModel } from './content.model';
@Injectable()
export class ContentService {
  constructor(private ApiSvc: ApiService) {}

  addContent(content: IContentModel): Observable<any> {
    return this.ApiSvc.post(`Content`,content);
  }

  editContent(content: IContentModel, id: number): Observable<any> {
    return this.ApiSvc.put(`Content/${id}`, content);
  }

  getContent(contentId: number): Observable<any> {
    return this.ApiSvc.get(`Content/${contentId}/true`);
  }

  deleteContent(contentId: number): Observable<any> {
    return this.ApiSvc.delete(`Content/${contentId}/true`);
  }
  
}
