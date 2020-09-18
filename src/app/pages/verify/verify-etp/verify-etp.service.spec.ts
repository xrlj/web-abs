import { TestBed } from '@angular/core/testing';

import { VerifyEtpService } from './verify-etp.service';

describe('VerifyEtpService', () => {
  let service: VerifyEtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyEtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
