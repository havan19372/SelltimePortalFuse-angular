import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  HostListener,
  NgZone
} from '@angular/core';
import { IBusinessModel } from '../../business.model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MatPaginator } from '@angular/material';
import { BusinessListService } from '../business-list.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent implements OnInit, OnDestroy {
  
  filteredBusinesses: any[];
  
  paging: {
    pageIndex: number;
    pageSize: number;
    length: number;
  };
  public imageUrl: string;
  onBusinessChanges: Subscription;
  onPagingChanged: Subscription;
  @Output() callNewBusiness: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private BusinessService: BusinessListService,
    private ngZone: NgZone
  ) {
    this.imageUrl = environment.ImageApiUrl;
    // this.paging = {
    //   length: 0,
    //   pageIndex: 0,
    //   pageSize: 10
    // };
  }

  newBusiness(BusinessId?: string) {
    this.callNewBusiness.emit(BusinessId);
  }

  getPageForView($event): void {
    this.BusinessService.getNextPageData($event);
  }

  ngOnInit() {
    this.onBusinessChanges = this.BusinessService.onBusinessChanged.subscribe(
      Businesses => {
        this.filteredBusinesses = Businesses;
      }
    );
    
    const container = document.getElementById('Businesses');
    this.ngZone.run(() => {
      container.addEventListener('scroll', () => {
        if (container.scrollTop > 200) {
          this.ngZone.run(() => {
            this.BusinessService.getPagesOnScroll();
          });
        }
      });
    });
    
    // this.onPagingChanged = this.BusinessService.onPagingChanged.subscribe(
    //   paging => {
    //     this.paging = {
    //       length: paging.length,
    //       pageIndex: paging.pageIndex,
    //       pageSize: paging.pageSize
    //     };
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.onBusinessChanges.unsubscribe();
    // this.onPagingChanged.unsubscribe();
  }
}
