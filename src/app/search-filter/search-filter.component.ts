import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { fuseAnimations } from '@fuse/animations';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { MainTasksSidenavComponent } from '../../main-tasks-sidenav/main-tasks-sidenav.component';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  animations: fuseAnimations
})
export class SearchFilterComponent implements OnInit {
  
  searchInput:FormControl;
  // @ViewChild(MainTasksSidenavComponent) sideTaskComponent;
  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

  isOpenSearch() {

    if(this.isCollapsed)
    {
      this.isCollapsed = false;
    }
    else
    {
      this.isCollapsed = true;
    }
    console.log('test', this.isCollapsed);
  }

  // searchKeyUp(event) {
  //   let term: string = event.target.value;
  //   // debugger;
  //   console.log("Event", term);
  //   this.sideTaskComponent.getTaskById(1,50,term);
  // }

}
