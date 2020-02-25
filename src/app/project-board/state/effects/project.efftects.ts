import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ProjectActions from '../actions/project.actions';
import { ProjectsCardService } from '../../projects-card.service';

@Injectable()
export class ProjectEffects {
  constructor(
    private projectsService: ProjectsCardService,
    private actions$: Actions
  ) {}

  @Effect()
  loadProjects$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectActions.ProjectActionTypes.LOAD),
    mergeMap((action: ProjectActions.LoadProject) =>
      this.projectsService.getProjects(action.paging).pipe(
        map(response => new ProjectActions.LoadProjectSuccess(response)),
        catchError(err => of(new ProjectActions.LoadProjectFail(err)))
      )
    )
  );

  // @Effect()
  // updateProject$: Observable<Action> = this.actions$.pipe(
  //   ofType(ProjectActions.ProjectActionTypes.UpdateProject),
  //   map((action: ProjectActions.UpdateProject) => action.payload),
  //   mergeMap((Project: ProjectsBoard) =>
  //     this.projectsService.updateProject(Project).pipe(
  //       map(updatedProject => (new ProjectActions.UpdateProjectSuccess(updatedProject))),
  //       catchError(err => of(new ProjectActions.UpdateProjectFail(err)))
  //     )
  //   )
  // );

  // @Effect()
  // createProject$: Observable<Action> = this.actions$.pipe(
  //   ofType(ProjectActions.ProjectActionTypes.CreateProject),
  //   map((action: ProjectActions.CreateProject) => action.payload),
  //   mergeMap((Project: ProjectsBoard) =>
  //     this.projectsService.createProject(Project).pipe(
  //       map(newProject => (new ProjectActions.CreateProjectSuccess(newProject))),
  //       catchError(err => of(new ProjectActions.CreateProjectFail(err)))
  //     )
  //   )
  // );

  // @Effect()
  // deleteProject$: Observable<Action> = this.actions$.pipe(
  //   ofType(ProjectActions.ProjectActionTypes.DeleteProject),
  //   map((action: ProjectActions.DeleteProject) => action.payload),
  //   mergeMap((ProjectId: number) =>
  //     this.projectsService.deleteProject(ProjectId).pipe(
  //       map(() => (new ProjectActions.DeleteProjectSuccess(ProjectId))),
  //       catchError(err => of(new ProjectActions.DeleteProjectFail(err)))
  //     )
  //   )
  // );
}
