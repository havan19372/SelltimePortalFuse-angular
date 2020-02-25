export class SingleTaskModel {
    name: string;
    detail: string;
    storeId: number;
    projectId: number;
    projectSubId: number;
    refNum: number;
    completeDate: string;
    startDate: string;
    estimateHour: number;
    projectName:'';
    attachments:
        {
            id: number,
            attachmentId: number,
            fileExtension: string,
            url: string,
            sourceFileName: string
        }[];
    statuses:
        {
            taskId: number;
            statusId: number;
            statusText: string;
            createDate:string;
             creator: string;
        } [];
    comments : TaskCommentModel[]=[];
}


export class TaskCommentModel 
        {
           taskId :string;
           comment :  string ;
           createDate :   string;
           creator :  string ;
           createById: string;
           attachments:
        {
            id: number,
            attachmentId: number,
            fileExtension: string,
            url: string,
            sourceFileName: string
        }[]=[];
        }