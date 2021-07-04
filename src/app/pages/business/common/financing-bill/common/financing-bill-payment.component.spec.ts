import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingBillPaymentComponent } from './financing-bill-payment.component';

describe('FinancingBillPaymentComponent', () => {
  let component: FinancingBillPaymentComponent;
  let fixture: ComponentFixture<FinancingBillPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingBillPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
