import { Component, Input } from '@angular/core';
import { IconTabBarPopoverBase } from '../icon-tab-bar-popover-base.class';

@Component({
    selector: 'fd-icon-tab-bar-popover',
    templateUrl: './icon-tab-bar-popover.component.html',
})
export class IconTabBarPopoverComponent extends IconTabBarPopoverBase {

    @Input()
    leftSide = false;

    @Input()
    label = 'more';
}
