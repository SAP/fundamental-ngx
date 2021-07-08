import { IconTabBarItem } from '../../../../../../../../libs/core/src/lib/icon-tab-bar/types';
import { Directive, OnInit } from '@angular/core';

@Directive()
export abstract class IconTabBarExampleClass implements OnInit {

    items: IconTabBarItem[] = [];

    private icons = [
        'accelerated',
        'action',
        'account',
        'alert',
        'addresses',
        'appointment',
        'arobase',
        'basket',
        'background',
        'begin',
        'bell',
        'bookmark',
        'calendar',
        'card',
        'cancel',
        'camera',
        'cart',
        'chalkboard',
    ];

    ngOnInit(): void {
        this.generateItems();
    }

    private generateItems(): void {
        for (let i = 0; i < this.icons.length; i++) {
            const icon = this.icons[i];
            this.items.push({
                icon: icon,
                label: `Item ${i}`,
                counter: Math.floor(Math.random() * 100),
                color: i % 5 === 0 ? 'critical' : 'informative'
            });
        }
    }
}
