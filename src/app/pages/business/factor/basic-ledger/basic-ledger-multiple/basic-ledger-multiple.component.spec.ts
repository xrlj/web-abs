import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLedgerMultipleComponent } from './basic-ledger-multiple.component';

describe('BasicLedgerMultipleComponent', () => {
  let component: BasicLedgerMultipleComponent;
  let fixture: ComponentFixture<BasicLedgerMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicLedgerMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLedgerMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
