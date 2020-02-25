import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectModel, SubProjectModel } from '../../project.model';
import { SubProjectsCreateService } from './sub-projects-create.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-sub-projects-create',
  templateUrl: './sub-projects-create.component.html',
  styleUrls: ['./sub-projects-create.component.scss'],
  animations: fuseAnimations
})
export class SubProjectsCreateComponent implements OnInit {
  SubProject: SubProjectModel;
  pageType: string;
  onSubProjectsChanged: Subscription;

  @BlockUI('SubProjectsCreate') blockUIList: NgBlockUI;

  //selectedProject: IContactModel;
  SubProjectsForm: FormGroup;
  constructor(
    private SubProjectsSvc: SubProjectsCreateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  addSubProject(SubProjectData): void {
    this.SubProject = {
      id: this.SubProject.id ? this.SubProject.id : undefined,
      name: SubProjectData.name,
      detail: SubProjectData.detail,
      projectId: SubProjectData.projectId,
      completeDate: SubProjectData.completeDate,
      startDate: SubProjectData.startDate
    };

    if (this.pageType === 'edit') {
      this.saveSubProject();
    } else if (this.pageType === 'new') {
      this.newSubProject();
    }
  }

  newSubProject(): void {
    this.blockUIList.start();
    this.SubProjectsSvc.addSubProject(this.SubProject).subscribe(response => {
      if (response) {
        // Show the success message
        this.snackBar.open('SubProject added', 'OK', {
          verticalPosition: 'bottom',
          duration: 1000,
          panelClass: 'mat-green-bg'
        });
        this.blockUIList.stop();
        this.router.navigate(['projects/subProjects']);
      }
    });
  }

  saveSubProject(): void {
    this.blockUIList.start();
    this.SubProjectsSvc.editSubProject(this.SubProject).subscribe(response => {
      if (response) {
        // Show the success message
        this.snackBar.open(
          'SubProject' + this.SubProject.name + '  Edited',
          'OK',
          {
            verticalPosition: 'top',
            duration: 1000,
            panelClass: 'mat-green-bg'
          }
        );
        this.blockUIList.stop();
        this.router.navigate(['projects/subProjects']);
      } else {
        this.snackBar.open(response, 'OK', {
          verticalPosition: 'top',
          duration: 1000,
          panelClass: 'mat-red-bg'
        });
        this.blockUIList.stop();
      }
    });
  }
  ngOnInit() {
    // Subscribe to update product on changes
    this.onSubProjectsChanged = this.SubProjectsSvc.onSubProjectsChanged.subscribe(
      SubProject => {
        if (SubProject) {
          //edit
          this.SubProject = new ProjectModel(SubProject);
          this.pageType = 'edit';
        } else {
          //add
          this.pageType = 'new';
          this.SubProject = new ProjectModel();
        }
      }
    );
    this.SubProjectsForm = this.formBuilder.group({
      name: [this.SubProject.name, Validators.required],
      details: [this.SubProject.detail],
      projectId: [this.SubProject.projectId],
      startDate: [this.SubProject.startDate],
      completeDate: [this.SubProject.completeDate]
    });
  }
}
