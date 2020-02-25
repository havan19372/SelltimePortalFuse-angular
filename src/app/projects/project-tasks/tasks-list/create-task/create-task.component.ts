import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TaskModel } from '../../tasks.model';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/startWith';
import { LookUpModel } from '../../../../core/lookUpCodes';
import { TimesheetModel } from '../../../project-timesheets/timesheet.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  task: TaskModel;
  createTaskForm: FormGroup;
  @Input()
  tasks: TaskModel[];
  @Input()
  projects: LookUpModel[];
  @Output()
  getTasksByName: EventEmitter<string> = new EventEmitter();
  @Output()
  saveTask: EventEmitter<TaskModel> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    // debugger;
    this.task = {
      id: null,
      name: '',
      projectId: 0,
      startDate: moment().format(),
      estimateHour: 0,

    };
    this.createTaskForm = this.fb.group({
      name: [this.task.name],
      projectId: [this.task.projectId],
      startDate: [this.task.startDate]
    });
  }


  createTask(): void {
    // debugger;
    const formValues = this.createTaskForm.getRawValue();
    this.task = {
      name: formValues.name,
      projectId: formValues.projectId,
      startDate:formValues.startDate ,
      estimateHour: 0
    };
    this.saveTask.emit(this.task);
    this.createTaskForm.reset();
  }

  ngOnInit() {
  console.log("@task",this.tasks);
    this.createTaskForm
      .get('name')
      .valueChanges.delay(1000)
      .startWith(null)
      .map(search => this.getTasksByName.emit(search));
  }
}
