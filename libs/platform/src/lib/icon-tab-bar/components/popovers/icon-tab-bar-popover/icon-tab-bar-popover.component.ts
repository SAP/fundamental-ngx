import { Component, Input } from '@angular/core';
import { IconTabBarPopoverBase } from '../icon-tab-bar-popover-base.class';

@Component({
    selector: 'fdp-icon-tab-bar-popover',
    templateUrl: './icon-tab-bar-popover.component.html',
})
export class IconTabBarPopoverComponent extends IconTabBarPopoverBase {

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
}
