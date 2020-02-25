import * as _ from 'lodash';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialogRef,
  MatDialog,
  MatButtonToggleGroup
} from '@angular/material';
import { MasterLookup } from '../master-lookup.model';
import { Subscription } from 'rxjs/Subscription';
import { MasterListService } from './master-list.service';
import { fuseAnimations } from '@fuse/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { AddLookupComponent } from '../add-lookup/add-lookup.component';
import { SweetAlertService } from '../../core/services/sweet-alert.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss'],
  animations: fuseAnimations
})
export class MasterListComponent implements OnInit, OnDestroy {
  lookups: MasterLookup[];
  masterLookups: MasterLookup[];
  memberLookUp: MasterLookup[];
  onLookupsChanges: Subscription;
  showForMembers: boolean;
  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  lookupsLength: number;
  isLoadingResults: boolean;
  searchInput: FormControl;

  @ViewChild(MatButtonToggleGroup) group: MatButtonToggleGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private dialogRef: MatDialogRef<AddLookupComponent, any>;

  constructor(
    private masterLookUpsSvc: MasterListService,
    private dialog: MatDialog,
    private sweetAlert: SweetAlertService
  ) {
    this.displayedColumns = ['id', 'text', 'detailsCount', 'options'];
    this.lookupsLength = 0;
    this.isLoadingResults = true;
    this.searchInput = new FormControl('');
  }

  addMasterLookup(master?: MasterLookup): void {
    this.dialogRef = this.dialog.open(AddLookupComponent, {
      width: '600px',
      data: {
        action: master ? 'edit' : 'new',
        lookup: master ? master : null
      }
    });
    this.dialogRef.afterClosed().subscribe((pageForm: FormGroup) => {
      if (!pageForm) {
        return;
      }
      if (pageForm.valid) {
        if (!master) {
          this.masterLookUpsSvc.addMasterLookups(pageForm.getRawValue());
        } else {
          this.masterLookUpsSvc.editMasterLookups(
            pageForm.getRawValue(),
            master.id
          );
        }
      }
    });
  }

  fillLookUpsFilters(): void {

    this.masterLookups = _.filter(this.lookups, elem => {
     return  elem.showForMembers === false;
    });

    this.memberLookUp = _.filter(this.lookups, elem => {
     return  elem.showForMembers === true;
    });

  }

  onDeleteClick(master: MasterLookup): void {
    this.sweetAlert.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.masterLookUpsSvc.deleteMaster(master);
        }
      }
    );
  }

  onFilterChanged(value): void {

    switch (value) {
      case 'master':
        this.dataSource.data = this.masterLookups;
        this.dataSource.sort = this.sort;
        break;
      case 'member':
        this.dataSource.data = this.memberLookUp;
        this.dataSource.sort = this.sort;
        break;
      default:
        this.dataSource.data = this.lookups;
        this.dataSource.sort = this.sort;
        break;
    }
  }

  ngOnInit() {
    this.group.value = 'all';
    this.group.registerOnChange((value: string) => {
      this.onFilterChanged(value);
    });

    this.masterLookUpsSvc.getLookUps();
    this.onLookupsChanges = this.masterLookUpsSvc.onLookUpsChanged.subscribe(
      lookups => {
        if (lookups.length) {
          this.isLoadingResults = false;
          this.lookups = lookups;
          this.fillLookUpsFilters();
          this.dataSource.data = this.lookups;
          this.dataSource.sort = this.sort;
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
    this.onLookupsChanges.unsubscribe();
  }
}
