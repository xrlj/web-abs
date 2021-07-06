import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementTemplateDetailsComponent } from './agreement-template-details.component';

describe('AgreementTemplateDetailsComponent', () => {
  let component: AgreementTemplateDetailsComponent;
  let fixture: ComponentFixture<AgreementTemplateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementTemplateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
