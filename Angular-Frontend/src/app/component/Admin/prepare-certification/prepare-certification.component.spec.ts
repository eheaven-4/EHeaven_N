import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareCertificationComponent } from './prepare-certification.component';

describe('PrepareCertificationComponent', () => {
  let component: PrepareCertificationComponent;
  let fixture: ComponentFixture<PrepareCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
