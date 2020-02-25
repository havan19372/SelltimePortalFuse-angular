import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCreateFormComponent } from './business-create-form.component';

describe('BusinessCreateFormComponent', () => {
  let component: BusinessCreateFormComponent;
  let fixture: ComponentFixture<BusinessCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
