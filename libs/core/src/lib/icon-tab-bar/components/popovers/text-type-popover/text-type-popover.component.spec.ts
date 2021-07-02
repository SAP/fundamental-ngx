import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTypePopoverComponent } from './text-type-popover.component';

describe('TextTypePopoverComponent', () => {
  let component: TextTypePopoverComponent;
  let fixture: ComponentFixture<TextTypePopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextTypePopoverComponent ]
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
