import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBillDetailsBasicComponent } from './payment-bill-details-basic.component';

describe('PaymentBillDetailsBasicComponent', () => {
  let component: PaymentBillDetailsBasicComponent;
  let fixture: ComponentFixture<PaymentBillDetailsBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBillDetailsBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBillDetailsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
