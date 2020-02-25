import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';
import { LookUpModel, LookUpCodes } from '../../../core/lookUpCodes';
import { LookUpService } from '../../../core/services/look-up.service';
import { Subscription } from 'rxjs';

import { environment } from 'environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SingleTaskModel, TaskCommentModel } from './single-task-mode';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { UploadService } from '../../../core/services/upload.service';
import { AuthenticationService } from '../../../auth/athentication.service';
import { MatSnackBar } from '@angular/material';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss'],
  animations: fuseAnimations
})
export class SingleTaskComponent implements OnInit {
  taskStatus: LookUpModel[];
  projectList: LookUpModel[] = [];
  subProjectList: LookUpModel[] = [];

  statuses: any[] = [];
  comments: TaskCommentModel[];
  newComment: TaskCommentModel;
  attachments: any[];
  taskForm: FormGroup;
  selectedStatus: string;
  userFullName: string;
  commentText: string;
  imageUrl: string;
  isLoadingAttahment: boolean;
  @BlockUI('tasksDetails')
  blockUIList: NgBlockUI;

  private formBuilder: FormBuilder;

  public ImageUrl = environment.ImageApiUrl;
  task = new SingleTaskModel();
  pageType: string = '';
  isNew: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private taskSrv: TasksService,
    private lookUpSvc: LookUpService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    public snackBar: MatSnackBar,
    private location: Location,
    private authSrv: AuthenticationService
  ) {
    /*this.userFullName = this.authSrv.getUserToken().fullName;
    this.route.params.subscribe(params => {
      this.pageType = params['id'];
      if (this.pageType !== 'new') {
        this.isNew = false;
        this.blockUIList.start();
        this.taskSrv.getSingleTask(params['id']).subscribe(task => {
          this.blockUIList.stop();
          this.task = task;
          this.statuses = this.task.statuses;
          this.comments = this.task.comments;
          this.attachments = this.task.attachments;
          this.taskForm = this.createForm();
        });
      } else {
        this.statuses = [];
        this.comments = [];
        this.attachments = [];
      }
      this.imageUrl = environment.ImageApiUrl;
      this.taskForm = this.createForm();
      this.newComment = new TaskCommentModel();
    });*/
  }
  ngOnInit() {
    this.fillLookUpData();
    this.imageUrl = environment.ImageApiUrl;
    this.taskForm = this.createForm();
    this.newComment = new TaskCommentModel();
    
    /*this.userFullName = this.authSrv.getUserToken().fullName;
    this.route.params.subscribe(params => {
      this.pageType = params['id'];
      if (this.pageType !== 'new') {
        this.isNew = false;
        this.blockUIList.start();
        this.taskSrv.getSingleTask(params['id']).subscribe(task => {
          this.blockUIList.stop();
          this.task = task;
          this.statuses = this.task.statuses;
          this.comments = this.task.comments;
          this.attachments = this.task.attachments;
          this.taskForm = this.createForm();
        });
      } else {
        this.statuses = [];
        this.comments = [];
        this.attachments = [];
      }
      //this.imageUrl = environment.ImageApiUrl;
      //this.taskForm = this.createForm();
      //this.newComment = new TaskCommentModel();
    });*/
  }
  updateStatus() {
    this.statuses.push({
      taskId: this.pageType !== 'new' ? this.pageType : null,
      statusId: this.selectedStatus,
      statusText: this.taskStatus.filter(c => c.value == this.selectedStatus)[0]
        .text,
      createDate: new Date()
    });
  }
  addNewComment() {
    this.newComment.comment = this.commentText;
    this.newComment.taskId = this.pageType !== 'new' ? this.pageType : null;
    this.newComment.createDate = new DatePipe('en-US').transform(
      new Date(),
      'short'
    );
    this.newComment.creator = this.userFullName;
    this.comments.push(this.newComment);
    this.newComment = new TaskCommentModel();
    this.commentText = '';
  }
  fillLookUpData(): void {
    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.TaskStatuses)
      .subscribe((response: LookUpModel[]) => {
        this.taskStatus = response;
      });
    this.taskSrv.onTaskChanged.subscribe(task => {
      if (task) {
        this.task = task;
      } else {
        this.task = new task();
      }
    });
    this.taskSrv.onprojectList.subscribe(projects => {
      this.projectList = projects.length ? projects : [];
    });
    this.taskSrv.onsubProjectList.subscribe(projects => {
      this.subProjectList = projects.length ? projects : [];
    });
  }
  
  createForm() {
    return this.fb.group({
      name: [this.task.name],
      refNum: [this.task.refNum],
      projectSubId: [this.task.projectSubId],
      attachments: [this.task.attachments],
      detail: [this.task.detail],
      completeDate: [this.task.completeDate],
      startDate: [this.task.startDate],
      estimateHour: [this.task.estimateHour],
      projectId: [this.task.projectId],
      status: ['']
    });
  }

  onChange(event: any, imageType: number) {
    const files = [].slice.call(event.target.files);
    if (files && files[0]) {
      const fileToUpload = files;
      this.isLoadingAttahment = true;
      this.uploadService.uploadMultiFiles(fileToUpload).subscribe(res => {
        this.isLoadingAttahment = false;
        if (imageType == 1) {
          res.forEach(element => {
            this.newComment.attachments.push({
              id: 0,
              attachmentId: element.id,
              url: element.url,
              fileExtension: element.fileExtension,
              sourceFileName: element.sourceFileName
            });
          });
        } else {
          res.forEach(element => {
            this.attachments.push({
              id: 0,
              attachmentId: element.id,
              url: element.url,
              fileExtension: element.fileExtension,
              sourceFileName: element.sourceFileName
            });
          });
        }
      });
    }
  }

  LoadTikemSheet() {
    alert('TimeSheet');
  }
  isImage(extension) {
    debugger;
    return (
      extension.toLower() == 'png' ||
      extension.toLower() == 'jpg' ||
      extension.toLower() == 'jpeg'
    );
  }

  saveTask() {
    var formValues = this.taskForm.value;
    this.task.name = formValues.name;
    this.task.completeDate = formValues.completeDate;
    this.task.detail = formValues.detail;
    this.task.estimateHour = formValues.estimateHour;
    this.task.startDate = formValues.startDate;
    this.task.projectId = formValues.projectId;
    this.task.refNum = formValues.refNum;
    this.task.projectSubId = formValues.projectSubId;
    this.task.attachments = this.attachments;
    this.task.statuses = this.statuses;
    this.task.comments = this.comments;
    this.blockUIList.start();
    this.taskSrv
      .mainpluateServerTask(
        this.pageType == 'new' ? null : parseInt(this.pageType),
        this.task
      )
      .subscribe(
        res => {
          this.snackBar.open(`task ${res.name}  added `, 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });

          this.blockUIList.stop();
          this.location.back();
        },
        error => {
          this.blockUIList.stop();
          this.location.back();
        }
      );
  }
}
