import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeModule } from '../utils/public_api';
import { LinkModule } from '../link/public_api';
import { FormattedTextModule } from '../formatted-text/formatted-text.module';
import { FeedListItemComponent } from './components/item/feed-list-item.component';
import { FeedListComponent } from './components/list/feed-list.component';
import { LineClampDirective, LineClampTargetDirective } from './directives/line-clamp.directive';
import { FeedListAvatarComponent } from './components/feed-list-avatar/feed-list-avatar.component';
import { FeedListActionComponent } from './components/feed-list-action/feed-list-action.component';
import { FeedListFooterComponent } from './components/feed-list-footer/feed-list-footer.component';

@NgModule({
  declarations: [
    LineClampDirective,
    LineClampTargetDirective,
    FeedListComponent,
    FeedListItemComponent,
    FeedListAvatarComponent,
    FeedListActionComponent,
    FeedListFooterComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    FormattedTextModule,
    LinkModule
  ],
  exports: [
    FeedListComponent,
    FeedListItemComponent,
    FeedListAvatarComponent,
    FeedListActionComponent,
    FeedListFooterComponent
  ]
})
export class FeedListItemModule { }
