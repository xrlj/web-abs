import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLedgerComponent } from './basic-ledger.component';

describe('BasicLedgerComponent', () => {
  let component: BasicLedgerComponent;
  let fixture: ComponentFixture<BasicLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
