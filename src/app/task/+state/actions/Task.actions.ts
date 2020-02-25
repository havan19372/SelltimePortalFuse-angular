import { TaskModel } from './../../../projects/project-tasks/tasks.model';
import { Paging } from './../../../project-board/project-board.model';
import { Action } from '@ngrx/store';
import { HttpResponse } from '@angular/common/http';

export enum TaskActionTypes {
  LOAD_TASK = '[TSK] tasks load',
  LOAD_TASK_SUCCESS = '[TSK] tasks load success',
  LOAD_TASK_FAIL = '[TSK] tasks load fail',

  CREATE_TASK = '[TSK] create website',
  CREATE_TASK_SUCCESS = '[TSK] create website success',
  CREATE_TASK_FAIL = '[TSK] create website fail',

  UPDATE_TASK = '[TSK] update website',
  UPDATE_TASK_SUCCESS = '[TSK] update website success',
  UPDATE_TASK_FAIL = '[TSK] update website fail',

  REMOVE_TASK = '[TSK] remove website',
  REMOVE_TASK_SUCCESS = '[TSK] remove website success',
  REMOVE_TASK_FAIL = '[TSK] remove website fail'
}

export class LoadTask implements Action {
  readonly type = TaskActionTypes.LOAD_TASK;
  constructor(public paging: Paging) {}
}

export class LoadTaskSuccess implements Action {
  readonly type = TaskActionTypes.LOAD_TASK_SUCCESS;
  constructor(public payload: {tasks:TaskModel[],retPaging:Paging}) {}
}

export class LoadTaskFail implements Action {
  readonly type = TaskActionTypes.LOAD_TASK_FAIL;
  constructor(public payload: any) {}
}

/**
 * @description Create website action classes
 */
export class CreateTask implements Action {
  readonly type = TaskActionTypes.CREATE_TASK;
  constructor(public payload: TaskModel) {}
}

export class CreateTaskSuccess implements Action {
  readonly type = TaskActionTypes.CREATE_TASK_SUCCESS;
  constructor(public payload: TaskModel) {}
}

export class CreateTaskFail implements Action {
  readonly type = TaskActionTypes.CREATE_TASK_FAIL;
  constructor(public payload: any) {}
}

/**
 * @description Update website action classes
 */
export class UpdateTask implements Action {
  readonly type = TaskActionTypes.UPDATE_TASK;
  constructor(public payload: TaskModel) {}
}

export class UpdateTaskSuccess implements Action {
  readonly type = TaskActionTypes.UPDATE_TASK_SUCCESS;
  constructor(public payload: TaskModel) {}
}

export class UpdateTaskFail implements Action {
  readonly type = TaskActionTypes.UPDATE_TASK_FAIL;
  constructor(public payload: any) {}
}

/**
 * @description Remove website action classes
 */
export class RemoveTask implements Action {
  readonly type = TaskActionTypes.REMOVE_TASK;
  constructor(public payload: TaskModel) {}
}

export class RemoveTaskSuccess implements Action {
  readonly type = TaskActionTypes.REMOVE_TASK_SUCCESS;
  constructor(public payload: TaskModel) {}
}

export class RemoveTaskFail implements Action {
  readonly type = TaskActionTypes.REMOVE_TASK_FAIL;
  constructor(public payload: any) {}
}

export type TaskActions =
  | LoadTask
  | LoadTaskSuccess
  | LoadTaskFail
  | CreateTask
  | CreateTaskSuccess
  | CreateTaskFail
  | UpdateTask
  | UpdateTaskSuccess
  | UpdateTaskFail
  | RemoveTask
  | RemoveTaskSuccess
  | RemoveTaskFail;
