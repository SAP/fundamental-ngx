import { Component, Input, OnInit } from '@angular/core';
import { IconTabBarItem } from '../../types';

@Component({
    selector: 'fd-icon-tab-bar-popover',
    templateUrl: './icon-tab-bar-popover.component.html',
    styleUrls: ['./icon-tab-bar-popover.component.scss']
})
export class IconTabBarPopoverComponent implements OnInit {

    @Input() items: IconTabBarItem[];

    constructor() {
    }

    ngOnInit(): void {
        this.items.forEach(item => {
            if (item.color) {
                item.cssClasses = [`fd-list__item--${item.color}`];
            }
        });
    }

}
