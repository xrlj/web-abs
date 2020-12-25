import { TestBed } from '@angular/core/testing';

import { VerifyPersonalService } from './verify-personal.service';

describe('VerifyPersonalService', () => {
  let service: VerifyPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
