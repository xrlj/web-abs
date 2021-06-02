import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingBillListSearchMultipleComponent } from './financing-bill-list-search-multiple.component';

describe('FinancingBillListSearchMultipleComponent', () => {
  let component: FinancingBillListSearchMultipleComponent;
  let fixture: ComponentFixture<FinancingBillListSearchMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingBillListSearchMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingBillListSearchMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
