import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

 
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as SettingActions from './setting.action';
import { SettingService } from '../setting.service';
import { SettingModel } from '../setting.model';
 
@Injectable()
export class SettingEffects {

  constructor(private SettingService: SettingService,
              private actions$: Actions) { }

 
  @Effect()
  loadSetting$: Observable<Action> = this.actions$.pipe(
    ofType(SettingActions.SettingActionTypes.Load),
    mergeMap((action: SettingActions.Load) =>
      this.SettingService.getSettings(action.paging).pipe(
        map(response => new SettingActions.LoadSuccess(response)),
        catchError(err => of(new SettingActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateSetting$: Observable<Action> = this.actions$.pipe(
    ofType(SettingActions.SettingActionTypes.UpdateSetting),
    map((action: SettingActions.UpdateSetting) => action.payload),
    mergeMap((Setting: SettingModel) =>
      this.SettingService.updateSetting(Setting).pipe(
        map(updatedSetting => (new SettingActions.UpdateSettingSuccess(updatedSetting))),
        catchError(err => of(new SettingActions.UpdateSettingFail(err)))
      )
    )
  );

  @Effect()
  createSetting$: Observable<Action> = this.actions$.pipe(
    ofType(SettingActions.SettingActionTypes.CreateSetting),
    map((action: SettingActions.CreateSetting) => action.payload),
    mergeMap((Setting: SettingModel) =>
      this.SettingService.createSetting(Setting).pipe(
        map(newSetting => (new SettingActions.CreateSettingSuccess(newSetting))),
        catchError(err => of(new SettingActions.CreateSettingFail(err)))
      )
    )
  );

  @Effect()
  deleteSetting$: Observable<Action> = this.actions$.pipe(
    ofType(SettingActions.SettingActionTypes.DeleteSetting),
    map((action: SettingActions.DeleteSetting) => action.payload),
    mergeMap((SettingId: number) =>
      this.SettingService.deleteSetting(SettingId).pipe(
        map(() => (new SettingActions.DeleteSettingSuccess(SettingId))),
        catchError(err => of(new SettingActions.DeleteSettingFail(err)))
      )
    )
  );
}
