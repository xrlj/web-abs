import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLedgerDetailsMultipleComponent } from './basic-ledger-details-multiple.component';

describe('BasicLedgerDetailsMultipleComponent', () => {
  let component: BasicLedgerDetailsMultipleComponent;
  let fixture: ComponentFixture<BasicLedgerDetailsMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicLedgerDetailsMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLedgerDetailsMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
