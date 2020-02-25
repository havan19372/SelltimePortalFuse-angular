import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProjectsCreateFormComponent } from './sub-projects-create-form.component';

describe('SubProjectsCreateFormComponent', () => {
  let component: SubProjectsCreateFormComponent;
  let fixture: ComponentFixture<SubProjectsCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubProjectsCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProjectsCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
