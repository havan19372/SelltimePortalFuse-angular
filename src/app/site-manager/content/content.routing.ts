import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CreateContentComponent } from './create-content/create-content.component';
import { ContentEditorComponent } from './content-editor/content-editor.component';

export const routes: Routes = [
  {
    path: 'create/:pageId/:contentId',
    component: CreateContentComponent
  },
  {
    path: 'editor',
    component: ContentEditorComponent
  }
];

export const contentRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
