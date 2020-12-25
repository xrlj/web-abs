import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingBillComponent } from './financing-bill.component';

describe('FinancingBillComponent', () => {
  let component: FinancingBillComponent;
  let fixture: ComponentFixture<FinancingBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancingBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
