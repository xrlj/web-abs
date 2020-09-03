import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEtpComponent } from './verify-etp.component';

describe('VerifyEtpComponent', () => {
  let component: VerifyEtpComponent;
  let fixture: ComponentFixture<VerifyEtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
