import { Component, Input, OnInit } from '@angular/core';
import { IconTabBarClass } from '../../icon-tab-bar.class';

@Component({
    selector: 'fd-icon-tab-bar-filter-type',
    templateUrl: './icon-tab-bar-filter-type.component.html',
    styleUrls: ['./icon-tab-bar-filter-type.component.scss']
})
export class IconTabBarFilterTypeComponent extends IconTabBarClass {

    @Input()
    showTabAll = true;
}
