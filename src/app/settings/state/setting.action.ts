import { HttpResponse } from '@angular/common/http';
/* NgRx */
import { Action } from '@ngrx/store';
 import { Paging } from 'app/project-board/project-board.model';
import { SettingModel } from '../setting.model';
 
export enum SettingActionTypes {
  ToggleSettingDetail = '[Setting] Toggle Setting Detail',
  SetCurrentSetting = '[Setting] Set Current Setting',
  ClearCurrentSetting = '[Setting] Clear Current Setting',
  InitializeCurrentSetting = '[Setting] Initialize Current Setting',
  Load = '[Setting] Load', 
  LoadSuccess = '[Setting] Load Success',
  LoadFail = '[Setting] Load Fail',
  UpdateSetting = '[Setting] Update Setting',
  UpdateSettingSuccess = '[Setting] Update Setting Success',
  UpdateSettingFail = '[Setting] Update Setting Fail',
  CreateSetting = '[Setting] Create Setting',
  CreateSettingSuccess = '[Setting] Create Setting Success',
  CreateSettingFail = '[Setting] Create Setting Fail',
  DeleteSetting = '[Setting] Delete Setting',
  DeleteSettingSuccess = '[Setting] Delete Setting Success',
  DeleteSettingFail = '[Setting] Delete Setting Fail'
}

// Action Creators
export class ToggleSettingDetail implements Action {
  readonly type = SettingActionTypes.ToggleSettingDetail;

  constructor(public payload: boolean) {}
}

export class SetCurrentSetting implements Action {
  readonly type = SettingActionTypes.SetCurrentSetting;

  constructor(public payload: SettingModel) {}
}

export class ClearCurrentSetting implements Action {
  readonly type = SettingActionTypes.ClearCurrentSetting;
}

export class InitializeCurrentSetting implements Action {
  readonly type = SettingActionTypes.InitializeCurrentSetting;
}

export class Load implements Action {
  readonly type = SettingActionTypes.Load;
  constructor(public paging: Paging){}
}

export class LoadSuccess implements Action {
  readonly type = SettingActionTypes.LoadSuccess;

  constructor(public payload: HttpResponse<SettingModel[]>) {}
}

export class LoadFail implements Action {
  readonly type = SettingActionTypes.LoadFail;

  constructor(public payload: string) {}
}

export class UpdateSetting implements Action {
  readonly type = SettingActionTypes.UpdateSetting;

  constructor(public payload: SettingModel) {}
}

export class UpdateSettingSuccess implements Action {
  readonly type = SettingActionTypes.UpdateSettingSuccess;

  constructor(public payload: SettingModel) {}
}

export class UpdateSettingFail implements Action {
  readonly type = SettingActionTypes.UpdateSettingFail;

  constructor(public payload: string) {}
}

export class CreateSetting implements Action {
  readonly type = SettingActionTypes.CreateSetting;

  constructor(public payload: SettingModel) {}
}

export class CreateSettingSuccess implements Action {
  readonly type = SettingActionTypes.CreateSettingSuccess;

  constructor(public payload: SettingModel) {}
}

export class CreateSettingFail implements Action {
  readonly type = SettingActionTypes.CreateSettingFail;

  constructor(public payload: string) {}
}

export class DeleteSetting implements Action {
  readonly type = SettingActionTypes.DeleteSetting;

  constructor(public payload: number) {}
}

export class DeleteSettingSuccess implements Action {
  readonly type = SettingActionTypes.DeleteSettingSuccess;

  constructor(public payload: number) {}
}

export class DeleteSettingFail implements Action {
  readonly type = SettingActionTypes.DeleteSettingFail;

  constructor(public payload: string) {}
}

// Union the valid types
export type SettingActions =
  | ToggleSettingDetail
  | SetCurrentSetting
  | ClearCurrentSetting
  | InitializeCurrentSetting
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateSetting
  | UpdateSettingSuccess
  | UpdateSettingFail
  | CreateSetting
  | CreateSettingSuccess
  | CreateSettingFail
  | DeleteSetting
  | DeleteSettingSuccess
  | DeleteSettingFail;
