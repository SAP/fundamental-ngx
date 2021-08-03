import { Component, Input } from '@angular/core';
import { IconTabBarBase } from '../icon-tab-bar-base.class';
import { IconTabBarItem } from '../../types';

@Component({
    selector: 'fd-icon-tab-bar-filter-type',
    templateUrl: './icon-tab-bar-filter-type.component.html',
})
export class IconTabBarFilterTypeComponent extends IconTabBarBase {

    @Input()
    showTotalTab = true;

    _totalTab: IconTabBarItem;

    protected _initTabs(): void {
        super._initTabs();
        this._totalTab = this._tabs[0];
        this._tabs = this._tabs.slice(1)
    }
}
