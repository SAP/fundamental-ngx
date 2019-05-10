import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendar2MonthViewComponent } from './calendar2-month-view.component';

describe('Calendar2MonthViewComponent', () => {
  let component: Calendar2MonthViewComponent;
  let fixture: ComponentFixture<Calendar2MonthViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Calendar2MonthViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Calendar2MonthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
