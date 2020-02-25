import { AttachmentModel } from "./attachment.model";
import { CommentModel } from "./comment.model";
import { StatusModel } from "./status.model";

export interface TaskModel {
   
    
    id?: number,
    comment?: string,
    createDate?: string,
    creator?: string,
    createById?: number,

    name?: string,
    detail?: string,
    refNum?: number,
    projectSubId?: number,
    storeId?: number,
    projectId?: number,
    statusId?: number,
    projectName?: string,
    completeDate?: string,
    startDate?: string,
    estimateHour?: number,

    commentsCount?: number,
    attachmentCount?: number,
    storeName?: string,
    status?: string,
    assign?: string,
    
    attachments?: AttachmentModel[],
    statuses?: StatusModel[ ],
    comments?: CommentModel[ ],
    assignId?: number
  }
  