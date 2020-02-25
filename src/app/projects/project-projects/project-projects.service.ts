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

@Injectable()
export class ProjectProjectsService {
  onPagingChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onSearchTextChanged: Subject<any> = new Subject();
  onFilterChanged: Subject<any> = new Subject();
  onProjectsChanged: BehaviorSubject<any> = new BehaviorSubject({});

  Projects: any[] = [];
  searchText: string;
  filterBy: string;

  paging: {
    pageIndex: number;
    pageSize: number;
    length: number;
  };

  @BlockUI('ProjectsTable') blockUIList: NgBlockUI;

  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthenticationService,
    private http: HttpClient
  ) {}

  deleteProject(Project: ProjectModel): Observable<any> {
    return this.apiSvc.delete(`Project/${Project.id}/true`);
  }
  

  getFilteredProjects(searchText, view?: string) {
    this.searchText = searchText;
    if (!this.searchText) {
      this.onProjectsChanged.next(this.Projects);
    }
  }

  getProjectsForTable(
    startValue,
    pageSize,
    sort?: string,
    direction?: string,
    searchText?: string
  ): Observable<any[]> {
    this.blockUIList.start();
    return this.apiSvc
      .get(
        `Project?pageSize=${pageSize}&pageNumber=${startValue}${
          searchText ? '&name=' + searchText : '&'
        }&orderBy=${sort ? sort : 'startDate'} ${direction ? direction : 'asc'}`,
        null,
        true
      )
      .map(response => {
        this.blockUIList.stop();
        debugger;
        return response;
      });
  }

  createProject(project: ProjectModel): Observable<ProjectModel> {
    this.blockUIList.start();
    return this.apiSvc
      .post(`project`, project)
      .map(response => {
        this.blockUIList.stop();
        return response;
      })
      .catch(error => {
        const errMsg = error.message
          ? error.message
          : error.status
            ? `${error.status} - ${error.statusText}`
            : 'Server error';

        return Observable.throw(errMsg);
      });
  }

  editProject(project: ProjectModel): Observable<ProjectModel> {
    const projectId = project.id;
    delete project.id;
    this.blockUIList.start();
    return this.apiSvc
      .put(`Project/${projectId}`, project)
      .map(response => {
        this.blockUIList.stop();
        return response;
      })
      .catch(error => {
        const errMsg = error.message
          ? error.message
          : error.status
            ? `${error.status} - ${error.statusText}`
            : 'Server error';

        return Observable.throw(errMsg);
      });
  }
}
