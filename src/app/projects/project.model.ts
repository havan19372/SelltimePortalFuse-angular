export class ProjectModel {
  id?: number;
  name?: string;
  detail?: string;
  storeId?: number;
  businessId?: number;
  completeDate?: string;
  startDate?: string;
  constructor(project?: ProjectModel) {
    project = project ? project : {};
    this.id = project.id ? project.id : null;
    this.name = project.name ? project.name : '';
    this.detail = project.detail ? project.detail : '';
    this.storeId = project.storeId ? project.storeId : null;
    this.businessId = project.businessId ? project.businessId : null;
    this.completeDate = project.completeDate ? project.completeDate : '';
    this.startDate = project.startDate ? project.startDate : '';
  }
}

export class SubProjectModel {
  id?: number;
  name?: string;
  detail?: string;
  projectId?: number;
  completeDate?: string;
  startDate?: string;
  constructor(project?: ProjectModel) {
    project = project ? project : {};
    this.id = project.id ? project.id : null;
    this.name = project.name ? project.name : '';
    this.detail = project.detail ? project.detail : '';
    this.projectId = project.businessId ? project.businessId : null;
    this.completeDate = project.completeDate ? project.completeDate : '';
    this.startDate = project.startDate ? project.startDate : '';
  }
}

export class ProjectMessage {
  id: number;
  detail: string;
  typeId: number;
  type: string;
  creator: string;
  projectId: number;
  project: string;
  parentId: number;
  attachmentCount: number;
  createDate: string;
  attachments: {
    attachmentId: number;
    url: string;
  }[];
}

export class ProjectMessageAddModel {
  id?: number;
  detail?: string;
  typeId?: number;
  projectId?: number;
  parentId?: number;
  type?: string;
  creator?: string;
  project?: string;
  createDate?: string;
  attachments?: {
    attachmentId?: number;
    url?: string;
  }[];

  constructor(message?: ProjectMessageAddModel) {
    message = message ? message : {};
    this.id = message.id ? message.id : null;
    this.createDate = message.createDate
      ? message.createDate
      : new Date().toString();
    this.detail = message.detail ? message.detail : null;
    this.projectId = message.id ? message.id : null;
    this.typeId = message.typeId ? message.typeId : null;
    this.attachments = message.attachments ? message.attachments : [];
  }
}
