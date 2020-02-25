import { Component, OnInit, Inject } from '@angular/core';
import { ProjectModel } from '../project.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SweetAlertService } from '../../core/services/sweet-alert.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  action: string;
  dialogTitle: string;
  project: ProjectModel;
  projectForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProjectCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private sweetAlert: SweetAlertService,
    private projectSvc: ProjectService
  ) {}
  
  createProjectForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.project.id],
      name: [this.project.name],
      detail: [this.project.detail],
      storeId: [this.project.storeId],
      businessId: [this.project.businessId],
      completeDate: [this.project.completeDate],
      startDate: [this.project.startDate]
    });
  }

  deleteProject(): void {
    this.sweetAlert.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.projectSvc.deleteProject(this.project).subscribe(response => {
            this.sweetAlert.showSuccess(
              'Deleted Successfully',
              `Project ${this.project.name} deleted !`
            );
            this.dialogRef.close();
          });
        }
      }
    );
  }
  
  ngOnInit() {
    this.action = this.data.action;
    if (this.action === 'add') {
      this.dialogTitle = 'New Project';
      this.project = new ProjectModel();
    } else if (this.action === 'edit') {
      this.dialogTitle = 'Edit Project';
      this.project = this.data.project;
    }
    this.projectForm = this.createProjectForm();
  }
}
