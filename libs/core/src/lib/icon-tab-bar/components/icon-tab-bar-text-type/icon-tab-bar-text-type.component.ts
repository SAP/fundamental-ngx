import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { IconTabBarClass } from '../../icon-tab-bar.class';
import { IconTabBarItem } from '../../types';
import { UNIQUE_KEY_SEPARATOR } from '../../constants';
import { OverflowItemsDirective } from '../../../utils/directives/overflow-items/overflow-items.directive';
import { ExtraButtonDirective } from '../../directives/extra-button/extra-button.directive';
import { FdDnDEvent } from '../../directives/dnd/icon-bar-dnd-container.directive';

interface ItemToReplace {
    arr: IconTabBarItem[],
    item: IconTabBarItem,
    parentUid: string,
}

@Component({
    selector: 'fd-icon-tab-bar-text-type',
    templateUrl: './icon-tab-bar-text-type.component.html',
})
export class IconTabBarTextTypeComponent extends IconTabBarClass {

    @ViewChild(OverflowItemsDirective)
    overflowDirective: OverflowItemsDirective;

    @ViewChild(ExtraButtonDirective)
    extraBtnDirective: ExtraButtonDirective;

    @Input()
    enableTabReordering = true;

    constructor(
        protected _cd: ChangeDetectorRef
    ) {
        super(_cd);
    }

    _selectExtraItem(selectedItem: IconTabBarItem): void {
        // Check if selected item is subItem
        // Then to find root tab, and pass it to parent method.
        if (selectedItem.uId.includes(UNIQUE_KEY_SEPARATOR)) {
            const rootTabUid = selectedItem.uId.split(UNIQUE_KEY_SEPARATOR)[0];
            selectedItem = this._tabs.find(tab => tab.uId === rootTabUid);
        }
        super._selectExtraItem(selectedItem);
    }

    _onDropped({ draggableItem, targetItem, action }: FdDnDEvent<IconTabBarItem>): void {
        const replacedParsedUidArr = targetItem.uId.split(UNIQUE_KEY_SEPARATOR);
        replacedParsedUidArr.length = replacedParsedUidArr.length - 1;
        const draggableParsedUidArr = draggableItem.uId.split(UNIQUE_KEY_SEPARATOR);
        draggableParsedUidArr.length = draggableParsedUidArr.length - 1;

        const newArr = this._getParentArrByUid(targetItem.uId);
        const previousArr = this._getParentArrByUid(draggableItem.uId);

        const dataForAction = {
            replacedItemInfo: {
                arr: newArr,
                item: targetItem,
                parentUid: replacedParsedUidArr.length ? replacedParsedUidArr.join(UNIQUE_KEY_SEPARATOR) : ''
            },
            draggableItemInfo: {
                arr: previousArr,
                item: draggableItem,
                parentUid: draggableParsedUidArr.length ? draggableParsedUidArr.join(UNIQUE_KEY_SEPARATOR) : ''
            }
        };

        action === 'replace'
            ? this._replaceItems(dataForAction)
            : this._insertItemAsChild(dataForAction);
    }

    private _insertItemAsChild(data: { replacedItemInfo: ItemToReplace, draggableItemInfo: ItemToReplace }): void {
        const { replacedItemInfo, draggableItemInfo } = data;
        draggableItemInfo.arr.splice(draggableItemInfo.item.index, 1);
        if (!replacedItemInfo.item.subItems.length) {
            replacedItemInfo.item.subItems = [];
        }
        replacedItemInfo.item.subItems.push(draggableItemInfo.item);
        this._tabs = this._updateTabsIndexes(this._tabs);
        this._triggerRecalculationVisibleItems();
    }

    private _replaceItems(data: { replacedItemInfo: ItemToReplace, draggableItemInfo: ItemToReplace }): void {
        const { replacedItemInfo, draggableItemInfo } = data;
        draggableItemInfo.arr.splice(draggableItemInfo.item.index, 1);
        const newIndex = replacedItemInfo?.item?.index || 0;
        replacedItemInfo.arr.splice(newIndex, 0, draggableItemInfo.item);
        this._tabs = this._updateTabsIndexes(this._tabs);
        this._triggerRecalculationVisibleItems();
    }

    private _triggerRecalculationVisibleItems(): void {
        setTimeout(() => {
            const extra = this.overflowDirective.getAmountOfExtraItems();
            this._recalculateVisibleItems(extra);
        }, 100);
        setTimeout(_ => this.extraBtnDirective.calculatePosition(), 200);
        this._cd.detectChanges();
    }

    private _getParentArrByUid(uid: string, arr: any[] = this._tabs): IconTabBarItem[] {
        let result;
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (item.uId === uid) {
                result = arr;
                break;
            } else if (Array.isArray(item.subItems)) {
                result = this._getParentArrByUid(uid, item.subItems);
                if (result) {
                    break;

                }
            }
        }
        return result;
    }

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

    _trackBy(item: IconTabBarItem): string {
        return item.label;
    }
}
