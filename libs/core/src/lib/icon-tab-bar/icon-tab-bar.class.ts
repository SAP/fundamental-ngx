import { ChangeDetectorRef, Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconTabBarItem, TabConfig } from './types';
import { cloneDeep } from '../utils/functions/clone-deep';
import { ICON_TAB_HIDDEN_CSS, UNIQUE_KEY_SEPARATOR } from './constants';

@Directive()
export abstract class IconTabBarClass implements OnInit {

    @Input()
    tabsConfig: TabConfig[];

    @Input()
    isRtl: boolean;

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    _selectedUid: string;
    _extraTabs: IconTabBarItem[] = [];
    _lastVisibleTabIndex: number;
    _anchorIndex: number;
    _tabs: IconTabBarItem[] = [];

    constructor(
        protected _cd: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this._tabs = this._generateTabBarItems(this.tabsConfig);
        const selectedItem = this._tabs.find(item => item.active);
        this._selectedUid = selectedItem?.uId;
        this._lastVisibleTabIndex = this._tabs.length - 1;
    }

    private _generateTabBarItems(config: TabConfig[]): IconTabBarItem[] {
        return config.map((item, index) => {
            const result: IconTabBarItem = {
                ...item,
                index: index,
                cssClasses: [],
                uId: index.toString(),
                hidden: false,
                subItems: null
            };
            if (item.color) {
                result.cssClasses = [`fd-icon-tab-bar__item--${item.color}`];
            }
            result.subItems = item.subItems?.length ? this._generateSubItems(item.subItems, result) : null
            return result;
        });
    }

    private _generateSubItems(subItems: TabConfig[], parent: IconTabBarItem): IconTabBarItem[] {
        return subItems?.map((item, index) => {
            const result: IconTabBarItem = {
                ...item,
                index: index,
                uId: `${parent.uId}${UNIQUE_KEY_SEPARATOR}${index}`,
                cssClasses: [],
                subItems: null,
            };
            if (Array.isArray(item.subItems) && item.subItems.length) {
                result.subItems = this._generateSubItems(item.subItems, result)
            }
            return result
        });
    }

    _selectItem(selectedItem: IconTabBarItem, event?: Event): void {
        event?.stopPropagation();
        this._selectedUid = selectedItem.uId;
        selectedItem.badge = false;
        this.selected.emit(selectedItem)
    }

    _selectExtraItem(selectedItem: IconTabBarItem): void {
        const deletedItem = <IconTabBarItem>this._tabs.splice(this._lastVisibleTabIndex, 1, selectedItem)[0];
        this._tabs.splice(selectedItem.index, 1, deletedItem);

        deletedItem.index = selectedItem.index;
        const itemToPopover = cloneDeep(deletedItem);
        deletedItem.hidden = true;
        deletedItem.cssClasses.push(ICON_TAB_HIDDEN_CSS)

        let indexInExtraItems;
        this._extraTabs.forEach((item, index) => {
            if (item.index === selectedItem.index) {
                indexInExtraItems = index;
            }
        })

        selectedItem.index = this._lastVisibleTabIndex;
        selectedItem.hidden = false;
        if (selectedItem.color) {
            selectedItem.cssClasses = [`fd-icon-tab-bar__item--${selectedItem.color}`];
        }
        this._extraTabs.splice(indexInExtraItems, 1, itemToPopover);
        this._extraTabs = [...this._extraTabs];


        this._selectItem(selectedItem);
    }

    _recalculateVisibleItems(extraItems: number): void {
        this._lastVisibleTabIndex = this._tabs.length - 1 - extraItems;
        this._tabs.forEach(item => {
            item.hidden = false;
            item.cssClasses = item.cssClasses.filter(cssClass => cssClass !== ICON_TAB_HIDDEN_CSS)
        });
        this._extraTabs = [];
        const lastVisibleIndex = this._tabs.length - extraItems - 1;

        for (let i = this._tabs.length - 1; i > lastVisibleIndex; i--) {
            const tab = this._tabs[i];
            this._extraTabs.push(cloneDeep(tab));
            tab.hidden = true;
            tab.cssClasses.push(ICON_TAB_HIDDEN_CSS)
        }
        this._cd.detectChanges();
    }
}
