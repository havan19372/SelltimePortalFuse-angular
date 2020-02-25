import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSummernoteComponent } from './ngx-summernote.component';

describe('NgxSummernoteComponent', () => {
  let component: NgxSummernoteComponent;
  let fixture: ComponentFixture<NgxSummernoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSummernoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSummernoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
