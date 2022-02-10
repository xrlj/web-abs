import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCentreBasicComponent } from './user-centre-basic.component';

describe('UserCentreBasicComponent', () => {
  let component: UserCentreBasicComponent;
  let fixture: ComponentFixture<UserCentreBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCentreBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCentreBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
