import { TestBed } from '@angular/core/testing';

import { BaybayinService } from './baybayin.service';

describe('BaybayinService', () => {
  let service: BaybayinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaybayinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
