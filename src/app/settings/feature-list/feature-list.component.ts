import { filter } from 'rxjs/operators/filter';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApiService } from 'app/core/services/api.service';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import { checkBinding } from '@angular/core/src/view/util';
import { FormModel } from '../settingController';
import { SettingService } from '../setting.service';
import * as fromSetting from '../state/setting-reducer';
import { Store, select } from '../../../../node_modules/@ngrx/store';
import * as settingActions from '../state/setting.action';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  animations: fuseAnimations
})

export class FeatureListComponent implements OnInit {
  @Input() tabname: any;
  tabnameInfo: any;
  dataSource: any[];
  lastUpdatedSettingId: number = 0;
  lastUpdatedSettingInterval: any;

  constructor(private apiService: ApiService,
    private store: Store<fromSetting.State>,
    private settingSvc: SettingService,
    private fb: FormBuilder) {
  }


  ngOnInit() {
    this.tabnameInfo = this.tabname;
    this.getSettingList();
   
  }

  getSettingList() {
    this.store.pipe(select(fromSetting.getSettings)).subscribe(data => {
      this.dataSource = data.filter(set => set.featureName === this.tabnameInfo.name);
    });
  }

  onSavedCheckBox(itemInfo: any, value) {
    if (this.lastUpdatedSettingId == itemInfo.id) {
      clearInterval(this.lastUpdatedSettingInterval);
    }
    this.lastUpdatedSettingId = itemInfo.id;
    this.lastUpdatedSettingInterval = setTimeout(() => {    //<<<---    using ()=> syntax
      itemInfo.Value = value;
      this.store.dispatch(new settingActions.UpdateSetting(itemInfo));
    }, 3000);

  }





}

