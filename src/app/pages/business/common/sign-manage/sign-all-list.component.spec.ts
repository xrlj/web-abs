import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignAllListComponent } from './sign-all-list.component';

describe('SignAllListComponent', () => {
  let component: SignAllListComponent;
  let fixture: ComponentFixture<SignAllListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignAllListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
