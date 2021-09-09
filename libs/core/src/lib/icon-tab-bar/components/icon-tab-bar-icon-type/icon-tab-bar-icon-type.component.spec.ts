import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarIconTypeComponent } from './icon-tab-bar-icon-type.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { generateTestItems } from '../../tests-helper';

describe('IconTabBarIconTypeComponent', () => {
  let component: IconTabBarIconTypeComponent;
  let fixture: ComponentFixture<IconTabBarIconTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTabBarIconTypeComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTabBarIconTypeComponent);
    component = fixture.componentInstance;
    component.tabsConfig = generateTestItems(10);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
