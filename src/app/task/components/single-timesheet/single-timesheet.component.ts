import { environment } from './../../../../environments/environment.prod';
import { Data } from '@angular/router';

import * as _ from 'lodash';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UploadService } from '../../../core/services/upload.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { AuthenticationService } from '../../../auth/athentication.service';
import { TimesheetModel } from 'app/task/models/timesheet.model';
import { LookUpModel } from 'app/core/lookUpCodes';
import { TaskLookupService } from 'app/task/service/task-lookup.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import * as moment from 'moment';

@Component({
  selector: 'app-single-timesheet',
  templateUrl: './single-timesheet.component.html',
  styleUrls: ['./single-timesheet.component.scss']
})
export class SingleTimesheetComponent implements OnInit {
  action: string;
  dialogTitle: string;
  timeSheet: TimesheetModel;
  timeSheetForm: FormGroup;
  allowedExtensions = '/(.jpg|.jpeg|.png|.gif)$/i';
  projectList: LookUpModel[];
  filteredSubProject: any[];
  userList: any[];
  imageUrl = environment.ImageApiUrl;

  @ViewChild('fileInput') fileInput;
  @BlockUI('projectCreateBlock') blockUIList: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    public dialogRef: MatDialogRef<SingleTimesheetComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private authSvc: AuthenticationService,
    private taskLookupServie: TaskLookupService,
    private atp: AmazingTimePickerService,
    public snackBar: MatSnackBar
  ) { }
  createProjectMessageForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.timeSheet.id],
      notes: [this.timeSheet.notes],
      // createDate: [this.timeSheet.date],
      creator: [this.timeSheet.creator],
      projectId: [this.timeSheet.projectId],
      breakHours: [this.timeSheet.breakHours],
      attachments: [this.timeSheet.attachments],
      projectSubId: [this.timeSheet.projectSubId],
      startDate: [new Date(this.timeSheet.startDate)],
      completeDate: [this.timeSheet.completeDate !='' &&this.timeSheet.completeDate  !=null?new Date(this.timeSheet.completeDate):this.timeSheet.completeDate],
      startTime: [this.timeSheet.startTime],
      taskId: [this.timeSheet.taskId],
      assignId: [this.timeSheet.assignId],
      hours: [this.timeSheet.hours],
      endTime: [this.timeSheet.endTime],
    });
  }

  onChange(event: any) {
    this.blockUIList.start();

    const files = [].slice.call(event.target.files);
    if (files && files[0]) {
      const fileToUpload = files;

      this.uploadService.uploadMultiFiles(fileToUpload).subscribe(res => {
        res.forEach(element => {
          const attachment = {
            attachmentId: element.id,
            url: element.url
          };
          if (!this.timeSheet.attachments) {
            this.timeSheet.attachments = [];
          }
          this.timeSheet.attachments.unshift(attachment);

          this.timeSheetForm
            .get('attachments')
            .setValue(this.timeSheet.attachments);

          this.blockUIList.stop();
        });
      });
    }
  }

  deleteAttach(image): void {
    _.remove(
      this.timeSheet.attachments,
      att => att.attachmentId === image.attachmentId
    );

    this.timeSheetForm
      .get('attachments')
      .setValue(this.timeSheet.attachments);
  }

  ngOnInit() {
    this.initializeLookup();
    this.action = this.data.action;
    if (this.action === 'new') {
      this.dialogTitle = `New time record For task #${this.data.task.id}`;
      this.timeSheet = {
        creator: this.authSvc.getUserToken().fullName,
        taskId: this.data.task.id,
        projectId: this.data.task.projectId,
        projectSubId: this.data.task.projectSubId,
        assignId: this.authSvc.getUserToken().userId,
        startDate: new Date().toISOString(),
        completeDate:'', 
        hours: 0.0,
        breakHours: 0.0,
        startTime:moment(new Date()).format('HH:mm'),
        endTime:'',
        done:false
      };
    } else if (this.action === 'edit') {
      this.dialogTitle = `Edit Time Record For #${this.data.task.id}`;
      this.timeSheet = this.data.timeSheet;
    }

    this.timeSheetForm = this.createProjectMessageForm();
  }

  uploadFile(event) {
    const files = [].slice.call(event.target.files);
    if (files && files[0]) {
      const fileToUpload = files;

      this.uploadService.uploadMultiFiles(fileToUpload).subscribe(res => {
        res.forEach(element => {
          const attachment = {
            attachmentId: element.id,
            url: element.url,
            sourceFileName:element.sourceFileName,
            fileExtension:element.fileExtension
          };

          this.timeSheet.attachments.unshift(attachment);
        });
      });
    }
  }

  initializeLookup() {
    this.taskLookupServie.onprojectList.subscribe(data => this.projectList = data);
    this.taskLookupServie.onSubprojectList.subscribe(data => this.filteredSubProject = data);
    this.taskLookupServie.onUsers.subscribe(data => this.userList = data);
  }
  calculateHour() {
    alert("hours")
  }

  startTimeChange(value) {
    this.timeSheet.startTime = value;
    this.TimeChange();
  }
  endTimeChange(value) {
    this.timeSheet.endTime = value;
    this.TimeChange();
  }
  completeDateChange(value) {
    this.timeSheet.completeDate = new Date(value).toISOString();
    this.TimeChange();
  }
  startDateChange(value) {
    this.timeSheet.startDate = new Date(value).toISOString();
    this.TimeChange();
  }
  copyStartDatet(){
    if ( this.timeSheet.completeDate==""){ 
        this.timeSheetForm.controls['completeDate'].setValue(this.timeSheet.startDate);
    }
  }
  breakHoursChange(value){
    this.timeSheet.breakHours =value;
    this.TimeChange();
  }
  TimeChange() {
    var startDate = moment(this.timeSheet.startDate).format('DD/MM/YYYY');
    var startDateTime = moment(startDate + ' ' + this.timeSheet.startTime, 'DD/MM/YYYY HH:mm');
    var endDate = moment(this.timeSheet.completeDate).format('DD/MM/YYYY');
    var endDateTime = moment(endDate + ' ' + this.timeSheet.endTime, 'DD/MM/YYYY HH:mm');
    let duration: any = moment.duration(endDateTime.diff(startDateTime));
    duration = duration.asHours();
    var hours=(duration-this.timeSheet.breakHours);
    if(hours==NaN){
      this.snackBar.open(`Please, enter correct time information`, 'OK', { verticalPosition: 'top', duration: 1000 });
    }else{
      this.timeSheet.hours=hours<0?this.timeSheet.hours=0.0: parseFloat( hours.toFixed(3));

    }
    if(isNaN(this.timeSheet.hours)){this.timeSheet.hours=0;}
  }

}
