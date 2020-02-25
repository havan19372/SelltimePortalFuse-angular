import { getRouterState } from './../../../app-store/reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { taskState } from '../reducers/task.reducer';
export const getTasModulekState = createFeatureSelector<taskState>('task');
import * as fromTaskReducer from '../reducers/task.reducer';
import { TaskModel } from 'app/task/models/task.model';

export const getTaskState = createSelector(
    getTasModulekState,
    (state: taskState) => {
      return state.entities;
    }
  );

export const getTaskEntitiesState = createSelector(
    getTasModulekState,
  (state: fromTaskReducer.taskState) => {
    return state.entities;
  }
);

export const getTasks = createSelector(getTaskEntitiesState, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getSelectedTask = createSelector(
  getTaskEntitiesState,
  getRouterState,
  (entities, router): TaskModel => {
    return router.state && entities[router.state.params.websiteId];
  }
);

export const getTasksLoaded = createSelector(
    getTasModulekState,
  (state: fromTaskReducer.taskState) => {
    return state.loaded;
  }
);

export const getTasksLoading = createSelector(
    getTasModulekState,
  (state: fromTaskReducer.taskState) => {
    return state.loading;
  }
);

export const getTaskPaging = createSelector(
    getTasModulekState,
  (state: fromTaskReducer.taskState) => {
    return state.paging;
  }
);

// export const getSelectedContent = createSelector(
//     getTasModulekState,
//   (state: fromTaskReducer.taskState) => {
//     return state.selectedContent;
//   }
// );
