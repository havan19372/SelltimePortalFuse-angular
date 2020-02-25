import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTasksSidenavComponent } from './main-tasks-sidenav.component';

describe('MainTasksSidenavComponent', () => {
  let component: MainTasksSidenavComponent;
  let fixture: ComponentFixture<MainTasksSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTasksSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTasksSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
