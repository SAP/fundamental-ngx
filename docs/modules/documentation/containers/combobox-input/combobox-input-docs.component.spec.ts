import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxInputDocsComponent } from './combobox-input-docs.component';

describe('ComboboxInputDocsComponent', () => {
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
