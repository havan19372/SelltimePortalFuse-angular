import * as _ from 'lodash';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModel } from '../../../project.model';
import { ProjectCreateComponent } from '../../../project-create/project-create.component';
import { ProjectService } from '../../../project.service';

@Component({
  selector: 'app-main-projects-sidenav',
  templateUrl: './main-projects-sidenav.component.html',
  styleUrls: ['./main-projects-sidenav.component.scss'],
  animations: fuseAnimations
})
export class MainProjectsSidenavComponent implements OnInit, OnDestroy {
  @Input() headerBg: string;
  @Output()
  onProjectSelection: EventEmitter<ProjectModel> = new EventEmitter<
    ProjectModel
  >();
  projects: ProjectModel[];
  selectedProject: ProjectModel;
  dialogRef: MatDialogRef<ProjectCreateComponent, any>;
  onProjectsChanged: Subscription;
  accounts: any;
  selectedAccount: string;
  constructor(
    private projectSvc: ProjectService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.accounts = {
      creapond: 'Admin@SellTimePortal.com',
      withinpixels: 'TEST@SellTimePortal.com'
    };

    this.selectedAccount = 'creapond';
  }

  ngOnInit() {
    this.onProjectsChanged = this.projectSvc.onProjectsChanged.subscribe(
      response => {
        this.projects = response;
      }
    );
  }

  newProject(): void {
    this.dialogRef = this.dialog.open(ProjectCreateComponent, {
      panelClass: 'mail-compose-dialog',
      width: '600px',
      data: {
        action: 'add'
      }
    });

    this.dialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }

      if (response[0] === 'add') {
        this.projectSvc
          .createProject(response[1].getRawValue())
          .subscribe(elem => {
            debugger;
            this.projects.push(elem);
            this.snackBar.open('Project added', 'OK', {
              verticalPosition: 'bottom',
              duration: 1000,
              panelClass: 'mat-green-bg'
            });
          });
      }
    });
  }
  
  selectProject(project: ProjectModel) {
    this.selectedProject = project;
    this.onProjectSelection.emit(this.selectedProject);
  }

  ngOnDestroy() {
    this.onProjectsChanged.unsubscribe();
  }
}
