import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstZdwRegisterComponent } from './first-zdw-register.component';

describe('FirstZdwRegisterComponent', () => {
  let component: FirstZdwRegisterComponent;
  let fixture: ComponentFixture<FirstZdwRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstZdwRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstZdwRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
