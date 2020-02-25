import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProjectsTableComponent } from './sub-projects-table.component';

describe('SubProjectsTableComponent', () => {
  let component: SubProjectsTableComponent;
  let fixture: ComponentFixture<SubProjectsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubProjectsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProjectsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
