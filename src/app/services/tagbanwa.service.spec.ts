import { TestBed } from '@angular/core/testing';

import { TagbanwaService } from './tagbanwa.service';

describe('TagbanwaService', () => {
  let service: TagbanwaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagbanwaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
