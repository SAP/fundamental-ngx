import { Component, Input } from '@angular/core';
import { IconTabBarPopoverClass } from '../icon-tab-bar-popover.class';

@Component({
    selector: 'fd-icon-tab-bar-popover',
    templateUrl: './icon-tab-bar-popover.component.html',
})
export class IconTabBarPopoverComponent extends IconTabBarPopoverClass {

    @Input()
    leftSide = false;

    @Input()
    label = 'more';
}
