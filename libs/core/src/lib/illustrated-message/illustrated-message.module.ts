import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IllustratedMessageComponent } from './illustrated-message.component';
import { IllustratedMessageActionsComponent } from './components/illustrated-message-actions/illustrated-message-actions.component';
// tslint:disable-next-line:max-line-length
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
    imports: [CommonModule],
    exports: [
        IllustratedMessageComponent,
        IllustratedMessageActionsComponent,
        IllustratedMessageFigcaptionComponent,
        IllustratedMessageTextDirective,
        IllustratedMessageTitleDirective
    ]
})
export class IllustratedMessageModule {}
