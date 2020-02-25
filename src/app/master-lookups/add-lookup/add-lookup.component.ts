import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { fuseAnimations } from '@fuse/animations';
import { ApiService } from '../../core/services/api.service';
import { MatSnackBar } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AddLookup } from '../add-lookup/add-lookup.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MasterListService } from '../master-list/master-list.service';
@Component({
  selector: 'app-add-lookup',
  templateUrl: './add-lookup.component.html',
  styleUrls: ['./add-lookup.component.scss'],
  animations: fuseAnimations
})
export class AddLookupComponent implements OnInit {
  // @BlockUI('productCreate') blockUIList: NgBlockUI;
  addlookupForm: FormGroup;
  lookupsData: any = [];
  lookup: AddLookup;
  dialogTitle: string;
  pageForm: FormGroup;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<AddLookupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private api: ApiService,
    public snackBar: MatSnackBar,
    private masterLookupSvc: MasterListService,
    private router: Router
  ) {
    // this.initilizeForm();
  }
  createPageForm(): FormGroup {
    return this.fb.group({
      id: [this.lookup.id],
      text: [this.lookup.text],
      code: [this.lookup.code],
      showForMembers: [this.lookup.showForMembers]
    });
  }
  ngOnInit() {
    // this.getDrops();
    this.action = this.data.action;
    if (this.action === 'edit') {
      this.lookup = this.data.lookup;
      this.dialogTitle = `Edit Master Lookup`;
    } else {
      this.dialogTitle = 'New Master Lookup';
      this.lookup = {
        id: 0,
        text: '',
        code: '',
        showForMembers: false
      };
    }

    this.pageForm = this.createPageForm();
  }

  onSubmitForm(): void {}
}
