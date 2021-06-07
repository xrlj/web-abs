import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignListMultipleComponent } from './sign-list-multiple.component';

describe('SignListMultipleComponent', () => {
  let component: SignListMultipleComponent;
  let fixture: ComponentFixture<SignListMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignListMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignListMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
