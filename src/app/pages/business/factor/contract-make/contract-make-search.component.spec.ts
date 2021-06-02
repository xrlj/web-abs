import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMakeSearchComponent } from './contract-make-search.component';

describe('ContractMakeSearchComponent', () => {
  let component: ContractMakeSearchComponent;
  let fixture: ComponentFixture<ContractMakeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractMakeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMakeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
