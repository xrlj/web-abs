import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBillSearchComponent } from './payment-bill-search.component';

describe('PaymentBillSearchComponent', () => {
  let component: PaymentBillSearchComponent;
  let fixture: ComponentFixture<PaymentBillSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBillSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBillSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
