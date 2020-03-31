import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAggregatedYearViewComponent } from './calendar-aggregated-year-view.component';

describe('CalendarAggregatedYearViewComponent', () => {
  let component: CalendarAggregatedYearViewComponent;
  let fixture: ComponentFixture<CalendarAggregatedYearViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarAggregatedYearViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarAggregatedYearViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
