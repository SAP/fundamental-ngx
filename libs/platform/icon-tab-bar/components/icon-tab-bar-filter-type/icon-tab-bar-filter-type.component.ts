import { NgTemplateOutlet, SlicePipe } from '@angular/common';
import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AsyncOrSyncPipe, OverflowListDirective, OverflowListItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { IconTabBarItem } from '../../interfaces/icon-tab-bar-item.interface';
import { ClosableIconTabBar } from '../closable-icon-tab-bar.class';
import { IconTabBarBase } from '../icon-tab-bar-base.class';
import { IconTabBarPopoverComponent } from '../popovers/icon-tab-bar-popover/icon-tab-bar-popover.component';

@Component({
    selector: 'fdp-icon-tab-bar-filter-type',
    templateUrl: './icon-tab-bar-filter-type.component.html',
    providers: [
        {
            provide: IconTabBarBase,
            useExisting: IconTabBarFilterTypeComponent
        }
    ],
    imports: [
        OverflowListDirective,
        OverflowListItemDirective,
        IconComponent,
        IconTabBarPopoverComponent,
        SlicePipe,
        ButtonComponent,
        AsyncOrSyncPipe,
        NgTemplateOutlet
    ]
})
export class IconTabBarFilterTypeComponent extends ClosableIconTabBar {
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
        this._totalTab = this.showTotalTab ? this.tabs[0] : undefined;
    }
}
