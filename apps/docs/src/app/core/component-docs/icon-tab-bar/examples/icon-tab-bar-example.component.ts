import { Component } from '@angular/core';
import { IconTabBarItem } from '../../../../../../../../libs/core/src/lib/icon-tab-bar/types';

@Component({
    selector: 'fd-icon-tab-bar-example',
    template: '<fd-icon-tab-bar [items]="items"></fd-icon-tab-bar>'
})
export class IconTabBarExampleComponent {

    items: IconTabBarItem[] = [
        {
            icon: '',
            label: 'Item x',
        }
    ];
}
