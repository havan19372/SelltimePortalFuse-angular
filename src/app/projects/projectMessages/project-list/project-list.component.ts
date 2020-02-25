import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Subscription } from 'rxjs/Subscription';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { ProjectMessageCreateComponent } from '../project-message-create/project-message-create.component';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModel } from '../../project.model';
import { ProjectCreateComponent } from '../../project-create/project-create.component';
import { ProjectService } from '../../project.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: fuseAnimations
})
export class ProjectListComponent implements OnInit, OnDestroy {
  searchInput: FormControl;
  selectedProject: ProjectModel;
  onSelectedProjectChanged: Subscription;



  messageAddDialogRef: MatDialogRef<ProjectMessageCreateComponent, any>;
  projectAddDialogRef: MatDialogRef<ProjectCreateComponent, any>;
  constructor(
    private projectSvc: ProjectService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.searchInput = new FormControl('');
  }

  addMessage(): void {
    this.messageAddDialogRef = this.dialog.open(ProjectMessageCreateComponent, {
      panelClass: 'mail-compose-dialog',
      width: '600px',
      data: {
        action: 'add',
        project: this.selectedProject
      }
    });

    this.messageAddDialogRef.afterClosed().subscribe(response => {
      debugger;
      if (!response) {
        return;
      }
       if (response[0] === 'add') {
        this.projectSvc
          .createProjectMessage(response[1].getRawValue())
          .subscribe(projectMessage => {
            this.snackBar.open('Message added', 'OK', {
              verticalPosition: 'bottom',
              duration: 1000,
              panelClass: 'mat-green-bg'
            });
          });
      }
    });
  }

  getMessages(project: ProjectModel) {
    this.selectedProject = project;
    this.projectSvc.getMessagesByProject(this.selectedProject);
  }


  newProject(): void {

      this.projectAddDialogRef = this.dialog.open(ProjectCreateComponent, {
        panelClass: 'mail-compose-dialog',
        width: '600px',
        data: {
          action: 'edit',
          project: this.selectedProject
        }
      });


    this.projectAddDialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }

    if (response[0] === 'edit') {
        this.projectSvc
          .editProject(response[1].getRawValue())
          .subscribe(elem => {
            debugger;

            this.snackBar.open('Project Edited', 'OK', {
              verticalPosition: 'bottom',
              duration: 1000,
              panelClass: 'mat-green-bg'
            });
          });
      }
    });
  }


  ngOnInit() {
    this.projectSvc.getProjects();

    this.onSelectedProjectChanged = this.projectSvc.onSelectedProjectChanged.subscribe(
      project => {
        this.selectedProject = project;
      }
    );
  }

  ngOnDestroy(): void {
    this.onSelectedProjectChanged.unsubscribe();
  }
}
