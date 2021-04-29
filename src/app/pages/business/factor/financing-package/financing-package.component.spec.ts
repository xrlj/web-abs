import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingPackageComponent } from './financing-package.component';

describe('FinancingPackageComponent', () => {
  let component: FinancingPackageComponent;
  let fixture: ComponentFixture<FinancingPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
