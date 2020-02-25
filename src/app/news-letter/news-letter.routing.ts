import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { FuseMainComponent } from '../main/main.component';
import { NewsLetterListComponent } from './news-letter-list/news-letter-list.component';
import { NewsLetterSingleComponent } from './news-letter-single/news-letter-single.component';

const routes: Routes = [
  {
    path: '',
    component: FuseMainComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      { path: 'list', component: NewsLetterListComponent },
       { path: 'single/:id', component: NewsLetterSingleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsLetterRoutingModule {}
