import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../state';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { Paging } from '../project-board.model';
import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';
import { switchMap } from 'rxjs/operators/switchMap';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ProjectGuard implements CanActivate {
  paging: Paging;

  constructor(private store: Store<fromStore.ProjectBoardState>) {
    this.paging = {
      pageNumber: 1,
      pageSize: 5
    };
  }

  canActivate(): Observable<boolean> {
    // debugger;
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(()=> of(false))
    )
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getProjectsLoaded).pipe(
      tap(loaded => {
        // debugger;
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadProject(this.paging));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
