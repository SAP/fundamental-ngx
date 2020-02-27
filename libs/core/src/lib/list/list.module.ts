import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemDirective } from './list-item.directive';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { FormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';
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
    imports: [CommonModule, ButtonModule, IconModule, FormsModule, FormModule],
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
