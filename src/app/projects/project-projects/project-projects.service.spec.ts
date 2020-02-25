import { TestBed, inject } from '@angular/core/testing';

import { ProjectProjectsService } from './project-projects.service';

describe('ProjectProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectProjectsService]
    });
  });

  it('should be created', inject([ProjectProjectsService], (service: ProjectProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
