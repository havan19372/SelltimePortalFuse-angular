import { TaskModel } from './../../models/task.model';
import * as fromTaskActions from '../actions/Task.actions';
import { Paging } from '../../models/paging.model';

export interface taskState {
  entities: TaskModel [];
  paging: Paging;
  loaded: boolean;
  loading: boolean;
//   selectedTask:TaskModel;
}

export const initialState: taskState = {
  entities: [],
  paging: {},
  loaded: false,
  loading: false,
//   selectedTask:{}
};

export function TaskReducer(
  state = initialState,
  action:
    | fromTaskActions.TaskActions
    // | fromTaskActions.CmsPageActions
): taskState {
  switch (action.type) {
    case fromTaskActions.TaskActionTypes.LOAD_TASK: {
      return {
        ...state,
        loading: true
      };
    }

    case fromTaskActions.TaskActionTypes.LOAD_TASK_SUCCESS: {
      const response = action.payload;
      const contents = response.tasks;
      const paging = response.retPaging;
      const entities = contents.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: TaskModel [], Content: TaskModel) => {
          return {
            ...entities,
            [Content.id]: Content
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

    case fromTaskActions.TaskActionTypes.CREATE_TASK_SUCCESS: {
    //   const task = action.payload;
    //   const entities = {
    //     ...state.entities,
    //     [task.id]: task
    //   };
    //   return {
    //     ...state,
    //     entities
    //   };
    }

    case fromTaskActions.TaskActionTypes.UPDATE_TASK_SUCCESS: {
      const task = action.payload;
      // debugger;
      const currentWebsite = Object.assign([], state.entities[task.id]);
  
      const entities = {
        ...state.entities,
        [task.id]: currentWebsite
      };
      return {
        ...state,
        entities
      };
    }

    case fromTaskActions.TaskActionTypes.REMOVE_TASK_SUCCESS: {
      const task = action.payload;
      const { [task.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }

    case fromTaskActions.TaskActionTypes.LOAD_TASK_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

     

 

    /* end of switch */
  }

  return state;
}
