import { TestBed } from '@angular/core/testing';

import { ProductAnnexTypeService } from './product-annex-type.service';

describe('ProductAnnexTypeService', () => {
  let service: ProductAnnexTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAnnexTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
