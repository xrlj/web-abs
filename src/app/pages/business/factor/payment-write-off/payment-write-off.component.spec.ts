import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWriteOffComponent } from './payment-write-off.component';

describe('PaymentWriteOffComponent', () => {
  let component: PaymentWriteOffComponent;
  let fixture: ComponentFixture<PaymentWriteOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentWriteOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWriteOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
