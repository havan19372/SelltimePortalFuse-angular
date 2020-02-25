import * as  NewsLetterActions  from './../state/news-letter.action';
 
 import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromNewsLetter from '../state/news-letter-reducer';
import { Store, select } from '@ngrx/store';
import { NewsLetter } from '../news-letter.model';
import { takeWhile } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-news-letter-single',
  templateUrl: './news-letter-single.component.html',
  styleUrls: ['./news-letter-single.component.scss'],
  animations: fuseAnimations

})
export class NewsLetterSingleComponent implements OnInit,OnDestroy {
  newsLetterForm: FormGroup;
  newsLetterModel: NewsLetter ={};
  componentActive = true;

  constructor(private store: Store<fromNewsLetter.State>,private router: Router,
    private fb: FormBuilder,
  ) { 
    this.store.pipe(select(fromNewsLetter.getCurrentNewsLetter),  
        takeWhile(() => this.componentActive)
  ).subscribe(   newsLetter => { 
    if(newsLetter){  
       this.newsLetterModel=newsLetter;   
    }
    else{
      this.newsLetterModel={};
    } 
  })

    this.newsLetterForm = this.fb.group({   
      name: [this.newsLetterModel.name, Validators.required], 
       email: [this.newsLetterModel.email, Validators.email],  })
  }
  ngOnDestroy(): void {
    this.componentActive = false;
  }
  ngOnInit() {
   
  }
  onSubmitForm(){
      if (this.newsLetterForm.valid) {
        if (this.newsLetterForm.dirty) {
          // Copy over all of the original product properties
          // Then copy over the values from the form
          // This ensures values not on the form, such as the Id, are retained
          const p = { ...this.newsLetterModel, ...this.newsLetterForm.value };
  
          if (p.id === 0) {
            this.store.dispatch(new NewsLetterActions.CreateNewsLetter(p));
          } else {
            this.store.dispatch(new NewsLetterActions.UpdateNewsLetter(p));
          }
        }
        this.router.navigate(['/news-letter'])

      } else {
     }
  }
}
