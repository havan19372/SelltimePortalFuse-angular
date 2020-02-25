import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessViewInEditModeComponent } from './business-view-in-edit-mode.component';

describe('BusinessViewInEditModeComponent', () => {
  let component: BusinessViewInEditModeComponent;
  let fixture: ComponentFixture<BusinessViewInEditModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessViewInEditModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessViewInEditModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
