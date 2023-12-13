import { Directive, EventEmitter, Output } from '@angular/core';
import { UNIQUE_KEY_SEPARATOR } from '../constants';
import { IconTabBarItem } from '../interfaces/icon-tab-bar-item.interface';
import { IconTabBarBase } from './icon-tab-bar-base.class';

@Directive()
export abstract class ClosableIconTabBar extends IconTabBarBase {
    /**
     * Event emits when user clicks on x button in tab.
     */
    @Output()
    closeTab = new EventEmitter<IconTabBarItem>();

    /** @ignore */
    _closeTab(itemIndex: string): void {
        const tab = this._getTabInfoFromMainList(itemIndex);

        if (!tab?.parent) {
            return;
        }

        tab.parent.splice(
            tab.parent.findIndex((item) => item.uId === itemIndex),
            1
        );

        this._tabs = this._updateTabs(this._tabs);

        this._triggerRecalculationVisibleItems();
        this.closeTab.emit(tab.tab);
    }

    /**
     * @ignore
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
     * @ignore
     * @param uid
     * @param arr
     * @returns {parent, tab}
     * @description Get tab reference inside main tab array and  reference to parent array.
     */
    protected _getTabInfoFromMainList(
        uid: string,
        arr: any[] = this._tabs
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
