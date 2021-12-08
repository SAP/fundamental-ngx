import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { IconTabBarPopoverBase } from '../icon-tab-bar-popover-base.class';

@Component({
    selector: 'fdp-icon-tab-bar-popover',
    templateUrl: './icon-tab-bar-popover.component.html'
})
export class IconTabBarPopoverComponent extends IconTabBarPopoverBase {
    /** @hidden list of tab html elements, that can receive focus */
    @ViewChildren('tabItem') _tabExtraUIElements: QueryList<ElementRef<HTMLElement>>;

    /**
     * @description Flag representing position inside container left/right
     */
    @Input()
    leftSide = false;

    /**
     * @description Label for button
     */
    @Input()
    label = 'more';

    /** Whether to display labels for tab items */
    @Input()
    showItemLabel: boolean;
}
