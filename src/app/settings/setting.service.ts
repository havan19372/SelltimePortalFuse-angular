import { Subscription } from 'rxjs/Subscription';
import { Paging } from './../project-board/project-board.model';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { tap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { ApiService } from '../core/services/api.service';
import { SettingModel } from './setting.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  features: any[];
  onfeaturesChanged: BehaviorSubject<any> = new BehaviorSubject([]);

  MasterLookups: any[];
  onMasterLookupsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  
  constructor(
    public snackBar: MatSnackBar,
    private apiSvc: ApiService,
   ) {}

   SyncLookupToSettinget(syncData:any) {
    return this.apiSvc.get(`Setting/CreateFromLookup/${syncData.featureId}/${syncData.masterKey}/${syncData.typeId}`, null, false);
  }

   getFeatures(): Subscription {
    return this.apiSvc.get(`Feature`, null, false).subscribe(
      response => {
        this.features = response;
        this.onfeaturesChanged.next(this.features);
      }
    );
  }
  GetMasterLookup(): Subscription {
    return this.apiSvc.get(`Lookup/master/false`, null, false).subscribe(
      response => {
        this.MasterLookups = response;
        this.onMasterLookupsChanged.next(this.MasterLookups);
      }
    );
  }

  getSettings(paging: Paging): Observable<HttpResponse<SettingModel[]>> {
    return this.apiSvc
      .get(
        `Setting?PageNumber=${paging.pageNumber}&PageSize=${
          paging.pageSize
        }`,
        null,
        true
      )
      .pipe(catchError(this.handleError));
  }
  createSetting(Setting: SettingModel): Observable<SettingModel> {
     Setting.id = null;
    return  <Observable<SettingModel>> this.apiSvc.post(`Setting`, Setting)
      .pipe(
        tap(data => {console.log('createSetting: ' + JSON.stringify(data));
        this.snackBar.open(`Created Setting ${Setting.key}`, 'Dismiss', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });}),
        catchError(this.handleError)
      );
  }

  deleteSetting(id: number): Observable<{}> {
    return   this.apiSvc.delete(`Setting/${id}/true`)
      .pipe(
        tap(data => {console.log('deleteSetting: ' + id);
        this.snackBar.open(`Deleted Setting`, 'Dismiss', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });}),
        catchError(this.handleError)
      );
  }

  updateSetting(Setting: SettingModel): Observable<SettingModel> {
     const url = `Setting/${Setting.id}`;
    return <Observable<SettingModel>> this.apiSvc.put(url, Setting)
      .pipe(
        tap(() => {console.log('updateSetting: ' + Setting.id)
        this.snackBar.open(`Updated Setting ${Setting.key}`, 'Dismiss', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }),
        // Return the Setting on an update
        map(() => Setting),
        catchError(this.handleError)
      );
  }
  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
