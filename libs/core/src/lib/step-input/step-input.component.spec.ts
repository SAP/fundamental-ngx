import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepInputComponent } from './step-input.component';

describe('StepInputComponent', () => {
  let component: StepInputComponent;
  let fixture: ComponentFixture<StepInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
