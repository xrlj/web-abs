import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpBankCardComponent } from './etp-bank-card.component';

describe('EtpBankCardComponent', () => {
  let component: EtpBankCardComponent;
  let fixture: ComponentFixture<EtpBankCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtpBankCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpBankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
