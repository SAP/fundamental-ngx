import { ChangeDetectorRef, Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconTabBarItem, IconTabBarSubItem, TabConfig } from './types';
import { cloneDeep } from '../utils/functions/clone-deep';
import { UNIQUE_KEY_SEPARATOR } from './constants';
import { ChangedOverflowItemsEvent } from '../utils/directives/overflow-items/overflow-items.directive';

@Directive()
export abstract class IconTabBarClass implements OnInit {

    @Input()
    items: TabConfig[];

    @Input()
    isRtl: boolean;

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    selectedItemKey: string;
    extraItems: IconTabBarItem[] = [];
    lastVisibleTabIndex: number;
    anchorIndex: number;
    tabs: IconTabBarItem[] = [];

    constructor(
        protected _cd: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.tabs = this._generateTabBarItems(this.items);
        const selectedItem = this.tabs.find(item => item.active);
        this.selectedItemKey = selectedItem?.uniqueKey;
        this.lastVisibleTabIndex = this.tabs.length - 1;
    }

    private _generateTabBarItems(config: TabConfig[]): IconTabBarItem[] {
        return config.map((item, index) => {
            const result: IconTabBarItem = {
                ...item,
                index: index,
                cssClasses: [],
                uniqueKey: index.toString(),
                hidden: false,
                subItems: null
            };
            if (item.color) {
                result.cssClasses = [`fd-icon-tab-bar__item--${item.color}`];
            }
            result.subItems = item.subItems?.length ? this.generateSubItems(item.subItems, result) : null
            return result;
        });
    }

    private generateSubItems(subItems: TabConfig[], parent: IconTabBarSubItem|IconTabBarItem): IconTabBarSubItem[] {
        return subItems?.map((item, index) => {
            const result: IconTabBarSubItem = {
                ...item,
                index: index,
                uniqueKey: `${parent.uniqueKey}${UNIQUE_KEY_SEPARATOR}${index}`,
                cssClasses: [],
                subItems: null,
            };
            if (Array.isArray(item.subItems) && item.subItems.length) {
                result.subItems = this.generateSubItems(item.subItems, result)
            }
            return result
        });
    }

    selectItem(selectedItem: IconTabBarItem): void {
        this.selectedItemKey = selectedItem.uniqueKey;
        selectedItem.badge = false;
        this.selected.emit(selectedItem)
    }

    selectExtraItem(selectedItem: IconTabBarItem): void {
        const deletedItem = <IconTabBarItem>this.tabs.splice(this.lastVisibleTabIndex, 1, selectedItem)[0];
        this.tabs.splice(selectedItem.index, 1, deletedItem);

        deletedItem.index = selectedItem.index;
        const itemToPopover = cloneDeep(deletedItem);
        deletedItem.hidden = true;
        deletedItem.cssClasses.push('fd-icon-tab-bar__item--hidden')

        let indexInExtraItems;
        this.extraItems.forEach((item, index) => {
            if (item.index === selectedItem.index) {
                indexInExtraItems = index;
            }
        })

        selectedItem.index = this.lastVisibleTabIndex;
        selectedItem.hidden = false;
        if (selectedItem.color) {
            selectedItem.cssClasses = [`fd-icon-tab-bar__item--${selectedItem.color}`];
        }
        this.extraItems.splice(indexInExtraItems, 1, itemToPopover);
        this.extraItems = [...this.extraItems];


        this.selectItem(selectedItem);
    }

    onChangeSize(data: {amount: number, event: ChangedOverflowItemsEvent}): void {
        const extraItems = data.amount;
        this.lastVisibleTabIndex = this.tabs.length - 1 - extraItems;
        this.tabs.forEach(item => {
            item.hidden = false;
            item.cssClasses = item.cssClasses.filter(cssClass => cssClass !== 'fd-icon-tab-bar__item--hidden')
        });
        this.extraItems = [];
        const lastVisibleIndex = this.tabs.length - extraItems - 1;

        for (let i = this.tabs.length - 1; i > lastVisibleIndex; i--) {
            const tab = this.tabs[i];
            this.extraItems.push(cloneDeep(tab));
            tab.hidden = true;
            tab.cssClasses.push('fd-icon-tab-bar__item--hidden')
        }
        // this._cd.detectChanges();
    }
}
