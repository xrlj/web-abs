import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPdfShowComponent } from './custom-pdf-show.component';

describe('CustomPdfShowComponent', () => {
  let component: CustomPdfShowComponent;
  let fixture: ComponentFixture<CustomPdfShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPdfShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPdfShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
