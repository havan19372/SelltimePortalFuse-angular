import { TestBed, inject } from '@angular/core/testing';

import { PropertyListService } from './property-list.service';

describe('PropertyListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertyListService]
    });
  });

  it('should be created', inject([PropertyListService], (service: PropertyListService) => {
    expect(service).toBeTruthy();
  }));
});
