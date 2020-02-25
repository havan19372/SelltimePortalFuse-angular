import { Moment } from 'moment';
import { TimesheetModel } from '../project-timesheets/timesheet.model';

export interface TaskModel {
  id?: number;
  name?: string;
  detail?: string;
  storeId?: number;
  projectId?: number;
  projectSubId?: number;
  refNum?: number;
  //breakHours:number;
  completeDate?: string;
  startDate?: string;
  estimateHour?: number;
  projectName?: string;
  timesheets?:TimesheetModel[];
  attachments?: AttachmentModel[];
  statuses?: TaskStatus[];
}

export interface AttachmentModel {
  id?: number;
  attachmentId?: number;
  fileExtension?: string;
  url?: string;
  sourceFileName?: string;
}

export interface TaskStatus {
  taskId?: number;
  statusId?: number;
  statusText?: string;
  createDate?: string;
  creator?: string;
}
