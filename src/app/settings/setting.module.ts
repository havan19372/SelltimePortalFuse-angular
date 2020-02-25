import { RequestOptionsService } from './RequestOptionsService';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { settingRouting } from './settings.route';
import { MaterialModule } from 'app/core/modules/material.module';
import { FuseMainModule } from 'app/main/main.module';
import { FuseWidgetModule } from '@fuse/components';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BlockUIModule } from 'ng-block-ui';

import { FuseSharedModule as SharedModule } from '@fuse/shared.module';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { SettingService } from './setting.service';
import { CreateSettingComponent } from './create-setting/create-setting.component';
import { RequestOptions } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SettingEffects } from './state/setting.efftects';
import { reducer } from './state/setting-reducer';
import { SettingSyncRestComponent } from './setting-sync-rest/setting-sync-rest.component';

@NgModule({
  imports: [
    CommonModule,
    settingRouting,
    SharedModule,
    MaterialModule,
    CommonModule,
    FuseMainModule,
    FuseWidgetModule,
    NgxChartsModule,
    BlockUIModule.forRoot(),
    StoreModule.forFeature('settings',reducer),
    EffectsModule.forFeature([SettingEffects]),
  ],
  declarations: [SettingsComponent, FeatureListComponent, CreateSettingComponent, SettingSyncRestComponent],
  entryComponents: [CreateSettingComponent,SettingSyncRestComponent],
  providers: [    { provide: RequestOptions, useClass: RequestOptionsService },
        SettingService]
})
export class SettingModule { }
