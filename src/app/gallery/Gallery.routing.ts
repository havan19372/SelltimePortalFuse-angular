//import { Routes } from '@angular/router';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { FuseMainComponent } from '../main/main.component';
import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    component: FuseMainComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'prefix',
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'list'
      },
      {
        path: 'list',
        component: GalleryListComponent,
        canActivate: [AuthorizationGuard],
        resolve: {
        //  members: MembersService
        }
      }
    ]
  }
];
