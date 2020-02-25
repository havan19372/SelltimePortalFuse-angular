import * as fromProjects from './project.reducers';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface ProjectBoardState {
  projects: fromProjects.ProjectState
}

export const reducers: ActionReducerMap<ProjectBoardState> = {
  projects: fromProjects.reducer
};

export const getProjectBoardState = createFeatureSelector<ProjectBoardState>(
  'projectBoard'
);
