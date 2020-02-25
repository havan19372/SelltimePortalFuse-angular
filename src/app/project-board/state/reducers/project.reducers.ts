import * as fromProjects from '../actions/project.actions';
import { ProjectsBoard, Paging } from '../../project-board.model';

export interface ProjectState {
  entities: { [id: number]: ProjectsBoard };
  paging: Paging;
  loaded: boolean;
  loading: boolean;
}

export const initialState: ProjectState = {
  entities: {},
  paging: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromProjects.ProjectActions
): ProjectState {
  switch (action.type) {
    case fromProjects.ProjectActionTypes.LOAD: {
      return {
        ...state,
        loading: true
      };
    }

    case fromProjects.ProjectActionTypes.LOAD_SUCCESS: {
      const response = action.payload;
      const projects = response.body;
      const pagingHeader = JSON.parse(response.headers.get('X-Pagination'));
      const paging:Paging = {
        totalItems: pagingHeader.totalCount,
        pageSize: pagingHeader.pageSize,
        pageNumber: pagingHeader.currentPage
      };
      const entities = projects.reduce(
        (entities: { [id: number]: ProjectsBoard }, project: ProjectsBoard) => {
          return {
            ...entities,
            [project.id]: project
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
        paging
      };
    }



    case fromProjects.ProjectActionTypes.LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getProjectsLoading = (state: ProjectState) => state.loading;
export const getProjectsLoaded = (state: ProjectState) => state.loaded;
export const getProjectsEntities = (state: ProjectState) => state.entities;
export const getProjectsPaging = (state: ProjectState) => state.paging;
