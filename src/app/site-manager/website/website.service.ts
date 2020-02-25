import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class WebsiteService {
  onSearchTextChanged: Subject<any> = new Subject();
  constructor(private ApiSvc: ApiService, private httpClient: HttpClient) { }

  getWebsites(): Observable<any> {
    return this.ApiSvc.get('Website?PageNumber=1&PageSize=50');
  }

  newWebsite(data): Observable<any> {
    return this.ApiSvc.post('Website?PageNumber=1&PageSize=50', data);
  }

  getWebsite(id): Observable<any> {
    return this.ApiSvc.get(`Website/${id}/true`);
  }

  updateWebsite(id, data): Observable<any> {
     return this.ApiSvc.put(`Website/${id}`, data);
  }

}
