import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWriteOffDetailsSingleComponent } from './payment-write-off-details-single.component';

describe('PaymentWriteOffDetailsSingleComponent', () => {
  let component: PaymentWriteOffDetailsSingleComponent;
  let fixture: ComponentFixture<PaymentWriteOffDetailsSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentWriteOffDetailsSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWriteOffDetailsSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
