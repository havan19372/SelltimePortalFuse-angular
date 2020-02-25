import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTimesheetTableComponent } from './task-timesheet-table.component';

describe('TaskTimesheetTableComponent', () => {
  let component: TaskTimesheetTableComponent;
  let fixture: ComponentFixture<TaskTimesheetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTimesheetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTimesheetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
