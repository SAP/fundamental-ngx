import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendar2Component } from './calendar2.component';
import { CalendarModule } from '../calendar.module';




describe('Calendar2Component', () => {
  let component: Calendar2Component;
  let fixture: ComponentFixture<Calendar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CalendarModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Calendar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
