import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendar2YearViewComponent } from './calendar2-year-view.component';

describe('Calendar2YearViewComponent', () => {
  let component: Calendar2YearViewComponent;
  let fixture: ComponentFixture<Calendar2YearViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Calendar2YearViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Calendar2YearViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
