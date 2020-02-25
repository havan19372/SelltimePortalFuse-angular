import { Routes, RouterModule } from '@angular/router';
import { FuseMainComponent } from './main/main.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthMainComponent } from './auth/auth-main/auth-main.component';
export const routes:Routes = [

  {
    path: '',
    redirectTo: 'dashboard/main',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'property',
    loadChildren: './property/property.module#PropertyModule'
  },
  {
     path:'settings',
     loadChildren:'./settings/setting.module#SettingModule'
  },
  {
    path:'tasks',
    loadChildren:'./project-task/project-task.module#ProjectTaskModule'
 },
  {
    path:'task',
    loadChildren:'./task/task.module#TaskModule'
 },
  {
    path: 'members',
    loadChildren: './members/members.module#MembersModule'
  },
  {
    path: 'shoppingCarte',
    loadChildren: './shopping-cart/shopping-cart.module#ShoppingCartModule'
  },
  {
    path: 'business',
    loadChildren: './business/business.module#BusinessModule'
  },
  {
    path: 'siteManager',
    loadChildren: './site-manager/site-manager.module#SiteManagerModule'
  },
  {
    path: 'projects',
    loadChildren: './projects/projects.module#ProjectsModule'
  },
  {
    path: 'contact-us',
    loadChildren: './contact-us/contact-us.module#ContactUsModule'
  },
  {
    path: 'news-letter',
    loadChildren: './news-letter/news-letter.module#NewsLetterModule'
  },

  {
    path: 'gallery',
    loadChildren: './gallery/gallery.module#GalleryModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'users',
    loadChildren: './users-new/users.module#UsersNewModule'
  },
  {
    path: 'master-lookups',
    loadChildren: './master-lookups/master-lookups.module#MasterLookupsModule'
  },
  {
    path: 'project-board',
    loadChildren: './project-board/project-board.module#ProjectBoardModule'
  },
  {
    path: '**',
    redirectTo: 'dashboard/main',
    pathMatch: 'full'
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false
});

