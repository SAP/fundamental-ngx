import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListGroupHeaderComponent } from './list-group-header/list-group-header.component';
import { SelectableDirective } from './selectable-item/selectable.directive';
import { SelectableListDirective } from './selectable-list/selectable-list.directive';

@NgModule({
    imports: [CommonModule],
    exports: [ListComponent, ListItemComponent, ListGroupHeaderComponent, SelectableListDirective, SelectableDirective],
    declarations: [
        ListComponent,
        ListItemComponent,
        ListGroupHeaderComponent,
        SelectableListDirective,
        SelectableDirective
    ]
})
export class ListModule {}
