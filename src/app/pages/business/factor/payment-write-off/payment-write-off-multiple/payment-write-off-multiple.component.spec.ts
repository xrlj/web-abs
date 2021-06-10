import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWriteOffMultipleComponent } from './payment-write-off-multiple.component';

describe('PaymentWriteOffMultipleComponent', () => {
  let component: PaymentWriteOffMultipleComponent;
  let fixture: ComponentFixture<PaymentWriteOffMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentWriteOffMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWriteOffMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
