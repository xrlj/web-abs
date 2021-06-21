import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBillDetailsInvoiceComponent } from './payment-bill-details-invoice.component';

describe('PaymentBillDetailsInvoiceComponent', () => {
  let component: PaymentBillDetailsInvoiceComponent;
  let fixture: ComponentFixture<PaymentBillDetailsInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBillDetailsInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBillDetailsInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
