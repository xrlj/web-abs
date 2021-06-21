import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpBankCardEditComponent } from './etp-bank-card-edit.component';

describe('EtpBankCardEditComponent', () => {
  let component: EtpBankCardEditComponent;
  let fixture: ComponentFixture<EtpBankCardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtpBankCardEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpBankCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
