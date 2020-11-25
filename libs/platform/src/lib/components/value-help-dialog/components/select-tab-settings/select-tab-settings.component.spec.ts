import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTabSettingsComponent } from './select-tab-settings.component';

describe('SelectTabSettingsComponent', () => {
  let component: SelectTabSettingsComponent;
  let fixture: ComponentFixture<SelectTabSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTabSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTabSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
