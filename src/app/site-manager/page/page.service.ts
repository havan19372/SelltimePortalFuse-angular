import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { IPageModel } from './page.model';
import { Observable } from 'rxjs/Observable';
import { IContentModel } from '../content/content.model';

@Injectable()
export class PageService {
  constructor(private ApiSvc: ApiService) {}

  addPage(page: IPageModel): Observable<any> {
    return this.ApiSvc.post(`Page`, page);
  }

  editPage(page: IPageModel, id: number): Observable<any> {
    return this.ApiSvc.put(`Page/${id}`, page);
  }

  getPage(pageId: number): Observable<any> {
    return this.ApiSvc.get(`Page/${pageId}/false`);
  }

  getPageContent(pageId: number): Observable<IContentModel[]> {
    return this.ApiSvc.get(`Page/${pageId}/Content`).map(response => response);
  }

  deletePage(pageId: number): Observable<any> {
    return this.ApiSvc.delete(`Page/${pageId}/true`);
  }

}
