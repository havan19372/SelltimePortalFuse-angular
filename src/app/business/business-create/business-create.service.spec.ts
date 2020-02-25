import { TestBed, inject } from '@angular/core/testing';

import { BusinessCreateService } from './business-create.service';

describe('BusinessCreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessCreateService]
    });
  });

  it('should be created', inject([BusinessCreateService], (service: BusinessCreateService) => {
    expect(service).toBeTruthy();
  }));
});
