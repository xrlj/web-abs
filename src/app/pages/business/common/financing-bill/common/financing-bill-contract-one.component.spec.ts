import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingBillContractOneComponent } from './financing-bill-contract-one.component';

describe('FinancingBillContractOneComponent', () => {
  let component: FinancingBillContractOneComponent;
  let fixture: ComponentFixture<FinancingBillContractOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingBillContractOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingBillContractOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
