import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxSummernoteDirective } from './ngx-summernote.directive';
import { NgxSummernoteViewDirective } from './ngx-summernote-view.directive';
import { NgxSummernoteComponent } from './ngx-summernote.component';

@NgModule({
  declarations: [
    NgxSummernoteDirective,
    NgxSummernoteViewDirective,
    NgxSummernoteComponent
  ],
  exports: [
    NgxSummernoteDirective,
    NgxSummernoteViewDirective,
    NgxSummernoteComponent
  ]
})
export class NgxSummernoteModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: NgxSummernoteModule,  providers: []};
  }
}