import { TestBed, inject } from '@angular/core/testing';

import { TaskTimesheetService } from './task-timesheet.service';

describe('TaskTimesheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskTimesheetService]
    });
  });

  it('should be created', inject([TaskTimesheetService], (service: TaskTimesheetService) => {
    expect(service).toBeTruthy();
  }));
});
