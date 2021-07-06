import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementTemplateSearchComponent } from './agreement-template-search.component';

describe('AgreementTemplateSearchComponent', () => {
  let component: AgreementTemplateSearchComponent;
  let fixture: ComponentFixture<AgreementTemplateSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementTemplateSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTemplateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
