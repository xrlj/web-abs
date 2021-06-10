import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorInventoryDetailsSingleComponent } from './creditor-inventory-details-single.component';

describe('CreditorInventoryDetailsSingleComponent', () => {
  let component: CreditorInventoryDetailsSingleComponent;
  let fixture: ComponentFixture<CreditorInventoryDetailsSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditorInventoryDetailsSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditorInventoryDetailsSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
