import { NgModule } from '@angular/core';

import { IllustratedMessageActionsComponent } from './components/illustrated-message-actions/illustrated-message-actions.component';
import { IllustratedMessageComponent } from './illustrated-message.component';

import { IllustratedMessageFigcaptionComponent } from './components/illustrated-message-figcaption/illustrated-message-figcaption.component';
import { IllustratedMessageSectionComponent } from './components/illustrated-message-section/illustrated-message-section.component';
import { IllustratedMessageTextDirective } from './directives/illustrated-message-text/illustrated-message-text.directive';
import { IllustratedMessageTitleDirective } from './directives/illustrated-message-title/illustrated-message-title.directive';

const components = [
    IllustratedMessageComponent,
    IllustratedMessageActionsComponent,
    IllustratedMessageFigcaptionComponent,
    IllustratedMessageSectionComponent,
    IllustratedMessageTextDirective,
    IllustratedMessageTitleDirective
];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class IllustratedMessageModule {}
