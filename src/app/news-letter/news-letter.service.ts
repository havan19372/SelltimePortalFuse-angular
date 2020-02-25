import { Paging } from './../project-board/project-board.model';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { tap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { NewsLetter } from './news-letter.model';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsLetterService {
  constructor(
    public snackBar: MatSnackBar,
    private apiSvc: ApiService,
   ) {}

  
  getNewsLetters(paging: Paging): Observable<HttpResponse<NewsLetter[]>> {
    return this.apiSvc
      .get(
        `Newsletter?PageNumber=${paging.pageNumber}&PageSize=${
          paging.pageSize
        }`,
        null,
        true
      )
      .pipe(catchError(this.handleError));
  }
  createNewsLetter(newsLetter: NewsLetter): Observable<NewsLetter> {
     newsLetter.id = null;
    return  <Observable<NewsLetter>> this.apiSvc.post(`Newsletter`, newsLetter)
      .pipe(
        tap(data => {console.log('createNewsLetter: ' + JSON.stringify(data));
        this.snackBar.open(`Created Newsletter ${newsLetter.name}`, 'Dismiss', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });}),
        catchError(this.handleError)
      );
  }

  deleteNewsLetter(id: number): Observable<{}> {
    return   this.apiSvc.delete(`Newsletter/${id}/true`)
      .pipe(
        tap(data => {console.log('deleteNewsLetter: ' + id);
        this.snackBar.open(`Deleted Newsletter`, 'Dismiss', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });}),
        catchError(this.handleError)
      );
  }

  updateNewsLetter(newsLetter: NewsLetter): Observable<NewsLetter> {
     const url = `Newsletter/${newsLetter.id}`;
    return <Observable<NewsLetter>> this.apiSvc.put(url, newsLetter)
      .pipe(
        tap(() => {console.log('updateNewsLetter: ' + newsLetter.id)
        this.snackBar.open(`Updated Newsletter ${newsLetter.name}`, 'Dismiss', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }),
        // Return the NewsLetter on an update
        map(() => newsLetter),
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
