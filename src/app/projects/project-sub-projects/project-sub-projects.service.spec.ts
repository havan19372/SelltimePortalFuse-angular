import { TestBed, inject } from '@angular/core/testing';

import { ProjectSubProjectsService } from './project-sub-projects.service';

describe('ProjectSubProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectSubProjectsService]
    });
  });

  it('should be created', inject([ProjectSubProjectsService], (service: ProjectSubProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
