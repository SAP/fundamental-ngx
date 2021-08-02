import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTypePopoverComponent } from './text-type-popover.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TextTypePopoverComponent', () => {
  let component: TextTypePopoverComponent;
  let fixture: ComponentFixture<TextTypePopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextTypePopoverComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTypePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
