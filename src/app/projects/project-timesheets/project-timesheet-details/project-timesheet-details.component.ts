import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TimesheetModel } from '../timesheet.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { TimesheetService } from '../timesheet.service';
import { ProjectModel } from '../../project.model';
import { ProjectService } from '../../project.service';
import { MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { SweetAlertService } from '../../../core/services/sweet-alert.service';
import { TasksService } from 'app/projects/project-tasks/tasks.service';
import { TaskModel } from 'app/projects/project-tasks/tasks.model';

@Component({
  selector: 'app-project-timesheet-details',
  templateUrl: './project-timesheet-details.component.html',
  styleUrls: ['./project-timesheet-details.component.scss'],
  animations: fuseAnimations
})
export class ProjectTimesheetDetailsComponent implements OnInit, OnDestroy {
  timesheet: TimesheetModel;
  selectedProject: ProjectModel;
  selectedTask:TaskModel;
  formType: string;
  timesheetForm: FormGroup;

  @ViewChild('titleInput') titleInputField;

  onNewTimesheetClicked: Subscription;
  onCurrentTimesheetChanged: Subscription;

  onSelectedProjectChanged: Subscription;
  onSelectedTaskChanged:Subscription;

  constructor(
    private timesheetSvc: TimesheetService,
    private fb: FormBuilder,
    private projectSvc: ProjectService,
    private taskSvh:TasksService,
    private snackBar: MatSnackBar,
    private notify: SweetAlertService
  ) {}

  createTimesheetForm(): FormGroup {
    debugger;
    return this.fb.group({
      id: [this.timesheet.id],
      notes: [this.timesheet.notes],
      startDate: [this.timesheet.startDate],
      completeDate: [this.timesheet.completeDate],
      projectId: [this.selectedProject.id],
      hours: [this.timesheet.hours]
    });
  }

  addTimesheet(): void {
    if (this.formType !== 'edit') {
      this.timesheetSvc
        .createTimesheet(this.timesheetForm.getRawValue())
        .subscribe(timesheet => {
          // debugger;
          if (timesheet) {
            this.notify.showSuccess('Success', 'Timesheet added');
          }
        });
    } else {
      this.timesheetSvc
      .editTimesheet(this.timesheetForm.getRawValue())
      .subscribe(timesheet => {
        debugger;
        if (timesheet) {
          this.notify.showSuccess('Success', 'Timesheet Updated');
        }
      });
    }
  }

  deleteTimesheet(): void {}

  focusTitleField() {
    setTimeout(() => {
      this.titleInputField.nativeElement.focus();
    });
  }

  ngOnInit() {
    this.onCurrentTimesheetChanged = this.timesheetSvc.onCurrentTimesheetChanged.subscribe(
      ([timesheet, formType]) => {
        if (timesheet && formType === 'edit') {
          this.formType = 'edit';
          this.timesheet = new TimesheetModel(timesheet);
          this.timesheetForm = this.createTimesheetForm();
        }
      }
    );

    this.onNewTimesheetClicked = this.timesheetSvc.onNewTimesheetClicked.subscribe(
      ([timesheet, formType]) => {
        // debugger;
        this.timesheet = new TimesheetModel();
        this.formType = 'add';
        this.timesheetForm = this.createTimesheetForm();
        this.focusTitleField();
      }
    );

    this.onSelectedProjectChanged = this.projectSvc.onSelectedProjectChanged.subscribe(
      project => {
        this.selectedProject = project;
      }
    );
    //added for task;
    this.onSelectedTaskChanged=this.taskSvh.onSelectedTaskChanged.subscribe(task=>{
      this.selectedTask=task;
    })

  }

  ngOnDestroy(): void {
    this.onCurrentTimesheetChanged.unsubscribe();
    this.onSelectedProjectChanged.unsubscribe();
    this.onNewTimesheetClicked.unsubscribe();
  }
}
