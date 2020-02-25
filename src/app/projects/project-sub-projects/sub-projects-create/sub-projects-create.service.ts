import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MatSnackBar } from '@angular/material';
import { ProjectModel } from '../../project.model';

@Injectable()
export class SubProjectsCreateService {
  SubProject: ProjectModel;
  routeParams: { [key: string]: string };
  onSubProjectsChanged: BehaviorSubject<any> = new BehaviorSubject(
    ProjectModel
  );

  constructor(private ApiSvc: ApiService, private snackBar: MatSnackBar) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.routeParams = route.params;
    return this.getSubProject();
  }

  getSubProject(): Observable<any> | BehaviorSubject<any> {
    debugger;
    if (this.routeParams.id === 'new') {
      this.onSubProjectsChanged.next(false);
      return null;
    } else {
      return this.ApiSvc.get('ProjectSub/' + this.routeParams.id + '/').map(
        (res: ProjectModel) => {
          res.id = +this.routeParams.id;
          this.onSubProjectsChanged.next(res);
          return res;
        }
      );
    }
  }

  editSubProject(subProject: ProjectModel): Observable<any> {
    return this.ApiSvc.put('ProjectSub/' + subProject.id, subProject).catch(
      this.handleError
    );
  }

  addSubProject(subProject: ProjectModel): Observable<any> {
    //
    return this.ApiSvc.post('ProjectSub', subProject).catch(this.handleError);
  }

  private handleError(error) {
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';

    this.snackBar.open(errMsg, 'OK', {
      verticalPosition: 'top',
      duration: 1000,
      panelClass: 'mat-red-bg'
    });
    return Observable.throw(errMsg);
  }

  getProjectList(): Observable<any> {
    return this.ApiSvc.get(
      `Project?pageSize=1000&pageNumber=1&SearchQuery=&orderBy=name`,
      null,
      false
    ).catch(this.handleError);
  }
}
