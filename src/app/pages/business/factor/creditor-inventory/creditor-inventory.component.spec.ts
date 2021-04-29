import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorInventoryComponent } from './creditor-inventory.component';

describe('CreditorInventoryComponent', () => {
  let component: CreditorInventoryComponent;
  let fixture: ComponentFixture<CreditorInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditorInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditorInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
