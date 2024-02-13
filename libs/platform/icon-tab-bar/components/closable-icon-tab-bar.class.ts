import { BACKSPACE, DELETE } from '@angular/cdk/keycodes';
import { Directive, EventEmitter, Output } from '@angular/core';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { UNIQUE_KEY_SEPARATOR } from '../constants';
import { IconTabBarItem } from '../interfaces/icon-tab-bar-item.interface';
import { IconTabBarBase } from './icon-tab-bar-base.class';
import { IconTabBarPopoverBase } from './popovers/icon-tab-bar-popover-base.class';
import { TextTypePopoverComponent } from './popovers/text-type-popover/text-type-popover.component';

@Directive()
export abstract class ClosableIconTabBar extends IconTabBarBase {
    abstract _tabBarPopover: IconTabBarPopoverBase;
    /**
     * Event emits when user clicks on x button in tab.
     */
    @Output()
    closeTab = new EventEmitter<IconTabBarItem>();

    /** @hidden */
    _closeTab(itemIndex: string, checkPopover = false): void {
        const popoverPresent = !!this._tabBarPopover;
        const tab = this._getTabInfoFromMainList(itemIndex);

        if (!tab?.parent) {
            return;
        }

        tab.parent.splice(
            tab.parent.findIndex((item) => item.uId === itemIndex),
            1
        );

        this.tabs = this._updateTabs(this.tabs);

        this._triggerRecalculationVisibleItems();
        this.closeTab.emit(tab.tab);

        if (!checkPopover) {
            return;
        }
        // Delay to ensure popover is recalculated.
        setTimeout(() => {
            // Popover has been removed, shift focus to the last item of the tab bar.
            if (popoverPresent && !this._tabBarPopover) {
                this._focusItem(this._lastVisibleTabIndex);
            }
        });
    }

    /** @hidden */
    _keyDownHandler(
        event: KeyboardEvent,
        tab: IconTabBarItem | undefined,
        currentIndex: number,
        popover?: TextTypePopoverComponent
    ): void {
        if (tab?.closable && KeyUtil.isKeyCode(event, [BACKSPACE, DELETE])) {
            event.preventDefault();
            this._closeTab(tab.uId);
            // Need to detect changes to trigger query list refresh.
            this._cd.detectChanges();

            // If last tab was closed, focus new last item, otherwhise set focus to the item that took place of removed one.
            const newFocusIndex = this.tabs.length - 1 < currentIndex ? this.tabs.length - 1 : currentIndex;

            this._focusItem(newFocusIndex);
            return;
        }
        super._keyDownHandler(event, tab, currentIndex, popover);
    }

    /**
     * @hidden
     * @param arr
     * @param parentUid
     * @description Update indexes, uIds, styles.
     */
    protected _updateTabs(arr: IconTabBarItem[], parentUid?: string, flatIndexRef = { value: 0 }): IconTabBarItem[] {
        return arr.map((item, index) => {
            item.index = index;
            item.uId = parentUid ? `${parentUid}${UNIQUE_KEY_SEPARATOR}${index}` : `${index}`;
            item.flatIndex = flatIndexRef.value++;
            item.parentUId = parentUid;
            if (!parentUid && item.color) {
                item.cssClasses = [`fd-icon-tab-bar__item--${item.color}`];
            }
            if (Array.isArray(item.subItems)) {
                item.subItems = this._updateTabs(item.subItems, item.uId, flatIndexRef);
            }
            return { ...item };
        });
    }

    /**
     * @hidden
     * @param uid
     * @param arr
     * @returns {parent, tab}
     * @description Get tab reference inside main tab array and  reference to parent array.
     */
    protected _getTabInfoFromMainList(
        uid: string,
        arr: any[] = this.tabs
    ): { parent: IconTabBarItem[]; tab: IconTabBarItem } | undefined {
        let result: { parent: IconTabBarItem[]; tab: IconTabBarItem } | undefined;
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (item.uId === uid) {
                result = { parent: arr, tab: item };
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
}
