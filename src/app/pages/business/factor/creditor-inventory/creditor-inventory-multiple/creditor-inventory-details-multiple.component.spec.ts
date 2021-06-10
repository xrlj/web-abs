import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorInventoryDetailsMultipleComponent } from './creditor-inventory-details-multiple.component';

describe('CreditorInventoryDetailsMultipleComponent', () => {
  let component: CreditorInventoryDetailsMultipleComponent;
  let fixture: ComponentFixture<CreditorInventoryDetailsMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditorInventoryDetailsMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditorInventoryDetailsMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
