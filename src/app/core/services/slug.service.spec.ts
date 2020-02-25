import { TestBed, inject } from '@angular/core/testing';

import { SlugService } from './slug.service';

describe('SlugService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlugService]
    });
  });

  it('should be created', inject([SlugService], (service: SlugService) => {
    expect(service).toBeTruthy();
  }));
});
