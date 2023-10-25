import { NgModule } from '@angular/core';

import { IllustratedMessageActionsComponent } from './components/illustrated-message-actions/illustrated-message-actions.component';
import { IllustratedMessageComponent } from './illustrated-message.component';
// eslint-disable-next-line max-len
import { IllustratedMessageFigcaptionComponent } from './components/illustrated-message-figcaption/illustrated-message-figcaption.component';
import { IllustratedMessageTextDirective } from './directives/illustrated-message-text/illustrated-message-text.directive';
import { IllustratedMessageTitleDirective } from './directives/illustrated-message-title/illustrated-message-title.directive';

const components = [
    IllustratedMessageComponent,
    IllustratedMessageActionsComponent,
    IllustratedMessageFigcaptionComponent,
    IllustratedMessageTextDirective,
    IllustratedMessageTitleDirective
];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class IllustratedMessageModule {}
