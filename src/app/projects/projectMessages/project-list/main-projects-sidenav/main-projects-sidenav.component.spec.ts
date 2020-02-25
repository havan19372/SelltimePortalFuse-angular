import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProjectsSidenavComponent } from './main-projects-sidenav.component';

describe('MainProjectsSidenavComponent', () => {
  let component: MainProjectsSidenavComponent;
  let fixture: ComponentFixture<MainProjectsSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProjectsSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProjectsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
