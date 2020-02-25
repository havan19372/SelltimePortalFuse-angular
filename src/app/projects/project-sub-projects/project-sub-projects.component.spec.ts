import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSubProjectsComponent } from './project-sub-projects.component';

describe('ProjectSubProjectsComponent', () => {
  let component: ProjectSubProjectsComponent;
  let fixture: ComponentFixture<ProjectSubProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSubProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSubProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
