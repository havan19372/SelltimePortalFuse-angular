import { TestBed, inject } from '@angular/core/testing';

import { NgxSummernoteService } from './ngx-summernote.service';

describe('NgxSummernoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxSummernoteService]
    });
  });

  it('should be created', inject([NgxSummernoteService], (service: NgxSummernoteService) => {
    expect(service).toBeTruthy();
  }));
});
