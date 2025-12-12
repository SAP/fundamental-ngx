import { NgModule } from '@angular/core';

import { IconTabBarFilterTypeComponent } from './components/icon-tab-bar-filter-type/icon-tab-bar-filter-type.component';
import { IconTabBarIconTypeComponent } from './components/icon-tab-bar-icon-type/icon-tab-bar-icon-type.component';
import { IconTabBarProcessTypeComponent } from './components/icon-tab-bar-process-type/icon-tab-bar-process-type.component';
import { IconTabBarTabComponent } from './components/icon-tab-bar-tab/icon-tab-bar-tab.component';
import { IconTabBarTextTypeComponent } from './components/icon-tab-bar-text-type/icon-tab-bar-text-type.component';
import { IconTabBarPopoverComponent } from './components/popovers/icon-tab-bar-popover/icon-tab-bar-popover.component';
import { TextTypePopoverComponent } from './components/popovers/text-type-popover/text-type-popover.component';
import { IconBarDndContainerDirective } from './directives/dnd/icon-bar-dnd-container.directive';
import { IconBarDndItemDirective } from './directives/dnd/icon-bar-dnd-item.directive';
import { IconBarDndListDirective } from './directives/dnd/icon-bar-dnd-list.directive';
import { IconTabBarContentTemplateDirective } from './directives/icon-tab-bar-content-template.directive';
import { IconTabBarFreeContentDirective } from './directives/icon-tab-bar-free-content.directive';
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
    IconBarDndContainerDirective,
    IconTabBarTabComponent,
    IconTabBarContentTemplateDirective,
    IconTabBarFreeContentDirective
];

export const FDP_ICON_TAB_BAR = [
    IconTabBarComponent,
    IconTabBarTabComponent,
    IconTabBarContentTemplateDirective,
    IconTabBarFreeContentDirective
] as const;

/**
 * @deprecated
 * Import `IconTabBarComponent` directly instead.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class PlatformIconTabBarModule {}
