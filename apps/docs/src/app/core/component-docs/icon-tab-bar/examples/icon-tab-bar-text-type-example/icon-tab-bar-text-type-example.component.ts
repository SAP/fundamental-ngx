import { Component, Input } from '@angular/core';
import { IconTabBarExampleClass } from '../icon-tab-bar-example.class';

@Component({
    selector: 'fd-icon-tab-bar-text-type-example',
    templateUrl: './icon-tab-bar-text-type-example.component.html',
})
export class IconTabBarTextTypeExampleComponent extends IconTabBarExampleClass {

    @Input()
    hasIcon = false;

    @Input()
    textTypeLayoutMode: 'row'|'column' = 'row';

    @Input()
    enableTabReordering = false;
}
