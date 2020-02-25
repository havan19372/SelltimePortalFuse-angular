import { environment } from './../environments/environment.hmr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { fuseConfig } from './fuse-config';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { routing } from './app.routing';
import { HttpErrorInterceptorService } from 'app/core/services/http-error-interceptor.service';
import { SweetAlertService } from 'app/core/services/sweet-alert.service';
import { ErrorBroadcastingService } from 'app/core/services/error-broadcasting.service';
import { SlugService } from 'app/core/services/slug.service';
import { UploadService } from 'app/core/services/upload.service';
import { LookUpService } from 'app/core/services/look-up.service';
import { ApiService } from 'app/core/services/api.service';
import { AuthorizationGuard } from 'app/core/guards/authorization.guard';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FuseFakeDbService } from 'app/fuse-fake-db/fuse-fake-db.service';
import { AgmCoreModule } from '@agm/core';
import { DashboardModule } from 'app/dashboard/dashboard.module';
import { AuthenticationService } from './auth/athentication.service';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { reducer, CustomSerializer, effects } from './app-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './users-new/user/user.service';
import { NgxSummernoteModule } from '../../projects/ngx-summernote/src/public_api';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule.forRoot(),//added
    HttpClientModule,
    PdfViewerModule,
    TranslateModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpJ4dgPsgX_OmPj9NGrF35zIVOWejGfBU',
      libraries: ['places']
    }),
    InMemoryWebApiModule.forRoot(FuseFakeDbService, {
      delay: 0,
      passThruUnknownUrl: true
    }),
    FormsModule,
    ReactiveFormsModule,
    // Fuse Main and Shared modules
    FuseModule.forRoot(fuseConfig),
    FuseSharedModule,
    FuseMainModule,
    DashboardModule,
    ShoppingCartModule,
    routing,
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.production
      ? StoreDevtoolsModule.instrument({
          name: 'Selltime App Dev Tools',
          maxAge: 25,
          logOnly: environment.production
        })
      : []
  ],
  providers: [
    AuthorizationGuard,
    AuthenticationService,
    ApiService,
    LookUpService,
    UploadService,
    SlugService,
    ErrorBroadcastingService,
    SweetAlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
