import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformTimePickerComponent} from './time-picker.component';

describe('TimePickerComponent', () => {
  let component: PlatformTimePickerComponent;
  let fixture: ComponentFixture<PlatformTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformTimePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
