import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingBillListSingleComponent } from './financing-bill-list-single.component';

describe('FinancingBillListSingleComponent', () => {
  let component: FinancingBillListSingleComponent;
  let fixture: ComponentFixture<FinancingBillListSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingBillListSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingBillListSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
