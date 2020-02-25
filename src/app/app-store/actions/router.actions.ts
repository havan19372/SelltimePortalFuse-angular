import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterActions {
  GO = '[Router] Go',
  BACK = '[Router] Back',
  FORWARD = '[Router] Forward'
}

export class Go implements Action {
  readonly type = RouterActions.GO;
  constructor(
    public payload: { path: any[]; query?: object; extras?: NavigationExtras }
  ) {}
}

export class Back implements Action {
  readonly type = RouterActions.BACK;
}

export class Forward implements Action {
  readonly type = RouterActions.FORWARD;
}

export type Actions = Go | Back | Forward;
