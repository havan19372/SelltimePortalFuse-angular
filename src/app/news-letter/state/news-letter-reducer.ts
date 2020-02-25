
import { createFeatureSelector, createSelector } from "../../../../node_modules/@ngrx/store";
 import { NewsLetter } from '../news-letter.model';
import { NewsLetterActions, NewsLetterActionTypes, UpdateNewsLetterFail } from './news-letter.action';
import { Paging } from 'app/project-board/project-board.model';

export interface State {
    NewsLetters: NewsLetterState;
}

export interface  NewsLetterState {
    IsEdit: boolean;
    newsLetters: NewsLetter[];
    currentNewsLetterId: number | null;
    error: string;
    paging: Paging;

}

const initialState: NewsLetterState = {
    IsEdit: false,
    currentNewsLetterId: null,
    paging:{
        pageNumber: 1,
        pageSize: 50
    },
    newsLetters: [],
    error: ''
};


// Selector functions
const getNewsLetterFeatureState = createFeatureSelector<NewsLetterState>('newsLetter');

export const getIsEditNewsLetter= createSelector(
    getNewsLetterFeatureState,
    state => state.IsEdit
);

export const getCurrentNewsLetterId = createSelector(
    getNewsLetterFeatureState,
    state => state.currentNewsLetterId
);
export const getPaging = createSelector(
    getNewsLetterFeatureState,
    state => state.paging
  );
export const getCurrentNewsLetter = createSelector(
    getNewsLetterFeatureState,
    getCurrentNewsLetterId,
    (state, currentNewsLetterId) => {
        if (currentNewsLetterId === 0) {
            return {
                id:0,
                name:'',
                email: '',
                createDate: ''
            };
        } else {
            return currentNewsLetterId ? state.newsLetters.find(p => p.id === currentNewsLetterId) : null;
        }
    }
);

export const getNewsLetters = createSelector(
    getNewsLetterFeatureState,
    state => state.newsLetters
);

export const getError = createSelector(
    getNewsLetterFeatureState,
    state => state.error
);
export function reducer(state = initialState, action: NewsLetterActions): NewsLetterState {
    switch (action.type) {
        case NewsLetterActionTypes.ToggleNewsLetterDetail:
            return {
                ...state,
                IsEdit: action.payload //payload mean data
            }
        case NewsLetterActionTypes.SetCurrentNewsLetter:
            return {
                ...state,
                currentNewsLetterId: action.payload.id
            };

        case NewsLetterActionTypes.ClearCurrentNewsLetter:
            return {
                ...state,
                currentNewsLetterId: null
            };
            case NewsLetterActionTypes.InitializeCurrentNewsLetter:
            return {
              ...state,
              currentNewsLetterId: 0
            };

          case NewsLetterActionTypes.LoadSuccess:
          {
            const response = action.payload;
            const newsLetters = response.body;
            const pagingHeader = JSON.parse(response.headers.get('X-Pagination'));
            const paging:Paging = {
              totalItems: pagingHeader.totalCount,
              pageSize: pagingHeader.pageSize,
              pageNumber: pagingHeader.currentPage
            };
            return {
              ...state,
              newsLetters: state.newsLetters.concat(newsLetters),
              error: '',
              paging
            };
         }
          case NewsLetterActionTypes.LoadFail:
            return {
              ...state,
              newsLetters: [],
              error: action.payload
            };
            case NewsLetterActionTypes.UpdateNewsLetterSuccess:
            const updatedNewsletters = state.newsLetters.map(
              item => action.payload.id === item.id ? action.payload : item);
            return {
              ...state,
              newsLetters: updatedNewsletters,
              currentNewsLetterId: action.payload.id,
              error: ''
            };

          case NewsLetterActionTypes.UpdateNewsLetterFail:
            return {
              ...state,
              error: action.payload
            };
            case NewsLetterActionTypes.CreateNewsLetterSuccess:
            return {
              ...state,
              newsLetters: [...state.newsLetters, action.payload],
              currentNewsLetterId: action.payload.id,
              error: ''
            };

          case NewsLetterActionTypes.CreateNewsLetterFail:
            return {
              ...state,
              error: action.payload
            };

          // After a delete, the currentNewsLetter is null.
          case NewsLetterActionTypes.DeleteNewsLetterSuccess:
            return {
              ...state,
              newsLetters: state.newsLetters.filter(newsLetter => newsLetter.id !== action.payload),
              currentNewsLetterId: null,
              error: ''
            };

          case NewsLetterActionTypes.DeleteNewsLetterFail:
            return {
              ...state,
              error: action.payload
            };
        default:
            return state;
    }
}
