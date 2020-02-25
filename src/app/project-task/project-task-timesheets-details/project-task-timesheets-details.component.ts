import { Component, OnInit, ViewChild,OnDestroy, AfterViewInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatSelect } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { TasksService } from 'app/projects/project-tasks/tasks.service';
import { TaskModel } from 'app/projects/project-tasks/tasks.model';
import { TimesheetModel } from 'app/projects/project-timesheets/timesheet.model';
import { ProjectModel } from 'app/projects/project.model';
import { TimesheetService } from 'app/projects/project-timesheets/timesheet.service';
import { ProjectService } from 'app/projects/project.service';
import { LookUpService } from 'app/core/services/look-up.service';
import { LookUpCodes, LookUpModel } from 'app/core/lookUpCodes';
import { TaskCommentModel, SingleTaskModel } from 'app/projects/project-tasks/single-task/single-task-mode';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { SweetAlertService } from 'app/core/services/sweet-alert.service';
import { UserService } from 'app/users-new/user/user.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-project-task-timesheets-details',
  templateUrl: './project-task-timesheets-details.component.html',
  styleUrls: ['./project-task-timesheets-details.component.scss'],
  animations: fuseAnimations
})
export class ProjectTaskTimesheetsDetailsComponent implements OnInit, OnDestroy{
  public selectedSubProject:any;
  timesheet: TimesheetModel;
  timeSheetModel= new TimesheetModel();
  selectedProject: ProjectModel;
  selectedTask:TaskModel;
  formType: string;
  startDate:string;
  selected2Project:any;
  selected2User:any;
  selected2SubProject:any;
  Hourvalue:any;
  endDate:any;
  timesheetForm: FormGroup;
  taskStatus: LookUpModel[];
  action:string;
  //value:string;
  projectArray:any=[];
  subProjectArray:any=[];
  userArray:any=[];
  ///
  dialogTitle: string;
  projectList: LookUpModel[] = [];
  subProjectList: LookUpModel[] = [];
  statuses: any[] = [];
  project:ProjectModel;
  comments: TaskCommentModel[];
  newComment: TaskCommentModel;
  attachments: any[];
  taskForm: FormGroup;
  calculatedHour:any;
  selectedStatus: string;
  userFullName: string;
  commentText: string;
  imageUrl: string;
  isLoadingAttahment: boolean;
  @BlockUI('tasksDetails')
  blockUIList: NgBlockUI;
  private formBuilder: FormBuilder;
  tasksList: TaskModel[];
  cloneCopy:any[];
  subProject:any;
  SelectedprojectDetail:any;
  SelectedUser:any;
  name:any;
  onTasksChanged: Subscription;
  task = new SingleTaskModel();
  pageType: string = '';
  isNew: boolean = true;
  @ViewChild('notes') notes;
  startTimeEdit:any;//see stack-overflow for help
  endTimeEdit:any;
  onNewTimesheetClicked: Subscription;
  onCurrentTimesheetChanged: Subscription;
  onSelectedProjectChanged: Subscription;
  onSelectedTaskChanged:Subscription;
  defaultHour:number=0;
  defaultBreakHour:number;
  current_time:any;
  @ViewChild('singleSelect') singleSelect: MatSelect;
  @ViewChild('timeSheetForm') mytemplateForm:NgForm;
  private _onDestroy = new Subject<void>();
  planModel: any = {start_time: new Date() };
  defaultSettingModel:any={defaultHour:0,defaultBreakHour:0};
  constructor(
    private timesheetSvc: TimesheetService,
    private fb: FormBuilder,
    private projectSvc: ProjectService,
    private taskSrv:TasksService,
    private userService:UserService,
    private lookUpSvc:LookUpService,
    private snackBar: MatSnackBar,
    private notify: SweetAlertService
  ) {
  }
  createTimesheetForm(): FormGroup {
    debugger;
    return this.fb.group({
      id: [this.timesheet.id],
      notes: [this.timesheet.notes],
      startDate: [this.timesheet.startDate],
      completeDate: [this.timesheet.completeDate],
      projectId:[this.timesheet.projectId],//add Id's for edit mode.
      hours: [this.timesheet.hours],
      breakHours:[this.timesheet.breakHours],
      assignId:[this.timesheet.assignId,Validators.required],
      projectSubId:[this.timesheet.projectSubId],
      taskId:[this.timesheet.taskId],
      start_time:this.startTimeEdit,
      endTime:this.endTimeEdit,
      endDatewithoutTime:[this.timesheet.endTime]
    });
  }
  addTimesheet(): void {
    //set default values:
    debugger;
    this.current_time = moment().format("hh:mm:a");
    if (this.formType !== 'edit') {
         var timesheet = this.timesheetForm.getRawValue();
         //combine start_Time with Start_Date
         var startDate =moment.utc(timesheet.startDate).format('L');
         var startTime=this.startTimeEdit;//timesheet.start_time;
         var startDateTime = moment(startDate + ' ' + startTime, 'DD/MM/YYYY HH:mm');
         var startTimeAndDate = startDateTime.toISOString();
         //combine end_Time with end_Date
         var endDate =moment.utc(timesheet.completeDate).format('L');
         var endTime=this.endTimeEdit;//timesheet.endTime;
         var endDateTime = moment(endDate + ' ' + endTime, 'DD/MM/YYYY HH:mm');
         var endTimeAndDate = endDateTime.toISOString();
         this.timeSheetModel.hours=timesheet.hours;
         this.timeSheetModel.startDate=startTimeAndDate;
         this.timeSheetModel.completeDate=endTimeAndDate;
         this.timeSheetModel.projectId=timesheet.projectId.id;
         this.timeSheetModel.assignId=timesheet.assignId.memberId;
         this.timeSheetModel.projectSubId=timesheet.projectSubId.id;
         this.timeSheetModel.notes=timesheet.notes;
         this.timeSheetModel.taskId=timesheet.taskId;
         this.timeSheetModel.breakHours=timesheet.breakHours;
            this.timesheetSvc
                .createTimesheet(this.timeSheetModel)
                .subscribe(timesheet => {
              if (timesheet) {
                  this.notify.showSuccess('Success', 'Timesheet added');
                  this.mytemplateForm.reset();
               }
        });
    } 
    else 
    {
        debugger;
        var timesheet = this.timesheetForm.getRawValue();
        //combine start_Time with Start_Date
        var startDate =moment.utc(timesheet.startDate).format('L');
       //let startTime=timesheet.start_time;
        var startTime=this.startTimeEdit;
        var startDateTime = moment(startDate + ' ' + startTime, 'DD/MM/YYYY HH:mm');
        var startTimeAndDate = startDateTime.toISOString();
        //combine end_Time with end_Date
        var endDate =moment.utc(timesheet.completeDate).format('L');
        var endTime=timesheet.endTimeEdit;
        var endDateTime = moment(endDate + ' ' + endTime, 'DD/MM/YYYY HH:mm');
        var endTimeAndDate = endDateTime.toISOString();
        
        this.timeSheetModel.hours=timesheet.hours;
        this.timeSheetModel.startDate=startTimeAndDate || timesheet.startDate;
        this.timeSheetModel.completeDate=endTimeAndDate;//timesheet.completeDate;
        this.timeSheetModel.projectId=timesheet.projectId.id;
        this.timeSheetModel.projectSubId=timesheet.projectSubId.id;
        this.timeSheetModel.notes=timesheet.notes;
        this.timeSheetModel.assignId=timesheet.assignId.memberId;//.memberId;
        this.timeSheetModel.taskId=timesheet.taskId;
        this.timeSheetModel.breakHours=timesheet.breakHours;
        this.timeSheetModel.id=timesheet.id;
        this.timesheetSvc
      .editTimesheet(this.timeSheetModel)
      .subscribe(timesheet => {
        debugger;
        if (timesheet) {
          this.notify.showSuccess('Success', 'Timesheet Updated');
          this.mytemplateForm.reset();
        }
      });
    }
  }

  deleteTimesheet(): void {}
  focusTitleField(){
    setTimeout(() => {
      setTimeout(() => this.notes.nativeElement.focus(), 0);
    });
  }
  
  clearModel()
  {
    this.startTimeEdit=null;
    this.endTimeEdit=null;
  }
  compareFn(user1:any, user2:any) {
    return user1 && user2 ? user1.projectId === user2.projectId:user1=== user2;  
  }
  ngOnInit() {
    //set default values:
    this.current_time = moment().format("hh:mm:a");
    this.defaultSettingModel=new Object();
    this.defaultSettingModel.defaultBreakHour=0;
    this.defaultSettingModel.defaultHour=0;
    this.onCurrentTimesheetChanged = this.timesheetSvc.onCurrentTimesheetChanged.subscribe(
      ([timesheet, formType]) => {
        if (timesheet && formType === 'edit') {
          let gmtDateTime =moment.utc(timesheet.startDate);
          let zmtDateTime=moment.utc(timesheet.completeDate);
          var startTimelocal = gmtDateTime.local().format('YYYY-MMM-DD,hh:mm A');
          var endTimelocal = zmtDateTime.local().format('YYYY-MMM-DD,hh:mm A');
          if(timesheet.startDate&& timesheet.completeDate){
          let startTimeWithoutDate = startTimelocal;//startDate;
          this.startTimeEdit =moment(startTimeWithoutDate).format("hh:mm A");
          let endTimeWithoutDate = endTimelocal;//completeDate;
          this.endTimeEdit =moment(endTimeWithoutDate).format("hh:mm A");
          }
          this.formType = 'edit';
          debugger;
          this.timesheet = new TimesheetModel(timesheet);
          this.timesheetForm = this.createTimesheetForm();
        }
      }
    );
    this.taskSrv.taskState.subscribe(taskState=>{
        this.projectArray=[];
        this.subProjectArray=[];
        this.userArray=[];
        debugger
      if(taskState.projectSubId){
        //this.taskSrv.getSubProject(taskState.projectSubId).subscribe(elem=>{
          this.taskSrv.getAllSubProject().subscribe(elem=>{
          this.subProject=elem.filter(subId=>subId.id==taskState.projectSubId);
          this.subProjectArray=this.subProject;
          //this.subProjectArray.push(this.subProject);
          this.selected2SubProject=this.subProjectArray[0];
        });
      }
      if(taskState.projectId){
        //this.taskSrv.getSelectedProject(taskState.projectId).subscribe(project=>{
          this.taskSrv.onprojectList.subscribe(projects => {
          this.SelectedprojectDetail=projects.filter(project=>project.id===taskState.projectId);
          this.projectArray=this.SelectedprojectDetail;//.push(this.SelectedprojectDetail);
           this.selected2Project = this.projectArray[0];
        });
      }
      if(taskState.assignId){
        this.userService.getSelectedUser(taskState.assignId).subscribe(user=>{
           this.userArray.push(user);
           this.selected2User=this.userArray[0];
        });
      }
      this.tasksList=taskState;
    });

    this.onNewTimesheetClicked = this.timesheetSvc.onNewTimesheetClicked.subscribe(
      ([timesheet, formType]) => {
        debugger;
        this.timesheet = new TimesheetModel();
        this.formType = 'add';
        this.timesheetForm = this.createTimesheetForm();
        this.focusTitleField();
        this.clearModel();
      }
    );

    this.onSelectedProjectChanged = this.projectSvc.onSelectedProjectChanged.subscribe(
      project => {
        this.selectedProject = project;
      }
    );
    this.onSelectedTaskChanged=this.taskSrv.onSelectedTaskChanged.subscribe(tasks=>{
      this.selectedTask=tasks;
    });
  }
  
 
  compareProjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.projectId === o2.projectId;
   }

  compareSubProject(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.projectSubId === o2.projectSubId;
  }
  compareUser(o1:any,o2: any): boolean {
    return o1.userName === o2.userName && o1.assignId === o2.assignId;
  }
  calculateHours()
  {
    let startDatewithoutTime:any=moment.utc(this.planModel).format('L');
    let endDatewithoutTime:any=moment.utc(this.endDate._d).format('L');
    let date1 = moment(startDatewithoutTime, 'MM/DD/YYYY'),
	  date2 = moment(endDatewithoutTime, 'MM/DD/YYYY');
    let duration:any= moment.duration(date2.diff(date1));
     duration = duration.asHours();
     this.Hourvalue = duration;
  }
  
  ngOnDestroy(): void {
    this.onCurrentTimesheetChanged.unsubscribe();
    this.onSelectedProjectChanged.unsubscribe();
    this.onNewTimesheetClicked.unsubscribe();
  }
}