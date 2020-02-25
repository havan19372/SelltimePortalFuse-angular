import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSidenavComponent } from './task-sidenav.component';

describe('TaskSidenavComponent', () => {
  let component: TaskSidenavComponent;
  let fixture: ComponentFixture<TaskSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
