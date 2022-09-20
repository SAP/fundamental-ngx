import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListMessageDirective } from './list-message.directive';
import { ListLinkDirective } from './directives/list-link.directive';
import { FormModule } from '@fundamental-ngx/core/form';
import { ListFooterDirective } from './directives/list-footer.directive';
import { ListTitleDirective } from './directives/list-title.directive';
import { ListGroupHeaderDirective } from './directives/list-group-header.directive';
import { ListSecondaryDirective } from './directives/list-secondary.directive';
import { ListIconDirective } from './directives/list-icon.directive';
import { ListBylineDirective } from './directives/byline/list-byline.directive';
import { ListBylineLeftDirective } from './directives/byline/list-byline-left.directive';
import { ListBylineRightDirective } from './directives/byline/list-byline-right.directive';
import { ListContentDirective } from './directives/byline/list-content.directive';
import { ListThumbnailDirective } from './directives/byline/list-thumbnail.directive';
import { ListTitleTextDirective } from './directives/list-title-text.directive';
import { ListNavigationItemComponent } from './list-navigation-item/list-navigation-item.component';
import { ListNavigationItemArrowDirective } from './directives/list-navigation-item-arrow.directive';
import { ListNavigationItemTextDirective } from './directives/list-navigation-item-text.directive';
import { IconModule } from '@fundamental-ngx/core/icon';
import { DeprecatedListContentDensityDirective } from './deprecated-list-content-density,directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { RepeatModule } from '@fundamental-ngx/core/utils';

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
        ListThumbnailDirective,
        ListTitleTextDirective,
        ListNavigationItemComponent,
        ListNavigationItemArrowDirective,
        ListNavigationItemTextDirective,
        DeprecatedListContentDensityDirective
    ],
    imports: [CommonModule, FormModule, IconModule, ContentDensityModule, SkeletonModule, RepeatModule],
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
        ListThumbnailDirective,
        ListTitleTextDirective,
        ListNavigationItemComponent,
        ListNavigationItemArrowDirective,
        ListNavigationItemTextDirective,
        DeprecatedListContentDensityDirective,
        ContentDensityModule
    ]
})
export class ListModule {}
