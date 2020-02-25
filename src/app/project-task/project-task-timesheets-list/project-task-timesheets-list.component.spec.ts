import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskTimesheetsListComponent } from './project-task-timesheets-list.component';

describe('ProjectTaskTimesheetsListComponent', () => {
  let component: ProjectTaskTimesheetsListComponent;
  let fixture: ComponentFixture<ProjectTaskTimesheetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTaskTimesheetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskTimesheetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
