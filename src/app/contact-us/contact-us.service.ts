import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { ApiService } from '../core/services/api.service';

@Injectable()
export class ContactUsService {
  // @BlockUI('contactusTable') blockUIList: NgBlockUI;
  constructor(private apiSvc: ApiService) {}

  getContactUs(
    startValue,
    pageSize,
    sort?: string,
    direction?: string,
    searchText?: string
  ): Observable<any[]> {
    // this.blockUIList.start();
    return this.apiSvc
      .get(
        `Contactus?pageSize=${pageSize}&pageNumber=${startValue}&SearchQuery=${searchText}&orderBy=${
          sort ? sort : 'createDate'
        } ${direction ? direction : 'desc'}`,
        null,
        true
      )
      .map(response => {
        // this.blockUIList.stop();
        return response;

      });
  }

  deleteContact(contact): Observable<any> {
    return this.apiSvc.delete(`Contactus/${contact.id}/true`);
  }

  addContactUsNote(notes: string, contactUsId: number)
  {
    return this.apiSvc.post(`Contactus/${contactUsId}/notes`, {'note': notes});
  }
  
  getContactUsNotes(contactUsId: number)
  {
    return this.apiSvc.get(`Contactus/${contactUsId}/notes`);
  }

  exportExcel(): Observable<any>{
    return this.apiSvc.getFile(`Contactus/Export`);
  }

}
