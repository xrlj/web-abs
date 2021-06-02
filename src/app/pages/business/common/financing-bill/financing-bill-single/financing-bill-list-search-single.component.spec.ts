import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingBillListSearchSingleComponent } from './financing-bill-list-search-single.component';

describe('FinancingBillListSearchSingleComponent', () => {
  let component: FinancingBillListSearchSingleComponent;
  let fixture: ComponentFixture<FinancingBillListSearchSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingBillListSearchSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingBillListSearchSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
