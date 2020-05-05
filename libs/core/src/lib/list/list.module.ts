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
import {
    CheckboxModule,
    ListBylineTextDirective,
    ListBylineTextLeftDirective, ListBylineTextRightDirective,
    ListContentDirective,
    ListContentThumbnail
} from '../..';
import { ListBylineComponent } from './list-byline.component';

@NgModule({
    declarations: [
        ListComponent,
        ListItemDirective,
        ListLabelDirective,
        ListTitleDirective,
        ListContentThumbnail,
        ListBylineTextDirective,
        ListBylineTextLeftDirective,
        ListBylineTextRightDirective,
        ListSecondaryDirective,
        ListGroupHeaderDirective,
        ListBylineComponent,
        ListContentDirective,
        ListIconDirective,
        ListFooterDirective,
        ListMessageDirective
    ],
    imports: [CommonModule, ButtonModule, IconModule, FormsModule, FormModule, CheckboxModule],
    exports: [
        ListComponent,
        ListItemDirective,
        ListContentDirective,
        ListLabelDirective,
        ListContentThumbnail,
        ListTitleDirective,
        ListBylineComponent,
        ListSecondaryDirective,
        ListGroupHeaderDirective,
        ListBylineTextLeftDirective,
        ListBylineTextRightDirective,
        ListBylineTextDirective,
        ListIconDirective,
        ListFooterDirective,
        ListMessageDirective
    ]
})
export class ListModule {
}
