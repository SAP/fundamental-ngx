import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListGroupHeaderComponent } from './list-group-header/list-group-header.component';
import { SelectableItemDirective } from './selectable-item/selectable-item.directive';
import { SelectableListDirective } from './selectable-list/selectable-list.directive';
import {
    ListItemActionsDirective,
    ListItemPostfixDirective,
    ListItemIconDirective,
    ListItemPrefixDirective,
    ListItemTitleDirective,
    ListItemBylineDirective
} from './structural-directives';
import { ListItemCheckboxDirective } from './list-item-checkbox.directive';
import { DisabledBehaviorModule, FocusableBehaviorModule, ReadonlyBehaviorModule } from '@fundamental-ngx/fn/cdk';

@NgModule({
    imports: [CommonModule, DisabledBehaviorModule, ReadonlyBehaviorModule, FocusableBehaviorModule],
    exports: [
        ListComponent,
        ListItemComponent,
        ListGroupHeaderComponent,
        SelectableListDirective,
        SelectableItemDirective,
        ListItemTitleDirective,
        ListItemActionsDirective,
        ListItemPostfixDirective,
        ListItemIconDirective,
        ListItemCheckboxDirective,
        ListItemPrefixDirective,
        ListItemBylineDirective,
        DisabledBehaviorModule,
        ReadonlyBehaviorModule,
        FocusableBehaviorModule
    ],
    declarations: [
        ListComponent,
        ListItemComponent,
        ListGroupHeaderComponent,
        SelectableListDirective,
        SelectableItemDirective,
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
