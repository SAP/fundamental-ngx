import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemDirective } from './list-item.directive';
import {
    ListFooterDirective,
    ListGroupHeaderDirective,
    ListIconDirective,
    ListLabelDirective,
    ListSecondaryDirective,
    ListTitleDirective
} from './list.directives';
import { ListMessageDirective } from './list-message.directive';
@NgModule({
    declarations: [
        ListComponent,
        ListItemDirective,
        ListLabelDirective,
        ListTitleDirective,
        ListSecondaryDirective,
        ListGroupHeaderDirective,
        ListIconDirective,
        ListFooterDirective,
        ListMessageDirective
    ],
    imports: [CommonModule],
    exports: [
        ListComponent,
        ListItemDirective,
        ListLabelDirective,
        ListTitleDirective,
        ListSecondaryDirective,
        ListGroupHeaderDirective,
        ListIconDirective,
        ListFooterDirective,
        ListMessageDirective
    ]
})
export class ListModule {}
