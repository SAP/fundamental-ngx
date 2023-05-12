import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickedBehaviorModule, RepeatDirective, SelectableItemDirective } from '@fundamental-ngx/cdk/utils';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { I18nModule } from '@fundamental-ngx/i18n';
import { TreeComponent } from './tree.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { TreeItemComponent } from './components/tree-item/tree-item.component';
import { TreeItemDefDirective } from './directives/tree-item-def.directive';
import { TreeItemDirective } from './directives/tree-item.directive';
import { TreeItemIconDirective, TreeItemTextDirective } from './directives/tree-item-icon.directive';
import { TreeItemButtonDirective } from './directives/tree-item-button.directive';

@NgModule({
    declarations: [
        TreeComponent,
        TreeItemComponent,
        TreeItemDefDirective,
        TreeItemDirective,
        TreeItemIconDirective,
        TreeItemTextDirective,
        TreeItemButtonDirective
    ],
    imports: [
        CommonModule,
        ButtonModule,
        IconModule,
        PopoverModule,
        MenuModule,
        CheckboxModule,
        ClickedBehaviorModule,
        FormsModule,
        SelectableItemDirective,
        RadioModule,
        SkeletonModule,
        RepeatDirective,
        ReactiveFormsModule,
        I18nModule
    ],
    exports: [
        TreeComponent,
        TreeItemComponent,
        TreeItemDefDirective,
        TreeItemDirective,
        TreeItemIconDirective,
        TreeItemTextDirective,
        TreeItemButtonDirective
    ]
})
export class TreeModule {}
