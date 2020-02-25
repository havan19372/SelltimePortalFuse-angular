import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { AuthenticationService } from '../auth/athentication.service';
import { ProjectsBoard, Paging } from './project-board.model';
import { ApiService } from '../core/services/api.service';

@Injectable()
export class ProjectsCardService {
  constructor(
    private http: HttpClient,
    private apiSvc: ApiService,
    private authSvc: AuthenticationService
  ) {}

  getProjects(paging: Paging): Observable<HttpResponse<ProjectsBoard[]>> {
    return this.apiSvc
      .get(
        `Project/board?PageNumber=${paging.pageNumber}&PageSize=${
          paging.pageSize
        }`,
        null,
        true
      )
      .pipe(catchError(this.handleError));
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
