import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
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
import { map } from 'rxjs/operators/map';

@Injectable()
export class ProjectExistGuard implements CanActivate {
  paging: Paging;

  constructor(private store: Store<fromStore.ProjectBoardState>) {
    this.paging = {
      pageNumber: 1,
      pageSize: 5
    };
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // debugger;
    return this.checkStore().pipe(
      switchMap(() => {
        // debugger;
        const id = +route.params.projectId;
        return this.hasProject(id);
      })
    );
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

  hasProject(id: number): Observable<boolean> {
    return this.store.select(fromStore.getProjectsEntities).pipe(
      map(entities => !!entities[id]),
      take(1)
    );
  }
}
