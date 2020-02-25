import { Component, OnInit, Inject } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { LookUpModel, LookUpCodes } from 'app/core/lookUpCodes';
import { TaskCommentModel, SingleTaskModel } from '../single-task-model';
import { TasksService } from 'app/projects/project-tasks/tasks.service';
import { LookUpService } from 'app/core/services/look-up.service';
import { UploadService } from 'app/core/services/upload.service';
import { AuthenticationService } from 'app/auth/athentication.service';
import { TaskModel } from 'app/projects/project-tasks/tasks.model';
import * as moment from 'moment';
import { ProjectModel } from 'app/projects/project.model';
import { ApiService } from 'app/core/services/api.service';
@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss'],
  animations: fuseAnimations
})
export class SingleTaskComponent implements OnInit {
  taskStatus: any[];
  action:string;
  dialogTitle: string;
  projectList: LookUpModel[] = [];
  projectDefault: any;
  userList:any[]=[];
  filteredSubProject:any[]=[];
  taskStatusArray:any[];
  subProjectList:any[] = [];
  statuses: any[] = [];
  project:ProjectModel;
  comments: TaskCommentModel[];
  newComment: TaskCommentModel;
  attachments: any[];

  defaultStatus:any[];
  
  taskForm: FormGroup;
  selectedStatus:any[];
  userFullName: string;
  commentText: string;
  imageUrl: string;
  isLoadingAttahment: boolean;
  @BlockUI('tasksDetails')
  blockUIList: NgBlockUI;
  private formBuilder: FormBuilder;
  tasksList: TaskModel[];
  onTasksChanged: Subscription;
  public ImageUrl = environment.ImageApiUrl;
  task = new SingleTaskModel();
  pageType: string = '';
  isNew: boolean = true;
  planModel: any = {start_time: new Date() };
  endDate:any;
  Hourvalue:any;
  constructor(
    private route: ActivatedRoute,
    private taskSrv: TasksService,
    private lookUpSvc: LookUpService,
    private apiService:ApiService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    public snackBar: MatSnackBar,
    private location: Location,
    public dialogRef: MatDialogRef<SingleTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private authSrv: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.fillLookUpData();
    this.imageUrl=environment.ImageApiUrl;
    this.action = this.data.action;
    if (this.action === 'add') {
      this.dialogTitle = 'New Task';
      this.task = new SingleTaskModel();
    } else if (this.action === 'edit') {
      // debugger;
      this.dialogTitle = 'Edit Task';
      this.task = this.data.task;
      console.log("this.task",this.task);
      this.endDate= this.task.completeDate;
      this.Hourvalue=this.task.estimateHour;
    }
    this.taskForm=this.createForm();
  }


  fillLookUpData(): void {
    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.TaskStatuses)
      .subscribe((response: LookUpModel[]) => {
        console.log("@responseStatus",response);
        this.taskStatus = response;
        this.selectedStatus = this.taskStatus[0];
      });
    this.taskSrv.onTaskChanged.subscribe(task =>{
      if (task) {
        this.task = task;
      } else {
        this.task = new task();
      }
    });

    this.taskSrv.onprojectList.subscribe(projects => {
      this.projectList = projects.length ? projects : [];

      if( this.projectList.length > 0 )
      {
        this.projectDefault = this.projectList[0]['id'];
      }
      console.log("SlectedProjectList",this.projectList);
    });
    this.taskSrv.onsubProjectList.subscribe(projects => {
      this.subProjectList = projects.length ? projects : [];
      console.log("@FiltersubProject",this.subProjectList);
    });
    this.apiService.get('User?PageNumber=1&PageSize=100').subscribe(res=>{
      //call user service:
      console.log("@userList",res);
      this.userList=res;
    })
  }

  createForm() {
    console.log("$",this.task.status);
    return this.fb.group({
      name: [this.task.name],
      id:[this.task.id],
      refNum:[this.task.refNum],
      attachments: [this.task.attachments],
      detail: [this.task.detail],
      assignId:[this.task.assignId],
      completeDate:[this.task.completeDate],
      startDate: [this.task.startDate],
      estimateHour:[this.task.estimateHour],
      projectId: [this.task.projectId],
      status:[this.task.status],//not work in edit-mode 
      projectName:[this.task.projectName],
      projectSubId: [this.task.projectSubId],
    });
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
    this.task.storeId=null;
    this.task.attachments = [];
    this.task.statuses = [];
    this.task.comments = [];
    this.blockUIList.start();
    this.taskSrv
      .mainpluateServerTask(
        this.pageType == 'new' ? null : parseInt(this.pageType),
        this.task
      )
      .subscribe(
        res => {
          this.snackBar.open(`task ${res.name}  saved `, 'OK', {
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
 public updateStatus(){
    this.statuses.push({
      taskId: this.pageType !== 'new' ? this.pageType : null,
      statusId: this.selectedStatus[0].value,
      statusText: this.taskStatus.filter(c => c.value == this.selectedStatus)[0].text,
      createDate: new Date()
    });
    console.log("$statuses",this.statuses);
    this.taskSrv.taskStatus=this.statuses;
  }

selectedProject(project:any){
   // debugger;
   this.filteredSubProject=this.subProjectList.filter(subProject=>subProject.projectId===project);
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

  compareStatus(o1: any, o2: any): boolean {
    console.log("comparsion",o1,o2);
    return o1.text === o2.text && o1.value === o2.value;
   }

  LoadTikemSheet() {
    alert('TimeSheet');
  }

  isImage(extension) {
    // debugger;
    return (
      extension.toLower() == 'png' ||
      extension.toLower() == 'jpg' ||
      extension.toLower() == 'jpeg'
    );
  }
 calculateHour(){
  if(this.planModel && this.endDate._d){
  let startDatewithoutTime:any=moment.utc(this.planModel).format('L');
  let endDatewithoutTime:any=moment.utc(this.endDate._d).format('L');
  let startDateDuration = moment(startDatewithoutTime, 'MM/DD/YYYY'),
  endDateDuration = moment(endDatewithoutTime, 'MM/DD/YYYY');
//declare another moment object, this time holding the time difference between both dates. Be careful with using the .diff() function on the earlier date, otherwise you may get funky results product of moment treating date objects as integers.
  let duration:any= moment.duration(endDateDuration.diff(startDateDuration));
//finally, extract the time value using your unit of choice.
   duration = duration.asHours();
   this.Hourvalue = duration;
  }
}
}
