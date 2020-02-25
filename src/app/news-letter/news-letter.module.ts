import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsLetterListComponent } from './news-letter-list/news-letter-list.component';
import { NewsLetterSingleComponent } from './news-letter-single/news-letter-single.component';
import { NewsLetterRoutingModule } from './news-letter.routing';
import { FuseMainModule } from '../main/main.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from 'app/core/modules/material.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIRouterModule } from 'ng-block-ui/router';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/news-letter-reducer';
import { NewsLetterEffects } from './state/news-letter.efftects';
import { EffectsModule } from '@ngrx/effects';
import { ScrollEventModule } from 'ngx-scroll-event';

@NgModule({
  imports: [
    CommonModule,
    FuseMainModule,
    FuseSharedModule,
    MaterialModule,
    FuseWidgetModule,
    BlockUIModule,
    BlockUIHttpModule,
    BlockUIRouterModule,
    NewsLetterRoutingModule,
    ScrollEventModule,
    StoreModule.forFeature('newsLetter',reducer),
    EffectsModule.forFeature([NewsLetterEffects]),
  ],
  declarations: [NewsLetterListComponent, NewsLetterSingleComponent]
})
export class NewsLetterModule { }
