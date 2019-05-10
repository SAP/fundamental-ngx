import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendar2DayViewComponent } from './calendar2-day-view.component';

describe('Calendar2DayViewComponent', () => {
  let component: Calendar2DayViewComponent;
  let fixture: ComponentFixture<Calendar2DayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Calendar2DayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Calendar2DayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
