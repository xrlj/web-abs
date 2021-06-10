import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorInventoryMultipleComponent } from './creditor-inventory-multiple.component';

describe('CreditorInventoryMultipleComponent', () => {
  let component: CreditorInventoryMultipleComponent;
  let fixture: ComponentFixture<CreditorInventoryMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditorInventoryMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditorInventoryMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
