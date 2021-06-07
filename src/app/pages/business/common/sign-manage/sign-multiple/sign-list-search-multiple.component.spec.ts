import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignListSearchMultipleComponent } from './sign-list-search-multiple.component';

describe('SignListSearchMultipleComponent', () => {
  let component: SignListSearchMultipleComponent;
  let fixture: ComponentFixture<SignListSearchMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignListSearchMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignListSearchMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
