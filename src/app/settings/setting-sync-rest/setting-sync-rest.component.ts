import { SettingService } from './../setting.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LookUpModel, LookUpCodes } from 'app/core/lookUpCodes';
import { LookUpService } from 'app/core/services/look-up.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-setting-sync-rest',
  templateUrl: './setting-sync-rest.component.html',
  styleUrls: ['./setting-sync-rest.component.scss']
})
export class SettingSyncRestComponent implements OnInit {
  dialogTitle: string;
  settingForm: FormGroup;
  action: string;
  settingType: LookUpModel[] = [];
  features: any[] = [];
  masterLookups: any[] = [];

  tablist: any;
  constructor(
    public dialogRef: MatDialogRef<SettingSyncRestComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private lookUpSvc: LookUpService,
    private settingSrvc: SettingService
  ) { }


  ngOnInit() {
    this.settingSrvc.onMasterLookupsChanged.subscribe((response) => {
      this.masterLookups = response;
    });
    this.settingSrvc.onfeaturesChanged.subscribe((response) => this.features = response)
    this.lookUpSvc.getLookUpDetails(LookUpCodes.SettingType)
      .subscribe((response: any[]) => {
        this.settingType = response;
      });
    this.settingForm = this.createSettingLookupForm();

  }

  createSettingLookupForm(): FormGroup {
    return this.formBuilder.group({
      featureId: new FormControl('', [Validators.required]),
      typeId: new FormControl('', [Validators.required]),
      masterKey: new FormControl('', [Validators.required]),
    });
  }
}
