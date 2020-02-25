import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { AuthenticationService } from 'app/auth/athentication.service';
import { Subscription } from 'rxjs/Subscription';
import { UserModel } from 'app/auth/user.model';

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class FuseToolbarComponent
{
  userStatusOptions: any[];
  languages: any;
  selectedLanguage: any;
  showLoadingBar: boolean;
  horizontalNav: boolean;
  token: UserModel;
  noNav: boolean;
  navigation: any;
  fuseSettings: any;

  onSettingsChanged: Subscription;

  themes: any[];
  constructor(
    private router: Router,
    private fuseConfig: FuseConfigService,
    private renderer: Renderer2,
    private translate: TranslateService,
    public auth: AuthenticationService,
    private sidebarService: FuseSidebarService,
  ) {
    this.userStatusOptions = [
      {
        title: 'Online',
        icon: 'icon-checkbox-marked-circle',
        color: '#4CAF50'
      },
      {
        title: 'Away',
        icon: 'icon-clock',
        color: '#FFC107'
      },
      {
        title: 'Do not Disturb',
        icon: 'icon-minus-circle',
        color: '#F44336'
      },
      {
        title: 'Invisible',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#BDBDBD'
      },
      {
        title: 'Offline',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#616161'
      }
    ];

    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us'
      },
      {
        id: 'tr',
        title: 'Turkish',
        flag: 'tr'
      }
    ];

    this.selectedLanguage = this.languages[0];

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showLoadingBar = true;
      }
      if (event instanceof NavigationEnd) {
        this.showLoadingBar = false;
      }
    });

    this.fuseConfig.onConfigChanged.subscribe(settings => {
      this.horizontalNav = settings.layout.navigation === 'top';
      this.noNav = settings.layout.navigation === 'none';
    });
    this.token = auth.getUserToken();

    this.onSettingsChanged = this.fuseConfig.onConfigChanged.subscribe(
      newSettings => {
        this.fuseSettings = newSettings;
      }
    );

    this.themes = [
      {
        code: 'DRK',
        title: 'Dark Theme',
        bodyClass: 'dark-theme',
        colorClasses: {
          toolbar: 'mat-blue-600-bg',
          navbar: 'mat-fuse-dark-400-bg',
          footer: 'mat-fuse-dark-900-bg'
        }
      },
      {
        code: 'LGT',
        title: 'Light indigo Theme',
        bodyClass: 'dark-theme',
        colorClasses: {
          toolbar: 'mat-indigo-400-bg',
          navbar: 'mat-indigo-500-bg',
          footer: 'mat-indigo-900-bg'
        }
      },
      {
        code: 'BLT',
        title: 'Blue White Theme',
        bodyClass: 'dark-theme',
        colorClasses: {
          toolbar: 'mat-white-500-bg',
          navbar: 'mat-blue-500-bg',
          footer: 'mat-white-900-bg'
        }
      },
      {
        code: 'LDT',
        title: 'Default Theme',
        bodyClass: 'dark-theme',
        colorClasses: {
          toolbar: 'mat-blue-500-bg',
          navbar: 'mat-fuse-dark-900-bg',
          footer: 'mat-blue-900-bg'
        }
      }
    ];

      this.navigation = navigation;
  }

  search(value) {
    // Do your search here...
    console.log(value);
  }

  setTheme(theme) {
    if (theme.code === 'DRK') {
      // set class on body element
      debugger;
      this.renderer.addClass(document.body, theme.bodyClass);
      this.fuseSettings.colorClasses = theme.colorClasses;
      this.fuseConfig.setConfig(this.fuseSettings);
    } else {
      this.renderer.removeClass(document.body, theme.bodyClass);
      this.fuseSettings.colorClasses = theme.colorClasses;
      this.fuseConfig.setConfig(this.fuseSettings);
    }
  }

  logout() {

    this.auth.logout();
    this.router.navigate(['/auth/login']);

  }

  toggleSidebarOpened(key)
  {
      this.sidebarService.getSidebar(key).toggleOpen();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.onSettingsChanged.unsubscribe();
  }
}
