import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstContractMakeComponent } from './first-contract-make.component';

describe('FirstContractMakeComponent', () => {
  let component: FirstContractMakeComponent;
  let fixture: ComponentFixture<FirstContractMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstContractMakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstContractMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
