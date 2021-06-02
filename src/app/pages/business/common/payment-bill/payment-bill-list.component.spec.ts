import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBillListComponent } from './payment-bill-list.component';

describe('PaymentBillListComponent', () => {
  let component: PaymentBillListComponent;
  let fixture: ComponentFixture<PaymentBillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBillListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
