import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeModule, LineClampModule } from '../utils/public_api';
import { LinkModule } from '../link/public_api';
import { FormattedTextModule } from '../formatted-text/public_api';
import { FeedListItemComponent } from './components/item/feed-list-item.component';
import { FeedListComponent } from './components/list/feed-list.component';
import { FeedListAvatarComponent } from './components/feed-list-avatar/feed-list-avatar.component';
import { FeedListActionComponent } from './components/feed-list-action/feed-list-action.component';
import { FeedListFooterComponent } from './components/feed-list-footer/feed-list-footer.component';
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
  imports: [
    CommonModule,
    PipeModule,
    FormattedTextModule,
    LinkModule,
    LineClampModule
  ],
  exports: [
    FeedListComponent,
    FeedListItemComponent,
    FeedListAvatarComponent,
    FeedListActionComponent,
    FeedListFooterComponent,
    FeedListFooterBylineDirective
  ]
})
export class FeedListItemModule { }
