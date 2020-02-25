import { HttpResponse } from '@angular/common/http';
/* NgRx */
import { Action } from '@ngrx/store';
import { NewsLetter } from '../news-letter.model';
import { Paging } from 'app/project-board/project-board.model';
 
export enum NewsLetterActionTypes {
  ToggleNewsLetterDetail = '[NewsLetter] Toggle NewsLetter Detail',
  SetCurrentNewsLetter = '[NewsLetter] Set Current NewsLetter',
  ClearCurrentNewsLetter = '[NewsLetter] Clear Current NewsLetter',
  InitializeCurrentNewsLetter = '[NewsLetter] Initialize Current NewsLetter',
  Load = '[NewsLetter] Load',
  LoadSuccess = '[NewsLetter] Load Success',
  LoadFail = '[NewsLetter] Load Fail',
  UpdateNewsLetter = '[NewsLetter] Update NewsLetter',
  UpdateNewsLetterSuccess = '[NewsLetter] Update NewsLetter Success',
  UpdateNewsLetterFail = '[NewsLetter] Update NewsLetter Fail',
  CreateNewsLetter = '[NewsLetter] Create NewsLetter',
  CreateNewsLetterSuccess = '[NewsLetter] Create NewsLetter Success',
  CreateNewsLetterFail = '[NewsLetter] Create NewsLetter Fail',
  DeleteNewsLetter = '[NewsLetter] Delete NewsLetter',
  DeleteNewsLetterSuccess = '[NewsLetter] Delete NewsLetter Success',
  DeleteNewsLetterFail = '[NewsLetter] Delete NewsLetter Fail'
}

// Action Creators
export class ToggleNewsLetterDetail implements Action {
  readonly type = NewsLetterActionTypes.ToggleNewsLetterDetail;

  constructor(public payload: boolean) {}
}

export class SetCurrentNewsLetter implements Action {
  readonly type = NewsLetterActionTypes.SetCurrentNewsLetter;

  constructor(public payload: NewsLetter) {}
}

export class ClearCurrentNewsLetter implements Action {
  readonly type = NewsLetterActionTypes.ClearCurrentNewsLetter;
}

export class InitializeCurrentNewsLetter implements Action {
  readonly type = NewsLetterActionTypes.InitializeCurrentNewsLetter;
}

export class Load implements Action {
  readonly type = NewsLetterActionTypes.Load;
  constructor(public paging: Paging){}
}

export class LoadSuccess implements Action {
  readonly type = NewsLetterActionTypes.LoadSuccess;

  constructor(public payload: HttpResponse<NewsLetter[]>) {}
}

export class LoadFail implements Action {
  readonly type = NewsLetterActionTypes.LoadFail;

  constructor(public payload: string) {}
}

export class UpdateNewsLetter implements Action {
  readonly type = NewsLetterActionTypes.UpdateNewsLetter;

  constructor(public payload: NewsLetter) {}
}

export class UpdateNewsLetterSuccess implements Action {
  readonly type = NewsLetterActionTypes.UpdateNewsLetterSuccess;

  constructor(public payload: NewsLetter) {}
}

export class UpdateNewsLetterFail implements Action {
  readonly type = NewsLetterActionTypes.UpdateNewsLetterFail;

  constructor(public payload: string) {}
}

export class CreateNewsLetter implements Action {
  readonly type = NewsLetterActionTypes.CreateNewsLetter;

  constructor(public payload: NewsLetter) {}
}

export class CreateNewsLetterSuccess implements Action {
  readonly type = NewsLetterActionTypes.CreateNewsLetterSuccess;

  constructor(public payload: NewsLetter) {}
}

export class CreateNewsLetterFail implements Action {
  readonly type = NewsLetterActionTypes.CreateNewsLetterFail;

  constructor(public payload: string) {}
}

export class DeleteNewsLetter implements Action {
  readonly type = NewsLetterActionTypes.DeleteNewsLetter;

  constructor(public payload: number) {}
}

export class DeleteNewsLetterSuccess implements Action {
  readonly type = NewsLetterActionTypes.DeleteNewsLetterSuccess;

  constructor(public payload: number) {}
}

export class DeleteNewsLetterFail implements Action {
  readonly type = NewsLetterActionTypes.DeleteNewsLetterFail;

  constructor(public payload: string) {}
}

// Union the valid types
export type NewsLetterActions =
  | ToggleNewsLetterDetail
  | SetCurrentNewsLetter
  | ClearCurrentNewsLetter
  | InitializeCurrentNewsLetter
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateNewsLetter
  | UpdateNewsLetterSuccess
  | UpdateNewsLetterFail
  | CreateNewsLetter
  | CreateNewsLetterSuccess
  | CreateNewsLetterFail
  | DeleteNewsLetter
  | DeleteNewsLetterSuccess
  | DeleteNewsLetterFail;
