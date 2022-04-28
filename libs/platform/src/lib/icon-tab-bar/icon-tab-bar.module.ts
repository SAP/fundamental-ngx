import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { IconModule } from '@fundamental-ngx/core/icon';
import { OverflowListModule } from '@fundamental-ngx/core/utils';

import { IconTabBarComponent } from './icon-tab-bar.component';
import { IconTabBarTextTypeComponent } from './components/icon-tab-bar-text-type/icon-tab-bar-text-type.component';
import { IconTabBarIconTypeComponent } from './components/icon-tab-bar-icon-type/icon-tab-bar-icon-type.component';
import { IconTabBarProcessTypeComponent } from './components/icon-tab-bar-process-type/icon-tab-bar-process-type.component';
import { IconTabBarFilterTypeComponent } from './components/icon-tab-bar-filter-type/icon-tab-bar-filter-type.component';
import { IconTabBarPopoverComponent } from './components/popovers/icon-tab-bar-popover/icon-tab-bar-popover.component';
import { TextTypePopoverComponent } from './components/popovers/text-type-popover/text-type-popover.component';
import { IconBarDndItemDirective } from './directives/dnd/icon-bar-dnd-item.directive';
import { IconBarDndContainerDirective } from './directives/dnd/icon-bar-dnd-container.directive';
import { IconBarDndListDirective } from './directives/dnd/icon-bar-dnd-list.directive';

@NgModule({
    declarations: [
        IconTabBarComponent,
        IconTabBarTextTypeComponent,
        IconTabBarIconTypeComponent,
        IconTabBarProcessTypeComponent,
        IconTabBarFilterTypeComponent,
        IconTabBarPopoverComponent,
        TextTypePopoverComponent,
        IconBarDndListDirective,
        IconBarDndItemDirective,
        IconBarDndContainerDirective
    ],
    imports: [CommonModule, IconModule, PopoverModule, OverflowListModule, DragDropModule],
    exports: [
        IconTabBarComponent,
        IconTabBarTextTypeComponent,
        IconTabBarIconTypeComponent,
        IconTabBarProcessTypeComponent,
        IconTabBarFilterTypeComponent,
        IconTabBarPopoverComponent,
        TextTypePopoverComponent,
        IconBarDndListDirective,
        IconBarDndItemDirective,
        IconBarDndContainerDirective
    ]
})
export class PlatformIconTabBarModule {}
