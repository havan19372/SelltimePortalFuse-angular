import { TestBed, inject } from '@angular/core/testing';

import { TaskStatusService } from './task-status.service';

describe('TaskStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskStatusService]
    });
  });

  it('should be created', inject([TaskStatusService], (service: TaskStatusService) => {
    expect(service).toBeTruthy();
  }));
});
