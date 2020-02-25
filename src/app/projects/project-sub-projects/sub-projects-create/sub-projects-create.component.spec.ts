import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProjectsCreateComponent } from './sub-projects-create.component';

describe('SubProjectsCreateComponent', () => {
  let component: SubProjectsCreateComponent;
  let fixture: ComponentFixture<SubProjectsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubProjectsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProjectsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
