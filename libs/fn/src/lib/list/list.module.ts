import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListGroupHeaderComponent } from './list-group-header/list-group-header.component';
import {
    ListItemActionsDirective,
    ListItemBylineDirective,
    ListItemIconDirective,
    ListItemPostfixDirective,
    ListItemPrefixDirective,
    ListItemTitleDirective
} from './structural-directives';
import { ListItemCheckboxDirective } from './list-item-checkbox.directive';
import { DisabledBehaviorModule, FocusableListModule, ReadonlyBehaviorModule } from '@fundamental-ngx/cdk/utils';

@NgModule({
    imports: [CommonModule, DisabledBehaviorModule, ReadonlyBehaviorModule, FocusableListModule],
    exports: [
        ListComponent,
        ListItemComponent,
        ListGroupHeaderComponent,
        ListItemTitleDirective,
        ListItemActionsDirective,
        ListItemPostfixDirective,
        ListItemIconDirective,
        ListItemCheckboxDirective,
        ListItemPrefixDirective,
        ListItemBylineDirective,
        DisabledBehaviorModule,
        ReadonlyBehaviorModule,
        FocusableListModule
    ],
    declarations: [
        ListComponent,
        ListItemComponent,
        ListGroupHeaderComponent,
        ListItemTitleDirective,
        ListItemActionsDirective,
        ListItemPostfixDirective,
        ListItemIconDirective,
        ListItemCheckboxDirective,
        ListItemPrefixDirective,
        ListItemBylineDirective
    ]
})
export class ListModule {}
