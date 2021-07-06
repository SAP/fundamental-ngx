import { Component } from '@angular/core';
import { IconTabBarItem } from '../../../../../../../../../libs/core/src/lib/icon-tab-bar/types';

@Component({
  selector: 'fd-icon-tab-bar-icon-only-type-example',
  templateUrl: './icon-tab-bar-icon-only-type-example.component.html',
  styleUrls: ['./icon-tab-bar-icon-only-type-example.component.scss']
})
export class IconTabBarIconOnlyTypeExampleComponent {

    items: IconTabBarItem[] = [
        {
            id: 'item 1',
            icon: 'account',
            label: 'Item 1',
            color: 'positive'
        },
        {
            id: 'item 2',
            icon: 'product',
            badge: true,
        },
        {
            id: 'item 3',
            icon: 'present',
            active: true,
        },
    ];

}
