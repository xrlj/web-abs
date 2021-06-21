import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBillDetailsAnnexSubComponent } from './payment-bill-details-annex-sub.component';

describe('PaymentBillDetailsAnnexSubComponent', () => {
  let component: PaymentBillDetailsAnnexSubComponent;
  let fixture: ComponentFixture<PaymentBillDetailsAnnexSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBillDetailsAnnexSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBillDetailsAnnexSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
