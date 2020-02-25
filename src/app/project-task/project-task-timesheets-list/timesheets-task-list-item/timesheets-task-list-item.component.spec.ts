import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetsTaskListItemComponent } from './timesheets-task-list-item.component';

describe('TimesheetsTaskListItemComponent', () => {
  let component: TimesheetsTaskListItemComponent;
  let fixture: ComponentFixture<TimesheetsTaskListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetsTaskListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetsTaskListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
