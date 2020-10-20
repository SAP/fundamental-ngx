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
import { ListBylineDirective } from './directives/list-byline.directive';
import { ListBylineLeftDirective } from './directives/list-byline-left.directive';
import { ListBylineRightDirective } from './directives/list-byline-right.directive';
import { ListContentDirective } from './directives/list-content.directive';
import { ListThumbnailDirective } from './directives/list-thumbnail.directive';
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
        ListLinkDirective,
        ListBylineDirective,
        ListBylineLeftDirective,
        ListBylineRightDirective,
        ListContentDirective,
        ListThumbnailDirective
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
        ListLinkDirective,
        ListBylineDirective,
        ListBylineLeftDirective,
        ListBylineRightDirective,
        ListContentDirective,
        ListThumbnailDirective
    ]
})
export class ListModule {}
