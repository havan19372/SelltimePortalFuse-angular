import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskTimesheetsDetailsComponent } from './project-task-timesheets-details.component';

describe('ProjectTaskTimesheetsDetailsComponent', () => {
  let component: ProjectTaskTimesheetsDetailsComponent;
  let fixture: ComponentFixture<ProjectTaskTimesheetsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTaskTimesheetsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskTimesheetsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
