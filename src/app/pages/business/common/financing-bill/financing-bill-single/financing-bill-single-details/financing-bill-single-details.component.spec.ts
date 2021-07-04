import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingBillSingleDetailsComponent } from './financing-bill-single-details.component';

describe('FinancingBillSingleDetailsComponent', () => {
  let component: FinancingBillSingleDetailsComponent;
  let fixture: ComponentFixture<FinancingBillSingleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingBillSingleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingBillSingleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
