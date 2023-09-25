import { NgModule } from '@angular/core';

import { IconTabBarFilterTypeComponent } from './components/icon-tab-bar-filter-type/icon-tab-bar-filter-type.component';
import { IconTabBarIconTypeComponent } from './components/icon-tab-bar-icon-type/icon-tab-bar-icon-type.component';
import { IconTabBarProcessTypeComponent } from './components/icon-tab-bar-process-type/icon-tab-bar-process-type.component';
import { IconTabBarTextTypeComponent } from './components/icon-tab-bar-text-type/icon-tab-bar-text-type.component';
import { IconTabBarPopoverComponent } from './components/popovers/icon-tab-bar-popover/icon-tab-bar-popover.component';
import { TextTypePopoverComponent } from './components/popovers/text-type-popover/text-type-popover.component';
import { IconBarDndContainerDirective } from './directives/dnd/icon-bar-dnd-container.directive';
import { IconBarDndItemDirective } from './directives/dnd/icon-bar-dnd-item.directive';
import { IconBarDndListDirective } from './directives/dnd/icon-bar-dnd-list.directive';
import { IconTabBarComponent } from './icon-tab-bar.component';

const components = [
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
];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class PlatformIconTabBarModule {}
