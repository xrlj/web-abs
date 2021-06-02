import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAnnexListComponent } from './product-annex-list.component';

describe('ProductAnnexListComponent', () => {
  let component: ProductAnnexListComponent;
  let fixture: ComponentFixture<ProductAnnexListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAnnexListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAnnexListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
