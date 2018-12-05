import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxInputComponent } from './combobox-input.component';

describe('ComboboxInputComponent', () => {
  let component: ComboboxInputComponent;
  let fixture: ComponentFixture<ComboboxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboboxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboboxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
