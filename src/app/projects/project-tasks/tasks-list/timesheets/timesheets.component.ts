import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel } from '../../tasks.model';
import { TimesheetModel } from '../../../project-timesheets/timesheet.model';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.scss'],
  animations: fuseAnimations
})
export class TimesheetsComponent implements OnInit {
  @Input()
  tasks: TaskModel[];
  createTimesheetForm: FormGroup;
  @Output()
  onSaveTimesheet: EventEmitter<TimesheetModel> = new EventEmitter();
  constructor(private fb: FormBuilder) {}

  addTimesheet(task: TaskModel): void {
    if (!task.timesheets) {
      task.timesheets = [];
    }
    let timesheet = {
      notes: '',
      projectId: task.projectId,
      taskId: task.id,
      taskName: task.name,
      hours: 0,
      startDate: moment().format(),
      startTime: moment().format('HH:mm:ss'),
      endTime: moment().format('HH:mm:ss'),
      //breakHours:null,//added break-hour
      timer: null
    };

    task.timesheets.push(timesheet);
    this.startTimer(timesheet, task);
  }

  startTimer(timesheet: TimesheetModel, task: TaskModel): void {
    timesheet.timerRunning = true;
    timesheet.timer = setInterval(() => {
      if (
        moment(timesheet.startTime, 'HH:mm:ss').isSame(
          moment(timesheet.endTime, 'HH:mm:ss')
        )
      ) {
        timesheet.endTime = moment(timesheet.startTime, 'HH:mm:ss')
          .add(1, 'seconds')
          .format('HH:mm:ss');
      } else {
        timesheet.endTime = moment(timesheet.endTime, 'HH:mm:ss')
          .add(1, 'seconds')
          .format('HH:mm:ss');
      }
      this.calculateHours(timesheet, task);
    }, 1000);
  }

  stopTimer(timesheet: TimesheetModel, task: TaskModel): void {
    timesheet.timerRunning = false;
    clearInterval(timesheet.timer);

    this.calculateHours(timesheet, task);
  }

  calculateHours(timesheet: TimesheetModel, task: TaskModel): void {
    setTimeout(() => {
      let mins = moment
        .utc(
          moment(timesheet.endTime, 'HH:mm:ss').diff(
            moment(timesheet.startTime, 'HH:mm:ss'),
            'minutes'
          )
        )
        .format('mm');

      let hours = moment(timesheet.endTime, 'HH:mm:ss').diff(
        moment(timesheet.startTime, 'HH:mm:ss'),
        'hours'
      );

      timesheet.totalTime =
        moment(timesheet.endTime, 'HH:mm:ss').diff(
          moment(timesheet.startTime, 'HH:mm:ss'),
          'hours'
        ) +
        ':' +
        mins;

      task.estimateHour += hours;
    }, 1000 * 60);
  }

  saveTimesheet(timesheet: TimesheetModel): void {
    debugger;
    this.onSaveTimesheet.emit(timesheet);
  }

  ngOnInit() {}
}

