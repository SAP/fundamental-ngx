import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { IconTabBarBase } from '../icon-tab-bar-base.class';
import { IconTabBarItem } from '../../types';
import { UNIQUE_KEY_SEPARATOR } from '../../constants';
import { FdDnDEvent } from '../../directives/dnd/icon-bar-dnd-container.directive';

export interface DataForReordering {
    arr: IconTabBarItem[],
    item: IconTabBarItem,
    parentUid: string,
}

@Component({
    selector: 'fd-icon-tab-bar-text-type',
    templateUrl: './icon-tab-bar-text-type.component.html',
})
export class IconTabBarTextTypeComponent extends IconTabBarBase {

    /**
     * @description Disable or enable reordering(drag and drop) feature.
     */
    @Input()
    enableTabReordering = false;

    /**
     * @description Layout type for tab.
     */
    @Input()
    layoutMode: 'row'|'column';

    /**
     * @description Emits when user drop tab.
     */
    @Output()
    reordered: EventEmitter<IconTabBarItem[]> = new EventEmitter<IconTabBarItem[]>();

    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
        protected _ngZone: NgZone,
    ) {
        super(_cd, _ngZone);
    }

    /**
     * @hidden
     * @param selectedItem
     */
    _selectExtraItem(selectedItem: IconTabBarItem): void {
        // Check if selected item is subItem
        // Then to find root tab, and pass it to parent method.
        if (selectedItem.uId.includes(UNIQUE_KEY_SEPARATOR)) {
            const rootTabUid = selectedItem.uId.split(UNIQUE_KEY_SEPARATOR)[0];
            selectedItem = this._tabs.find(tab => tab.uId === rootTabUid);
        }
        super._selectExtraItem(selectedItem);
    }

    /**
     * @hidden
     * @param draggableItem
     * @param targetItem
     * @param action
     */
    _onDropped({ draggableItem, targetItem, action }: FdDnDEvent): void {
        const replacedParsedUidArr = targetItem.uId.split(UNIQUE_KEY_SEPARATOR);
        replacedParsedUidArr.length = replacedParsedUidArr.length - 1;
        const draggableParsedUidArr = draggableItem.uId.split(UNIQUE_KEY_SEPARATOR);
        draggableParsedUidArr.length = draggableParsedUidArr.length - 1;

        const tabInfoForNewList = this._getTabInfoFromMainList(targetItem.uId);
        const tabInfoForPrevList = this._getTabInfoFromMainList(draggableItem.uId);

        const dataForAction = {
            replacedItemInfo: {
                arr: tabInfoForNewList.parent,
                item: tabInfoForNewList.tab,
                parentUid: replacedParsedUidArr.length ? replacedParsedUidArr.join(UNIQUE_KEY_SEPARATOR) : ''
            },
            draggableItemInfo: {
                arr: tabInfoForPrevList.parent,
                item: tabInfoForPrevList.tab,
                parentUid: draggableParsedUidArr.length ? draggableParsedUidArr.join(UNIQUE_KEY_SEPARATOR) : ''
            }
        };

        action === 'replace'
            ? this._replaceAsSibling(dataForAction)
            : this._insertItemAsChild(dataForAction);

        this.reordered.emit(this._tabs);
    }

    /**
     * @hidden
     * @param data
     * @description Insert tab into another tab.
     */
    private _insertItemAsChild(data: { replacedItemInfo: DataForReordering, draggableItemInfo: DataForReordering }): void {
        const { replacedItemInfo, draggableItemInfo } = data;
        // Remove draggable tab from previous list
        draggableItemInfo.arr.splice(draggableItemInfo.item.index, 1);
        if (!replacedItemInfo.item.subItems?.length) {
            replacedItemInfo.item.subItems = [];
        }
        // Add tab to subitem of the target tab
        replacedItemInfo.item.subItems.push(draggableItemInfo.item);
        this._tabs = this._updateTabsIndexes(this._tabs);
        this._triggerRecalculationVisibleItems();
    }

    /**
     * @hidden
     * @param data
     * @description Insert tab between tabs
     */
    private _replaceAsSibling(data: { replacedItemInfo: DataForReordering, draggableItemInfo: DataForReordering }): void {
        const { replacedItemInfo, draggableItemInfo } = data;
        draggableItemInfo.arr.splice(draggableItemInfo.item.index, 1);
        const newIndex = replacedItemInfo?.item?.index || 0;
        replacedItemInfo.arr.splice(newIndex, 0, draggableItemInfo.item);
        this._tabs = this._updateTabsIndexes(this._tabs);
        this._triggerRecalculationVisibleItems();
    }

    /**
     * @hidden
     * @param uid
     * @param arr
     * @returns {parent, tab}
     * @description Get tab reference inside main tab array and  reference to parent array.
     */
    private _getTabInfoFromMainList(uid: string, arr: any[] = this._tabs): {parent: IconTabBarItem[], tab: IconTabBarItem} {
        let result: {parent: IconTabBarItem[], tab: IconTabBarItem};
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (item.uId === uid) {
                result = {parent: arr, tab: item};
                break;
            } else if (Array.isArray(item.subItems)) {
                result = this._getTabInfoFromMainList(uid, item.subItems);
                if (result) {
                    break;
                }
            }
        }
        return result;
    }

    /**
     * @hidden
     * @param arr
     * @param parentUid
     * @description Update indexes and uIds.
     */
    private _updateTabsIndexes(arr: IconTabBarItem[], parentUid?: string): IconTabBarItem[] {
        return arr.map((item, index) => {
            item.index = index;
            item.uId = parentUid
                ? `${parentUid}${UNIQUE_KEY_SEPARATOR}${index}`
                : `${index}`;
            if (Array.isArray(item.subItems)) {
                item.subItems = this._updateTabsIndexes(item.subItems, item.uId);
            }
            return {...item};
        });
    }

    /**
     * @hidden
     * @param item
     * @returns uId
     */
    _trackBy(item: IconTabBarItem): string {
        return item.uId;
    }
}
