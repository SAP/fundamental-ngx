import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarComponent } from './icon-tab-bar.component';
import { TabConfig } from './types';
import { ContentDensityService, IconModule, PopoverModule, RtlService } from '@fundamental-ngx/core';
import { IconTabBarTextTypeComponent } from './components/icon-tab-bar-text-type/icon-tab-bar-text-type.component';
import { ExtraButtonDirective } from './directives/extra-button/extra-button.directive';
import { IconTabBarIconTypeComponent } from './components/icon-tab-bar-icon-type/icon-tab-bar-icon-type.component';
import { IconTabBarProcessTypeComponent } from './components/icon-tab-bar-process-type/icon-tab-bar-process-type.component';
import { IconTabBarFilterTypeComponent } from './components/icon-tab-bar-filter-type/icon-tab-bar-filter-type.component';
import { IconTabBarPopoverComponent } from './components/popovers/icon-tab-bar-popover/icon-tab-bar-popover.component';
import { TextTypePopoverComponent } from './components/popovers/text-type-popover/text-type-popover.component';
import { IconBarDndListDirective } from './directives/dnd/icon-bar-dnd-list.directive';
import { IconBarDndItemDirective } from './directives/dnd/icon-bar-dnd-item.directive';
import { IconBarDndContainerDirective } from './directives/dnd/icon-bar-dnd-container.directive';
import { OverflowItemsModule } from '../utils/directives/overflow-items/overflow-items.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  template: `<fd-icon-tab-bar
      [tabsConfig]="items"
      [enableTabReordering]="enableTabReordering"
  ></fd-icon-tab-bar>`
})
class HostComponent {
  enableTabReordering = false;
  items: TabConfig[] = [];
}

describe('IconTabBarComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        IconTabBarComponent,
        IconTabBarTextTypeComponent,
        ExtraButtonDirective,
        IconTabBarIconTypeComponent,
        IconTabBarProcessTypeComponent,
        IconTabBarFilterTypeComponent,
        IconTabBarPopoverComponent,
        TextTypePopoverComponent,
        IconBarDndListDirective,
        IconBarDndItemDirective,
        IconBarDndContainerDirective,
      ],
      providers: [ContentDensityService, RtlService],
      imports: [
        IconModule,
        PopoverModule,
        OverflowItemsModule,
        DragDropModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    component.items = generateTestItems(6);
    fixture.detectChanges();
  });

  it('should create tabs', () => {
    const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
    const tabs = infoMessageEl.querySelectorAll('.fd-icon-tab-bar__item');
    expect(tabs.length).toBeGreaterThan(0);
  });

  it('should create tabs with subtabs', () => {
    component.items = generateTestItems(6, true);
    fixture.detectChanges();
    const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
    const subItemBtn = infoMessageEl.querySelector('.fd-icon-tab-bar__arrow');
    expect(subItemBtn).toBeTruthy();
  });

  it('should reordering feature available', () => {
    component.enableTabReordering = true;
    fixture.detectChanges();
    const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
    const tabs = infoMessageEl.querySelectorAll<HTMLElement>('.fd-icon-tab-bar__item');
    const draggableItem = tabs[0];
    const target = tabs[1];
    const targetCoords = getElementOffset(target);
    const targetCenter = {
      clientX: targetCoords.left + target.offsetWidth / 2,
      clientY: targetCoords.top + target.offsetHeight / 2,
    };
    const initialTabsLength = tabs.length;

    const mousedown = new MouseEvent('mousedown');
    draggableItem.dispatchEvent(mousedown);
    fixture.detectChanges();

    const mousemove1 = new MouseEvent('mousemove', {clientX: targetCoords.left});
    draggableItem.dispatchEvent(mousemove1);
    fixture.detectChanges();

    // Need to move two times because cdk dnd skip first moving
    const mousemove = new MouseEvent('mousemove', targetCenter);
    draggableItem.dispatchEvent(mousemove);
    fixture.detectChanges();

    const mouseup = new MouseEvent('mouseup');
    draggableItem.dispatchEvent(mouseup);
    fixture.detectChanges();

    const updateTabsList = infoMessageEl.querySelectorAll<HTMLElement>('.fd-icon-tab-bar__item');

    expect(updateTabsList.length).toBeLessThan(initialTabsLength);
  });
});

function getElementOffset(el: Element | null): {left: number, top: number} {
  const rect = el?.getBoundingClientRect();
  return {
    left: (rect?.left || 0) + window?.scrollX,
    top: (rect?.top || 0) + window?.scrollY,
  };
}


function generateTestItems(length: number, subTabs: boolean = false): TabConfig[] {
  const items = [];
  for (let i = 0; i < length; i++) {
    items.push({
      icon: 'cart',
      label: `Item ${i}`,
      counter: Math.floor(Math.random() * 100),
      subItems: (subTabs && i === 5) ? generateTestItems(3) : null,
    });
  }
  return items;
}
