
import { createFeatureSelector, createSelector } from "../../../../node_modules/@ngrx/store";
 import { SettingActions, SettingActionTypes, UpdateSettingFail } from './setting.action';
import { Paging } from 'app/project-board/project-board.model';
import { SettingModel } from "../setting.model";

export interface State {
    Settings: SettingState;
}

export interface  SettingState {
    Settings: SettingModel[];
    currentSettingId: number | null;
    error: string;
    paging: Paging;

}

const initialState: SettingState = {
    currentSettingId: null,
    paging:{
        pageNumber: 1,
        pageSize: 200
    },
    Settings: [],
    error: ''
};


// Selector functions
const getSettingFeatureState = createFeatureSelector<SettingState>('settings');

 

export const getCurrentSettingId = createSelector(
    getSettingFeatureState,
    state => state.currentSettingId
);
export const getPaging = createSelector(
    getSettingFeatureState,
    state => state.paging
  );
export const getCurrentSetting = createSelector(
    getSettingFeatureState,
    getCurrentSettingId,
    (state, currentSettingId) => {
        if (currentSettingId === 0) {
            return {
                id:0
            };
        } else {
            return currentSettingId ? state.Settings.find(p => p.id === currentSettingId) : null;
        }
    }
);

export const getSettings = createSelector(
    getSettingFeatureState,
    (state) =>{
      return  state.Settings;
    }
        );

export const getError = createSelector(
    getSettingFeatureState,
    state => state.error
);
export function reducer(state = initialState, action: SettingActions): SettingState {
    switch (action.type) {
        case SettingActionTypes.SetCurrentSetting:
            return {
                ...state,
                currentSettingId: action.payload.id
            };

        case SettingActionTypes.ClearCurrentSetting:
            return {
                ...state,
                currentSettingId: null
            };
            case SettingActionTypes.InitializeCurrentSetting:
            return {
              ...state,
              currentSettingId: 0
            };

          case SettingActionTypes.LoadSuccess:
          {
            const response = action.payload;
            const Settings = response.body;
            return {
              ...state,
              Settings: Settings,
              error: '' 
            };
         }
          case SettingActionTypes.LoadFail:
            return {
              ...state,
              Settings: [],
              error: action.payload
            };
            case SettingActionTypes.UpdateSettingSuccess:
            const updatedSettings = state.Settings.map(
              item => action.payload.id === item.id ? action.payload : item);
            return {
              ...state,
              Settings: updatedSettings,
              currentSettingId: action.payload.id,
              error: ''
            };

          case SettingActionTypes.UpdateSettingFail:
            return {
              ...state,
              error: action.payload
            };
            case SettingActionTypes.CreateSettingSuccess:
            return {
              ...state,
              Settings: [...state.Settings, action.payload],
              currentSettingId: action.payload.id,
              error: ''
            };

          case SettingActionTypes.CreateSettingFail:
            return {
              ...state,
              error: action.payload
            };

          // After a delete, the currentSetting is null.
          case SettingActionTypes.DeleteSettingSuccess:
            return {
              ...state,
              Settings: state.Settings.filter(Setting => Setting.id !== action.payload),
              currentSettingId: null,
              error: ''
            };

          case SettingActionTypes.DeleteSettingFail:
            return {
              ...state,
              error: action.payload
            };
        default:
            return state;
    }
}
