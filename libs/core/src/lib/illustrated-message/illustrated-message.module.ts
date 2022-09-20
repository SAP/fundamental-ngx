import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { IllustratedMessageComponent } from './illustrated-message.component';
import { IllustratedMessageActionsComponent } from './components/illustrated-message-actions/illustrated-message-actions.component';
// eslint-disable-next-line max-len
import { IllustratedMessageFigcaptionComponent } from './components/illustrated-message-figcaption/illustrated-message-figcaption.component';
import { IllustratedMessageTextDirective } from './directives/illustrated-message-text/illustrated-message-text.directive';
import { IllustratedMessageTitleDirective } from './directives/illustrated-message-title/illustrated-message-title.directive';

@NgModule({
    declarations: [
        IllustratedMessageComponent,
        IllustratedMessageActionsComponent,
        IllustratedMessageFigcaptionComponent,
        IllustratedMessageTextDirective,
        IllustratedMessageTitleDirective
    ],
    imports: [CommonModule, SkeletonModule],
    exports: [
        IllustratedMessageComponent,
        IllustratedMessageActionsComponent,
        IllustratedMessageFigcaptionComponent,
        IllustratedMessageTextDirective,
        IllustratedMessageTitleDirective
    ]
})
export class IllustratedMessageModule {}
