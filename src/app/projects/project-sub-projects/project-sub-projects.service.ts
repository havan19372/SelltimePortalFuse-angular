import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../core/services/api.service';
import { AuthenticationService } from '../../auth/athentication.service';
import { HttpClient } from '@angular/common/http';
import { ProjectModel } from '../project.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { truncateSync } from 'fs';

@Injectable()
export class ProjectSubProjectsService {
  onPagingChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onSearchTextChanged: Subject<any> = new Subject();
  onFilterChanged: Subject<any> = new Subject();
  onSubProjectsChanged: BehaviorSubject<any> = new BehaviorSubject({});

  SubProjects: any[] = [];
  searchText: string;
  projectId: number;

  paging: {
    pageIndex: number;
    pageSize: number;
    length: number;
  };

  @BlockUI('SubProjectsTable') blockUIList: NgBlockUI;
  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthenticationService,
    private http: HttpClient
  ) {}

  deleteSubProject(SubProject: ProjectModel): Observable<any> {
    return this.apiSvc.delete(`ProjectSub/${SubProject.id}/true`);
  }

  getFilteredSubProjects(searchText, view?: string) {
    this.searchText = searchText;
    if (!this.searchText) {
      this.onSubProjectsChanged.next(this.SubProjects);
    }
  }

  getSubProjectsForTable(
    projectId,
    startValue,
    pageSize,
    sort?: string,
    direction?: string,
    searchText?: string
  ): Observable<any[]> {
    this.blockUIList.start();
    debugger;
    return this.apiSvc
      .get(
        `ProjectSub?${
          projectId ? '&ProjectId=' + projectId + '&' : '&'
        }pageSize=${pageSize}&pageNumber=${startValue}${
          searchText ? '&SearchQuery=' + searchText : '&'
        }orderBy=${sort ? sort : 'name'} ${direction}`,
        null,
        true
      )
      .map(response => {
        this.blockUIList.stop();
        return response;
      });
  }
}
