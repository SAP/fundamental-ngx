import { Component } from '@angular/core';
import { IconTabBarItem } from '../../../../../../../../../libs/core/src/lib/icon-tab-bar/types';

@Component({
  selector: 'fd-icon-tab-bar-filter-type-example',
  templateUrl: './icon-tab-bar-filter-type-example.component.html',
  styleUrls: ['./icon-tab-bar-filter-type-example.component.scss']
})
export class IconTabBarFilterTypeExampleComponent {

    items: IconTabBarItem[] = [
        {
            id: 'item 1',
            icon: 'account',
            label: 'Item 1',
            color: 'critical',
            counter: '100',
        },
        {
            id: 'item 2',
            icon: 'product',
            counter: '10',
            label: 'Item 2',
            badge: true,
        },
        {
            id: 'item 3',
            icon: 'present',
            label: 'Item 3',
            counter: 90,
            active: true,
        },
    ];

}
