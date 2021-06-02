import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondContractMakeComponent } from './second-contract-make.component';

describe('SecondContractMakeComponent', () => {
  let component: SecondContractMakeComponent;
  let fixture: ComponentFixture<SecondContractMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondContractMakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondContractMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
