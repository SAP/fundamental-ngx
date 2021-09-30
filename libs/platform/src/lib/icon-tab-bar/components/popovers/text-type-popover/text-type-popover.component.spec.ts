import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTypePopoverComponent } from './text-type-popover.component';
import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { generateTabBarItems, generateTestConfig } from '../../../tests-helper';
import { PopoverComponent } from '@fundamental-ngx/core';

describe('TextTypePopoverComponent', () => {
  let component: TextTypePopoverComponent;
  let fixture: ComponentFixture<TextTypePopoverComponent>;
  const colorToTest = 'positive';

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
    component.popover = fakePopover as PopoverComponent;
  });

  it('should generate styles for tabs', () => {
    const config = generateTestConfig(10);
    const extraTabs = generateTabBarItems(config);
    component.extraTabs = extraTabs;
    component.extraTabs[0].color = colorToTest;
    component.ngOnChanges(({ extraTabs: extraTabs }) as unknown as SimpleChanges);

    const appliedStyle = component.extraTabs[0].cssClasses.includes(`fd-icon-tab-bar__list-item--${colorToTest}`);
    expect(appliedStyle).toBeTruthy();
  });

  it('should generate styles for subTabs of parent', () => {
    const parentConfig = generateTestConfig(10, true);
    const tabs = generateTabBarItems(parentConfig);
    component.parentTab = tabs[5];
    component.parentTab.subItems[0].color = colorToTest;
    component.ngOnChanges(({ parentTab: tabs[5] }) as unknown as SimpleChanges);

    const appliedStyle = component.parentTab.subItems[0].cssClasses.includes(`fd-icon-tab-bar__list-item--${colorToTest}`);
    expect(appliedStyle).toBeTruthy();
  });

  it('should emit selectedExtraItem event.', () => {
    const parentConfig = generateTestConfig(1);
    const tabs = generateTabBarItems(parentConfig);
    component.isExtraItemsMode = true;
    component.extraTabs = tabs;
    component.ngOnChanges(({ extraTabs: tabs }) as unknown as SimpleChanges);


    const emitSpy = spyOn(component.selectedExtraItem, 'emit');
    component._selectItem(component.extraTabs[0]);

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit selectedSubItem event.', () => {
    const parentConfig = generateTestConfig(10, true);
    const tabs = generateTabBarItems(parentConfig);
    component.isExtraItemsMode = false;
    component.parentTab = tabs[5];
    component.ngOnChanges(({ parentTab: tabs[5] }) as unknown as SimpleChanges);


    const emitSpy = spyOn(component.selectedSubItem, 'emit');
    component._selectItem(component.parentTab.subItems[0]);

    expect(emitSpy).toHaveBeenCalled();
  });
});

const fakePopover = {
  close: () => null
};
