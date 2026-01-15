import { NgModule } from '@angular/core';

import { FeedListActionComponent } from './components/feed-list-action/feed-list-action.component';
import { FeedListAvatarComponent } from './components/feed-list-avatar/feed-list-avatar.component';
import { FeedListFooterComponent } from './components/feed-list-footer/feed-list-footer.component';
import { FeedListItemComponent } from './components/item/feed-list-item.component';
import { FeedListComponent } from './components/list/feed-list.component';
import { FeedListFooterBylineDirective } from './directives/byline.directive';

const components = [
    FeedListComponent,
    FeedListItemComponent,
    FeedListAvatarComponent,
    FeedListActionComponent,
    FeedListFooterComponent,
    FeedListFooterBylineDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class FeedListItemModule {}
