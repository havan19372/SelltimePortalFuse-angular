import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyImagesTabComponent } from './property-images-tab.component';

describe('PropertyImagesTabComponent', () => {
  let component: PropertyImagesTabComponent;
  let fixture: ComponentFixture<PropertyImagesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyImagesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyImagesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
