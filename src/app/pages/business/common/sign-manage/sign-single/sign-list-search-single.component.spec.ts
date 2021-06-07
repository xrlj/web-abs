import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignListSearchSingleComponent } from './sign-list-search-single.component';

describe('SignListSearchSingleComponent', () => {
  let component: SignListSearchSingleComponent;
  let fixture: ComponentFixture<SignListSearchSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignListSearchSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignListSearchSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
