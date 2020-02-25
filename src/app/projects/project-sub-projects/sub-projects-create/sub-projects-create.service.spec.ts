import { TestBed, inject } from '@angular/core/testing';

import { SubProjectsCreateService } from './sub-projects-create.service';

describe('SubProjectsCreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubProjectsCreateService]
    });
  });

  it('should be created', inject([SubProjectsCreateService], (service: SubProjectsCreateService) => {
    expect(service).toBeTruthy();
  }));
});
