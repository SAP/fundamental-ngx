import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkModule } from '@fundamental-ngx/core/link';
import { FormattedTextModule } from '@fundamental-ngx/core/formatted-text';
import { FeedListItemComponent } from './components/item/feed-list-item.component';
import { FeedListComponent } from './components/list/feed-list.component';
import { FeedListAvatarComponent } from './components/feed-list-avatar/feed-list-avatar.component';
import { FeedListActionComponent } from './components/feed-list-action/feed-list-action.component';
import { FeedListFooterComponent } from './components/feed-list-footer/feed-list-footer.component';
import { FeedListFooterBylineDirective } from './directives/byline.directive';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    declarations: [
        FeedListComponent,
        FeedListItemComponent,
        FeedListAvatarComponent,
        FeedListActionComponent,
        FeedListFooterComponent,
        FeedListFooterBylineDirective
    ],
    imports: [CommonModule, PipeModule, FormattedTextModule, LinkModule, I18nModule],
    exports: [
        FeedListComponent,
        FeedListItemComponent,
        FeedListAvatarComponent,
        FeedListActionComponent,
        FeedListFooterComponent,
        FeedListFooterBylineDirective
    ]
})
export class FeedListItemModule {}
