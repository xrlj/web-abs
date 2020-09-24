import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyHeaderComponent } from './verify-header.component';

describe('VerifyHeaderComponent', () => {
  let component: VerifyHeaderComponent;
  let fixture: ComponentFixture<VerifyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
