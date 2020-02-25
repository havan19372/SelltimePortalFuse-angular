import { Subscription } from 'rxjs/Subscription';
import { SetCurrentNewsLetter } from './../state/news-letter.action';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NewsLetter } from '../news-letter.model';
import * as fromNewsLetter from '../state/news-letter-reducer';
import { Store, select } from '../../../../node_modules/@ngrx/store';
import * as newsLetterActions from '../state/news-letter.action';
import { fuseAnimations } from '@fuse/animations';
import {Router} from "@angular/router";
import { SweetAlertService } from 'app/core/services/sweet-alert.service';
import { ScrollEvent } from 'ngx-scroll-event';
import { Paging } from 'app/project-board/project-board.model';

@Component({
  selector: 'app-news-letter-list',
  templateUrl: './news-letter-list.component.html',
  styleUrls: ['./news-letter-list.component.scss'],
  animations: fuseAnimations
})
export class NewsLetterListComponent implements OnInit {
  newsLetter$: Subscription;
  onPagingChanges$: Subscription;

  errorMessage$: Observable<string>;
   constructor(private store: Store<fromNewsLetter.State>,
    private router: Router,private sweetAlert:SweetAlertService) { 
       
    }
  displayedColumns = [
    'name',
    'email',
    'createDate',
    'options'
  ];
  // exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();
  imageUrl: string;
  productsLength = 0;
  isLoadingResults = true;
  paging: Paging;

   @ViewChild('filter') filter: ElementRef;
  ngOnInit() {
    this.errorMessage$ = this.store.pipe(select(fromNewsLetter.getError));


    this.onPagingChanges$ = this.store
    .select(fromNewsLetter.getPaging)
    .subscribe(paging => {
      this.paging = paging;
    });
    this.store.dispatch(new newsLetterActions.Load(this.paging));
    this.newsLetter$ = this.store.pipe(select(fromNewsLetter.getNewsLetters)).subscribe(data => {
      if(data.length >0){
        this.isLoadingResults=false;
        this.dataSource.data = data;
      }
     });
   
  }

  newsletterSelected(newsLetter) {
    if(newsLetter==null){    
      this.store.dispatch(new newsLetterActions.InitializeCurrentNewsLetter());
      this.router.navigate(['/news-letter/single/new']);
    }
    else{
      this.store.dispatch(new newsLetterActions.SetCurrentNewsLetter(newsLetter));
      this.router.navigate(['/news-letter/single', newsLetter.id]);
    }

  }
  deleteNewsletter(newsLetter) {
    this.store.dispatch(new newsLetterActions.SetCurrentNewsLetter(newsLetter));

    this.sweetAlert.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.store.dispatch(new newsLetterActions.DeleteNewsLetter(newsLetter.id));

        }
      })
  }

  public handleScroll(event: ScrollEvent) {
     if (event.isReachingBottom) {
      if (this.dataSource.data.length < this.paging.totalItems) {
        this.paging.pageNumber = this.paging.pageNumber + 1;
        this.isLoadingResults=true;

        this.store.dispatch(new newsLetterActions.Load( this.paging));
      }
    } 
  }
  ngOnDestroy(): void {
    this.newsLetter$.unsubscribe();
    this.onPagingChanges$.unsubscribe();
  }
}
