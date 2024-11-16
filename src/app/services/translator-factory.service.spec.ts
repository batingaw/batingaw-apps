import { TestBed } from '@angular/core/testing';

import { TranslatorFactoryService } from './translator-factory.service';

describe('TranslatorFactoryService', () => {
  let service: TranslatorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
