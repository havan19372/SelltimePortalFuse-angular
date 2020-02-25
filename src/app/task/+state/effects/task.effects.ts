import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';

import * as TasksActions from '../actions/Task.actions';
import { TaskService } from 'app/task/service/Task.service';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private taskservice:TaskService,
  ) {}


  // @Effect()
  // loadTasks$: Observable<Action> = this.actions$
  //   .ofType(TasksActions.TaskActionTypes.LOAD_TASK)
  //   .pipe(
  //     switchMap((action: TasksActions.LoadTask) => {
  //       return this.taskservice
  //         .getTasks(action.paging)
  //         .pipe(
  //           map(response => {
  //             // debugger;
  //             return new TasksActions.LoadTaskSuccess(response);
  //           }),
  //           catchError(error => of(new TasksActions.LoadTaskFail(error)))
  //         );
  //     })
  //   );

        /**
     * @description  Task Effects
     */
    @Effect()
    createTask$: Observable<Action> = this.actions$
      .ofType(TasksActions.TaskActionTypes.CREATE_TASK)
      .pipe(
        map((action: TasksActions.CreateTask) => action.payload),
        switchMap(task => {
          return this.taskservice.createTask(task).pipe(
            map(response => new TasksActions.CreateTaskSuccess(response)),
            catchError(error => of(new TasksActions.CreateTaskFail(error)))
          );
        })
      );



      @Effect()
      updateTask$: Observable<Action> = this.actions$
        .ofType(TasksActions.TaskActionTypes.UPDATE_TASK)
        .pipe(
          map((action: TasksActions.UpdateTask) => action.payload),
          switchMap(task => {
            return this.taskservice.updateTask(task).pipe(
              map(response =>  new TasksActions.UpdateTaskSuccess(response)),
              catchError(error => of(new TasksActions.UpdateTaskFail(error)))
            );
          })
        );


}
