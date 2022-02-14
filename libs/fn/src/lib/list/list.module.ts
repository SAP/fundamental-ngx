import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListGroupHeaderComponent } from './list-group-header/list-group-header.component';
import { SelectableItemDirective } from './selectable-item/selectable-item.directive';
import { SelectableListDirective } from './selectable-list/selectable-list.directive';

@NgModule({
    imports: [CommonModule],
    exports: [
        ListComponent,
        ListItemComponent,
        ListGroupHeaderComponent,
        SelectableListDirective,
        SelectableItemDirective
    ],
    declarations: [
        ListComponent,
        ListItemComponent,
        ListGroupHeaderComponent,
        SelectableListDirective,
        SelectableItemDirective
    ]
})
export class ListModule {}
