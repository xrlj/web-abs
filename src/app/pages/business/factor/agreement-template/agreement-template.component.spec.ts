import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementTemplateComponent } from './agreement-template.component';

describe('AgreementTemplateComponent', () => {
  let component: AgreementTemplateComponent;
  let fixture: ComponentFixture<AgreementTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
