import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListMessageDirective } from './list-message.directive';
import { ListLinkDirective } from './directives/list-link.directive';
import { FormModule } from '../form/form.module';
import { ListFooterDirective } from './directives/list-footer.directive';
import { ListTitleDirective } from './directives/list-title.directive';
import { ListGroupHeaderDirective } from './directives/list-group-header.directive';
import { ListSecondaryDirective } from './directives/list-secondary.directive';
import { ListIconDirective } from './directives/list-icon.directive';

@NgModule({
    declarations: [
        ListComponent,
        ListItemComponent,
        ListTitleDirective,
        ListSecondaryDirective,
        ListIconDirective,
        ListFooterDirective,
        ListGroupHeaderDirective,
        ListMessageDirective,
        ListLinkDirective
    ],
    imports: [CommonModule, FormModule],
    exports: [
        ListComponent,
        ListItemComponent,
        ListTitleDirective,
        ListFooterDirective,
        ListGroupHeaderDirective,
        ListSecondaryDirective,
        ListIconDirective,
        ListMessageDirective,
        ListLinkDirective
    ]
})
export class ListModule {
}
