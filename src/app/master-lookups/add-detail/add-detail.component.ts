import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { MatSnackBar } from "@angular/material";
import { BlockUI, NgBlockUI } from "ng-block-ui";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { fuseAnimations } from "@fuse/animations";
import { ApiService } from "../../core/services/api.service";
import { MasterLookup } from "../master-lookup.model";
import { DetailsListService } from "../details-list/details-list.service";
@Component({
  selector: "app-add-detail",
  templateUrl: "./add-detail.component.html",
  styleUrls: ["./add-detail.component.scss"],
  animations: fuseAnimations
})
export class AddDetailComponent implements OnInit {
  addlookupForm: FormGroup;
  lookupsData: any = [];
  lookup: MasterLookup;
  dialogTitle: string;
  pageForm: FormGroup;
  action: string;
  constructor(
    public dialogRef: MatDialogRef<AddDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private api: ApiService,
    public snackBar: MatSnackBar,
    private router: Router,
    private detailsSrv: DetailsListService
  ) {}
  createPageForm(): FormGroup {
    return this.fb.group({
      id: [this.lookup.id],
      parentId: [this.lookup.parentId],
      text: [this.lookup.text],
      masterCode: [this.lookup.masterCode],
      showForMembers: [this.lookup.showForMembers]
    });
  }
  ngOnInit() {

    this.action = this.data.action;
    if (this.action === "edit") {
      this.lookup = this.data.lookup;
      this.dialogTitle = `Edit ${this.lookup.text} Lookup`;
    } else {
      this.dialogTitle = "New Detail Lookup";
      this.lookup = {
        id: 0,
        parentId: 0,
        text: "",
        masterCode: "",
        showForMembers: false,
        parentTitle: ""
      };
    }
    // debugger;
    this.pageForm = this.createPageForm();

    this.detailsSrv.onDetailsLookUpsChanged.subscribe(data => {
      debugger;
      if (this.action === "edit") {
        this.lookupsData = data.filter(
          item => item.value !== this.lookup.value
        );
      } else {
        this.lookupsData = data;
      }
    });
  }
}
