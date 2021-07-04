import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreOperateLogComponent } from './core-operate-log.component';

describe('CoreOperateLogComponent', () => {
  let component: CoreOperateLogComponent;
  let fixture: ComponentFixture<CoreOperateLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreOperateLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreOperateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
