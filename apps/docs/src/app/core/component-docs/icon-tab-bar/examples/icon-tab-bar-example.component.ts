import { Component } from '@angular/core';
import { IconTabBarItem } from '../../../../../../../../libs/core/src/lib/icon-tab-bar/types';

@Component({
    selector: 'fd-icon-tab-bar-example',
    template: '<fd-icon-tab-bar [items]="items"></fd-icon-tab-bar>'
})
export class IconTabBarExampleComponent {

    items: IconTabBarItem[] = [
        {
            id: 'item 1',
            label: 'Item 1',
        },
        {
            id: 'item 2',
            label: 'Item 2',
            badge: true,
        },
        {
            id: 'item 3',
            label: 'Item 3',
            counter: 100,
            active: true,
        },
    ];
}
