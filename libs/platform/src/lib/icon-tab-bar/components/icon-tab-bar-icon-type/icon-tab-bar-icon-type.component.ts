import { Component, Input } from '@angular/core';
import { IconTabBarBase } from '../icon-tab-bar-base.class';

@Component({
    selector: 'fdp-icon-tab-bar-icon-type',
    templateUrl: './icon-tab-bar-icon-type.component.html'
})
export class IconTabBarIconTypeComponent extends IconTabBarBase {
    /** Whether to display labels for tab items */
    @Input()
    showLabel: boolean;
}
