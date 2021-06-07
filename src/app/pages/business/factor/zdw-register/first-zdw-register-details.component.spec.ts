import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstZdwRegisterDetailsComponent } from './first-zdw-register-details.component';

describe('FirstZdwRegisterDetailsComponent', () => {
  let component: FirstZdwRegisterDetailsComponent;
  let fixture: ComponentFixture<FirstZdwRegisterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstZdwRegisterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstZdwRegisterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
