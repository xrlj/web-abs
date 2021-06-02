import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignCompleteListComponent } from './sign-complete-list.component';

describe('SignCompleteListComponent', () => {
  let component: SignCompleteListComponent;
  let fixture: ComponentFixture<SignCompleteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignCompleteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignCompleteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
