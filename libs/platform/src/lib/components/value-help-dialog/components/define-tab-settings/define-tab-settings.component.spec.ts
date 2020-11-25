import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineTabSettingsComponent } from './define-tab-settings.component';

describe('DefineTabSettingsComponent', () => {
  let component: DefineTabSettingsComponent;
  let fixture: ComponentFixture<DefineTabSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineTabSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineTabSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
