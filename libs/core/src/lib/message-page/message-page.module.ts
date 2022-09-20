import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { MessagePageComponent } from './message-page.component';
import { MessagePageActionsComponent } from './message-page-actions/message-page-actions.component';
import { MessagePageMoreComponent } from './message-page-more/message-page-more.component';
import { MessagePageTitleComponent } from './message-page-title/message-page-title.component';
import { MessagePageSubtitleComponent } from './message-page-subtitle/message-page-subtitle.component';

@NgModule({
    declarations: [
        MessagePageComponent,
        MessagePageActionsComponent,
        MessagePageMoreComponent,
        MessagePageTitleComponent,
        MessagePageSubtitleComponent
    ],
    imports: [CommonModule, SkeletonModule],
    exports: [
        MessagePageComponent,
        MessagePageActionsComponent,
        MessagePageMoreComponent,
        MessagePageTitleComponent,
        MessagePageSubtitleComponent
    ]
})
export class MessagePageModule {}
