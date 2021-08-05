import { Component, Input } from '@angular/core';
import { IconTabBarBase } from '../icon-tab-bar-base.class';
import { IconTabBarItem } from '../../types';

@Component({
    selector: 'fd-icon-tab-bar-filter-type',
    templateUrl: './icon-tab-bar-filter-type.component.html',
})
export class IconTabBarFilterTypeComponent extends IconTabBarBase {

    /**
     * @description Boolean flag indicating to show total tab
     */
    @Input()
    showTotalTab = true;

    /** @hidden */
    _totalTab: IconTabBarItem;

    /**
     * @hidden
     * @description initialize state of tabs
     */
    protected _initTabs(): void {
        super._initTabs();
        this._totalTab = this.showTotalTab && this._tabs[0];
    }
}
