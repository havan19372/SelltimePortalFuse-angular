import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import {
  MatDialog,
  MatPaginator,
  MatButtonToggleGroup
} from '@angular/material';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { environment } from '../../../environments/environment';
import { BusinessListService } from './business-list.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss'],
  animations: fuseAnimations
})
export class BusinessListComponent implements OnInit, OnDestroy {
  dialogRef: any;
  searchInput: FormControl;
  @ViewChild(MatButtonToggleGroup) group: MatButtonToggleGroup;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private BusinessService: BusinessListService
  ) {
    this.searchInput = new FormControl('');
  }
  newBusiness(BusinessId?:string){
    if (BusinessId) {
      console.log("calltheCreate",BusinessId);
      this.router.navigate(['business/create', BusinessId]);
    } else 
    {
      this.router.navigate(['business/create', 'new']);
    }

  }

  ngOnInit() {
    this.group.value = 'card';
    this.searchInput.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(searchText => {
        this.BusinessService.getFilteredBusiness(searchText);
      });
  }

  ngOnDestroy() {}
}
