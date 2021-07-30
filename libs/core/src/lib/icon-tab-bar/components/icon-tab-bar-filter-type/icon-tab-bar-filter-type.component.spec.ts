import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarFilterTypeComponent } from './icon-tab-bar-filter-type.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { generateTestItems } from '../../tests-helper';

describe('IconTabBarFilterTypeComponent', () => {
  let component: IconTabBarFilterTypeComponent;
  let fixture: ComponentFixture<IconTabBarFilterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTabBarFilterTypeComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTabBarFilterTypeComponent);
    component = fixture.componentInstance;
    component.tabsConfig = generateTestItems(10);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
