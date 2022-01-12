import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBillReviewComponent } from './payment-bill-review.component';

describe('PaymentBillReviewComponent', () => {
  let component: PaymentBillReviewComponent;
  let fixture: ComponentFixture<PaymentBillReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBillReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBillReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
