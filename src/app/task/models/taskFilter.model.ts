export interface TaskFilterModel {
    projectId?: number,
    projectSubId?: number,
    taskId?: number,
    pageNumber: number,
    pageSize: number,
    userId?: number,
    statusId?: number,
    memberId?: number,
    name?: string,
    searchQuery?: string,
    orderBy?: string,
    refNum?: string,
    dateFrom?: string,
    dateTo?: string,
    deleted?: boolean,
    NotDone?:boolean
  }
  