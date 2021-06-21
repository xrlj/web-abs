import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpInfoEditComponent } from './etp-info-edit.component';

describe('EtpInfoEditComponent', () => {
  let component: EtpInfoEditComponent;
  let fixture: ComponentFixture<EtpInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtpInfoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
