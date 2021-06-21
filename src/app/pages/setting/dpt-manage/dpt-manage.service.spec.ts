import { TestBed } from '@angular/core/testing';

import { DptManageService } from './dpt-manage.service';

describe('DptManageService', () => {
  let service: DptManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DptManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
