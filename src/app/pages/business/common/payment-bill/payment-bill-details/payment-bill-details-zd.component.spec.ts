import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBillDetailsZdComponent } from './payment-bill-details-zd.component';

describe('PaymentBillDetailsZdComponent', () => {
  let component: PaymentBillDetailsZdComponent;
  let fixture: ComponentFixture<PaymentBillDetailsZdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBillDetailsZdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBillDetailsZdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
