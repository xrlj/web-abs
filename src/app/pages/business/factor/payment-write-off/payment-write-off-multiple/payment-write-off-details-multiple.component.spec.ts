import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWriteOffDetailsMultipleComponent } from './payment-write-off-details-multiple.component';

describe('PaymentWriteOffDetailsMultipleComponent', () => {
  let component: PaymentWriteOffDetailsMultipleComponent;
  let fixture: ComponentFixture<PaymentWriteOffDetailsMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentWriteOffDetailsMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWriteOffDetailsMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
