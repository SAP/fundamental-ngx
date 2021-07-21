import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconTabBarComponent } from './icon-tab-bar.component';
import { DragAndDropModule, IconModule, PopoverModule } from '@fundamental-ngx/core';
import { IconTabBarTextTypeComponent } from './components/icon-tab-bar-text-type/icon-tab-bar-text-type.component';
import { OverflowItemsModule } from '../utils/directives/overflow-items/overflow-items.module';
import { ExtraButtonDirective } from './directives/extra-button/extra-button.directive';
import { IconTabBarIconTypeComponent } from './components/icon-tab-bar-icon-type/icon-tab-bar-icon-type.component';
import { IconTabBarProcessTypeComponent } from './components/icon-tab-bar-process-type/icon-tab-bar-process-type.component';
import { IconTabBarFilterTypeComponent } from './components/icon-tab-bar-filter-type/icon-tab-bar-filter-type.component';
import { IconTabBarPopoverComponent } from './components/popovers/icon-tab-bar-popover/icon-tab-bar-popover.component';
import { TextTypePopoverComponent } from './components/popovers/text-type-popover/text-type-popover.component';
import { DndContainerDirective } from './dnd/dnd-container.directive';
import { DndContainerItemDirective } from './dnd/dnd-container-item.directive';
import { DndContainerGroupDirective } from './dnd/dnd-container-group.directive';



@NgModule({
    declarations: [
        IconTabBarComponent,
        IconTabBarTextTypeComponent,
        ExtraButtonDirective,
        IconTabBarIconTypeComponent,
        IconTabBarProcessTypeComponent,
        IconTabBarFilterTypeComponent,
        IconTabBarPopoverComponent,
        TextTypePopoverComponent,
        DndContainerDirective,
        DndContainerItemDirective,
        DndContainerGroupDirective,
    ],
    imports: [
        CommonModule,
        IconModule,
        PopoverModule,
        OverflowItemsModule,
        DragAndDropModule,
    ],
    exports: [
        CommonModule,
        IconTabBarComponent,
    ]
})
export class IconTabBarModule {
}
