import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'app/core/services/api.service';
import { fuseAnimations } from '@fuse/animations';
import { SettingService } from './setting.service';

import * as fromSetting from './state/setting-reducer';
import { Store, select } from '../../../node_modules/@ngrx/store';
import * as settingActions from './state/setting.action';


import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CreateSettingComponent } from './create-setting/create-setting.component';
import { Paging } from 'app/project-board/project-board.model';
import { SettingSyncRestComponent } from './setting-sync-rest/setting-sync-rest.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: fuseAnimations
})
export class SettingsComponent implements OnInit {
  dialogRef: any;
  isLoadingResults: boolean=true;
  tablist: any[];
  settingList:any[];
  paging: Paging={
    pageNumber:1,
    pageSize:200
  };
searchKeyword:string
  constructor(private apiService: ApiService,
    private settingSvc: SettingService,
    public dialog: MatDialog,
    private store: Store<fromSetting.State>,
    private snackBar: MatSnackBar,
  ) { }

  
  ngOnInit() {
    this.settingSvc.GetMasterLookup();
    this.store.dispatch(new settingActions.Load(this.paging));
     this.settingSvc.getFeatures();
     this.settingSvc.onfeaturesChanged.subscribe(res => {
       this.isLoadingResults=false;
      this.tablist = res;
    });
  }

newSetting() {
    this.dialogRef = this.dialog.open(CreateSettingComponent, {
      width: '400px',
      data: {
        action: 'new',
        tablist:this.tablist
      }
    });

    this.dialogRef.afterClosed().subscribe((settingForm: FormGroup) => {
      if (!settingForm) {
        return;
      }

      if (settingForm.valid) {
        this.store.dispatch(new settingActions.CreateSetting(settingForm.value));
      }
    });
  }

  SyncSettings() {
    this.dialogRef = this.dialog.open(SettingSyncRestComponent, {
      width: '400px',
      data: {
        action: 'new',
        tablist:this.tablist
      }
    });

    this.dialogRef.afterClosed().subscribe((lookupSyncForm) => {
       if (!lookupSyncForm) {
        return;
      }
      if (lookupSyncForm.valid) {
        this.isLoadingResults=true;
        this.settingSvc.SyncLookupToSettinget(lookupSyncForm.value).subscribe((res)=>{
          this.store.dispatch(new settingActions.Load(this.paging));
        this.isLoadingResults=false;
          this.snackBar.open(`Sync List to Setting Success`, 'Dismiss', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        })

      }
    });
  }
}
