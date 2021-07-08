import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IconTabBarClass } from '../../icon-tab-bar.class';

@Component({
    selector: 'fd-icon-tab-bar-text-type',
    templateUrl: './icon-tab-bar-text-type.component.html',
    styleUrls: ['./icon-tab-bar-text-type.component.scss']
})
export class IconTabBarTextTypeComponent extends IconTabBarClass implements OnInit {

    @Input()
    maxNestingLevel = 0;

    @Input()
    enableTabReordering = false;

}
