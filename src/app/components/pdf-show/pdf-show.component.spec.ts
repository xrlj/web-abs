import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfShowComponent } from './pdf-show.component';

describe('PdfShowComponent', () => {
  let component: PdfShowComponent;
  let fixture: ComponentFixture<PdfShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
