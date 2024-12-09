import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AsyncOrSyncPipe, OverflowListDirective, OverflowListItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent } from '@fundamental-ngx/core/icon';
import { ClosableIconTabBar } from '../closable-icon-tab-bar.class';
import { IconTabBarBase } from '../icon-tab-bar-base.class';
import { IconTabBarPopoverComponent } from '../popovers/icon-tab-bar-popover/icon-tab-bar-popover.component';

@Component({
    selector: 'fdp-icon-tab-bar-icon-type',
    templateUrl: './icon-tab-bar-icon-type.component.html',
    providers: [
        {
            provide: IconTabBarBase,
            useExisting: IconTabBarIconTypeComponent
        }
    ],
    imports: [
        OverflowListDirective,
        OverflowListItemDirective,
        NgClass,
        IconComponent,
        ButtonComponent,
        IconTabBarPopoverComponent,
        AsyncOrSyncPipe,
        NgTemplateOutlet
    ]
})
export class IconTabBarIconTypeComponent extends ClosableIconTabBar {
    /** @hidden list of tab html elements, that can receive focus */
    @ViewChildren('tabItem') _tabUIElements: QueryList<ElementRef<HTMLElement>>;

    /** @hidden */
    @ViewChild(IconTabBarPopoverComponent) _tabBarPopover: IconTabBarPopoverComponent;

    /** Whether to display labels for tab items */
    @Input()
    showLabel: boolean;

    /** @hidden */
    readonly _defaultFontFamily = FD_DEFAULT_ICON_FONT_FAMILY;
}
