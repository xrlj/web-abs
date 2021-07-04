import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingBillContractTwoComponent } from './financing-bill-contract-two.component';

describe('FinancingBillContractTwoComponent', () => {
  let component: FinancingBillContractTwoComponent;
  let fixture: ComponentFixture<FinancingBillContractTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingBillContractTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingBillContractTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
