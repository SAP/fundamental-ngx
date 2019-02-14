import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimePickerComponent } from './datetime-picker.component';

describe('DatetimePickerComponent', () => {
  let component: DatetimePickerComponent;
  let fixture: ComponentFixture<DatetimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
