import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAnnexTypeComponent } from './product-annex-type.component';

describe('ProductAnnexTypeComponent', () => {
  let component: ProductAnnexTypeComponent;
  let fixture: ComponentFixture<ProductAnnexTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAnnexTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAnnexTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
