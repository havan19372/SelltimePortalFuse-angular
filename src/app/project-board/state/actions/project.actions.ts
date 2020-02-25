/* NgRx */
import { Action } from '@ngrx/store';
import { ProjectsBoard, Paging } from '../../project-board.model';
import { HttpResponse } from '@angular/common/http';

export enum ProjectActionTypes {
  LOAD = '[Project] Load',
  LOAD_MORE_PROJECTS = '[Project] Load More Projects',
  LOAD_SUCCESS = '[Project] Load Success',
  LOAD_FAIL = '[Project] Load Fail',

  UPDATE_PROJECT = '[Project] Update Project',
  UPDATE_PROJECT_SUCCESS = '[Project] Update Project Success',
  UPDATE_PROJECT_FAIL = '[Project] Update Project Fail',

  CREATE_PROJECT = '[Project] Create Project',
  CREATE_PROJECT_SUCCESS = '[Project] Create Project Success',
  CREATE_PROJECT_FAIL = '[Project] Create Project Fail',

  DELETE_PROJECT = '[Project] Delete Project',
  DELETE_PROJECT_SUCCESS = '[Project] Delete Project Success',
  DELETE_PROJECT_FAIL = '[Project] Delete Project Fail'
}

// Action Creators

export class LoadProject implements Action {
  readonly type = ProjectActionTypes.LOAD;
  constructor(public paging: Paging) {}
}

export class LoadProjectSuccess implements Action {
  readonly type = ProjectActionTypes.LOAD_SUCCESS;

  constructor(public payload: HttpResponse<ProjectsBoard[]>) {}
}

export class LoadProjectFail implements Action {
  readonly type = ProjectActionTypes.LOAD_FAIL;

  constructor(public payload: string) {}
}

export class UpdateProject implements Action {
  readonly type = ProjectActionTypes.UPDATE_PROJECT;

  constructor(public payload: ProjectsBoard) {}
}

export class UpdateProjectSuccess implements Action {
  readonly type = ProjectActionTypes.UPDATE_PROJECT_SUCCESS;

  constructor(public payload: ProjectsBoard) {}
}

export class UpdateProjectFail implements Action {
  readonly type = ProjectActionTypes.UPDATE_PROJECT_FAIL;

  constructor(public payload: string) {}
}

export class CreateProject implements Action {
  readonly type = ProjectActionTypes.CREATE_PROJECT;

  constructor(public payload: ProjectsBoard) {}
}

export class CreateProjectSuccess implements Action {
  readonly type = ProjectActionTypes.CREATE_PROJECT_SUCCESS;

  constructor(public payload: ProjectsBoard) {}
}

export class CreateProjectFail implements Action {
  readonly type = ProjectActionTypes.CREATE_PROJECT_FAIL;

  constructor(public payload: string) {}
}

export class DeleteProject implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT;

  constructor(public payload: number) {}
}

export class DeleteProjectSuccess implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteProjectFail implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT_FAIL;

  constructor(public payload: string) {}
}

// Union the valid types
export type ProjectActions =
  | LoadProject
  | LoadProjectSuccess
  | LoadProjectFail
  | UpdateProject
  | UpdateProjectSuccess
  | UpdateProjectFail
  | CreateProject
  | CreateProjectSuccess
  | CreateProjectFail
  | DeleteProject
  | DeleteProjectSuccess
  | DeleteProjectFail;
