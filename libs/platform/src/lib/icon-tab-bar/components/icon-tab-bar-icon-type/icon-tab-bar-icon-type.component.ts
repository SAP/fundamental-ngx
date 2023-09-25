import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ClosableIconTabBar } from '../closable-icon-tab-bar.class';
import { IconTabBarPopoverComponent } from '../popovers/icon-tab-bar-popover/icon-tab-bar-popover.component';

@Component({
    selector: 'fdp-icon-tab-bar-icon-type',
    templateUrl: './icon-tab-bar-icon-type.component.html'
})
export class IconTabBarIconTypeComponent extends ClosableIconTabBar {
    /** @hidden list of tab html elements, that can receive focus */
    @ViewChildren('tabItem') _tabUIElements: QueryList<ElementRef<HTMLElement>>;

    /** @hidden */
    @ViewChild(IconTabBarPopoverComponent) _tabBarPopover: IconTabBarPopoverComponent;

    /** Whether to display labels for tab items */
    @Input()
    showLabel: boolean;
}
