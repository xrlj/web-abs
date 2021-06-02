import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStagingListComponent } from './product-staging-list.component';

describe('ProductStagingListComponent', () => {
  let component: ProductStagingListComponent;
  let fixture: ComponentFixture<ProductStagingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStagingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStagingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
