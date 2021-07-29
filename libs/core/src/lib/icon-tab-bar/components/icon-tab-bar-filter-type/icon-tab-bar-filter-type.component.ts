import { Component, Input } from '@angular/core';
import { IconTabBarClass } from '../icon-tab-bar.class';

@Component({
    selector: 'fd-icon-tab-bar-filter-type',
    templateUrl: './icon-tab-bar-filter-type.component.html',
})
export class IconTabBarFilterTypeComponent extends IconTabBarClass {

    @Input()
    showTabAll = true;
}
