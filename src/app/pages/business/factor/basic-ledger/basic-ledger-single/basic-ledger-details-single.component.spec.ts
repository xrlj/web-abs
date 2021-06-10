import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLedgerDetailsSingleComponent } from './basic-ledger-details-single.component';

describe('BasicLedgerDetailsSingleComponent', () => {
  let component: BasicLedgerDetailsSingleComponent;
  let fixture: ComponentFixture<BasicLedgerDetailsSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicLedgerDetailsSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLedgerDetailsSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
