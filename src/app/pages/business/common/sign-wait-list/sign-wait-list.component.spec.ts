import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignWaitListComponent } from './sign-wait-list.component';

describe('SignWaitListComponent', () => {
  let component: SignWaitListComponent;
  let fixture: ComponentFixture<SignWaitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignWaitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignWaitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
