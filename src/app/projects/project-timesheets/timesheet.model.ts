import { Moment } from 'moment';

export class TimesheetModel {
  id?: number;
  notes?: string;
  creator?: string;
  storeId?: number;
  hours?: number;//
  breakHours?:number;//
  projectId?: number;
  projectName?: string;
  projectSubId?: number;
  assignId?:number;
  taskId?: number;
  //userName?:string;
  taskName?: string;
  attachments?: {
    attachmentId?: number;
    url?: string;
  }[];
  completeDate?: string;
  startDate?: any;//string;
  startTime?: string;
  endTime?: string;
  totalTime?:string;
  timer?: any;
  timerRunning?:boolean;
  constructor(timesheet?: TimesheetModel) {
    timesheet = timesheet ? timesheet : {};
    this.id = timesheet.id ? timesheet.id : null;
    this.assignId=timesheet.id?timesheet.assignId:null;
    this.creator = timesheet.creator ? timesheet.creator : null;
    //this.userName= timesheet.userName ? timesheet.userName : null;
    this.startDate = timesheet.startDate ? timesheet.startDate:new Date();//null;
    this.completeDate = timesheet.completeDate ? timesheet.completeDate : null;
    this.hours = timesheet.hours ? timesheet.hours:0;//null;
    this.breakHours=timesheet.breakHours ? timesheet.breakHours:0;//null;
    this.notes = timesheet.notes ? timesheet.notes : null;
    this.projectId = timesheet.projectId ? timesheet.projectId : null;
    this.projectSubId = timesheet.projectSubId ? timesheet.projectSubId : null;
    this.taskId = timesheet.taskId ? timesheet.taskId : null;
    this.storeId = timesheet.storeId ? timesheet.storeId : null;
    this.attachments = timesheet.attachments ? timesheet.attachments : [];
  }
}
