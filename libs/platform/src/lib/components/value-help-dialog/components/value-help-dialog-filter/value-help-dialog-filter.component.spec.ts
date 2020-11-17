import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueHelpDialogFilterComponent } from './value-help-dialog-filter.component';

describe('ValueHelpDialogFilterComponent', () => {
  let component: ValueHelpDialogFilterComponent;
  let fixture: ComponentFixture<ValueHelpDialogFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueHelpDialogFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueHelpDialogFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
