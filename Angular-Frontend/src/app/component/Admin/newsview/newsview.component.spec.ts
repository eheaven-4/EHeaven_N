import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsviewComponent } from './newsview.component';

describe('NewsviewComponent', () => {
  let component: NewsviewComponent;
  let fixture: ComponentFixture<NewsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
