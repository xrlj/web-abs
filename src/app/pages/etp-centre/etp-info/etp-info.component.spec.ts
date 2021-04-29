import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpInfoComponent } from './etp-info.component';

describe('EtpInfoComponent', () => {
  let component: EtpInfoComponent;
  let fixture: ComponentFixture<EtpInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtpInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
