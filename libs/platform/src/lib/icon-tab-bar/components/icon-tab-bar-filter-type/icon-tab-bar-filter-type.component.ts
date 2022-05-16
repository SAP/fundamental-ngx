import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IconTabBarBase } from '../icon-tab-bar-base.class';
import { IconTabBarItem } from '../../interfaces/icon-tab-bar-item.interface';
import { IconTabBarPopoverComponent } from '../popovers/icon-tab-bar-popover/icon-tab-bar-popover.component';

@Component({
    selector: 'fdp-icon-tab-bar-filter-type',
    templateUrl: './icon-tab-bar-filter-type.component.html'
})
export class IconTabBarFilterTypeComponent extends IconTabBarBase {
    /** @hidden list of tab html elements, that can receive focus */
    @ViewChildren('tabItem') _tabUIElements: QueryList<ElementRef<HTMLElement>>;

    /** @hidden */
    @ViewChild(IconTabBarPopoverComponent) _tabBarPopover: IconTabBarPopoverComponent;

    /**
     * @description Boolean flag indicating to show total tab
     */
    @Input()
    showTotalTab = true;

    /** @hidden */
    _totalTab?: IconTabBarItem;

    /**
     * @hidden
     * @description initialize state of tabs
     */
    protected _initTabs(): void {
        super._initTabs();
        this._totalTab = this.showTotalTab ? this._tabs[0] : undefined;
    }
}
