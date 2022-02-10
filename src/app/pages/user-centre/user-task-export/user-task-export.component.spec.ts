import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskExportComponent } from './user-task-export.component';

describe('UserTaskExportComponent', () => {
  let component: UserTaskExportComponent;
  let fixture: ComponentFixture<UserTaskExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTaskExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTaskExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
