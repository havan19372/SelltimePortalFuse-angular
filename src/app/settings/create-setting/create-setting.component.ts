import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LookUpService } from '../../core/services/look-up.service';
import { LookUpModel, LookUpCodes } from '../../core/lookUpCodes';

@Component({
  selector: 'app-create-setting',
  templateUrl: './create-setting.component.html',
  styleUrls: ['./create-setting.component.scss']
})
export class CreateSettingComponent implements OnInit {
  dialogTitle: string;
  settingForm: FormGroup;
  action: string;
  settingType: LookUpModel[];
  tablist:any;
  constructor(
    public dialogRef: MatDialogRef<CreateSettingComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private lookUpSvc: LookUpService,
  ) {}

  createSettingForm(): FormGroup {
    return this.formBuilder.group({
      featureId: new FormControl('', [Validators.required]),
      typeId: new FormControl('', [Validators.required]),
      key: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.action = this.data.action;
    this.tablist = this.data.tablist;
    this.lookUpSvc
    .getLookUpDetails(LookUpCodes.SettingType)
    .subscribe((response: LookUpModel[]) => {
      this.settingType = response;
    });
    this.settingForm = this.createSettingForm();
  }
}
