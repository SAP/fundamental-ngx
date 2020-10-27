import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeModule } from '../utils/public_api';
import { FeedListItemComponent } from './feed-list-item.component';
import { FormattedTextModule } from '../formatted-text/formatted-text.module';
import { LineClampDirective, LineClampTargetDirective } from './directives/line-clamp.directive';


@NgModule({
  declarations: [FeedListItemComponent, LineClampDirective, LineClampTargetDirective],
  imports: [
    CommonModule,
    PipeModule,
    FormattedTextModule
  ],
  exports: [FeedListItemComponent]
})
export class FeedListItemModule { }
