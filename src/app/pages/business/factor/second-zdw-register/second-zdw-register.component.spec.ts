import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondZdwRegisterComponent } from './second-zdw-register.component';

describe('SecondZdwRegisterComponent', () => {
  let component: SecondZdwRegisterComponent;
  let fixture: ComponentFixture<SecondZdwRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondZdwRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondZdwRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
