import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondZdwRegisterDetailsComponent } from './second-zdw-register-details.component';

describe('SecondZdwRegisterDetailsComponent', () => {
  let component: SecondZdwRegisterDetailsComponent;
  let fixture: ComponentFixture<SecondZdwRegisterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondZdwRegisterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondZdwRegisterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
