import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersComponent } from './members.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { FuseMainComponent } from '../main/main.component';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
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
      { path: 'list', component: MembersComponent },
      { path: 'add', component: AddMemberComponent },
      { path: 'edit/:id', component: EditMemberComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule {}

export const MembersRoutedComponents = [
  MembersComponent,
  AddMemberComponent,
  EditMemberComponent
];
