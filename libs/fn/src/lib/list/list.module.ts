import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListGroupHeaderComponent } from './list-group-header/list-group-header.component';
import { SelectableItemDirective } from './selectable-item/selectable-item.directive';
import { SelectableListDirective } from './selectable-list/selectable-list.directive';
import { ListItemTitleDirective } from './list-item-title/list-item-title.directive';
import { ListItemActionsDirective } from './list-item-actions/list-item-actions.directive';
import { ListItemEndDirective } from './list-item-end/list-item-end.directive';

@NgModule({
    imports: [CommonModule],
    exports: [
        ListComponent,
        ListItemComponent,
        ListGroupHeaderComponent,
        SelectableListDirective,
        SelectableItemDirective,
        ListItemTitleDirective,
        ListItemActionsDirective,
        ListItemEndDirective
    ],
    declarations: [
        ListComponent,
        ListItemComponent,
        ListGroupHeaderComponent,
        SelectableListDirective,
        SelectableItemDirective,
        ListItemTitleDirective,
        ListItemActionsDirective,
        ListItemEndDirective
    ]
})
export class ListModule {}
