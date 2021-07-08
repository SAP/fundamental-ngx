import { ChangeDetectorRef, Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconTabBarItem } from './types';
import { cloneDeep } from '../utils/functions/clone-deep';

@Directive()
export abstract class IconTabBarClass implements OnInit {

    @Input()
    items: IconTabBarItem[];

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    selectedItemId: string|number;
    extraItems: IconTabBarItem[] = [];
    moreBtnOrder = 0;

    constructor(
        protected _cd: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        const selectedItem = this.items.find(item => item.active);
        this.selectedItemId = selectedItem?.id;
    }

    selectItem(selectedItem: IconTabBarItem): void {
        this.selectedItemId = selectedItem.id;
        selectedItem.badge = false;
        this.selected.emit(selectedItem.id)
    }

    onChangeSize(extraItems: number): void {
        this.moreBtnOrder = this.items.length - 1 - extraItems;
        this.items.forEach(item => {
            item.hidden = false;
            item.cssClasses = item.cssClasses.filter(cssClass => cssClass !== 'fd-icon-tab-bar__item--hidden')
        });
        this.extraItems = [];
        const lastVisibleIndex = this.items.length - extraItems - 1;

        for (let i = this.items.length - 1; i > lastVisibleIndex; i--) {
            this.extraItems.push(cloneDeep(this.items[i]));
            this.items[i].hidden = true;
            this.items[i].cssClasses.push('fd-icon-tab-bar__item--hidden')
        }
        this._cd.detectChanges();
    }
}
