import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateContentComponent } from './create-content/create-content.component';
import { contentRouting } from './content.routing';
import { RouterModule } from '@angular/router';
//import { NgxSummernoteModule } from 'ngx-summernote';

import { CKEditorModule } from 'ng2-ckeditor';
import { ContentService } from './content.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/core/modules/material.module';
import { GrapesEditorDirective } from './create-content/grapes-editor.directive';
import { ContentEditorComponent } from './content-editor/content-editor.component';
//import { NgxSummernoteModule } from '../../../../projects/ngx-summernote/src/public_api';
import { SummerNoteComponent } from './create-content/summer-note/summer-note.component';
import { NgxSummernoteModule } from '../../../../projects/ngx-summernote/src/public_api';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JsonInputComponent } from './create-content/json-input/json-input.component';

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    contentRouting,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSummernoteModule,
    CKEditorModule
  ],
  declarations: [CreateContentComponent, GrapesEditorDirective,  ContentEditorComponent, SummerNoteComponent, JsonInputComponent],
  providers: [ContentService]
})
export class ContentModule {}
