export class SingleTaskModel {
    name: string;
    id:number;
    detail: string;
    userName:string;
    storeId: number;
    projectId: any;
    projectSubId: number;
    refNum: number;
    completeDate: string;
    startDate: string;
    status:string;
    assignId:number;
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