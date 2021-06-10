import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWriteOffSingleComponent } from './payment-write-off-single.component';

describe('PaymentWriteOffSingleComponent', () => {
  let component: PaymentWriteOffSingleComponent;
  let fixture: ComponentFixture<PaymentWriteOffSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentWriteOffSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWriteOffSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
