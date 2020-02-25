import { NgModule } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { RouterModule, Routes } from "@angular/router";

import { UsersComponent } from "./users/users.component";
import { UsersService } from "./users/users.service";
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { AgmCoreModule } from "@agm/core";

import { usersNewRouting } from "./users.routing";
import { CommonModule } from "@angular/common";
import { FuseMainModule } from "../main/main.module";
import { BlockUIModule } from "ng-block-ui";
import { MembersModule } from "../members/members.module";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components";
import { MaterialModule } from "app/core/modules/material.module";

@NgModule({
  imports: [
    FuseSharedModule,
    CommonModule,
    MaterialModule,
    // MembersModule,
    FuseMainModule,
    usersNewRouting,
    FuseWidgetModule,
    NgxChartsModule,
    BlockUIModule.forRoot()
  ],
  declarations: [UsersComponent, UserComponent],
  providers: [UsersService, UserService],
  exports: [UsersComponent]
})
export class UsersNewModule {}
