export interface ProjectsBoard {
  id?: number | null;
  name?: string;
  completeDate?: string;
  startDate?: string;
  detail?: string;
  storeName?: string;
  businessName?: string;
  creator?: string;
  users: any[];
  subProjects: any[];
  messages: any[];
  tasks: any[];
  timeSheet: any[];
}

export interface Paging {
  pageNumber?: number;
  pageSize?: number;
  totalItems?: number;
}
