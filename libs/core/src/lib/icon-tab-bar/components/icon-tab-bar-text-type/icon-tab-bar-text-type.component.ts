import { Component, Input, OnInit } from '@angular/core';
import { IconTabBarClass } from '../../icon-tab-bar.class';
import { cloneDeep } from '../../../utils/functions/clone-deep';
import { IconTabBarItem, IconTabBarSubItem } from '../../types';
import { UNIQUE_KEY_SEPARATOR } from '../../constants';


@Component({
    selector: 'fd-icon-tab-bar-text-type',
    templateUrl: './icon-tab-bar-text-type.component.html',
    styleUrls: ['./icon-tab-bar-text-type.component.scss']
})
export class IconTabBarTextTypeComponent extends IconTabBarClass implements OnInit {

    @Input()
    maxNestingLevel = 0;

    @Input()
    enableTabReordering = false;

    selectExtraItem(selectedItem: IconTabBarItem|IconTabBarSubItem): void {
        // Check if selected item is subItem
        // Then to find root tab, and pass it to parent method.
        if (selectedItem.uniqueKey.includes(UNIQUE_KEY_SEPARATOR)) {
            const rootTabUniqueKey = selectedItem.uniqueKey.split(UNIQUE_KEY_SEPARATOR)[0];
            selectedItem = this.tabs.find(tab => tab.uniqueKey === rootTabUniqueKey);
        }
        super.selectExtraItem(selectedItem as IconTabBarItem);
    }
}
