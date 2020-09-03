import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPersonalComponent } from './verify-personal.component';

describe('VerifyPersonalComponent', () => {
  let component: VerifyPersonalComponent;
  let fixture: ComponentFixture<VerifyPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
