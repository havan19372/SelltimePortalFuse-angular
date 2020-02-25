import { createSelector } from '@ngrx/store';

import * as fromFeatures from '../reducers';
import * as fromProjects from '../reducers/project.reducers';
import * as fromRoot from '../../../app-store';
import { ProjectsBoard } from '../../project-board.model';

export const getProjects = createSelector(
  fromFeatures.getProjectBoardState,
  (state: fromFeatures.ProjectBoardState) => {
    return state.projects;
  }
);

export const getProjectsEntities = createSelector(
  getProjects,
  fromProjects.getProjectsEntities
);

export const getAllProjects = createSelector(getProjectsEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getSelectedProject = createSelector(
  getProjectsEntities,
  fromRoot.getRouterState,
  (entities, router): ProjectsBoard => {
    return router.state && entities[router.state.params.projectId];
  }
);

export const getProjectsLoaded = createSelector(
  getProjects,
  fromProjects.getProjectsLoaded
);

export const getProjectsLoading = createSelector(
  getProjects,
  fromProjects.getProjectsLoading
);

export const getProjectsPaging = createSelector(
  getProjects,
  fromProjects.getProjectsPaging
);
