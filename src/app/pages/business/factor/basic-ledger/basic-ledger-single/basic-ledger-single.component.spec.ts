import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLedgerSingleComponent } from './basic-ledger-single.component';

describe('BasicLedgerSingleComponent', () => {
  let component: BasicLedgerSingleComponent;
  let fixture: ComponentFixture<BasicLedgerSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicLedgerSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLedgerSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
