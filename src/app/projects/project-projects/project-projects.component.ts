import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import {
  MatDialog,
  MatPaginator,
  MatButtonToggleGroup,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { fuseAnimations } from '@fuse/animations';
import { environment } from '../../../environments/environment';
import { ProjectProjectsService } from './project-projects.service';
import { ProjectCreateComponent } from 'app/projects/project-create/project-create.component';
import { ProjectModel } from '../project.model';
import { ProjectsTableComponent } from 'app/projects/project-projects/projects-table/projects-table.component';

@Component({
  selector: 'app-project-projects',
  templateUrl: './project-projects.component.html',
  styleUrls: ['./project-projects.component.scss'],
  animations: fuseAnimations
})
export class ProjectProjectsComponent implements OnInit, OnDestroy {
  dialogRef: any;
  searchInput: FormControl;
  @ViewChild(MatButtonToggleGroup) group: MatButtonToggleGroup;
  @ViewChild('projectTable') projectTableComp: ProjectsTableComponent;
  projectAddDialogRef: MatDialogRef<ProjectCreateComponent, any>;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private ProjectsService: ProjectProjectsService,
    private snackBar: MatSnackBar
  ) {
    this.searchInput = new FormControl('');
  }

  newProject(project?: ProjectModel) {
    debugger;
    this.projectAddDialogRef = this.dialog.open(ProjectCreateComponent, {
      panelClass: 'mail-compose-dialog',
      width: '600px',
      data: {
        action: 'add',
        project: null
      }
    });

    this.projectAddDialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }

      if (response[0] === 'add') {
        this.ProjectsService.createProject(response[1].getRawValue()).subscribe(
          elem => {
            debugger;
            this.projectTableComp.pushNewProject(elem);

            this.snackBar.open('Project added', 'OK', {
              verticalPosition: 'bottom',
              duration: 1000,
              panelClass: 'mat-green-bg'
            });
          }
        );
      }
    });
  }

  ngOnInit() {
    this.searchInput.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(searchText => {
        this.ProjectsService.getFilteredProjects(searchText);
      });
  }

  ngOnDestroy() {}
}
