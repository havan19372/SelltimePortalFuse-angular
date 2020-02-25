import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProjectsComponent } from './project-projects.component';

describe('ProjectProjectsComponent', () => {
  let component: ProjectProjectsComponent;
  let fixture: ComponentFixture<ProjectProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
