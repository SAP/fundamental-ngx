import { Component, Input, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IconTabBarBase } from '../icon-tab-bar-base.class';
import { IconTabBarPopoverComponent } from '../popovers/icon-tab-bar-popover/icon-tab-bar-popover.component';

@Component({
    selector: 'fdp-icon-tab-bar-icon-type',
    templateUrl: './icon-tab-bar-icon-type.component.html'
})
export class IconTabBarIconTypeComponent extends IconTabBarBase {
    /** @hidden list of tab html elements, that can receive focus */
    @ViewChildren('tabItem') _tabUIElements: QueryList<ElementRef<HTMLElement>>;

    /** @hidden */
    @ViewChild(IconTabBarPopoverComponent) _tabBarPopover: IconTabBarPopoverComponent;

    /** Whether to display labels for tab items */
    @Input()
    showLabel: boolean;
}
