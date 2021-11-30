import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefactoringListComponent } from './refactoring-list.component';

describe('RefactoringListComponent', () => {
  let component: RefactoringListComponent;
  let fixture: ComponentFixture<RefactoringListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefactoringListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefactoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
