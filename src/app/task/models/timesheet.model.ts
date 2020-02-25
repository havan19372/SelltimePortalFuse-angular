import { AttachmentModel } from "./attachment.model";

export class TimesheetModel {
  id?: number;
  notes?: string;
  creator?: string='';
  storeId?: number;
  hours?: number=0.0;//
  breakHours?:number=0.0;//
  projectId?: number;
  projectName?: string;
  projectSubId?: number;
  assignId?:number;
  taskId?: number;
  //userName?:string;
  taskName?: string;
  attachmentCount?:number;
  attachments?: AttachmentModel[]=[];
  completeDate?: string;
  startDate?: string;//string;
  startTime?: string;
  endTime?: string;
  totalTime?:string;
  timer?: any;
  timerRunning?:boolean;
  done:boolean;
  
}
