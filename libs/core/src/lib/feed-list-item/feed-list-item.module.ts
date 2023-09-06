import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { FormattedTextComponent } from '@fundamental-ngx/core/formatted-text';
import { LinkModule } from '@fundamental-ngx/core/link';
import { I18nModule } from '@fundamental-ngx/i18n';
import { FeedListActionComponent } from './components/feed-list-action/feed-list-action.component';
import { FeedListAvatarComponent } from './components/feed-list-avatar/feed-list-avatar.component';
import { FeedListFooterComponent } from './components/feed-list-footer/feed-list-footer.component';
import { FeedListItemComponent } from './components/item/feed-list-item.component';
import { FeedListComponent } from './components/list/feed-list.component';
import { FeedListFooterBylineDirective } from './directives/byline.directive';

@NgModule({
    declarations: [
        FeedListComponent,
        FeedListItemComponent,
        FeedListAvatarComponent,
        FeedListActionComponent,
        FeedListFooterComponent,
        FeedListFooterBylineDirective
    ],
    imports: [CommonModule, PipeModule, FormattedTextComponent, LinkModule, I18nModule],
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
