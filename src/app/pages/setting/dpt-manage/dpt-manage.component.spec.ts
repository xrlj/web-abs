import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DptManageComponent } from './dpt-manage.component';

describe('DptManageComponent', () => {
  let component: DptManageComponent;
  let fixture: ComponentFixture<DptManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DptManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DptManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
