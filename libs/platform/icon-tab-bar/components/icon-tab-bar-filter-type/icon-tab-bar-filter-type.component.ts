import { SlicePipe } from '@angular/common';
import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { OverflowListDirective, OverflowListItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { IconTabBarItem } from '../../interfaces/icon-tab-bar-item.interface';
import { ClosableIconTabBar } from '../closable-icon-tab-bar.class';
import { IconTabBarPopoverComponent } from '../popovers/icon-tab-bar-popover/icon-tab-bar-popover.component';

@Component({
    selector: 'fdp-icon-tab-bar-filter-type',
    templateUrl: './icon-tab-bar-filter-type.component.html',
    standalone: true,
    imports: [
        OverflowListDirective,
        OverflowListItemDirective,
        IconComponent,
        IconTabBarPopoverComponent,
        SlicePipe,
        ButtonComponent
    ]
})
export class IconTabBarFilterTypeComponent extends ClosableIconTabBar {
    /** @ignore list of tab html elements, that can receive focus */
    @ViewChildren('tabItem') _tabUIElements: QueryList<ElementRef<HTMLElement>>;

    /** @ignore */
    @ViewChild(IconTabBarPopoverComponent) _tabBarPopover: IconTabBarPopoverComponent;

    /**
     * @description Boolean flag indicating to show total tab
     */
    @Input()
    showTotalTab = true;

    /** @ignore */
    _totalTab?: IconTabBarItem;

    /**
     * @ignore
     * @description initialize state of tabs
     */
    protected _initTabs(): void {
        super._initTabs();
        this._totalTab = this.showTotalTab ? this._tabs[0] : undefined;
    }
}
