import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBillDetailsAnnexSupplierComponent } from './payment-bill-details-annex-supplier.component';

describe('PaymentBillDetailsAnnexSupplierComponent', () => {
  let component: PaymentBillDetailsAnnexSupplierComponent;
  let fixture: ComponentFixture<PaymentBillDetailsAnnexSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBillDetailsAnnexSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBillDetailsAnnexSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
