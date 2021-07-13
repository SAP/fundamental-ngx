import { ChangeDetectorRef, Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconTabBarItem } from './types';
import { cloneDeep } from '../utils/functions/clone-deep';

@Directive()
export abstract class IconTabBarClass implements OnInit {

    @Input()
    items: IconTabBarItem[];

    @Input()
    isRtl: boolean;

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    selectedItemId: number;
    extraItems: IconTabBarItem[] = [];
    lastVisibleTabIndex: number;
    ancorIndex: number;

    constructor(
        protected _cd: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        const selectedItem = this.items.find(item => item.active);
        this.selectedItemId = selectedItem?.id;
        this.lastVisibleTabIndex = this.items.length - 1
    }

    selectItem(selectedItem: IconTabBarItem): void {
        this.selectedItemId = selectedItem.id;
        selectedItem.badge = false;
        this.selected.emit(selectedItem)
    }

    // ToDo: прописать логику для нестед форм, чтобы перемещалась вся ветка для нестед таб.
    selectExtraItem(selectedItem: IconTabBarItem): void {
        const deletedItem = <IconTabBarItem>this.items.splice(this.lastVisibleTabIndex, 1, selectedItem)[0];
        this.items.splice(selectedItem.id, 1, deletedItem);

        deletedItem.id = selectedItem.id;
        const itemToPopover = cloneDeep(deletedItem);
        deletedItem.hidden = true;
        deletedItem.cssClasses.push('fd-icon-tab-bar__item--hidden')

        let indexInExtraItems;
        this.extraItems.forEach((item, index) => {
            if (item.id === selectedItem.id) {
                indexInExtraItems = index;
            }
        })

        selectedItem.id = this.lastVisibleTabIndex;
        selectedItem.hidden = false;
        if (selectedItem.color) {
            selectedItem.cssClasses = [`fd-icon-tab-bar__item--${selectedItem.color}`];
        }
        this.extraItems.splice(indexInExtraItems, 1, itemToPopover);
        this.extraItems = [...this.extraItems];


        this.selectItem(selectedItem);
    }

    onChangeSize(extraItems: number): void {
        this.lastVisibleTabIndex = this.items.length - 1 - extraItems;
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
        // this._cd.detectChanges();
    }
}
