import { NgModule } from '@angular/core';
import { ListBylineLeftDirective } from './directives/byline/list-byline-left.directive';
import { ListBylineRightDirective } from './directives/byline/list-byline-right.directive';
import { ListBylineDirective } from './directives/byline/list-byline.directive';
import { ListContentDirective } from './directives/byline/list-content.directive';
import { ListThumbnailDirective } from './directives/byline/list-thumbnail.directive';
import { ListFooterDirective } from './directives/list-footer.directive';
import { ListGroupHeaderDirective } from './directives/list-group-header.directive';
import { ListIconDirective } from './directives/list-icon.directive';
import { ListLinkDirective } from './directives/list-link.directive';
import { ListNavigationItemArrowDirective } from './directives/list-navigation-item-arrow.directive';
import { ListNavigationItemTextDirective } from './directives/list-navigation-item-text.directive';
import { ListSecondaryDirective } from './directives/list-secondary.directive';
import { ListTitleTextDirective } from './directives/list-title-text.directive';
import { ListTitleDirective } from './directives/list-title.directive';
import { ListSublineDirective } from './directives/subline/list-subline.directive';
import { ListItemComponent } from './list-item/list-item.component';
import { ListMessageDirective } from './list-message.directive';
import { ListNavigationItemComponent } from './list-navigation-item/list-navigation-item.component';
import { ListComponent } from './list.component';

const components = [
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
    ListSublineDirective
];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class ListModule {}
