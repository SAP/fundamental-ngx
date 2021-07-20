import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IconTabBarClass } from '../../icon-tab-bar.class';
import { cloneDeep } from '../../../utils/functions/clone-deep';
import { IconTabBarItem, IconTabBarSubItem } from '../../types';
import { UNIQUE_KEY_SEPARATOR } from '../../constants';
import { FdDNDEvent } from '@fundamental-ngx/core';
import { OverflowItemsDirective } from '../../../utils/directives/overflow-items/overflow-items.directive';
import { ExtraButtonDirective } from '../../directives/extra-button.directive';


@Component({
    selector: 'fd-icon-tab-bar-text-type',
    templateUrl: './icon-tab-bar-text-type.component.html',
    styleUrls: ['./icon-tab-bar-text-type.component.scss']
})
export class IconTabBarTextTypeComponent extends IconTabBarClass implements OnInit {

    @ViewChild(OverflowItemsDirective)
    overflowDirective: OverflowItemsDirective;

    @ViewChild(ExtraButtonDirective)
    extraBtnDirective: ExtraButtonDirective;

    @Input()
    maxNestingLevel = 0;

    @Input()
    enableTabReordering = false;

    constructor(
        protected _cd: ChangeDetectorRef,
    ) {
        super(_cd);
    }

    selectExtraItem(selectedItem: IconTabBarItem|IconTabBarSubItem): void {
        // Check if selected item is subItem
        // Then to find root tab, and pass it to parent method.
        if (selectedItem.uniqueKey.includes(UNIQUE_KEY_SEPARATOR)) {
            const rootTabUniqueKey = selectedItem.uniqueKey.split(UNIQUE_KEY_SEPARATOR)[0];
            selectedItem = this.tabs.find(tab => tab.uniqueKey === rootTabUniqueKey);
        }
        super.selectExtraItem(selectedItem as IconTabBarItem);
    }

    onDrop({leftNewSibling, draggableItem}: FdDNDEvent<IconTabBarItem>): void {
        const leftItemMapArr = leftNewSibling.uniqueKey.split(UNIQUE_KEY_SEPARATOR);
        const dragItemMapArr = draggableItem.uniqueKey.split(UNIQUE_KEY_SEPARATOR);
        const leftArr = this.test(leftNewSibling.uniqueKey);
        const dragArr = this.test(draggableItem.uniqueKey);
        this.replaceItems(draggableItem, leftNewSibling, dragArr, leftArr);
    }


    test(uid: string, arr: any[] = this.tabs): IconTabBarItem[] {
        let result;
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (item.uniqueKey === uid) {
                result = arr;
                break;
            } else if (Array.isArray(item.subItems)) {
                result = this.test(uid, item.subItems);
                if (result) {
                    break;

                }
            }
        }
        return result
    }



    replaceItems(draggable: IconTabBarItem, replaced: IconTabBarItem, oldArr: IconTabBarItem[], newArr: IconTabBarItem[]): void {
        oldArr.splice(draggable.index, 1);
        const newIndex = replaced ? replaced.index : 0;
        newArr.splice(newIndex, 0, draggable);
        // draggable.index = newIndex;
        // if (replaced) {
        //     replaced.index = newIndex + 1;
        // }
        this.updateIndexes(oldArr);
        if (oldArr !== newArr) {
            this.updateIndexes(newArr);
        }

        setTimeout(() => {
            const extra = this.overflowDirective.getAmountOfExtraItems();
            this.onChangeSize(extra);
        }, 100);
        setTimeout(_ => this.extraBtnDirective._calculatePosition(), 200)
    }

    updateIndexes(arr: IconTabBarItem[]|IconTabBarSubItem[], parent?: IconTabBarItem|IconTabBarSubItem): void {
        arr.forEach((item, index) => {
            item.index = index;
            if (parent) {
                item.uniqueKey = `${parent.uniqueKey}${UNIQUE_KEY_SEPARATOR}${index}`;
            }
            if (Array.isArray(item.subItems)) {
                this.updateIndexes(item.subItems, item);
            }
        })
    }
}
