import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMakeListComponent } from './contract-make-list.component';

describe('ContractMakeListComponent', () => {
  let component: ContractMakeListComponent;
  let fixture: ComponentFixture<ContractMakeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractMakeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMakeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
