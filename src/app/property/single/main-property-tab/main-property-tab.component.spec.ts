import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPropertyTabComponent } from './main-property-tab.component';

describe('MainPropertyTabComponent', () => {
  let component: MainPropertyTabComponent;
  let fixture: ComponentFixture<MainPropertyTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPropertyTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPropertyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
