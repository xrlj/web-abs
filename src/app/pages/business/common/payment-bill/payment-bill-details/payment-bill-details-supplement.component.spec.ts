import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBillDetailsSupplementComponent } from './payment-bill-details-supplement.component';

describe('PaymentBillDetailsSupplementComponent', () => {
  let component: PaymentBillDetailsSupplementComponent;
  let fixture: ComponentFixture<PaymentBillDetailsSupplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBillDetailsSupplementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBillDetailsSupplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
