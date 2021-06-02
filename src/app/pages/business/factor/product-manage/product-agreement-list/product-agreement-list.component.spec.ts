import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAgreementListComponent } from './product-agreement-list.component';

describe('ProductAgreementListComponent', () => {
  let component: ProductAgreementListComponent;
  let fixture: ComponentFixture<ProductAgreementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAgreementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAgreementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
