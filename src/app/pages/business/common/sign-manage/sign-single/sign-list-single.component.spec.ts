import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignListSingleComponent } from './sign-list-single.component';

describe('SignListSingleComponent', () => {
  let component: SignListSingleComponent;
  let fixture: ComponentFixture<SignListSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignListSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignListSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
