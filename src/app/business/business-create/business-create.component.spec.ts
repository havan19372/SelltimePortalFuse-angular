import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCreateComponent } from './business-create.component';

describe('BusinessCreateComponent', () => {
  let component: BusinessCreateComponent;
  let fixture: ComponentFixture<BusinessCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
