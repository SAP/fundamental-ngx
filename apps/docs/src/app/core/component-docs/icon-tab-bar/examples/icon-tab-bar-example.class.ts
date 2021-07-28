import { SemanticColor, TabConfig } from '../../../../../../../../libs/core/src/lib/icon-tab-bar/types';
import { Directive, Input, OnInit } from '@angular/core';

@Directive()
export abstract class IconTabBarExampleClass implements OnInit {

    @Input()
    itemsWithSubItems = 0;

    @Input()
    counter = false;

    @Input()
    hasIcon = true;

    // max = 18; If you want set more, pls provide more icons.
    @Input()
    tabsLength = 10;

    @Input()
    subItemsLevel = 1;

    items: TabConfig[] = [];

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
        this.items = this._generateItems();
    }

    protected _generateItems(): TabConfig[] {
        const items = [];
        for (let i = 0; i < this.tabsLength; i++) {
            const icon = this.icons[i];
            items.push({
                icon: icon,
                label: `Item ${i}`,
                counter: Math.floor(Math.random() * 100),
                color: this._generateColor(i),
                subItems: i === 5 ? this._generateSubItems() : null,
            });
        }
        return items;
    }

    protected _generateSubItems(level: number = this.subItemsLevel): TabConfig[] {
        if (!this.itemsWithSubItems || !level) {
            return null;
        }
        this.itemsWithSubItems--;
        const subItems = [];
        for (let i = 0; i < 3; i++) {
            const icon = this.icons[i];
            subItems.push({
                icon: this.hasIcon ? icon : null,
                label: `Item ${i}`,
                counter: this.counter ? Math.floor(Math.random() * 100) : null,
                color: this._generateColor(i),
                subItems: this._generateSubItems(--level),
            });
        }
        return subItems;
    }

    protected _generateColor(value: number): SemanticColor {
        if (value % 5 === 0) {
            return 'critical'
        }
        if (value % 6 === 0) {
            return 'positive';
        }
        if (value % 6 === 0) {
            return 'informative';
        }
        return null;
    }
}
