import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorInventorySingleComponent } from './creditor-inventory-single.component';

describe('CreditorInventorySingleComponent', () => {
  let component: CreditorInventorySingleComponent;
  let fixture: ComponentFixture<CreditorInventorySingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditorInventorySingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditorInventorySingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
