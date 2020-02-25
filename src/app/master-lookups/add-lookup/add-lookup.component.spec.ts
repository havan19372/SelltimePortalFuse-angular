import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLookupComponent } from './add-lookup.component';

describe('AddLookupComponent', () => {
  let component: AddLookupComponent;
  let fixture: ComponentFixture<AddLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
