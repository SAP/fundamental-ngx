import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Nullable, OverflowListDirective, OverflowListItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { UNIQUE_KEY_SEPARATOR } from '../../constants';
import { FdDnDEvent, IconBarDndContainerDirective } from '../../directives/dnd/icon-bar-dnd-container.directive';
import { IconBarDndItemDirective } from '../../directives/dnd/icon-bar-dnd-item.directive';
import { IconBarDndListDirective } from '../../directives/dnd/icon-bar-dnd-list.directive';
import { IconTabBarItem } from '../../interfaces/icon-tab-bar-item.interface';
import { ClosableIconTabBar } from '../closable-icon-tab-bar.class';
import { IconTabBarBase } from '../icon-tab-bar-base.class';
import { TextTypePopoverComponent } from '../popovers/text-type-popover/text-type-popover.component';
import { IconTabBarTextTypeTabItemComponent } from '../text-type-tab-item/icon-tab-bar-text-type-tab-item.component';

/** @hidden */
interface DataForReordering {
    arr: IconTabBarItem[];
    item: IconTabBarItem;
    parentUid: string;
}

/** @hidden */
type TabItem = ElementRef<HTMLElement> | TextTypePopoverComponent;

@Component({
    selector: 'fdp-icon-tab-bar-text-type',
    templateUrl: './icon-tab-bar-text-type.component.html',
    providers: [
        {
            provide: IconTabBarBase,
            useExisting: IconTabBarTextTypeComponent
        }
    ],
    imports: [
        IconBarDndContainerDirective,
        OverflowListDirective,
        IconBarDndListDirective,
        OverflowListItemDirective,
        IconBarDndItemDirective,
        NgClass,
        TextTypePopoverComponent,
        ButtonComponent,
        IconComponent,
        IconTabBarTextTypeTabItemComponent
    ]
})
export class IconTabBarTextTypeComponent extends ClosableIconTabBar {
    /** @hidden list of tab html elements, that can receive focus */
    @ViewChildren('tabItem') _tabUIElements: QueryList<TabItem>;

    /** @hidden */
    @ViewChild('extraItemsPopover') _tabBarPopover: TextTypePopoverComponent;

    /**
     * @description Disable or enable reordering(drag and drop) feature.
     */
    @Input()
    enableTabReordering = false;

    /**
     * @description Layout type for tab.
     */
    @Input()
    layoutMode: 'row' | 'column';

    /** Whether to render icon tab item as multi-click variant. */
    @Input()
    multiClick = false;

    /**
     * @description Emits when user drops the tab.
     */
    @Output()
    reordered = new EventEmitter<IconTabBarItem[]>();

    /**
     * @hidden
     * @param selectedItem
     */
    _selectExtraItem(selectedItem: IconTabBarItem | undefined): void {
        // Check if the selected item is subItem
        // Then to find root tab, and pass it to the parent method.
        if (selectedItem?.uId.includes(UNIQUE_KEY_SEPARATOR)) {
            const rootTabUid = selectedItem.uId.split(UNIQUE_KEY_SEPARATOR)[0];
            selectedItem = this.tabs.find((tab) => tab.uId === rootTabUid);
        }
        if (!selectedItem) {
            return;
        }
        super._selectExtraItem(selectedItem);
    }

    /**
     * @hidden
     * @param draggableItem
     * @param targetItem
     * @param action
     */
    _onDropped(event: FdDnDEvent): void {
        if (!this._canDrop(event)) {
            return;
        }

        const replacedParsedUidArr = event.targetItem.uId.split(UNIQUE_KEY_SEPARATOR);
        replacedParsedUidArr.length = replacedParsedUidArr.length - 1;
        const draggableParsedUidArr = event.draggableItem.uId.split(UNIQUE_KEY_SEPARATOR);
        draggableParsedUidArr.length = draggableParsedUidArr.length - 1;

        const tabInfoForNewList = this._getTabInfoFromMainList(event.targetItem.uId);
        const tabInfoForPrevList = this._getTabInfoFromMainList(event.draggableItem.uId);

        if (!tabInfoForNewList || !tabInfoForPrevList) {
            return;
        }

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

        event.action === 'replace' ? this._replaceAsSibling(dataForAction) : this._insertItemAsChild(dataForAction);

        this.reordered.emit(this.tabs);
    }

    /** @hidden */
    protected _getTabUIElementFocusable(tabUIElement: Nullable<TabItem>): Nullable<HTMLElement> {
        if (!tabUIElement) {
            return tabUIElement;
        }
        if (typeof tabUIElement === 'object' && 'nativeElement' in tabUIElement) {
            return tabUIElement.nativeElement;
        }
        return tabUIElement._dropdownTrigger.nativeElement;
    }

    /** @hidden */
    private _canDrop(event: FdDnDEvent): boolean {
        let parentUId: Nullable<string> =
            event.action === 'replace' ? event.targetItem.parentUId : event.targetItem.uId;
        while (parentUId) {
            if (parentUId === event.draggableItem.uId) {
                return false;
            }
            const nextSeparatorIdx = parentUId.lastIndexOf(UNIQUE_KEY_SEPARATOR);

            parentUId = nextSeparatorIdx > 0 ? parentUId.slice(0, nextSeparatorIdx) : null;
        }
        return true;
    }

    /**
     * @hidden
     * @param data
     * @description Insert tab into another tab.
     */
    private _insertItemAsChild(data: {
        replacedItemInfo: DataForReordering;
        draggableItemInfo: DataForReordering;
    }): void {
        const { replacedItemInfo, draggableItemInfo } = data;
        // Remove draggable tab from previous list
        draggableItemInfo.arr.splice(draggableItemInfo.item.index, 1);
        if (!replacedItemInfo.item.subItems?.length) {
            replacedItemInfo.item.subItems = [];
        }
        // Add tab to subitem of the target tab
        replacedItemInfo.item.subItems.push(draggableItemInfo.item);
        this.tabs = this._updateTabs(this.tabs);
        this._triggerRecalculationVisibleItems();
    }

    /**
     * @hidden
     * @param data
     * @description Insert tab between tabs
     */
    private _replaceAsSibling(data: {
        replacedItemInfo: DataForReordering;
        draggableItemInfo: DataForReordering;
    }): void {
        const { replacedItemInfo, draggableItemInfo } = data;
        draggableItemInfo.arr.splice(draggableItemInfo.item.index, 1);
        const newIndex = replacedItemInfo?.item?.index || 0;
        replacedItemInfo.arr.splice(newIndex, 0, draggableItemInfo.item);
        this.tabs = this._updateTabs(this.tabs);
        this._triggerRecalculationVisibleItems();
    }
}
