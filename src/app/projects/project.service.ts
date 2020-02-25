import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { ProjectModel, ProjectMessage } from './project.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../core/services/api.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { AuthenticationService } from '../auth/athentication.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ProjectService {
  projects: ProjectModel[];
  selectedProject: ProjectModel;
  projectMessages: ProjectMessage[];
  openedMessage: ProjectMessage;

  @BlockUI('projectListBlock') blockUIList: NgBlockUI;

  onProjectsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  onSelectedProjectChanged: BehaviorSubject<any> = new BehaviorSubject([]);

  onProjectMessagesChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  onOpenedMessageChanged: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  getProjects(): Subscription {
    this.blockUIList.start();
    return this.apiSvc
      .get(`Project?PageNumber=1&PageSize=50`)
      .subscribe(response => {
        this.projects = response;
        this.onProjectsChanged.next(this.projects);
        this.blockUIList.stop();
      }, this.handleError);
  }

  getMessagesByProject(project: ProjectModel): Subscription {
    this.blockUIList.start();

    this.selectedProject = project;
    this.onSelectedProjectChanged.next(this.selectedProject);

    this.openedMessage = new ProjectMessage();
    this.onOpenedMessageChanged.next(this.openedMessage);

    return this.apiSvc
      .get(`ProjectMessage?PageNumber=1&PageSize=50&ProjectId=${project.id}`)
      .subscribe(response => {
        this.projectMessages = response;
        this.onProjectMessagesChanged.next(this.projectMessages);

        this.blockUIList.stop();
      }, this.handleError);
  }

  readMessage(message: ProjectMessage): Subscription {
    //
    this.blockUIList.start();

    return this.apiSvc
      .get(`ProjectMessage/${message.id}`)
      .subscribe(response => {
        debugger;
        response.id = message.id;
        this.openedMessage = response;
        this.onOpenedMessageChanged.next(this.openedMessage);

        this.blockUIList.stop();
      }, this.handleError);
  }

  createProject(project: ProjectModel): Observable<ProjectModel> {
    this.blockUIList.start();
    return this.apiSvc
      .post(`project`, project)
      .map(response => {
        this.blockUIList.stop();
        return response;
      })
      .catch(this.handleError);
  }

  editProject(project: ProjectModel): Observable<ProjectModel> {
    const projectId = project.id;
    delete project.id;

    this.blockUIList.start();
    return this.apiSvc
      .put(`Project/${projectId}`, project)
      .map(response => {
        this.blockUIList.stop();
        debugger;
        _.remove(this.projects, e => e.id === projectId);

        this.projects.push(response);
        this.onProjectsChanged.next(this.projects);

        this.selectedProject = response;
        this.onSelectedProjectChanged.next(this.selectedProject);

        return response;
      })
      .catch(this.handleError);
  }

  createProjectMessage(
    projectMessage: ProjectMessage
  ): Observable<ProjectMessage> {
    this.blockUIList.start();

    return this.apiSvc
      .post(`ProjectMessage`, projectMessage)
      .map(response => {
        response.creator = this.authSvc.getUserToken().fullName;
        this.projectMessages.push(response);

        this.onProjectMessagesChanged.next(this.projectMessages);
        this.blockUIList.stop();
        return response;
      })
      .catch(this.handleError);
  }

  editProjectMessage(
    projectMessage: ProjectMessage
  ): Observable<ProjectMessage> {
    const messageId = projectMessage.id;
    delete projectMessage.id;
    this.blockUIList.start();

    return this.apiSvc
      .put(`ProjectMessage/${messageId}`, projectMessage)
      .map(response => {
        debugger;

        _.remove(this.projectMessages, pm => pm.id === messageId);
        this.projectMessages.push(response);

        this.onProjectMessagesChanged.next(this.projectMessages);

        this.openedMessage = new ProjectMessage();
        this.onOpenedMessageChanged.next(this.openedMessage);

        this.blockUIList.stop();
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error) {
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';

    return Observable.throw(errMsg);
    // this.snackBar.open(errMsg, 'OK', {
    //   verticalPosition: 'top',
    //   duration: 1000,
    //   panelClass: 'mat-red-bg'
    // });
  }

  deleteProject(project: ProjectModel): Observable<any> {
    this.blockUIList.start();
    return this.apiSvc.delete(`Project/${project.id}/true`).map(response => {
      debugger;
      _.remove(this.projects, e => e.id === project.id);
      this.onProjectsChanged.next(this.projects);
      this.selectedProject = new ProjectModel();
      this.onSelectedProjectChanged.next(this.selectedProject);
      this.blockUIList.stop();
      return response;
    });
  }

  validateFormateImage(value) {
    const validFormats = ['jpg', 'gif', 'png', 'jpeg'];
    const ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
    return validFormats.indexOf(ext) !== -1;
  }
}
