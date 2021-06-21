import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBillDetailsAnnexFactorComponent } from './payment-bill-details-annex-factor.component';

describe('PaymentBillDetailsAnnexFactorComponent', () => {
  let component: PaymentBillDetailsAnnexFactorComponent;
  let fixture: ComponentFixture<PaymentBillDetailsAnnexFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBillDetailsAnnexFactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBillDetailsAnnexFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
