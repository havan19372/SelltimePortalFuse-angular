import { AttachmentModel } from "./attachment.model";

export interface CommentModel {
    id?:number,
    taskId?: number,
    comment?: string,
    createDate?: string,
    creator?: string,
    createById?: number,
    attachments?: AttachmentModel[]
  }
  