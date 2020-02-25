import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialogRef
} from "@angular/material";
import { SweetAlertService } from "../../core/services/sweet-alert.service";
import { DetailsListService } from "./details-list.service";
import { Subscription } from "rxjs/Subscription";
import { MasterLookup } from "../master-lookup.model";
import { FormControl, FormGroup } from "@angular/forms";
import { AddDetailComponent } from "../add-detail/add-detail.component";
import { fuseAnimations } from "@fuse/animations";

@Component({
  selector: "app-details-list",
  templateUrl: "./details-list.component.html",
  styleUrls: ["./details-list.component.scss"],
  animations: fuseAnimations
})
export class DetailsListComponent implements OnInit, OnDestroy {
  masterCode: string;
  masterTitle: string;
  detailsLookUps: MasterLookup[];
  onDetailsLookUpsChanged: Subscription;

  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  detailsLookupsLength: number;
  isLoadingResults: boolean;

  searchInput: FormControl;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  private dialogRef: MatDialogRef<AddDetailComponent, any>;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public sweetAlertSvc: SweetAlertService,
    private detailsListSvc: DetailsListService
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params["id"]) {
        this.masterCode = params["id"];
        this.masterTitle = params["text"];
      }
    });

    this.displayedColumns = ["value", "text", "parentId", "options"];
    this.detailsLookupsLength = 0;
    this.isLoadingResults = true;
    this.searchInput = new FormControl("");
  }

  addDetailsLookup(detail?: MasterLookup): void {
    this.dialogRef = this.dialog.open(AddDetailComponent, {
      width: "600px",
      data: {
        action: detail ? "edit" : "new",
        lookup: detail ? detail : null
      }
    });

    this.dialogRef.afterClosed().subscribe((pageForm: FormGroup) => {
      if (!pageForm) {
        return;
      }

      if (pageForm.valid) {
        const data = pageForm.getRawValue();
        if (this.masterCode) {
          data.masterCode = this.masterCode;
        }

        // this.detailsListSvc.addDetailLookups(data);
    
        if (!detail) {
          this.detailsListSvc.addDetailLookups(data);
        } else {
          this.detailsListSvc.editDetailLookups(data, detail.value);
        }
      }
    });
  }

  onDeleteClick(detail: MasterLookup): void {
    this.sweetAlertSvc.showPrompt(
      "Are you sure?",
      "You won't be able to revert this!",
      "Yes, delete it!",
      result => {
        if (result.value) {
          this.detailsListSvc.deleteDetails(detail);
        }
      }
    );
  }

  ngOnInit() {
    this.detailsListSvc.getDetailsLookups(this.masterCode);
    this.onDetailsLookUpsChanged = this.detailsListSvc.onDetailsLookUpsChanged.subscribe(
      response => {
        
        if (response.length) {
          this.isLoadingResults = false;
          this.detailsLookUps = response;
          this.dataSource.data = this.detailsLookUps;
          this.dataSource.sort = this.sort;
        } else {
          this.isLoadingResults = false;
          this.detailsLookUps = [];
          this.dataSource.data = this.detailsLookUps;
        }
      }
    );

    this.searchInput.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(filterValue => {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      });
  }

  ngOnDestroy(): void {
    this.detailsListSvc.clearData();
    this.onDetailsLookUpsChanged.unsubscribe();
  }
}
