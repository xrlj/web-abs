import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskImportComponent } from './user-task-import.component';

describe('UserTaskImportComponent', () => {
  let component: UserTaskImportComponent;
  let fixture: ComponentFixture<UserTaskImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTaskImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTaskImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
