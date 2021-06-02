import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingBillListMultipleComponent } from './financing-bill-list-multiple.component';

describe('FinancingBillListMultipleComponent', () => {
  let component: FinancingBillListMultipleComponent;
  let fixture: ComponentFixture<FinancingBillListMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingBillListMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingBillListMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
