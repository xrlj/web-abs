import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBillCheckComponent } from './payment-bill-check.component';

describe('PaymentBillCheckComponent', () => {
  let component: PaymentBillCheckComponent;
  let fixture: ComponentFixture<PaymentBillCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBillCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBillCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
