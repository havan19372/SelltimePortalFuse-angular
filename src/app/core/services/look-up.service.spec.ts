import { TestBed, inject } from '@angular/core/testing';

import { LookUpService } from './look-up.service';

describe('LookUpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LookUpService]
    });
  });

  it('should be created', inject([LookUpService], (service: LookUpService) => {
    expect(service).toBeTruthy();
  }));
});
