import { NewsLetter } from './../news-letter.model';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

 
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as NewsLetterActions from './news-letter.action';
import { NewsLetterService } from '../news-letter.service';
 
@Injectable()
export class NewsLetterEffects {

  constructor(private newsletterService: NewsLetterService,
              private actions$: Actions) { }

 
  @Effect()
  loadNewsLetter$: Observable<Action> = this.actions$.pipe(
    ofType(NewsLetterActions.NewsLetterActionTypes.Load),
    mergeMap((action: NewsLetterActions.Load) =>
      this.newsletterService.getNewsLetters(action.paging).pipe(
        map(response => new NewsLetterActions.LoadSuccess(response)),
        catchError(err => of(new NewsLetterActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateNewsLetter$: Observable<Action> = this.actions$.pipe(
    ofType(NewsLetterActions.NewsLetterActionTypes.UpdateNewsLetter),
    map((action: NewsLetterActions.UpdateNewsLetter) => action.payload),
    mergeMap((newsletter: NewsLetter) =>
      this.newsletterService.updateNewsLetter(newsletter).pipe(
        map(updatedNewsletter => (new NewsLetterActions.UpdateNewsLetterSuccess(updatedNewsletter))),
        catchError(err => of(new NewsLetterActions.UpdateNewsLetterFail(err)))
      )
    )
  );

  @Effect()
  createNewsLetter$: Observable<Action> = this.actions$.pipe(
    ofType(NewsLetterActions.NewsLetterActionTypes.CreateNewsLetter),
    map((action: NewsLetterActions.CreateNewsLetter) => action.payload),
    mergeMap((newsLetter: NewsLetter) =>
      this.newsletterService.createNewsLetter(newsLetter).pipe(
        map(newNewsLetter => (new NewsLetterActions.CreateNewsLetterSuccess(newNewsLetter))),
        catchError(err => of(new NewsLetterActions.CreateNewsLetterFail(err)))
      )
    )
  );

  @Effect()
  deleteNewsLetter$: Observable<Action> = this.actions$.pipe(
    ofType(NewsLetterActions.NewsLetterActionTypes.DeleteNewsLetter),
    map((action: NewsLetterActions.DeleteNewsLetter) => action.payload),
    mergeMap((NewsLetterId: number) =>
      this.newsletterService.deleteNewsLetter(NewsLetterId).pipe(
        map(() => (new NewsLetterActions.DeleteNewsLetterSuccess(NewsLetterId))),
        catchError(err => of(new NewsLetterActions.DeleteNewsLetterFail(err)))
      )
    )
  );
}
